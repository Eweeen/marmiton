"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientRecipe = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Ingredient_1 = require("./Ingredient");
const Recipe_1 = require("./Recipe");
class IngredientRecipe extends sequelize_1.Model {
}
exports.IngredientRecipe = IngredientRecipe;
IngredientRecipe.init({
    ingredient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Ingredient_1.Ingredient,
            key: 'id',
        }
    },
    recipe_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Recipe_1.Recipe,
            key: 'id',
        }
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'ingredients_recipes',
    timestamps: false,
});
IngredientRecipe.belongsTo(Ingredient_1.Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
IngredientRecipe.belongsTo(Recipe_1.Recipe, { foreignKey: 'recipe_id', as: 'recipe' });
