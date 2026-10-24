import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../connection/index.js';

class InscripcionModel extends Model {}

InscripcionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        alumnoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cursoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Inscripcion',
        tableName: 'inscripciones',
        timestamps: false,
    }
);

export default InscripcionModel;