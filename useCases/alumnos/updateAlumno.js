import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function updateAlumno(id, data, dao, event) {
    const existingAlumno = await dao.getById(id);
    if (!existingAlumno) {
         throw new AppError("ALUMNO_NOT_FOUND", "Alumno no encontrado", 404);
    }
    const updatedAlumno = await dao.update(id, data);
    event.emit(EVENTS.ALUMNO_ACTUALIZADO, updatedAlumno);
    return updatedAlumno;
}
export default updateAlumno;