import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function createAlumno(data, dao, event) {

    if (data.nombre && data.email && data.legajo) {
        const existingAlumnoByNombreYApellido = await dao.getByNombreYApellido(data.nombre, data.apellido);
        const existingAlumnoByEmail = await dao.getByEmail(data.email);
        const existingAlumnoByLegajo = await dao.getByLegajo(data.legajo);
        if (existingAlumnoByNombreYApellido) {
            throw new AppError("ALUMNO_EXISTENTE", "El alumno ya existe", 409);
        }
        if (existingAlumnoByEmail) {
            throw new AppError("EMAIL_DUPLICADO", `Ya existe un alumno con el email ${data.email}`, 409);
        }
        if (existingAlumnoByLegajo) {
            throw new AppError("LEGAJO_DUPLICADO", `Ya existe un alumno con el legajo ${data.legajo}`, 409);
        }
    }

    const createdAlumno = await dao.save(data);
    event.emit(EVENTS.ALUMNO_CREADO, createdAlumno);

    return createdAlumno;
}

export default createAlumno;