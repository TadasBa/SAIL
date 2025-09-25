// Class for validating the AI tool atributes when it is being created or updated, the validator is triggered on http request 
import { body } from "express-validator";
import { allowedCategories } from "../types/Categories";

const allowedPricing = ["free", "paid"];

export const createToolValidator = [
  body("name").isString().notEmpty(),
  body("category").isIn(allowedCategories),
  body("website").isURL(),
  body("description").isString().notEmpty(),
  body("pricing").isIn(allowedPricing),
  body("company").isString().notEmpty(),
  body("released").isISO8601(),
];

export const updateToolValidator = [
  body("name").optional().isString().notEmpty(),
  body("category").optional().isIn(allowedCategories),
  body("website").optional().isURL(),
  body("description").optional().isString().notEmpty(),
  body("pricing").optional().isIn(allowedPricing),
  body("company").optional().isString(),
  body("released").optional().isISO8601(),
];
