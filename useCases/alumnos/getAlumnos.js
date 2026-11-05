async function getAlumnos({ nombre, email, legajo, page = 1, limit = 10 } = {}, dao) {
    const alumnos = await dao.getAll({ nombre, email, legajo, page, limit });
    return alumnos;
}
export default getAlumnos;