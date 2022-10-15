"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const Recipe_1 = require("../models/Recipe");
const CrudController_1 = require("./CrudController");
class RecipeController extends CrudController_1.CrudController {
    create(req, res) {
        throw new Error("Method create not implemented.");
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
        throw new Error("Method update not implemented.");
    }
    ;
    delete(req, res) {
        throw new Error("Method delete not implemented.");
    }
    ;
}
exports.RecipeController = RecipeController;
