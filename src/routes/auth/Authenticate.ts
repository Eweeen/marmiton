import express from "express";
import { AuthenticationController } from "../../controllers/AuthenticationController";

const authController = new AuthenticationController();

export const router = express.Router({
    strict: true
});

router.route('/signin').post(authController.signin);
router.route('/login').post(authController.login);
