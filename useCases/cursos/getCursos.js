async function getCursos(filters, dao) {
    return await dao.getAll(filters);
}
export default getCursos;