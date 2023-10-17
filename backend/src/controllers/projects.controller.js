import {
  getProjectsService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
} from '../services/projects.service.js';

export const getProjectsController = async (req, res) => {
  try {
    const response = await getProjectsService();
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};

export const createProjectController = async (req, res) => {
  try {
    const response = await createProjectService(req.body);
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const response = await updateProjectService(req.body);
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const response = await deleteProjectService(req.body);
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};
