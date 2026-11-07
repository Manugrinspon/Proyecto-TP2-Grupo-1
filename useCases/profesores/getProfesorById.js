import AppError from "../../errors/AppError.js";

async function getProfesorById(id, dao) {
    const profesor = await dao.getById(id);
    if (!profesor) {
        throw new AppError("PROFESOR_NOT_FOUND", "Profesor no encontrado", 404);
    }
    return profesor;
}

export default getProfesorById;