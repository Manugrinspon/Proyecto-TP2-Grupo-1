import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function createInscripcion({ alumnoId, cursoId }, inscDao, alumnosDao, cursosDao, events) {
  const alumno = await alumnosDao.getById(alumnoId);
  if (!alumno) throw new AppError("ALUMNO_NOT_FOUND", `No existe el alumno ${alumnoId}`, 404);
  const curso = await cursosDao.getById(cursoId);
  if (!curso) throw new AppError("CURSO_NOT_FOUND", `No existe el curso ${cursoId}`, 404);

  if (await inscDao.getByAlumnoIdAndCursoId(alumnoId, cursoId))
    throw new AppError("INSCRIPCION_DUPLICADA", "El alumno ya está inscrito en el curso", 409);
  if (curso.cupo_disponible <= 0)
    throw new AppError("SIN_CUPO", "El curso no tiene cupo disponible", 409);

  const nueva = await inscDao.save({ alumnoId, cursoId });
  await cursosDao.update(cursoId, { cupo_disponible: curso.cupo_disponible - 1 });
  events.emit(EVENTS.INSCRIPCION_CREADA, nueva);
  return nueva;
}

export default createInscripcion;