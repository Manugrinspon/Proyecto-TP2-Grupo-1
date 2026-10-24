import AppError from "../../errors/AppError.js";

async function deleteAlumno(id, dao) {
    const existingAlumno = await dao.getById(id);
    if (!existingAlumno) {
        throw new AppError("Alumno no encontrado", 404);
    }
    return await dao.delete(id);
}
export default deleteAlumno;