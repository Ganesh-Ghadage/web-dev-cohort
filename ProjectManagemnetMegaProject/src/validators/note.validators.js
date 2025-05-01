import { body } from "express-validator";

const createNoteValidator = () => {
  return [
    body("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project Id is required")
      .isMongoId()
      .withMessage("Invalid mongo Id"),
    body("content").trim().notEmpty().withMessage("Note content is required"),
  ];
};

export { createNoteValidator };
