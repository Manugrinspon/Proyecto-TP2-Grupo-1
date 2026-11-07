import AppError from "../../errors/AppError.js";
import EVENTS from "../../events/eventNames.js";

async function deleteProfesor(id, profesoresDao, cursosDao, event) {
    const existingProfesor = await profesoresDao.getById(id);
    if (!existingProfesor) {
        throw new AppError("PROFESOR_NO_ENCONTRADO", "Profesor no encontrado", 404);
    }

    const cursos = await cursosDao.getAll({ profesorId: Number(id) });
    if (cursos.length > 0) {
        throw new AppError(
            "PROFESOR_CON_CURSOS",
            "No se puede eliminar un profesor que tiene cursos asignados",
            409
        );
    }

    const deletedProfesor = await profesoresDao.delete(id);
    event.emit(EVENTS.PROFESOR_ELIMINADO, deletedProfesor);
    return deletedProfesor;
}
export default deleteProfesor;