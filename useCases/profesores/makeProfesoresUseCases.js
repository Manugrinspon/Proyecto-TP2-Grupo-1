import getProfesores from "./getProfesores.js";
import getProfesorById from "./getProfesorById.js";
import createProfesor from "./createProfesor.js";
import updateProfesor from "./updateProfesor.js";
import deleteProfesor from "./deleteProfesor.js";

function makeProfesoresUseCases(dao, cursosDao, event) {
    return {
        getProfesores: (filters) => getProfesores(filters, dao),
        getProfesorById: (id) => getProfesorById(id, dao),
        createProfesor: (data) => createProfesor(data, dao, event),
        updateProfesor: (id, data) => updateProfesor(id, data, dao, event),
        deleteProfesor: (id) => deleteProfesor(id, dao, cursosDao, event)
    };
}
export default makeProfesoresUseCases;