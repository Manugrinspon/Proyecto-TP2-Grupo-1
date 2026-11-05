import { Op } from "sequelize";
import { sequelize, AlumnoModel } from "../models/index.js";

const ALUMNOS_ATTRIBUTES = ["id", "nombre", "apellido", "email", "legajo"];

class AlumnosSequelizeDao {

    async init() {
        await sequelize.sync({alter: true});

        const count = await AlumnoModel.count();
        if (count === 0) {
            await AlumnoModel.bulkCreate([
                { nombre: "Juan", apellido: "Pérez", email: "juan.perez@example.com", legajo: "12345" },
                { nombre: "María", apellido: "Gómez", email: "maria.gomez@example.com", legajo: "67890" }
            ]);
        }
    }
    async getAll() {
        const where = {};
        return await AlumnoModel.findAll({
            attributes: ALUMNOS_ATTRIBUTES,
        });
    }

    async getById(id) {
        const alumno = await AlumnoModel.findByPk(id, {
            attributes: ALUMNOS_ATTRIBUTES,
        });
        return alumno ? alumno.get({ plain: true }) : null;
    }

    async getByLegajo(legajo) {
        const alumno = await AlumnoModel.findOne({
            where: { legajo },
            attributes: ALUMNOS_ATTRIBUTES,
        });
        return alumno ? alumno.get({ plain: true }) : null;
    }

    async save(data) {
        const { id: _ignored, ...alumnoData } = data; // Exclude 'id' if present
        const newAlumno = await AlumnoModel.create(alumnoData);
        return newAlumno.get({ plain: true });
    }

    async update(id, changes) {
        const alumnoUpdate = await AlumnoModel.findByPk(id);
        if (!alumnoUpdate) {
            return null;
        }

        const { id: _ignored, ...alumnoData } = changes; // Exclude 'id' if present
        await alumnoUpdate.update(alumnoData);
        return alumnoUpdate.get({ plain: true });
    }

    async delete(id) {
        const deletedRowsCount = await AlumnoModel.destroy({
            where: { id },
        });
        return deletedRowsCount > 0;
    }
}

export { AlumnosSequelizeDao };
export default new AlumnosSequelizeDao();