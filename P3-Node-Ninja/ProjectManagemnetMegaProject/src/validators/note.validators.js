import { body, param } from "express-validator";

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

const noteIdParamsValidator = () => {
  return [
    param("id")
      .trim()
      .notEmpty("Note id is required")
      .isMongoId()
      .withMessage("Invalid mongo Id"),
  ];
};

const updateNoteValidator = () => {
  return [
    noteIdParamsValidator(),
    body("content")
      .trim()
      .notEmpty().withMessage("Note content is required"),
  ]
}

export { 
  createNoteValidator,
  noteIdParamsValidator,
  updateNoteValidator
};
