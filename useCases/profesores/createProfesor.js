import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function createProfesor(data, dao, event) {
    if (data.email) {
        const existingProfesor = await dao.getByEmail(data.email);
        if (existingProfesor) {
            throw new AppError(`Ya existe un profesor con el email ${data.email}`, 400);
        }
    }
    const createdProfesor = await dao.save(data);
    // event.emit(EVENTS.PROFESOR_CREADO, createdProfesor);
    return createdProfesor;
}
export default createProfesor;