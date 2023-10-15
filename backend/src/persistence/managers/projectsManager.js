import { projectModel } from '../models/project.model.js';

export default class ProjectsManager {
  async getProjects() {
    try {
      const response = await projectModel.find();
      console.log(response);
      if (response.length === 0) {
        return { message: 'No projects found in database', success: false };
      }

      return {
        message: 'Projects got successfully',
        projects: response,
        success: true,
      };
    } catch (error) {
      console.log('error del manager', error);
    }
  }

  async createProject(newProject) {
    try {
      const exists = await projectModel.find({ name: newProject.name });
      console.log(newProject, exists);
      if (exists.length > 0) {
        return { message: 'Same project name already exists', success: false };
      }

      //Add creation time
      let today = new Date();

      const project = { ...newProject, createdAt: today.toLocaleString() };

      await projectModel.create(project);
      return { message: 'Project created successfully', success: true };
    } catch (error) {
      console.log('error del manager', error);
    }
  }

  async updateProject(newProject) {
    try {
      const exists = await projectModel.find({ _id: newProject._id });
      if (exists.length === 0) {
        return { message: 'Project not found in database', success: false };
      }

      await projectModel.findOneAndReplace(
        { _id: newProject._id },
        { ...newProject }
      );

      return { message: 'Project updated successfully', success: true };
    } catch (error) {
      console.log('error del manager', error);
    }
  }

  async deleteProject(projectId) {
    console.log(projectId);
    try {
      const removed = await projectModel.findByIdAndDelete(projectId.id);

      if (removed) {
        return {
          message: 'Project deleted successfully',
          project: removed,
          success: true,
        };
      }
    } catch (error) {
      console.log('error del manager', error);
    }
  }
}
