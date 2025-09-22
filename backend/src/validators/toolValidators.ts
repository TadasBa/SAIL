import { body } from "express-validator";

const allowedCategories = ["chatbot", "image", "video", "programing", "other"];
const allowedPricing = ["free", "paid"];

export const createToolValidator = [
  body("name").isString().notEmpty(),
  body("category").isIn(allowedCategories),
  body("website").isURL(),
  body("description").isString().notEmpty(),
  body("pricing").isIn(allowedPricing),
  body("company").isString().notEmpty(),
  body("released").isISO8601(), // expects valid date string
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
