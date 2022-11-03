import express from "express";
import { RecipeController } from "../../controllers/RecipesController";
import * as Auth from "../../middleware/authenticate";

const recipeController = new RecipeController();

export const router = express.Router({
    strict: true
});

router.route('/recipes').get(Auth.authorize(["administrateur"]), recipeController.read);
router.route('/recipe/add').post(Auth.authorize(["administrateur", "editeur"]), recipeController.create);
router.route('/recipe/show/:id').get(Auth.authorize(["administrateur", "editeur", "membre"]), recipeController.show);
router.route('/recipe/update/:id').patch(Auth.authorize(["administrateur", "editeur"]), recipeController.update);

router.route('/recipes/user/:id').get(Auth.authorize(["administrateur", "editeur", "membre"]), recipeController.getAllByUser);