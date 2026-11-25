import AppError from "../../errors/AppError.js";

async function getCursoById(id, dao) {
    const curso = await dao.getById(id);
    if (!curso) {
        throw new AppError("CURSO_NOT_FOUND", "Curso no encontrado", 404);
    }
    return curso;
}
export default getCursoById;