import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function createProfesor(data, dao, event) {
    if (data.email && data.nombre && data.especialidad) {
        const existingProfesorByEmail = await dao.getByEmail(data.email);
        const existingProfesorByNombre = await dao.getByNombre(data.nombre);
        const existingProfesorByEspecialidad = await dao.getByEspecialidad(data.especialidad);
        if (existingProfesorByEmail) {
            throw new AppError("PROFESOR_EXISTENTE", `Ya existe un profesor con el email ${data.email}`, 400);
        }
        if (existingProfesorByNombre) {
            throw new AppError("PROFESOR_EXISTENTE", `Ya existe un profesor con el nombre ${data.nombre}`, 400);
        }
        if (existingProfesorByEspecialidad) {
            throw new AppError("PROFESOR_EXISTENTE", `Ya existe un profesor con la especialidad ${data.especialidad}`, 400);
        }
    }
    const createdProfesor = await dao.save(data);
    event.emit(EVENTS.PROFESOR_CREADO, createdProfesor);
    return createdProfesor;
}
export default createProfesor;