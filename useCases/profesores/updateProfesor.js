import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function updateProfesor(id, data, dao, event) {
    const existingProfesor = await dao.getById(id);
    if (!existingProfesor) {
        throw new AppError("Profesor no encontrado", 404);
    }
    const updatedProfesor = await dao.update(id, data);
    // event.emit(EVENTS.PROFESOR_ACTUALIZADO, updatedProfesor);
    return updatedProfesor;
}
export default updateProfesor;