import MongoDb from '../persistence/managers/sheetsManager.js'
import {sheetModel} from '../persistence/models/sheet.model.js'

let persistence = new MongoDb("Sheets", sheetModel)

export async function getSheets (){
    return await persistence.getSheets()
}

export async function createSheets (excelAndProject){
    return await persistence.createSheets(excelAndProject)
}

export async function updateSheet (updatedSheet){
    return await persistence.updateSheet(updatedSheet)
}