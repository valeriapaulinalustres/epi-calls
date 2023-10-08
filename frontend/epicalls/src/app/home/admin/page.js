'use client';

import { setUser } from '@/redux/features/login/loginSlice';
import { useTokenMutation } from '@/redux/services/loginServices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as xlsx from 'xlsx';

function HomeAdmin() {

  const [csvUploaded, setCsvUploaded] = useState([]) //Keeps the uploaded csv's information

  const dispatch = useDispatch();
  const [triggerToken, result] = useTokenMutation();

  const refreshToken = useSelector(
    (state) => state.loginReducer.value.refreshToken
  );
  const user = useSelector((state) => state.loginReducer.value);

  //Handle of refresh token: at login you get token and refresh token, then navigates here. Then you call triggerToken passing the refresh token
  useEffect(() => {
    triggerToken({ token: refreshToken });
  }, []);

  //After that, you get an accessToken as result. This will be use in the header of future requests.
  useEffect(() => {
    (async () => {
      try {
        if (result.isSuccess) {
          console.log(result);

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
     // setSpinner(false);
    });
  };
console.log('csv uploaded', csvUploaded)
  return <>
      <p>Home Admin</p>
  
      {/* Input to upload CSV */}
      <div className='file-select' id='src-file1'>
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


    {/* <div className='upload-spinner'>
      {spinnerHomeClinica && <Loading />}
    </div>

    {baseCompleta.length !== 0 ? (
      <p className='uploaded-file'>Archivo cargado</p>
    ) : (
      <p className='notUploaded-file'>No hay archivos cargados</p>
    )} */}
  </>
}

export default HomeAdmin;
