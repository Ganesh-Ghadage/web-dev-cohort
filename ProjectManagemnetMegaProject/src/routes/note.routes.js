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
  .route("/create-note")
  .post(authenticateUser, createNoteValidator(), validate, createNote);

router.route("/get-all-notes").get(authenticateUser, getNotes);

router
  .route("/get-note/:id")
  .get(authenticateUser, noteIdParamsValidator(), validate, getNoteById);

router
  .route('/update-note/:id')
  .patch(authenticateUser, updateNoteValidator(), validate, updateNote)

router
  .route('/delete-note/:id')
  .delete(authenticateUser, noteIdParamsValidator(), validate, deleteNote)

export default router;
