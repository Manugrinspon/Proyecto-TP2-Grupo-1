async function getAlumnos(filters, dao) {
    return await dao.getAll(filters);
}

export default getAlumnos;