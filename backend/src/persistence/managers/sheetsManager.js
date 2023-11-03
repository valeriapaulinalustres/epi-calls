import { sheetModel } from '../models/sheet.model.js';
import { projectModel } from '../models/project.model.js';

function removeDuplicated(arr) {
  let noDuplicated = [];
  for (let i = 0; i < arr.length; i++) {
    const el1 = arr[i];
    let filtered = noDuplicated.filter((el) => el.DNI == el1.DNI);
    if (filtered.length === 0) {
      noDuplicated.push(el1);
    }
  }
  return noDuplicated;
}

const numeroDeSemana = (fecha) => {
  const DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24,
    DIAS_QUE_TIENE_UNA_SEMANA = 7,
    JUEVES = 4;
  fecha = new Date(
    Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
  );
  let diaDeLaSemana = fecha.getUTCDay(); // Domingo es 0, sábado es 6
  //Esto comentado serviría para que el lunes sea el día 0 de la semana y cambie en lunes el número de semana
  // if (diaDeLaSemana === 0) {
  //     diaDeLaSemana = 7;
  // }
  fecha.setUTCDate(fecha.getUTCDate() - diaDeLaSemana + JUEVES);
  const inicioDelAño = new Date(Date.UTC(fecha.getUTCFullYear(), 0, 1));
  const diferenciaDeFechasEnMilisegundos = fecha - inicioDelAño;
  return Math.ceil(
    (diferenciaDeFechasEnMilisegundos / DIA_EN_MILISEGUNDOS + 1) /
      DIAS_QUE_TIENE_UNA_SEMANA
  );
};

const numeroDeSemanaActual = numeroDeSemana(new Date());
console.log('El número de semana es: %d', numeroDeSemanaActual);

//ESto es para probar
const inicio = new Date(2023, 8, 10); //Los meses van desde enero 0 a diciembre 11
const numeroDeSemanaSegunFecha = numeroDeSemana(inicio);
console.log(numeroDeSemanaSegunFecha);

const collaborators = ['vale', 'pau', 'santi', 'lau'];
const db = [
  { dni: 1, nombre: 'a' },
  { dni: 2, nombre: 'b' },
  { dni: 3, nombre: 'c' },
];

function divideArray(array, num, collaborators) {
  const newArraysLength = Math.ceil(array.length / num);
  console.log(newArraysLength);
  const newSheets = [];
  for (let i = 0; i < num; i++) {
    const copy = [...array];
    newSheets.push({
      createdAt: new Date(),
      collaborator: collaborators[i].user,
      sheet: copy.splice(i * newArraysLength, newArraysLength),
    });
  }
  return newSheets;
}

//console.log(divideArray(db, collaborators.length))

export default class sheetsManager {
  async getSheets() {
    try {
      //Filter by user role, to get all sheets if your role is admin or only your sheet if you are a collaborator
    } catch (error) {
      console.log('error del manager', error);
    }
  }

  async createSheets(excelAndProject) {
    //el front va a enviar {excel: [], projectId: "837483024", userId: "dshfkasfdsa"}
    try {
      //Get project
      const projectFromDb = await projectModel.find({
        _id: excelAndProject.projectId,
      });
      console.log('projectFromDb', projectFromDb);
      //Get sheets in database
      const db = await sheetModel.find();

      console.log('db', db);

      // if (db.length === 0) {
      //   const newSheetsFromDb = await sheetModel.create(finalNewSheets);

      //     return {message: 'Sheets created successfully', success: true, newSheets: newSheetsFromDb}
      // }

      //Get excels from each sheet stored in db
      let dbWithoutCollaborators;
      if (db.length > 0) {
        dbWithoutCollaborators = db.excel.map((el) => {
          return el.sheet;
        });
      } else {
        dbWithoutCollaborators = [];
      }

      console.log('dbwiwhout', dbWithoutCollaborators);
      // const dbJoined = db.flat();

      //Filter duplicated DNI in excel
      const dbWithoutDuplicates = removeDuplicated(excelAndProject.excel);

      console.log('excelAndProject.excel', excelAndProject.excel);
console.log('db sin duplicados', dbWithoutDuplicates)

console.log('se in project',  projectFromDb[0].patientsFilter.searchFromInWeeks)

      //Filter by SE in excel
      const dbFilteredBySE = [];
      for (let i = 0; i < dbWithoutDuplicates.length; i++) {
        if (dbWithoutDuplicates[i].SE_APERTURA == '*sin dato*') {
          dbFilteredBySE.push(dbWithoutDuplicates[i]);
        }
     else if (
          dbWithoutDuplicates[i].SE_APERTURA >=
          (numeroDeSemanaActual -
            projectFromDb[0].patientsFilter.searchFromInWeeks)
        ) {
          dbFilteredBySE.push(dbWithoutDuplicates[i]);
        }
      }

      console.log('se', numeroDeSemanaActual)

      console.log('filtrado por se', dbFilteredBySE)

      //Filter by diagnosis in excel
      const dbFilteredByDiagnosis = [];
      for (let i = 0; i < dbFilteredBySE.length; i++) {
        if (projectFromDb[0].disease === 'Dengue') {
          console.log('entra0')
          if (
            projectFromDb[0].patientsFilter.diagnosis[0].includes('Caso confirmado')
          ) {
            console.log('entra acá if')
            if (
              dbFilteredBySE[i].CLASIFICACION_MANUAL ===
                'Caso confirmado sin serotipo' ||
              dbFilteredBySE[i].CLASIFICACION_MANUAL ===
                'Caso confirmado DEN-2' ||
              dbFilteredBySE[i].CLASIFICACION_MANUAL ===
                'Caso confirmado por nexo epidemiológico autóctono' ||
              dbFilteredBySE[i].CLASIFICACION_MANUAL ===
                'Caso confirmado DEN-1' ||
              dbFilteredBySE[i].CLASIFICACION_MANUAL ===
                'Caso de Dengue en brote con laboratorio (+)'
            ) {
              console.log('entra2')
              dbFilteredByDiagnosis.push(dbFilteredBySE[i]);
            }
          }
          else if (
            projectFromDb[0].patientsFilter.diagnosis[0].includes('Caso sospechoso')
          ) {
            console.log('entra3')
            if (
              // dbFilteredBySE[i].CLASIFICACION_MANUAL ===
              //   'Caso confirmado sin serotipo' ||
              // dbFilteredBySE[i].CLASIFICACION_MANUAL ===
              //   'Caso confirmado DEN-2' ||
              // dbFilteredBySE[i].CLASIFICACION_MANUAL ===
              //   'Caso confirmado por nexo epidemiológico autóctono' ||
              // dbFilteredBySE[i].CLASIFICACION_MANUAL ===
              //   'Caso confirmado DEN-1' ||
              // dbFilteredBySE[i].CLASIFICACION_MANUAL ===
              //   'Caso de Dengue en brote con laboratorio (+)' ||
              dbFilteredBySE[i].CLASIFICACION_MANUAL === 'Caso sospechoso' ||
              dbFilteredBySE[i].CLASIFICACION_MANUAL ===
                'Caso sospechoso no conclusivo' ||
              dbFilteredBySE[i].CLASIFICACION_MANUAL === 'Caso probable'
            ) {
              console.log('entra4')
              dbFilteredByDiagnosis.push(dbFilteredBySE[i]);
            }
          }
        }
        console.log('no entra', projectFromDb[0])
      }

      console.log('filtro por clasificación', dbFilteredByDiagnosis)


      //Here we jouin new excel with excel in Mongo Atlas. Filter by DNI with mongoDB 
      const dbFilteredWithMongo = [];
      for (let i = 0; i < dbFilteredByDiagnosis.length; i++) {
        const exists = dbWithoutCollaborators.findIndex(
          (el) => el.DNI === dbFilteredByDiagnosis[i].DNI
        );
        if (exists === -1) {
          dbFilteredWithMongo.push(dbFilteredByDiagnosis[i]);
        }
      }

console.log('dbFilteredWithMongo', dbFilteredWithMongo)

      //Join both, excel and mongoDB database
      const result = [...dbFilteredWithMongo, ...dbWithoutCollaborators];

      console.log('result', result)
      //Split sheets into different collaborators (update property collaborator with id and createdAt). If collaboratorsTodayActive is true, must change collaborators

      let newSheets;

      if (projectFromDb[0].collaboratorsTodayActive) {
        newSheets = divideArray(
          result,
          projectFromDb[0].collaboratorsToday.length.
          projectFromDb[0].collaborators
        );
      } else {
        newSheets = divideArray(result, projectFromDb[0].collaborators.length, projectFromDb[0].collaborators);
      }

      console.log('newsheets', newSheets);
/*
      let allSheets = [];

      for (let i = 0; i < newSheets.length; i++) {
        const aux = {
          sheet: newSheets[i],
          collaborator: projectFromDb.collaborators[i],
        };
        allSheets.push(aux);
      }
      const finalNewSheets = {
        excel: [...allSheets],
        updatedAt: new Date(),
        updatedBy: excelAndProject.userId,
      };

      console.log('finalnewsheet', finalNewSheets);
*/
         await sheetModel.findByIdAndDelete(db._id);
        const newSheetsFromDb = await sheetModel.create(newSheets);

      return {
        message: 'Sheets created successfully',
        success: true,
        newSheets: newSheetsFromDb,
      };
  

    } catch (error) {
      console.log('error del manager', error);
    }
  }


  async updateSheet(updatedSheet) {
    try {
      //After collaborator phones a patient
    } catch (error) {
      console.log('error del manager', error);
    }
  }
}
