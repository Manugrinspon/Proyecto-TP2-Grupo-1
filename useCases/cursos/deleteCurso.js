import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function deleteCurso(id, dao, events) {
    const existingCurso = await dao.getById(id);
    if (!existingCurso) {
        throw new AppError("Curso no encontrado", 404);
    }
    const deletedCurso = await dao.delete(id);
    events.emit(EVENTS.CURSO_ELIMINADO, deletedCurso);
    return deletedCurso;
}

export default deleteCurso;