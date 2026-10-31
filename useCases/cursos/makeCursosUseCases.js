import getCursos from "./getCursos.js";
import getCursoById from "./getCursoById.js";
import createCurso from "./createCurso.js";
import updateCurso from "./updateCurso.js";
import deleteCurso from "./deleteCurso.js";

function makeCursosUseCases(cursosDao, profesoresDao) {
    return {
        getCursos: (filters) => getCursos(filters, cursosDao),
        getCursoById: (id) => getCursoById(id, cursosDao),
        createCurso: (data, events) => createCurso(data, cursosDao, profesoresDao, events),
        updateCurso: (id, data, events) => updateCurso(id, data, cursosDao, profesoresDao, events),
        deleteCurso: (id, events) => deleteCurso(id, cursosDao, events)
    };
}
export default makeCursosUseCases;