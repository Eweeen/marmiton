require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { PORT } from './config/constants';
import { router as recipeRouter } from './routes/recipes/Recipe';
import { router as userRouter } from './routes/users/User';
import { generateToken } from './authentication/jwt';

const app = express();
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors());
app.use(express.json());

console.log("Le token JWT : ", generateToken());

app.get("/", (req, res) => res.send("Hello world !"));

// Recipes routes
app.get("/recipes", recipeRouter);
app.post("/recipe/add", recipeRouter);
app.get("/recipe/show/:id", recipeRouter);
app.patch("/recipe/update/:id", recipeRouter);

// Users routes
app.get("/users", userRouter);
app.get("/user/:id", userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});