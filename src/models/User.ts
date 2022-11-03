import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Permission } from "./Permission";

export class User extends Model
{
    declare id: number;
    declare lastname: string;
    declare firstname: string;
    declare mail: string;
    declare password: string;
    declare permission_id: number;
    declare permission: Permission;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permission_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        references: {
            model: Permission,
            key: 'id'
        }
    }
},
{
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
User.belongsTo(Permission, { foreignKey: 'permission_id', as: 'permission' });