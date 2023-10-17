import {
  getSheetsService,
  createSheetsService,
  updateSheetService,
} from '../services/sheets.service.js';

export const getSheetsController = async (req, res) => {
  try {
    const response = await getSheetsService();
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};

export const createSheetsController = async (req, res) => {
  try {
    const response = await createSheetsService(req.body);
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};

export const updateSheetController = async (req, res) => {
  try {
    const response = await updateSheetService(req.body);
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};
