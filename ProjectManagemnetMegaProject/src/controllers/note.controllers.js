import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js";
import { ApiError } from "../utils/api-error.js";
import { ProjectNote } from "../models/note.models.js";

const getNotes = asyncHandler(async (req, res) => {
  const notes = await ProjectNote.find();

  if (!notes) {
    throw new ApiError(404, "Notes for found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, notes, "All notes fetched successfully"));
});

const getNoteById = async (req, res) => {
  // get note by id
};

const createNote = async (req, res) => {
  // create note
};

const updateNote = async (req, res) => {
  // update note
};

const deleteNote = async (req, res) => {
  // delete note
};

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
