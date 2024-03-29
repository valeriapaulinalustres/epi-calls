"use client";

import { useCreateprojectMutation } from "@/redux/services/projectServices";
import { useGetusersQuery } from "@/redux/services/userServices";
import { useState } from "react";
import { MdClose } from "react-icons/md";

function AddEdit({ setAddEditModal, trigger }) {
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [checkedDiagnosis, setCheckedDiagnosis] = useState([]);
  const [frequency, setFrequency] = useState('')
  const [quantity, setQuantity] = useState('')

  const { data: dataUsers, isLoading, isError, error, isSuccess } = useGetusersQuery();

  const [triggerNewProject, result] = useCreateprojectMutation();

  async function handleSubmitProject(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[4].value);
    console.log(e.target[7].value);
    console.log(e.target[8].value);
    console.log(checkedDiagnosis, checkedUsers);

    const newProject = {
      name: e.target[0].value,
      disease: e.target[7].value,
      comments: e.target[1].value,
      calls: {
        frequencyInDays: frequency,
        quantity: quantity,
      },
      patientsFilter:{
        searchFromInWeeks: e.target[2].value,
        diagnosis: checkedDiagnosis,
      },
      collaborators: checkedUsers.map(el=>{return {user:el}}),
      collaboratorsTodayActive: false
    };

    try {
     const result = await triggerNewProject(newProject);
console.log(result)

if (result.data.success) {
  trigger()
  e.target[0].value="";
      e.target[1].value="";
      e.target[2].value="";
      e.target[3].value="";
      e.target[4].value="";
      e.target[5].value="";
      e.target[6].value="";
      e.target[7].value="";
      e.target[8].value="";
      e.target[9].value="";
      setCheckedDiagnosis([]);
      setCheckedUsers([]);
    
      
      setAddEditModal(false);
} else {console.log('error en guardar, crear toastalert')}

    
    } catch (error) {
      console.log("error en create project", error);
    }
  }

  const users = [
    { nombre: "Laura", id: 1 },
    { nombre: "Cintia", id: 2 },
  ];

  const handleCheckUsers = (event) => {
    let updatedList = [...checkedUsers];
    if (event.target.checked) {
      updatedList = [...checkedUsers, event.target.value];
    } else {
      updatedList.splice(checkedUsers.indexOf(event.target.value), 1);
    }
    setCheckedUsers(updatedList);
  };

  const handleCheckDiagnosis = (event) => {
    let updatedList = [...checkedDiagnosis];
    if (event.target.checked) {
      updatedList = [...checkedDiagnosis, event.target.value];
    } else {
      updatedList.splice(checkedDiagnosis.indexOf(event.target.value), 1);
    }
    setCheckedDiagnosis(updatedList);
  };

  console.log('dataUsers', dataUsers)
  console.log('frequency', quantity)
  console.log('checkedUsers', checkedUsers)

  return (
    <div className="bg-white left-0 right-0 top-0 bottom-0 flex fixed z-50">
      <div className="bg-white rounded-2xl shadow-xl box-content flex-col m-auto w-4/6 relative ">
        <header className="bg-green w-full h-14 rounded-t-2xl p-5 flex justify-between align-middle">
          <div className=" text-white text-2xl my-auto w-9/10">
            Nuevo Proyecto
          </div>
          <MdClose
            className="w-1/10 text-white text-2xl text-right self-center cursor-pointer"
            onClick={() => {
              setAddEditModal(false);
            }}
          />
        </header>
        <form
          className="w-full overflow-x-hidden overflow-y-scroll p-5 rounded-b-2xl flex-col"
          onSubmit={handleSubmitProject}
        >
          <div className="w-full flex">
            <div className="w-1/2 h-full flex-col mr-4 justify-between">
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Nombre:</p>
                <input type="text" className="border w-80 px-2" />
              </div>
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Descripción:</p>
                <textarea className="border w-80 px-2" />
              </div>
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Número de semanas previas de búsqueda:</p>
                <input type="number" className="border w-80 px-2" />
              </div>
              <div className="flex-col justify-between w-full align-middle ">
                <p className="mb-4">Colaboradores:</p>
                <div className="flex-col justify-between align-middle ml-10">
                  {dataUsers?.users?.map((el, index) => {
                    return (
                      <div className="flex align-middle" key={index}>
                        <input
                          type="checkbox"
                          className="border w-4 h-4 self-center mr-2"
                          value={el._id}
                          onChange={handleCheckUsers}
                        />
                        <p>{el.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full flex-col justify-between align-top ml-4">
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Enfermedad:</p>
                <input type="text" className="border w-80 px-2" />
              </div>
              <div className="flex-col justify-between w-full align-middle mb-4">
                <p className="mb-4">Diagnóstico:</p>
                <div className="flex-col justify-between align-middle ml-10">
                  <div className="flex align-middle">
                    <input
                      type="checkbox"
                      className="border w-4 h-4 self-center mr-2"
                      onChange={handleCheckDiagnosis}
                      value="sospechosos"
                    />
                    <p>Sospechosos</p>
                  </div>
                  <div className="flex ">
                    <input
                      type="checkbox"
                      className="border w-4 h-4 self-center mr-2"
                      onChange={handleCheckDiagnosis}
                      value="confirmados"
                    />
                    <p>Confirmados</p>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <p className="mb-4">Llamados:</p>
                <div className="flex mb-2">
                  <p className="mr-2">Cantidad total:</p>
                  <input type="number" className="border h-6 px-2 w-10" onChange={(e)=>setQuantity(e.target.value)}/>
                </div>
                <div className="flex">
                  <p className="mr-2">Frecuencia:</p>
                  <input type="number" className="border w-10 h-6 px-2"  onChange={(e)=>setFrequency(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-cyan rounded-2xl shadow-md p-2 justify-self-end w-full text-white  hover:bg-magenta duration-700"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEdit;
