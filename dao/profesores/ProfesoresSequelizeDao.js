import { sequelize, ProfesorModel } from "../models/index.js";

const PROFESORES_ATTRIBUTES = ["id", "nombre", "email", "especialidad"];

class ProfesoresSequelizeDao {
    async init() {
        await sequelize.sync();

        const count = await ProfesorModel.count();
        if (count === 0) {
            await ProfesorModel.bulkCreate([
                { nombre: "Juan Pérez", email: "juan.perez@gmail.com", especialidad: "Backend" },
                { nombre: "Ana Gómez", email: "ana.gomez@gmail.com", especialidad: "Frontend" }
            ]);
        }
    }

    async getAll(filters = {}) {
        return await ProfesorModel.findAll({
            attributes: PROFESORES_ATTRIBUTES,
            where: filters
        });
    }

    async getById(id) {
        const profesor = await ProfesorModel.findByPk(id, {
            attributes: PROFESORES_ATTRIBUTES,
        });
        return profesor ? profesor.get({ plain: true }) : null;
    }

    async getByEmail(email) {
        const profesor = await ProfesorModel.findOne({
            where: { email },
            attributes: PROFESORES_ATTRIBUTES,
        });
        return profesor ? profesor.get({ plain: true }) : null;
    }

    async save(data) {
        const { id: _ignored, ...profesorData } = data;
        const newProfesor = await ProfesorModel.create(profesorData);
        return newProfesor.get({ plain: true });
    }

    async update(id, data) {
        const profesor = await ProfesorModel.findByPk(id);
        if (!profesor) {
            return null;
        }

        const { id: _ignored, ...updateData } = data;
        await profesor.update(updateData);
        return profesor.get({ plain: true });
    }

    async delete(id) {
        const profesor = await ProfesorModel.findByPk(id);
        if (!profesor) return null;
        const plainProfesor = profesor.get({ plain: true });
        await profesor.destroy();
        return plainProfesor;
    }
}

export { ProfesoresSequelizeDao };
export default new ProfesoresSequelizeDao();