import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function deleteInscripcion(id, inscDao, cursosDao, events) {
    const existing = await inscDao.getById(id);
    if (!existing) {
        throw new AppError("INSCRIPCION_NOT_FOUND", "Inscripción no encontrada", 404);
    }

    await inscDao.delete(id);

    const curso = await cursosDao.getById(existing.cursoId);
    if (curso) {
        await cursosDao.update(existing.cursoId, {
            cupo_disponible: Math.min(curso.cupo_disponible + 1, curso.cupo_maximo),
        });
    }

    events.emit(EVENTS.INSCRIPCION_ELIMINADA, existing);
    return existing;
}

export default deleteInscripcion;