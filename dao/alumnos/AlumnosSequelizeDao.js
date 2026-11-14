import { Op } from "sequelize";
import { sequelize, AlumnoModel } from "../models/index.js";

const ALUMNOS_ATTRIBUTES = ["id", "nombre", "apellido", "email", "legajo"];

class AlumnosSequelizeDao {

    async init() {
        await sequelize.sync();

        const count = await AlumnoModel.count();
        if (count === 0) {
            await AlumnoModel.bulkCreate([
                { nombre: "Manuel", apellido: "Grinspon", email: "manugrinspon@gmail.com", legajo: "12345" },
                { nombre: "Lucas", apellido: "Miguez", email: "lucas.miguez@gmail.com", legajo: "67890" }
            ]);
        }
    }
    async getAll({ nombre, email, legajo, sort, page = 1, limit } = {}) {
        const where = {};
        if (nombre) where.nombre = { [Op.like]: `%${nombre}%` };
        if (email) where.email = email;
        if (legajo) where.legajo = legajo;

        const options = { where, attributes: ALUMNOS_ATTRIBUTES, order: [[sort || "id", "ASC"]] };
        if (limit) {
            options.limit = limit;
            options.offset = (page - 1) * limit;
        }
        const rows = await AlumnoModel.findAll(options);
        return rows.map(r => r.get({ plain: true }));
    }

    async getByNombreYApellido(nombre, apellido) {
        const alumno = await AlumnoModel.findOne({
            where: { nombre, apellido },
            attributes: ALUMNOS_ATTRIBUTES,
        });
        return alumno ? alumno.get({ plain: true }) : null;
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

    async getByEmail(email) {
        const alumno = await AlumnoModel.findOne({
            where: { email },
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
        const alumno = await AlumnoModel.findByPk(id);
        if (!alumno) return null;
        const plainAlumno = alumno.get({ plain: true });
        await alumno.destroy();
        return plainAlumno;
    }
}

export { AlumnosSequelizeDao };
export default new AlumnosSequelizeDao();