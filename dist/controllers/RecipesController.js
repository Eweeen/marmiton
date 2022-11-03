"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const Course_1 = require("../models/Course");
const Ingredient_1 = require("../models/Ingredient");
const IngredientRecipe_1 = require("../models/IngredientRecipe");
const Recipe_1 = require("../models/Recipe");
const Season_1 = require("../models/Season");
const User_1 = require("../models/User");
const CrudController_1 = require("./CrudController");
class RecipeController extends CrudController_1.CrudController {
    create(req, res) {
        const regex = /^[\w\s]+$/;
        const result = regex.test(req.body.name);
        if (result) {
            Recipe_1.Recipe.create(req.body)
                .then(recipe => res.json(recipe))
                .catch(error => {
                console.log(error);
                res.json({ message: "Insertion impossible" });
            });
        }
        res.send("Name accept only alphanumeric catacters.");
    }
    ;
    async read(req, res) {
        const recipes = await Recipe_1.Recipe.findAll();
        res.json(recipes);
    }
    async getAllByUser(req, res) {
        const recipes = await Recipe_1.Recipe.findAll({
            where: { user_id: req.params.id },
            include: [Course_1.Course, Season_1.Season, User_1.User]
        });
        res.json(recipes);
    }
    async show(req, res) {
        const recipe = await Recipe_1.Recipe.findOne({
            where: { id: req.params.id },
            include: [Course_1.Course, Season_1.Season, User_1.User]
        });
        if (req.query.withIngredients === "true") {
            let ingredients = [];
            const ingredientRecipe = await IngredientRecipe_1.IngredientRecipe.findAll({
                where: { recipe_id: recipe?.id },
                include: { model: Ingredient_1.Ingredient, as: 'ingredient' },
            });
            for (const ingredient of ingredientRecipe) {
                ingredients.push(ingredient.ingredient);
            }
            return res.json({ recipe, ingredients });
        }
        res.json(recipe);
    }
    update(req, res) {
        Recipe_1.Recipe.findOne({ where: { id: req.params.id } })
            .then(recipe => {
            if (recipe) {
                recipe.set(req.body);
                recipe.save();
                res.json(recipe);
            }
            else {
                res.json({ message: `No recipe with id ${req.params.id}` });
            }
        })
            .catch(error => {
            console.log(error);
            res.json({ message: "Update failed" });
        });
    }
    ;
    delete(req, res) {
        throw new Error("Method delete not implemented.");
    }
    ;
}
exports.RecipeController = RecipeController;
