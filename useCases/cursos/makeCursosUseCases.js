import getCursos from "./getCursos.js";
import getCursoById from "./getCursoById.js";
import createCurso from "./createCurso.js";
import updateCurso from "./updateCurso.js";
import deleteCurso from "./deleteCurso.js";

function makeCursosUseCases(cursosDao, profesoresDao, event) {
    return {
        getCursos: (filters) => getCursos(filters, cursosDao),
        getCursoById: (id) => getCursoById(id, cursosDao),
        createCurso: (data) => createCurso(data, cursosDao, profesoresDao, event),
        updateCurso: (id, data) => updateCurso(id, data, cursosDao, profesoresDao, event),
        deleteCurso: (id, events) => deleteCurso(id, cursosDao, event)
    };
}
export default makeCursosUseCases;