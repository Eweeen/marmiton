"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./config/constants");
const Recipe_1 = require("./routes/recipes/Recipe");
const User_1 = require("./routes/users/User");
const Authenticate_1 = require("./routes/auth/Authenticate");
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("Hello world !"));
// Auth routes
app.post("/signin", Authenticate_1.router);
app.post("/login", Authenticate_1.router);
// Recipes routes
app.get("/recipes", Recipe_1.router);
app.post("/recipe/add", Recipe_1.router);
app.get("/recipe/show/:id", Recipe_1.router);
app.patch("/recipe/update/:id", Recipe_1.router);
// Users routes
// TODO CRUD
app.get("/users", User_1.router);
app.get("/user/:id", User_1.router);
app.listen(constants_1.PORT, () => {
    console.log(`Server is listening on port ${constants_1.PORT}`);
});
