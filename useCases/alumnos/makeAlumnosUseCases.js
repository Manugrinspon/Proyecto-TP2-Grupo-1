import getAlumnos from "./getAlumnos.js";
import getAlumnoById from "./getAlumnoById.js";
import createAlumno from "./createAlumno.js";
import updateAlumno from "./updateAlumno.js";
import deleteAlumno from "./deleteAlumno.js";

function makeAlumnosUseCases(dao) {
    return {
        getAlumnos: (filters) => getAlumnos(filters, dao),
        getAlumnoById: (id) => getAlumnoById(id, dao),
        createAlumno: (data) => createAlumno(data, dao),
        updateAlumno: (id, data, event) => updateAlumno(id, data, dao, event),
        deleteAlumno: (id) => deleteAlumno(id, dao)
    };
}

export default makeAlumnosUseCases;