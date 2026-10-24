import AlumnosMemoryDao from "./AlumnosMemoryDao.js";
import CursosMemoryDao from "../Cursos/CursosMemoryDao.js";

class IncripcionesMemoryDao { 
    #cursos = [];
    #nextId = 1;
    #alumnosDao;
    #cursosDao;

    constructor(alumnosDao = new AlumnosMemoryDao(), cursosDao = new CursosMemoryDao()) {
        this.#alumnosDao = alumnosDao;
        this.#cursosDao = cursosDao;
    }

    async #withRelations(inscripcion) {
        const alumno = await this.#alumnosDao.getById(inscripcion.alumnoId);
        const curso = await this.#cursosDao.getById(inscripcion.cursoId);
        return {
            ...inscripcion,
            alumno: alumno || null,
            curso: curso || null
        };
    }

    async getAll({ alumnoId, cursoId } = {}) {
        const matches = (filter, value) => filter === undefined || [filter].flat().includes(value);
        const result = this.#cursos.filter(inscripcion =>
            matches(alumnoId, inscripcion.alumnoId) &&
            matches(cursoId, inscripcion.cursoId)
        );
        return Promise.all(result.map(inscripcion => this.#withRelations(inscripcion)));
    }

    async getById(id) {
        const numericId = Number(id);
        const inscripcion = this.#cursos.find(inscripcion => inscripcion.id === numericId);
        return inscripcion ? this.#withRelations(inscripcion) : null;
    }
}

export { IncripcionesMemoryDao };
export default new IncripcionesMemoryDao();