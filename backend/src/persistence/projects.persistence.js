import MongoDb from '../persistence/managers/projectsManager.js'
import {projectModel} from '../persistence/models/project.model.js'

let persistence = new MongoDb("Projects", projectModel)

export async function getProjects (){
    return await persistence.getProjects()
}

export async function createProject (newProject){
    return await persistence.createProject(newProject)
}

export async function updateProject (newProject){
    return await persistence.updateProject(newProject)
}

export async function deleteProject (id){
    return await persistence.deleteProject(id)
}
