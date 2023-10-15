import {Router} from 'express'
import authenticateToken from '../middlewares/token.js';
import {getProjectsController, createProjectController, updateProjectController, deleteProjectController} from '../controllers/projects.controller.js'

const router =Router()

//Get projects
router.get('/getprojects', getProjectsController)

//Create a new project
router.post('/createproject', createProjectController)

//Edit project
router.put('/updateproject', updateProjectController)

//Delete project
router.delete('/deleteproject', deleteProjectController)


export default router