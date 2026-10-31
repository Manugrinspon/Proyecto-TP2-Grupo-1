import AppError from "../../errors/AppError.js";

async function getCursoById(id, dao) {
    const curso = await dao.getById(id);
    if (!curso) {
        throw new AppError("Curso no encontrado", 404);
    }
    return curso;
}
export default getCursoById;