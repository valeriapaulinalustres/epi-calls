"use client";

import { setUser } from "@/redux/features/login/loginSlice";
import { useTokenMutation } from "@/redux/services/loginServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { CollapsePatients } from "@/components/CollapsePatients";
import { Checkbox } from "@/components/CheckBox";
import { useGetonesheetMutation } from "@/redux/services/sheetServices";

function HomeClient() {
  const [boxPatient, setBoxPatient] = useState(false);
  const [actualName, setActualName] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [argumentative, setArgumentative] = useState(false);
  const [notAnswer, setNotAnswer] = useState(false);
  const [recovered, setRecovered] = useState(false);
  const [description, setDescription] = useState("");
  const [nextCall, setNextCall] = useState("");
  const [sheet, setSheet] = useState([])

  const dispatch = useDispatch();
  const [triggerToken, result] = useTokenMutation();
  const [triggerGetonesheetMutation, oneSheetResult] = useGetonesheetMutation();



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
        console.log("error", error);
      }
    })();
  }, [result]);

  useEffect(() => {
    console.log('acá mail', user.mail)
    triggerGetonesheetMutation({ mail: user.mail });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (oneSheetResult.isSuccess) {
          console.log('oneSheetResult',oneSheetResult);
setSheet(oneSheetResult.data.sheets[0].excel)
        //  dispatch(setUser({ ...user, accessToken: result.data.accessToken }));
        } else if (oneSheetResult.isError) {
          console.log(oneSheetResult.isError);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [oneSheetResult]);

  const patients = [
    {
      name: "Laura Ortiz",
      tel: "1122334455",
      fis: "11/3/24",
      symptoms: "fiebre",
      dni: 1,
      nextCall: "1/1",
    },
    {
      name: "Mariela Ortiz",
      tel: "1122334455",
      fis: "11/3/24",
      symptoms: "fiebre",
      dni: 2,
      nextCall: "2/2",
    },
    {
      name: "Mariana Ortiz",
      tel: "1122334455",
      fis: "11/3/24",
      symptoms: "fiebre",
      dni: 3,
      nextCall: "3/3",
    },
  ];

  console.log("aca", recovered, notAnswer, emergency, argumentative);
  console.log(description);

  //Gets and prepates Date
  function getDate() {
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const fechaActual = new Date();
    const diaSemana = diasSemana[fechaActual.getDay()];
    const dia = fechaActual.getDate();
    const mes = meses[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();

    return `${diaSemana} ${dia} de ${mes} de ${año}`;
}

const today = getDate();
console.log(today);


  function handleSubmit () {
    
  }

  return (
    <div className="w-screen h-screen px-20 py-20">
      <div className="w-full flex justify-between align-middle mb-16">
        <div className="w-1/3 rounded-3xl  shadow-md mb-10">
          <div className="w-full h-14 bg-orange rounded-t-3xl flex justify-center align-middle">
            <div className=" text-white text-2xl my-auto">
              Llamados a realizar el {today}
            </div>
          </div>
          <div className="w-full flex flex-col justify-between align-top p-5">
            {/* <div className='w-full flex-col justify-between align-middle'>
              <div className='w-full border-solid border-cyan shadow-md flex justify-between align-middle p-2 rounded-sm mb-2'>
                <p className='text-green w-1/3'>Laura</p>
                <div className='flex justify-between align-middle w-1/4'>
                  <BsFillTelephoneFill className='text-green' />
                  <p>121217291</p>
                </div>
                <IoIosArrowDown />
              </div>
              <div className='bg-grey p-3'>
descripción
              </div>
            </div> */}
            {sheet.map((el, index) => {
              return (
                <CollapsePatients
                  name={`${el.APELLIDO}, ${el.NOMBRE}`}
                  tel={el.CONTACTO}
                  key={index}
                  dni={el.DNI}
                  boxPatient={boxPatient}
                  setBoxPatient={setBoxPatient}
                  collapsed={true}
                  setActualName={setActualName}
                  setNextCall={setNextCall}
                 // patientNextCall={el.nextCall} ESTO FALTA HACER
                >
                  <div>
                    <p>{el.FIS}</p>
                    {/* <p>{el.symptoms}</p> */}
                  </div>
                </CollapsePatients>
              );
            })}
          </div>
        </div>
        {boxPatient && (
          <div className="w-2/3 rounded-3xl  shadow-md ml-10 mb-10">
            <div className="w-full h-14 bg-green rounded-t-3xl flex justify-center align-middle">
              <div className=" text-white text-2xl my-auto">{actualName}</div>
            </div>
            <div className="w-full flex flex-col justify-between align-top p-5">
              <div className="w-full flex flex-row">
                <textarea
                  className="border-green w-1/2 p-2"
                  placeholder="Agregar descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="w-1/2 flex flex-col justify-between align-middle ml-5">
                  <Checkbox
                    label="Alta"
                    value={recovered}
                    onChange={() => setRecovered(!recovered)}
                  />
                  <Checkbox
                    label="No contesta"
                    value={notAnswer}
                    onChange={() => setNotAnswer(!notAnswer)}
                  />
                  <Checkbox
                    label="Derivado a urgencias"
                    value={emergency}
                    onChange={() => setEmergency(!emergency)}
                  />
                  <Checkbox
                    label="Paciente conflictivo"
                    value={argumentative}
                    onChange={() => setArgumentative(!argumentative)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-row justify-between align-middle p-5">
                <p className="text-orange italic">
                  Próximo llamado el {nextCall}
                </p>
                <button 
                className="bg-cyan rounded-2xl shadow-md p-2 justify-self-end w-1/2 text-white  hover:bg-magenta duration-700"
                onClick={handleSubmit}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      ;
    </div>
  );
}

export default HomeClient;
