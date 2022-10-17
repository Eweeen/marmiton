import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';
import { Recipe } from './Recipe';

export class Image extends Model 
{
    public id!: number;
    public url!: string;
    public alternate_text!: string;
    public recipe_id!: number;
}

Image.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alternate_text: {
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
    }
},
{
    sequelize,
    tableName: "images",
    timestamps: false
});