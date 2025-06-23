import { Router } from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";
import {
  createNoteValidator,
  noteIdParamsValidator,
  updateNoteValidator,
} from "../validators/note.validators.js";
import validate from "../middlewares/validator.middleware.js";

const router = Router();

router
  .route("/")
  .post(authenticateUser, createNoteValidator(), validate, createNote)
  .get(authenticateUser, getNotes);

router
  .route("/:noteId")
  .get(authenticateUser, noteIdParamsValidator(), validate, getNoteById)
  .patch(authenticateUser, updateNoteValidator(), validate, updateNote)
  .delete(authenticateUser, noteIdParamsValidator(), validate, deleteNote)

export default router;
