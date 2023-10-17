import { Router } from 'express';
import {
  getSheetsController,
  createSheetsController,
  updateSheetController,
} from '../controllers/sheets.controller.js';

const router = Router();

//Get sheets
router.get('/getsheets', getSheetsController);

//Create new sheets (This endpoint is used when an admin uploads an excel file)
router.post('/createsheets', createSheetsController);

//Update sheet (It is used when a collaborator phones a patient)
router.put('/updatesheet', updateSheetController);

export default router;
