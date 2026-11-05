import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../connection/index.js';

class AlumnosModel extends Model {}

AlumnosModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        legajo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        modelName: 'Alumnos',
        tableName: 'alumnos',
        timestamps: false,
    }
);

export default AlumnosModel;