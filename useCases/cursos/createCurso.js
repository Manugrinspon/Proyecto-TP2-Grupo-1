import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function createCurso(data, cursosDao, profesoresDao, events) {
    const existingProfesor = await profesoresDao.getById(data.profesorId);
    if (!existingProfesor) {
        throw new AppError(`No existe un profesor con el ID ${data.profesorId}`, 404);
    }

    const newCurso = await cursosDao.save(data);
    events.emit(EVENTS.CURSO_CREADO, newCurso);
    return newCurso;
}
export default createCurso;