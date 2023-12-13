"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

function AddEdit({ setAddEditModal }) {

  const [checkedUsers, setCheckedUsers] = useState([])
  const [checkedDiagnosis, setCheckedDiagnosis] = useState([])

function handleSubmitProject (e) {
  e.preventDefault()
console.log(e.target[0].value)
console.log(e.target[1].value)
console.log(e.target[4].value)
console.log(e.target[7].value)
console.log(e.target[8].value)
console.log(checkedDiagnosis, checkedUsers)
}

const users = [{nombre: 'Laura', id:1}, {nombre: 'Cintia', id:2}]

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



  return (
    <div className="bg-white left-0 right-0 top-0 bottom-0 flex fixed z-50">
      <div className="bg-white rounded-2xl shadow-xl box-content flex-col m-auto w-4/6 relative ">
        <header className="bg-green w-full h-14 rounded-t-2xl p-5 flex justify-between align-middle">
          <div className=" text-white text-2xl my-auto w-9/10">Nuevo Proyecto</div>
          <MdClose
            className="w-1/10 text-white text-2xl text-right self-center cursor-pointer"
            onClick={() => {
              setAddEditModal(false);
            }}
          />
        </header>
        <form className="w-full overflow-x-hidden overflow-y-scroll p-5 rounded-b-2xl flex-col" onSubmit={handleSubmitProject}>
          <div className="w-full flex">

          <div className="w-1/2 h-full flex-col mr-4 justify-between" >
            <div className="flex justify-between w-full align-middle mb-4">
              <p>Nombre:</p>
              <input type="text" className="border w-80 px-2" />
            </div>
            <div className="flex justify-between w-full align-middle mb-4">
              <p>Descripción:</p>
              <textarea className="border w-80 px-2" />
            </div>
            <div className="flex-col justify-between w-full align-middle ">
              <p className="mb-4">Colaboradores:</p>
              <div className="flex-col justify-between align-middle ml-10">
                  {
                    users.map((el, index)=>{
                      return (
                        
                        <div className="flex align-middle" key={index}>
                        <input type="checkbox" className="border w-4 h-4 self-center mr-2" value={el.id} onChange={handleCheckUsers}/>
                        <p>{el.nombre}</p>
                </div>
                      )
                    })
                  }
            
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
                  <input type="checkbox" className="border w-4 h-4 self-center mr-2" onChange={handleCheckDiagnosis} value='sospechosos'/>
                  <p>Sospechosos</p>
                </div>
                <div className="flex ">
                  <input type="checkbox" className="border w-4 h-4 self-center mr-2" onChange={handleCheckDiagnosis} value='confirmados'/>
                  <p>Confirmados</p>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <p className="mb-4">Llamados:</p>
              <div className="flex mb-2">
                <p className="mr-2">Cantidad total:</p>
                <input type="number" className="border w-6 h-6 px-2"/>
              </div>
              <div className="flex">
                <p className="mr-2">Frecuencia:</p>
                <input type="number" className="border w-6 h-6 px-2"/>
              </div>
            </div>
          </div>
          </div>
            <button type="submit" className="bg-cyan rounded-2xl shadow-md p-2 justify-self-end w-full text-white  hover:bg-magenta duration-700">Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default AddEdit;
