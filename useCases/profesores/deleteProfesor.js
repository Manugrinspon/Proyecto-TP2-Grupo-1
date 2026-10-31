import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function deleteProfesor(id, dao, event) {
    const existingProfesor = await dao.getById(id);
    if (!existingProfesor) {
        throw new AppError("Profesor no encontrado", 404);
    }
    const deletedProfesor = await dao.delete(id);
    event.emit(EVENTS.PROFESOR_ELIMINADO, deletedProfesor);
    return deletedProfesor;
}
export default deleteProfesor;