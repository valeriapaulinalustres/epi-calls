import {
  getSheets,
  createSheets,
  updateSheet,
} from '../persistence/sheets.persistence.js';

export async function getSheetsService() {
  const response = await getSheets();
  return response;
}

export async function createSheetsService(excelAndProject) {
  const response = await createSheets(excelAndProject);
  return response;
}

export async function updateSheetService(updatedSheet) {
  const response = await updateSheet(updatedSheet);
  return response;
}
