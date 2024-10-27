import { body } from "express-validator";

export const SignUpValidationConstraints = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("username must be between 2 and 50 characters"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage("password must be between 4 and 40 characters"),
];

export const SignInValidationConstraints = [
  body("email").isEmail().withMessage("email must be valid"),
  body("password").trim().notEmpty().withMessage("password required"),
];
