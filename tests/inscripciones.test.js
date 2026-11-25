import { test } from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

import { AlumnosMemoryDao } from "../dao/alumnos/AlumnosMemoryDao.js";
import { CursosMemoryDao } from "../dao/cursos/CursosMemoryDao.js";
import { IncripcionesMemoryDao } from "../dao/inscripciones/InscripcionesMemoryDao.js";
import makeInscripcionesUseCases from "../useCases/inscripciones/makeInscripcionesUseCases.js";
import makeAlumnosUseCases from "../useCases/alumnos/makeAlumnosUseCases.js";

// Arma casos de uso con DAOs en memoria NUEVOS (cada test arranca con datos limpios).
function setup({ umbralCupoBajo = 2 } = {}) {
  const alumnosDao = new AlumnosMemoryDao();
  const cursosDao = new CursosMemoryDao([
    { id: 1, nombre: "Node", descripcion: "d", cupo_maximo: 3, cupo_disponible: 3, profesorId: 1 },
  ]);
  const inscDao = new IncripcionesMemoryDao(alumnosDao, cursosDao);
  const events = new EventEmitter();
  const emitidos = [];
  events.on("inscripcion_creada", (p) => emitidos.push(["inscripcion_creada", p]));
  events.on("curso_cupo_bajo", (p) => emitidos.push(["curso_cupo_bajo", p]));

  const inscripciones = makeInscripcionesUseCases(inscDao, alumnosDao, cursosDao, events, { umbralCupoBajo });
  const alumnos = makeAlumnosUseCases(alumnosDao, inscDao, events);
  return { inscripciones, alumnos, cursosDao, emitidos };
}

test("inscribir descuenta 1 del cupo y emite inscripcion_creada", async () => {
  const { inscripciones, cursosDao, emitidos } = setup();
  const nueva = await inscripciones.createInscripcion({ alumnoId: 1, cursoId: 1 });

  assert.equal(nueva.alumnoId, 1);
  assert.equal((await cursosDao.getById(1)).cupo_disponible, 2);
  assert.deepEqual(emitidos.map(([n]) => n), ["inscripcion_creada", "curso_cupo_bajo"]);
});

test("no emite curso_cupo_bajo si el cupo restante supera el umbral", async () => {
  const { inscripciones, emitidos } = setup({ umbralCupoBajo: 1 });
  await inscripciones.createInscripcion({ alumnoId: 1, cursoId: 1 }); // quedan 2 > 1
  assert.deepEqual(emitidos.map(([n]) => n), ["inscripcion_creada"]);
});

test("alumno inexistente -> 404 ALUMNO_NOT_FOUND", async () => {
  const { inscripciones } = setup();
  await assert.rejects(
    inscripciones.createInscripcion({ alumnoId: 99, cursoId: 1 }),
    { code: "ALUMNO_NOT_FOUND", statusCode: 404 }
  );
});

test("curso inexistente -> 404 CURSO_NOT_FOUND", async () => {
  const { inscripciones } = setup();
  await assert.rejects(
    inscripciones.createInscripcion({ alumnoId: 1, cursoId: 99 }),
    { code: "CURSO_NOT_FOUND", statusCode: 404 }
  );
});

test("inscripción duplicada -> 409 y no toca el cupo", async () => {
  const { inscripciones, cursosDao } = setup();
  await inscripciones.createInscripcion({ alumnoId: 1, cursoId: 1 });
  await assert.rejects(
    inscripciones.createInscripcion({ alumnoId: 1, cursoId: 1 }),
    { code: "INSCRIPCION_DUPLICADA", statusCode: 409 }
  );
  assert.equal((await cursosDao.getById(1)).cupo_disponible, 2);
});

test("curso sin cupo -> 409 SIN_CUPO", async () => {
  const { inscripciones, cursosDao } = setup();
  await cursosDao.update(1, { cupo_disponible: 0 });
  await assert.rejects(
    inscripciones.createInscripcion({ alumnoId: 1, cursoId: 1 }),
    { code: "SIN_CUPO", statusCode: 409 }
  );
});

test("cancelar una inscripción devuelve el cupo", async () => {
  const { inscripciones, cursosDao } = setup();
  const { id } = await inscripciones.createInscripcion({ alumnoId: 1, cursoId: 1 });
  await inscripciones.deleteInscripcion(id);
  assert.equal((await cursosDao.getById(1)).cupo_disponible, 3);
});

test("no se puede borrar un alumno con inscripciones -> 409", async () => {
  const { inscripciones, alumnos } = setup();
  await inscripciones.createInscripcion({ alumnoId: 1, cursoId: 1 });
  await assert.rejects(alumnos.deleteAlumno(1), { code: "ALUMNO_CON_INSCRIPCIONES", statusCode: 409 });
});

test("si falla la transacción no se pierde cupo (usa el transactionManager inyectado)", async () => {
  const alumnosDao = new AlumnosMemoryDao();
  const cursosDao = new CursosMemoryDao([
    { id: 1, nombre: "Node", descripcion: "d", cupo_maximo: 3, cupo_disponible: 3, profesorId: 1 },
  ]);
  const inscDao = new IncripcionesMemoryDao(alumnosDao, cursosDao);
  const transactionManager = { run: async () => { throw new Error("falló la base"); } };
  const uc = makeInscripcionesUseCases(inscDao, alumnosDao, cursosDao, new EventEmitter(), { transactionManager });

  await assert.rejects(uc.createInscripcion({ alumnoId: 1, cursoId: 1 }), /falló la base/);
  assert.equal((await cursosDao.getById(1)).cupo_disponible, 3);
  assert.equal((await inscDao.getAll()).length, 0);
});