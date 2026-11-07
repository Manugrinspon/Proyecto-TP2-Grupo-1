import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function deleteAlumno(id, dao, events) {
  const existing = await dao.getById(id);
  if (!existing) throw new AppError("ALUMNO_NOT_FOUND", "Alumno no encontrado", 404);
  await dao.delete(id);
  events.emit(EVENTS.ALUMNO_ELIMINADO, existing);   // después de borrar
  return existing;
}

export default deleteAlumno;