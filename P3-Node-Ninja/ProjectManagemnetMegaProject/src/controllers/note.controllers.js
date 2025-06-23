import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js";
import { ApiError } from "../utils/api-error.js";
import { ProjectNote } from "../models/note.models.js";

const createNote = asyncHandler(async (req, res) => {
  const { projectId, content } = req.body;

  const createdNote = await ProjectNote.create({
    project: projectId,
    createdBy: req.user._id,
    content,
  });

  const note = await ProjectNote.findById(createdNote._id);

  if (!note) {
    throw new ApiError(502, "Note creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponce(201, note, "Note created successfully"));
});

const getNotes = asyncHandler(async (req, res) => {
  const notes = await ProjectNote.find();

  if (!notes) {
    throw new ApiError(404, "Notes not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, notes, "All notes fetched successfully"));
});

const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await ProjectNote.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, note, "Note fetched successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const note = await ProjectNote.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  note.content = content;
  await note.save({validateBeforeSave: false})

  return res
    .status(200)
    .json(new ApiResponce(200, note, "Note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await ProjectNote.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  await ProjectNote.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponce(200, note, "Note deleted successfully"));
});

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
