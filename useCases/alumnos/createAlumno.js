import AppError from "../../errors/AppError.js";
import EVENTS from "../../eventseventNames.js";

async function createAlumno(data, dao, event) {

    if (data.nombre && data.email && data.legajo) {
        const existingAlumnoByNombre = await dao.getByNombre(data.nombre);
        const existingAlumnoByEmail = await dao.getByEmail(data.email);
        const existingAlumnoByLegajo = await dao.getByLegajo(data.legajo);
        if (existingAlumnoByNombre) {
            throw new AppError(`Ya existe un alumno con el nombre ${data.nombre}`, 400);
        }
        if (existingAlumnoByEmail) {
            throw new AppError(`Ya existe un alumno con el email ${data.email}`, 400);
        }
        if (existingAlumnoByLegajo) {
            throw new AppError(`Ya existe un alumno con el legajo ${data.legajo}`, 400);
        }
    }

    const createdAlumno = await dao.save(data);

    return createdAlumno;
}

export default createAlumno;