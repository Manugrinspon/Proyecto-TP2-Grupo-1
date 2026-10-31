class ProfesoresMemoryDao {
    #profesores;
    #nextId;

    constructor(initialProfesores = [
        { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@gmail.com', especialidad: 'Backend' },
        { id: 2, nombre: 'Ana Gómez', email: 'ana.gomez@gmail.com', especialidad: 'Frontend' },
    ]) {
        this.#profesores = [...initialProfesores];
        this.#updateNextId();
    }

    #updateNextId() {
        const maxId = this.#profesores.reduce((max, prof) => Math.max(max, prof.id), 0);
        this.#nextId = maxId + 1;
    }

    async getAll({ nombre, email, especialidad, sort, page = 1, limit } = {}) {
        let profesores = this.#profesores.filter(prof => {
            if (nombre && !prof.nombre.toLowerCase().includes(nombre.toLowerCase())) return false;
            if (email && prof.email !== email) return false;
            if (especialidad && !prof.especialidad.toLowerCase().includes(especialidad.toLowerCase())) return false;
            return true;
        });

        if (sort) {
            profesores.sort((a, b) => {
                if (sort === 'nombre') return a.nombre.localeCompare(b.nombre);
                if (sort === 'email') return a.email.localeCompare(b.email);
                if (sort === 'especialidad') return a.especialidad.localeCompare(b.especialidad);
                return 0;
            });
        }

        if (limit !== undefined) {
            const parsedLimit = parseInt(limit, 10);
            const parsedPage = parseInt(page, 10) || 1;
            const startIndex = (parsedPage - 1) * parsedLimit;
            profesores = profesores.slice(startIndex, startIndex + parsedLimit);
        }

        return profesores.map((prof) => ({ ...prof }));
    }

    async getById(id) {
        const numericId = Number(id);
        const profesor = this.#profesores.find(prof => prof.id === numericId);
        return profesor ? { ...profesor } : null;
    }

    async getByEmail(email) {
        const profesor = this.#profesores.find(prof => prof.email === email);
        return profesor ? { ...profesor } : null;
    }

    async save(data) {
        const { id: _ignored, ...profesorData } = data;
        const newProfesor = { id: this.#nextId, ...profesorData };
        this.#profesores.push(newProfesor);
        this.#nextId++;
        return { ...newProfesor };
    }

    async update(id, data) {
        const numericId = Number(id);
        const index = this.#profesores.findIndex(prof => prof.id === numericId);
        if (index === -1) return null;
        const { id: _ignored, ...updatedData } = data;
        this.#profesores[index] = { ...this.#profesores[index], ...updatedData };
        return { ...this.#profesores[index] };
    }

    async delete(id) {
        const numericId = Number(id);
        const index = this.#profesores.findIndex(prof => prof.id === numericId);
        if (index === -1) return null;
        const deletedProfesor = this.#profesores.splice(index, 1)[0];
        return { ...deletedProfesor };
    }
}

export { ProfesoresMemoryDao };
export default new ProfesoresMemoryDao();