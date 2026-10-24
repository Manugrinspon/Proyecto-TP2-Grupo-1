import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function createInscripcion({ alumnoId, cursoId }, inscripcionesDao, alumnosDao, cursosDao, events) {
    // Verificar si el alumno existe
    const existingAlumno = await alumnosDao.getById(alumnoId);
    if (!existingAlumno) {
        throw new AppError(`No existe un alumno con el ID ${alumnoId}`, 404);
    }

    // Verificar si el curso existe
    const existingCurso = await cursosDao.getById(cursoId);
    if (!existingCurso) {
        throw new AppError(`No existe un curso con el ID ${cursoId}`, 404);
    }

    // Verificar si la inscripción ya existe
    const existingInscripcion = await inscripcionesDao.getByAlumnoIdAndCursoId(alumnoId, cursoId);
    if (existingInscripcion) {
        throw new AppError(`El alumno con ID ${alumnoId} ya está inscrito en el curso con ID ${cursoId}`, 400);
    }

    // Crear la inscripción
    const newInscripcion = await inscripcionesDao.save({ alumnoId, cursoId });
    events.emit(EVENTS.INSCRIPCION_CREADA, newInscripcion);
    return newInscripcion;
}

export default createInscripcion;