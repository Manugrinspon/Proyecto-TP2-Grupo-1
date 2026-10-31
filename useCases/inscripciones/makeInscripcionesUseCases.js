import getInscripciones from "./getInscripciones.js";
import getInscripcionById from "./getInscripcionById.js";
import createInscripcion from "./createInscripcion.js";

function makeInscripcionesUseCases(dao) {
    return {
        getInscripciones: (filters) => getInscripciones(filters, dao),
        getInscripcionById: (id) => getInscripcionById(id, dao),
        createInscripcion: (data) => createInscripcion(data, dao),
        updateInscripcion: (id, data, event) => updateInscripcion(id, data, dao, event),
        deleteInscripcion: (id) => deleteInscripcion(id, dao)
    };
}

export default makeInscripcionesUseCases;