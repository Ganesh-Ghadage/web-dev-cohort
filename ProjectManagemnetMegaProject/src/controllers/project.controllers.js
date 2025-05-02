import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js";
import { ApiError } from "../utils/api-error.js";
import { Project } from "../models/project.models.js";

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.findOne({
    name,
  });

  if (project) {
    throw new ApiError(400, `Project with ${name} already exits`);
  }

  const createdProject = await Project.create({
    name,
    description,
    createdBy: req.user._id,
  });

  if (!createdProject) {
    throw new ApiError(400, "Project creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponce(200, createdProject, "Project created successfully"));
});

const getProjects = async (req, res) => {
  const projects = await Project.find();

  if (!projects) {
    throw new ApiError(404, "Projects not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, projects, "All projects fetched successfully"));
};

const getProjectById = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, project, "Project fetched successfully"));
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const project = await Project.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
      description,
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .json(new ApiResponce(200, updatedProject, "Project updated sccessfully"));
};

const deleteProject = async (req, res) => {
  // delete project
};

const getProjectMembers = async (req, res) => {
  // get project members
};

const addMemberToProject = async (req, res) => {
  // add member to project
};

const deleteMember = async (req, res) => {
  // delete member from project
};

const updateMemberRole = async (req, res) => {
  // update member role
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
