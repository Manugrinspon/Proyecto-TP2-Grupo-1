class AlumnosMemoryDao {
    #alumnos;
    #nextId;

    constructor(initialAlumnos = [
        { id: 1, nombre: 'Manuel Grinspon', email: 'manugrinspon@gmail.com', legajo: '12345' },
        { id: 2, nombre: 'Lucas Miguez', email: 'lucas.miguez@gmail.com', legajo: '67890' },
    ]) {
        this.#alumnos = [...initialAlumnos];
        this.#updateNextId();
    }

    #updateNextId() {
        const maxId = this.#alumnos.reduce((max, alumno) => Math.max(max, alumno.id), 0);
        this.#nextId = maxId + 1;
    }

    async getAll({ nombre, email, legajo, sort, page = 1, limit } = {}) {
        let alumnos = this.#alumnos.filter(alumno => {
            if (nombre && !alumno.nombre.toLowerCase().includes(nombre.toLowerCase())) {
                return false;
            }
            if (email && alumno.email !== email) {
                return false;
            }
            if (legajo && alumno.legajo !== legajo) {
                return false;
            }
            return true;
        });

        if (sort) {
            alumnos.sort((a, b) => {
                if (sort === 'nombre') {
                    return a.nombre.localeCompare(b.nombre);
                }
                if (sort === 'email') {
                    return a.email.localeCompare(b.email);
                }
                if (sort === 'legajo') {
                    return a.legajo.localeCompare(b.legajo);
                }
                return 0;
            });
        }

        
        if (limit !== undefined) {
            const parsedLimit = parseInt(limit, 10);
            const parsedPage = parseInt(page, 10) || 1;
            const startIndex = (parsedPage - 1) * parsedLimit;
            const endIndex = startIndex + parsedLimit;
            alumnos = alumnos.slice(startIndex, endIndex);
        }

        return alumnos.map((alumno) => ({ ...alumno }));
    }

    async getById(id) {
        const numericId = Number(id);
        const alumno = this.#alumnos.find(alumno => alumno.id === numericId);
        return alumno ? { ...alumno } : null;
    }

    async getByEmail(email) {
        const alumno = this.#alumnos.find(alumno => alumno.email === email);
        return alumno ? { ...alumno } : null;
    }

    async getByLegajo(legajo) {
        const alumno = this.#alumnos.find(alumno => alumno.legajo === legajo);
        return alumno ? { ...alumno } : null;
    }

    async save(data) {
        const { id: _ignored, ...alumnoData } = data;
        const newAlumno = { id: this.#nextId, ...alumnoData };
        this.#alumnos.push(newAlumno);
        this.#nextId++;
        return { ...newAlumno };
    }

    async update(id, data) {
        const numericId = Number(id);
        const index = this.#alumnos.findIndex(alumno => alumno.id === numericId);
        if (index === -1) {
            return null;
        }
        const { id: _ignored, ...updatedData } = data;
        this.#alumnos[index] = { ...this.#alumnos[index], ...updatedData };
        return { ...this.#alumnos[index] };
    }

    async delete(id) {
        const numericId = Number(id);
        const index = this.#alumnos.findIndex(alumno => alumno.id === numericId);
        if (index === -1) {
            return null;
        }
        const deletedAlumno = this.#alumnos.splice(index, 1)[0];
        return { ...deletedAlumno };
    }
}

export { AlumnosMemoryDao };
export default new AlumnosMemoryDao();
