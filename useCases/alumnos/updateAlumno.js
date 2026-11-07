import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function updateAlumno(id, data, dao, events) {
  const existing = await dao.getById(id);
  if (!existing) throw new AppError("ALUMNO_NOT_FOUND", "Alumno no encontrado", 404);

  if (data.email && data.email !== existing.email && await dao.getByEmail(data.email)) {
    throw new AppError("EMAIL_DUPLICADO", "Ya existe un alumno con ese email", 409);
  }
  if (data.legajo && data.legajo !== existing.legajo && await dao.getByLegajo(data.legajo)) {
    throw new AppError("LEGAJO_DUPLICADO", "Ya existe un alumno con ese legajo", 409);
  }

  const updated = await dao.update(id, data);
  events.emit(EVENTS.ALUMNO_ACTUALIZADO, updated);
  return updated;
}

export default updateAlumno;