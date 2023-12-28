'use client';

import { setUser } from '@/redux/features/login/loginSlice';
import { useTokenMutation } from '@/redux/services/loginServices';
import { useCreatesheetMutation } from '@/redux/services/sheetServices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as xlsx from 'xlsx';

function HomeAdmin() {
  const [csvUploaded, setCsvUploaded] = useState([]); //Keeps the uploaded csv's information
  const [actualProject, setActualProject] = useState('')

  const dispatch = useDispatch();
  const [triggerToken, result] = useTokenMutation();
  const [triggerCreateSheet, resultSheet] = useCreatesheetMutation();

  const refreshToken = useSelector(
    (state) => state.loginReducer.value.refreshToken
  );
  const user = useSelector((state) => state.loginReducer.value);

  console.log('refreshToken', refreshToken)

  //Handle of refresh token: at login you get token and refresh token, then navigates here. Then you call triggerToken passing the refresh token
  useEffect(() => {
    triggerToken({ token: refreshToken });
  }, []);

  //After that, you get an accessToken as result. This will be use in the header of future requests.
  useEffect(() => {
    (async () => {
      try {
        if (result.isSuccess) {
          console.log('ver ******', result);

          dispatch(setUser({ ...user, accessToken: result.data.accessToken }));
        } else if (result.isError) {
          console.log(result.isError);
        }
      } catch (error) {
        console.log('error', error);
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
        const wb = xlsx.read(bufferArray, { type: 'buffer' });
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
      console.log(d);
      triggerCreateSheet({
        excel: d,
        project: {
          patientsFilter: {
            searchFromInWeeks: 18,
            disease: 'Dengue',
            diagnosis: 'Confirmados',
            collaboratorsTodayActive: false,
            collaborators: ['Ana', 'Laura'],
          },
        },
      });
      // setSpinner(false);
    });
  };
  console.log('csv uploaded', csvUploaded);




const allProjects = [
  {name: 'Dengue 2022', id:1},
  {name: 'Dengue 2023', id:2},
]

console.log('actual',actualProject)

  return (
    <div className='w-screen h-screen px-20 py-20'>
      <div className='w-full flex justify-between align-middle mb-16'>
      <div className='w-1/3 rounded-3xl  shadow-md'>
        <div className='w-full h-14 bg-cyan rounded-t-3xl flex justify-center align-middle'>
          <div className=' text-white text-2xl my-auto'>
            Proyecto Actual: {actualProject}
          </div>
        </div>
        <div className='w-full flex justify-between align-top p-5'>
          <div>
            {/* Input to upload CSV */}
            <div
              className='w-full flex-row justify-between align-middle'
              id='src-file1'
            >
              <input
                type='file'
                className='inputButton'
                name='src-file1'
                aria-label='Archivo'
                onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file);
                  // setSpinner(true);
                }}
              />
            </div>
            <p className='my-4'>Colaboradores del proyecto</p>
            <div className='w-full ml-3'>
              <p className='text-cyan'>Lara</p>
              <p className='text-cyan'>Lourdes</p>
            </div>
            <div className='w-full flex justify-between align-middle '>
              <p className='text-orange-500 my-4'>
                ¿Desea modificar los colaboradores para el día de hoy?
              </p>
              <input type='checkbox' className='ml-3' />
            </div>
          </div>
        </div>
      </div>

      <div className='w-1/3 rounded-3xl  shadow-md'>
        <div className='w-full h-14 bg-orange rounded-t-3xl flex justify-center align-middle'>
          <div className=' text-white text-2xl my-auto'>
            Estadística General
          </div>
        </div>
        <div className='w-full flex-col justify-between align-top p-5'>
          <div className='w-full flex h-9 m-3'>
            <div className='w-1/2 justify-self-end'>Confirmados Total: </div>
            <div className='w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500  flex justify-center align-middle '>
              10
            </div>
          </div>
          <div className='w-full flex h-9 m-3'>
            <div className='w-1/2 justify-self-end'>Confirmados Total: </div>
            <div className='w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500 flex justify-center align-middle '>
              10
            </div>
          </div>
          <div className='w-full flex h-9 m-3'>
            <div className='w-1/2 justify-self-end'>Confirmados Total: </div>
            <div className='w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500 justify-center align-middle'>
              10
            </div>
          </div>
          <div className='w-full flex h-9 m-3'>
            <div className='w-1/2 justify-self-end'>Confirmados Total: </div>
            <div className='w-9 justify-self-start rounded-full border-solid border-2 border-cyan-500 justify-center align-middle'>
              10
            </div>
          </div>
        </div>
      </div>
      </div>
     

       
      <div className='w-1/3 rounded-3xl  shadow-md'>
        <div className='w-full h-14 bg-green rounded-t-3xl flex justify-center align-middle'>
          <div className=' text-white text-2xl my-auto'>
            Proyectos Vigentes
          </div>
        </div>
        <div className='w-full flex-col justify-between align-top p-5'>
          {
            allProjects.map((el, index)=>{
              return(
          <div className='w-full flex justify-between align-middle' key={index}>
            <h4>{el.name}</h4>
            <input type='radio' name='project' value={el.name} checked={actualProject === el.name}  onChange={(e)=>setActualProject(e.target.value)}/>
          </div>

              )
            })
          }
        </div>
        </div>
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
