import express from "express";
import { RecipeController } from "../../controllers/RecipesController";
import * as Auth from "../../middleware/authenticate";

const recipeController = new RecipeController();

export const router = express.Router({
    strict: true
});

router.route('/recipes').get(Auth.authorize(["getRecipList"]), recipeController.read);
router.route('/recipe/show/:id').get(recipeController.show);