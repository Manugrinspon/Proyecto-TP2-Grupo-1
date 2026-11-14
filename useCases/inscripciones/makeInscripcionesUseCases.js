import getInscripciones from "./getInscripciones.js";
import getInscripcionById from "./getInscripcionById.js";
import createInscripcion from "./createInscripcion.js";
import deleteInscripcion from "./deleteInscripcion.js";

function makeInscripcionesUseCases(inscDao, alumnosDao, cursosDao, events, options = { umbralCupoBajo: 2 }) {
    return {
        getInscripciones: (filters) => getInscripciones(filters, inscDao),
        getInscripcionById: (id) => getInscripcionById(id, inscDao),
        createInscripcion: (data) => createInscripcion(data, inscDao, alumnosDao, cursosDao, events, options),
        deleteInscripcion: (id) => deleteInscripcion(id, inscDao, cursosDao, events),
    };
}

export default makeInscripcionesUseCases;