async function getInscripcionById(id, dao) {
    const inscripcion = await dao.getById(id);
    if (!inscripcion) {
        throw new AppError("Inscripción no encontrada", 404);
    }
    return inscripcion;
}

export default getInscripcionById;