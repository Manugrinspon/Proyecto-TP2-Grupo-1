async function getInscripciones(filters, dao) {
    return await dao.getAll(filters);
}

export default getInscripciones;