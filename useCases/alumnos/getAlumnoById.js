import AppError from "../../errors/AppError.js";

async function getAlumnoById(id, dao) {
    const alumno = await dao.getById(id);
    if (!alumno) {
         throw new AppError("ALUMNO_NOT_FOUND", "Alumno no encontrado", 404);
    }
    return alumno;
}
export default getAlumnoById;