import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function deleteCurso(id, cursosDao, inscripcionesDao, events) {
    const existing = await cursosDao.getById(id);
    if (!existing) throw new AppError("CURSO_NOT_FOUND", "Curso no encontrado", 404);

    const inscripciones = await inscripcionesDao.getAll({ cursoId: Number(id) });
    for (const inscripcion of inscripciones) {
        await inscripcionesDao.delete(inscripcion.id);
        events.emit(EVENTS.INSCRIPCION_ELIMINADA, inscripcion);
    }

    const deleted = await cursosDao.delete(id);
    events.emit(EVENTS.CURSO_ELIMINADO, deleted);
    return deleted;
}

export default deleteCurso;