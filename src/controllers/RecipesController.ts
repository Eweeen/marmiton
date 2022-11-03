import { Request, Response } from "express";
import { Course } from "../models/Course";
import { Ingredient } from "../models/Ingredient";
import { IngredientRecipe } from "../models/IngredientRecipe";
import { Recipe } from "../models/Recipe";
import { Season } from "../models/Season";
import { User } from "../models/User";
import { CrudController } from "./CrudController";

export class RecipeController extends CrudController
{
  public create(req: Request, res: Response): void {
    const regex: RegExp = /^[\w\s]+$/;
    const result = regex.test(req.body.name);
    if (result) {
      Recipe.create(req.body)
      .then(recipe => res.json(recipe))
      .catch(error => {
        console.log(error);
        res.json({ message: "Insertion impossible" });
      });
    }
    res.send("Name accept only alphanumeric catacters.");
  };

  public async read(req: Request, res: Response): Promise<void> {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  }

  public async getAllByUser(req: Request, res: Response): Promise<void> {
    const recipes = await Recipe.findAll({
      where: { user_id: req.params.id },
      include: [Course, Season, User]
    });
    res.json(recipes);
  }

  public async show(req: Request, res: Response) {
    const recipe = await Recipe.findOne({
      where: { id: req.params.id },
      include: [Course, Season, User]
    });
    if (req.query.withIngredients === "true") {
      let ingredients = [] as Ingredient[];
      const ingredientRecipe = await IngredientRecipe.findAll({
        where: { recipe_id: recipe?.id },
        include: { model: Ingredient, as: 'ingredient' },
      });
      for (const ingredient of ingredientRecipe) {
        ingredients.push(ingredient.ingredient);
      }
      return res.json({ recipe, ingredients });
    }
    res.json(recipe);
  }

  public update(req: Request, res: Response): void {
    Recipe.findOne({ where: { id: req.params.id } })
    .then(recipe => {
      if (recipe) {
        recipe.set(req.body);
        recipe.save();
        res.json(recipe);
      } else {
        res.json({ message: `No recipe with id ${req.params.id}` });
      }
    })
    .catch(error => {
      console.log(error);
      res.json({ message: "Update failed" });
    });
  };

  delete(req: Request, res: Response): void {
    throw new Error("Method delete not implemented.");
  };
}
