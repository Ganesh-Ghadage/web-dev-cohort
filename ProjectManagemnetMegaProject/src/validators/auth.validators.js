import { body, oneOf, param } from "express-validator";
import { User } from "../models/user.models.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Not a valid Email"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username should be more than 3 char")
      .isLength({ max: 13 })
      .withMessage("Username cannot exceed more than 13 char")
      .custom(async (username) => {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("Username is taken");
        }
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Username should be more than 8 char")
      .isLength({ max: 20 })
      .withMessage("Username cannot exceed more than 20 char")
      .isStrongPassword({ minUppercase: 1, minNumbers: 2, minSymbols: 1 })
      .withMessage(
        "Password should contain at least 1 Uppcase letter, 1 Symbol and at least 2 number",
      ),
    // body("role")
    //   .trim()
    //   .default('member'),
    body("fullname")
      .trim()
      .notEmpty()
      .withMessage("User full name is required"),
  ];
};

const userVerificationValidator = () => {
  return [param("token").trim().notEmpty().withMessage("Token is required")];
};

const userLoginValidator = () => {
  return [
    oneOf(
      [
        body("email").trim().isEmail().withMessage("Not a valid Email"),
        body("username").trim(),
      ],
      {
        message: "Either email or username is required",
      },
    ),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password should be more than 8 char")
      .isLength({ max: 20 })
      .withMessage("Password cannot exceed more than 20 char")
      .isStrongPassword({ minUppercase: 1, minNumbers: 2, minSymbols: 1 })
      .withMessage(
        "Password should contain at least 1 Uppcase letter, 1 Symbol and at least 2 number",
      ),
  ];
};

const changeCurrentPasswordValidator = () => {
  return [
    oneOf(
      [
        body("email").trim().isEmail().withMessage("Not a valid Email"),
        body("username").trim(),
      ],
      {
        message: "Either email or username is required",
      },
    ),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("new password is required")
      .isLength({ min: 8 })
      .withMessage("Password should be more than 8 char")
      .isLength({ max: 20 })
      .withMessage("Password cannot exceed more than 20 char")
      .isStrongPassword({ minUppercase: 1, minNumbers: 2, minSymbols: 1 })
      .withMessage(
        "Password should contain at least 1 Uppcase letter, 1 Symbol and at least 2 number",
      ),
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("old password is required")
      .isLength({ min: 8 })
      .withMessage("Password should be more than 8 char")
      .isLength({ max: 20 })
      .withMessage("Password cannot exceed more than 20 char")
      .isStrongPassword({ minUppercase: 1, minNumbers: 2, minSymbols: 1 })
      .withMessage(
        "Password should contain at least 1 Uppcase letter, 1 Symbol and at least 2 number",
      ),
  ];
};

const forgotPasswordRequestValidator = () => {
  return [
    oneOf(
      [
        body("email").trim().isEmail().withMessage("Not a valid Email"),
        body("username").trim(),
      ],
      {
        message: "Either email or username is required",
      },
    ),
  ];
};

const resetForgottenPasswordValidator = () => {
  return [
    param("token").trim().notEmpty().withMessage("Token is required"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("new password is required")
      .isLength({ min: 8 })
      .withMessage("Password should be more than 8 char")
      .isLength({ max: 20 })
      .withMessage("Password cannot exceed more than 20 char")
      .isStrongPassword({ minUppercase: 1, minNumbers: 2, minSymbols: 1 })
      .withMessage(
        "Password should contain at least 1 Uppcase letter, 1 Symbol and at least 2 number",
      ),
  ];
};

export {
  userRegisterValidator,
  userVerificationValidator,
  userLoginValidator,
  changeCurrentPasswordValidator,
  forgotPasswordRequestValidator,
  resetForgottenPasswordValidator,
};
