import express from "express";
import { UserController } from "../../controllers/UsersController";

const recipeController = new UserController();

export const router = express.Router({
    strict: true
});

router.route('/users').get(recipeController.read);
router.route('/user/:id').get(recipeController.show);
