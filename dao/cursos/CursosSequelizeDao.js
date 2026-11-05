import { sequelize, CursoModel } from "../models/index.js";

const CURSOS_ATTRIBUTES = ["id", "nombre", "descripcion", "cupo_maximo", "cupo_disponible", "profesorId"];

class CursosSequelizeDao {
    async init() {
        await sequelize.sync({ alter: true });

        const count = await CursoModel.count();
        if (count === 0) {
            await CursoModel.bulkCreate([
                { nombre: "Node.js Avanzado", descripcion: "API REST", cupo_maximo: 30, cupo_disponible: 30, profesorId: 1 },
                { nombre: "React Intermedio", descripcion: "Hooks y Context", cupo_maximo: 25, cupo_disponible: 25, profesorId: 2 }
            ]);
        }
    }

    async getAll(filters = {}) {
        return await CursoModel.findAll({
            attributes: CURSOS_ATTRIBUTES,
        });
    }

    async getById(id) {
        const curso = await CursoModel.findByPk(id, {
            attributes: CURSOS_ATTRIBUTES,
        });
        return curso ? curso.get({ plain: true }) : null;
    }

    async save(data) {
        const { id: _ignored, ...cursoData } = data;
        const cupoDisponible = cursoData.cupo_disponible !== undefined ? cursoData.cupo_disponible : cursoData.cupo_maximo;
        const newCurso = await CursoModel.create({ ...cursoData, cupo_disponible: cupoDisponible });
        return newCurso.get({ plain: true });
    }

    async update(id, data) {
        const curso = await CursoModel.findByPk(id);
        if (!curso) {
            return null;
        }

        const { id: _ignored, ...updateData } = data;
        await curso.update(updateData);
        return curso.get({ plain: true });
    }

    async delete(id) {
        const curso = await CursoModel.findByPk(id);
        if (!curso) return null;
        
        const plainCurso = curso.get({ plain: true });
        await curso.destroy();
        return plainCurso;
    }
}

export { CursosSequelizeDao };
export default new CursosSequelizeDao();