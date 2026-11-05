async function getInscripciones({ alumnoId, materiaId, page = 1, limit = 10 } = {}, dao) {
    const inscripciones = await dao.getAll({ alumnoId, materiaId, page, limit });
    return inscripciones;
}

export default getInscripciones;