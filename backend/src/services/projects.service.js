import {getProjects, createProject, updateProject, deleteProject} from '../persistence/projects.persistence.js'

export async function getProjectsService (){
    const response  = await getProjects()
    return response
}

export async function createProjectService (newProject){
    const response  = await createProject(newProject)
    return response
}

export async function updateProjectService (newProject){
    const response  = await updateProject(newProject)
    return response
}

export async function deleteProjectService (id){
    const response  = await deleteProject(id)
    return response
}
