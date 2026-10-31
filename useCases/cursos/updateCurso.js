import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function updateCurso(id, data, cursosDao, profesoresDao, events) {
    const existingCurso = await cursosDao.getById(id);
    if (!existingCurso) {
        throw new AppError("Curso no encontrado", 404);
    }

    if (data.profesorId) {
        const existingProfesor = await profesoresDao.getById(data.profesorId);
        if (!existingProfesor) {
             throw new AppError(`No existe un profesor con el ID ${data.profesorId}`, 404);
        }
    }

    const updatedCurso = await cursosDao.update(id, data);
    events.emit(EVENTS.CURSO_ACTUALIZADO, updatedCurso);
    return updatedCurso;
}
export default updateCurso;