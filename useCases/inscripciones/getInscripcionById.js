import AppError from "../../errors/AppError.js";

async function getInscripcionById(id, dao) {
    const inscripcion = await dao.getById(id);
    if (!inscripcion) {
        throw new AppError("INSCRIPCION_NOT_FOUND", "Inscripción no encontrada", 404);
    }
    return inscripcion;
}

export default getInscripcionById;