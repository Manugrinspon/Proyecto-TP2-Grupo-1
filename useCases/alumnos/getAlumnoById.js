async function getAlumnoById(id, dao) {
    const alumno = await dao.getById(id);
    if (!alumno) {
        throw new AppError("Alumno no encontrado", 404);
    }
    return alumno;
}
export default getAlumnoById;