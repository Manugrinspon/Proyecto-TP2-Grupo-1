import getProfesores from "./getProfesores.js";
import getProfesorById from "./getProfesorById.js";
import createProfesor from "./createProfesor.js";
import updateProfesor from "./updateProfesor.js";
import deleteProfesor from "./deleteProfesor.js";

function makeProfesoresUseCases(dao) {
    return {
        getProfesores: (filters) => getProfesores(filters, dao),
        getProfesorById: (id) => getProfesorById(id, dao),
        createProfesor: (data, events) => createProfesor(data, dao, events),
        updateProfesor: (id, data, events) => updateProfesor(id, data, dao, events),
        deleteProfesor: (id, events) => deleteProfesor(id, dao, events)
    };
}
export default makeProfesoresUseCases;