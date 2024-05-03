"use client";

import { setUser } from "@/redux/features/login/loginSlice";
import { useTokenMutation } from "@/redux/services/loginServices";
import { useGetprojectsQuery } from "@/redux/services/projectServices";
import { useCreatesheetMutation } from "@/redux/services/sheetServices";
import { useGetusersQuery } from "@/redux/services/userServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import {calculateEpiWeek} from '../../../functions.js'

function HomeAdmin() {
  const [csvUploaded, setCsvUploaded] = useState([]); //Keeps the uploaded csv's information
  const [actualProject, setActualProject] = useState("");
  const [actualProjectChecked, setActualProjectChecked] = useState({});
  const [projectUsers, setProjectUsers] = useState([]);

  const dispatch = useDispatch();
  const [triggerToken, result] = useTokenMutation();
  const [triggerCreateSheet, resultSheet] = useCreatesheetMutation();

  const {
    data: dataProjects,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetprojectsQuery();
  const { data: dataUsers } = useGetusersQuery();

  const refreshToken = useSelector(
    (state) => state.loginReducer.value.refreshToken
  );
  const user = useSelector((state) => state.loginReducer.value);

  console.log("refreshToken", refreshToken);
  console.log('dataProjects', dataProjects)

  //Handle of refresh token: at login you get token and refresh token, then navigates here. Then you call triggerToken passing the refresh token
  useEffect(() => {
    triggerToken({ token: refreshToken });
  }, []);

  //After that, you get an accessToken as result. This will be use in the header of future requests.
  useEffect(() => {
    (async () => {
      try {
        if (result.isSuccess) {
          console.log("ver ******", result);

          dispatch(setUser({ ...user, accessToken: result.data.accessToken }));
        } else if (result.isError) {
          console.log(result.isError);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [result]);

  //Function to upload extern CSV
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = xlsx.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      
      setCsvUploaded(d);
      console.log('excel cargado',d);

const processedExcel = processExcelUploaded(d)

console.log('processedExcel', processedExcel)

      triggerCreateSheet({
        excel: processedExcel,
       // excel: d,
        // project: {
        //   patientsFilter: {
        //     searchFromInWeeks: actualProjectChecked.patientsFilter.searchFromInWeeks,
        //     disease: actualProjectChecked.disease,
        //     diagnosis: actualProjectChecked.patientsFilter.diagnosis,
        //     collaboratorsTodayActive: false, //no está hecho aún
        //     collaborators: projectUsers?.map(el=>{return el._id}),
        //   },
        // },
        projectId: actualProjectChecked._id,
         user: user.mail,
         collaborators: (actualProjectChecked.collaboratorsToday.length >0) ? actualProjectChecked.collaboratorsToday : actualProjectChecked.collaborators

      });
      // setSpinner(false);
    });
  };

  //Function to process uploaded excel (delete duplicates by dni, filter by diagnosis and FA week)
  function processExcelUploaded(excel){
console.warn('pasa por acá')
    //Filter duplicates
    const dnis = []
    const excelWithoutDuplicates = []
excel.forEach(el=>{
  if (!dnis.includes(el.DNI)) {
    dnis.push(el.DNI)
    excelWithoutDuplicates.push(el)
  }
})
console.log('excelWithoutDuplicates',excelWithoutDuplicates)

//Filter by diagnosis
const excelFilteredByDiagnosis = []
const diagnosisSelected = [...actualProjectChecked.patientsFilter.diagnosis]
const confirmed = [
  'Caso con coinfección de más de un serotipo de Dengue',
'Caso confirmado DEN-1',
'Caso confirmado DEN-2',
'Caso confirmado DEN-3',
'Caso confirmado por nexo epidemiológico autóctono',
'Caso confirmado por nexo epidemiológico importado',
'Caso confirmado sin serotipo',
'Caso de Dengue en brote con laboratorio (+)'
]
const discarded = [
  'Caso descartado',
  'Caso descartado por diagnóstico diferencial',
  'Caso descartado por epidemiología'
]
const likely = [
  'Caso probable'
]
const suspicius = [
  'Caso sospechoso',
  'Caso sospechoso no conclusivo'
]
if (diagnosisSelected.includes('confirmados')){
  excelWithoutDuplicates.forEach(el=>{
    if (confirmed.includes(el.CLASIFICACION_MANUAL)) {
      excelFilteredByDiagnosis.push(el)
    }
  })
}

if (diagnosisSelected.includes('descartados')) {
  excelWithoutDuplicates.forEach(el=>{
    if (discarded.includes(el.CLASIFICACION_MANUAL)) {
      excelFilteredByDiagnosis.push(el)
    }
  })
}

if (diagnosisSelected.includes('probables')) {
  excelWithoutDuplicates.forEach(el=>{
    if (likely.includes(el.CLASIFICACION_MANUAL)) {
      excelFilteredByDiagnosis.push(el)
    }
  })
}

if (diagnosisSelected.includes('sospechosos')) {
  excelWithoutDuplicates.forEach(el=>{
    if (suspicius.includes(el.CLASIFICACION_MANUAL)) {
      excelFilteredByDiagnosis.push(el)
    }
  })
}



//Filter by quantity of weeks selected
//Calculate Epi Week
const actualEpiWeek = calculateEpiWeek()
const weeksFrom = actualEpiWeek - actualProjectChecked.patientsFilter.searchFromInWeeks
const excelFilteredByWeeks = []

excelFilteredByDiagnosis.forEach(el=>{
  if (el.SE_APERTURA >= weeksFrom) {
    excelFilteredByWeeks.push(el)
  }
})

console.log('excelFilteredByWeeks', excelFilteredByWeeks)



return excelFilteredByWeeks
  }

console.log('user',user)

  useEffect(() => {
    if (actualProjectChecked.hasOwnProperty("collaborators")) {
      console.log("----------------------");
      const usersInProject = [];
      for (let i = 0; i < actualProjectChecked?.collaborators.length; i++) {
        const user = dataUsers?.users.filter(
          (el) => el._id === actualProjectChecked.collaborators[i].user
        );
        usersInProject.push(user);
      }
      console.log("ver", usersInProject);
      setProjectUsers(...usersInProject);
    } else {
      setProjectUsers([]);
    }
  }, [actualProjectChecked]);

  console.log("csv uploaded", csvUploaded);
  console.log("projectUsers", projectUsers);

  console.log("actual", actualProject);

  console.log("dataProjects", dataProjects);

  console.log("actualprojectChecked", actualProjectChecked);

  console.log("users", dataUsers);

  return (
    <div className="w-screen h-screen px-20 py-20">
      
      <div className="w-full flex justify-between align-middle mb-16">
        
     
      <div className="w-1/3 rounded-3xl  shadow-md">
        <div className="w-full h-14 bg-green rounded-t-3xl flex justify-center align-middle">
          <div className=" text-white text-2xl my-auto">Proyectos Vigentes</div>
        </div>
        <div className="w-full flex-col justify-between align-top p-5">
          {dataProjects?.projects?.map((el, index) => {
            return (
              <div
                className="w-full flex justify-between align-middle"
                key={index}
              >
                <h4>{el.name}</h4>
                <input
                  type="radio"
                  name="project"
                  value={el.name}
                  checked={actualProject === el.name}
                  onChange={(e) => {
                    setActualProject(e.target.value);
                    setActualProjectChecked(el);
                  }}
                />
              </div>
            );
          })}
        </div>
        </div>
        {
actualProjectChecked.hasOwnProperty('collaborators') &&
        <div className="w-1/3 rounded-3xl  shadow-md">
          <div className="w-full h-14 bg-orange rounded-t-3xl flex justify-center align-middle">
            <div className=" text-white text-2xl my-auto">
              Estadística General
            </div>
          </div>
          <div className="w-full flex-col justify-between align-top p-5">
            <div className="w-full flex h-9 m-3">
              <div className="w-1/2 justify-self-end">Confirmados Total: </div>
              <div className="w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500  flex justify-center align-middle ">
                10
              </div>
            </div>
            <div className="w-full flex h-9 m-3">
              <div className="w-1/2 justify-self-end">Confirmados Total: </div>
              <div className="w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500 flex justify-center align-middle ">
                10
              </div>
            </div>
            <div className="w-full flex h-9 m-3">
              <div className="w-1/2 justify-self-end">Confirmados Total: </div>
              <div className="w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500 justify-center align-middle">
                10
              </div>
            </div>
            <div className="w-full flex h-9 m-3">
              <div className="w-1/2 justify-self-end">Confirmados Total: </div>
              <div className="w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500 justify-center align-middle">
                10
              </div>
            </div>
          </div>
        </div>
}
        
      </div>

{
actualProjectChecked.hasOwnProperty('collaborators') &&
<div className="w-1/3 rounded-3xl  shadow-md">
          <div className="w-full h-14 bg-cyan rounded-t-3xl flex justify-center align-middle">
            <div className=" text-white text-2xl my-auto">
              Proyecto Actual: {actualProject}
            </div>
          </div>
          <div className="w-full flex justify-between align-top p-5">
            <div>
              {/* Input to upload CSV */}
              <div
                className="w-full flex-row justify-between align-middle"
                id="src-file1"
              >
                <input
                  type="file"
                  className="inputButton"
                  name="src-file1"
                  aria-label="Archivo"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                    // setSpinner(true);
                  }}
                />
              </div>
              <p className="my-4">Colaboradores del proyecto</p>
              <div className="w-full ml-3">
                {projectUsers?.length > 0 ? (
                  projectUsers.map((el,index) => {
                    if (el.role === "client") {
                      return <p className="text-cyan" key={index}>{el.name}</p>;
                    }
                  })
                ) : (
                  <p className="text-cyan">No hay colaboradores asignados</p>
                )}
              </div>
              {/* <div className="w-full flex justify-between align-middle ">
                <p className="text-orange-500 my-4">
                  ¿Desea modificar los colaboradores para el día de hoy?
                </p>
                <input type="checkbox" className="ml-3"/> 
              </div> */}
            </div>
          </div>
        </div>
   
}
      
      {/* <div className='upload-spinner'>
      {spinnerHomeClinica && <Loading />}
    </div>

    {baseCompleta.length !== 0 ? (
      <p className='uploaded-file'>Archivo cargado</p>
    ) : (
      <p className='notUploaded-file'>No hay archivos cargados</p>
    )} */}
    </div>
  );
}

export default HomeAdmin;
