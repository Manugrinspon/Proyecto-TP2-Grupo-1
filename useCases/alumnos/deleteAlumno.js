import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function deleteAlumno(id, alumnosDao, inscripcionesDao, events) {
  const existing = await alumnosDao.getById(id);
  if (!existing) throw new AppError("ALUMNO_NOT_FOUND", "Alumno no encontrado", 404);

  const inscripciones = await inscripcionesDao.getAll({ alumnoId: Number(id) });
  if (inscripciones.length > 0) {
    throw new AppError(
      "ALUMNO_CON_INSCRIPCIONES",
      "No se puede eliminar un alumno que tiene inscripciones activas",
      409
    );
  }

  await alumnosDao.delete(id);
  events.emit(EVENTS.ALUMNO_ELIMINADO, existing);
  return existing;
}

export default deleteAlumno;