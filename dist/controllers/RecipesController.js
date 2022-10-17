"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const Recipe_1 = require("../models/Recipe");
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
                res.json({ "message": "Insertion impossible" });
            });
        }
        res.send("Name accept only alphanumeric catacters.");
    }
    ;
    async read(req, res) {
        const recipe = await Recipe_1.Recipe.findAll();
        res.json(recipe);
    }
    show(req, res) {
        Recipe_1.Recipe.findOne({ where: { id: req.params.id } })
            .then(recipe => res.json(recipe))
            .catch(error => console.log(error));
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
