import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

export class IngredientRecipe extends Model
{
    public ingredient_id!: number;
    public recipe_id!: number;
    public quantity!: number;
}

IngredientRecipe.init({
    ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Ingredient,
            key: 'id',
        }
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Recipe,
            key: 'id',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    tableName: 'ingredients_recipes',
    timestamps: false,
});