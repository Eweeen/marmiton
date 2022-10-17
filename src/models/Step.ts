import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Recipe } from "./Recipe";

export class Step extends Model
{
    public id!: number;
    public content!: string;
    public recipe_id!: number;
}

Step.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Recipe,
            key: 'id',
        }
    },
},
{
    sequelize,
    tableName: 'steps',
    timestamps: false,
});