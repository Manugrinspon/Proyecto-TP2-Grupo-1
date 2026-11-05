async function getProfesores(filters, dao) {
    return await dao.getAll(filters);
}

export default getProfesores;