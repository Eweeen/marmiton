require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { PORT } from './config/constants';
import { router as recipeRouter } from './routes/recipes/Recipe';
import { router as userRouter } from './routes/users/User';
import { router as authenticateRouter } from './routes/auth/Authenticate';

const app = express();
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world !"));

// Auth routes
app.post("/signin", authenticateRouter);
app.post("/login", authenticateRouter);

// Recipes routes
app.get("/recipes", recipeRouter);
app.post("/recipe/add", recipeRouter);
app.get("/recipe/show/:id", recipeRouter);
app.patch("/recipe/update/:id", recipeRouter);

// Users routes
// TODO CRUD
app.get("/users", userRouter);
app.get("/user/:id", userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});