"use client";

import { MdClose } from "react-icons/md";

function AddEdit({ setAddEditModal }) {



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
        <main className="w-full overflow-x-hidden overflow-y-scroll p-5 rounded-b-2xl flex">
          <div className="w-1/2 h-full flex-col mr-4 justify-between">
            <div className="flex justify-between w-full align-middle mb-4">
              <p>Nombre:</p>
              <input type="text" className="border w-80" />
            </div>
            <div className="flex justify-between w-full align-middle mb-4">
              <p>Descripción:</p>
              <textarea className="border w-80" />
            </div>
            <div className="flex-col justify-between w-full align-middle ">
              <p className="mb-4">Colaboradores:</p>
              <div className="flex-col justify-between align-middle ml-10">
                <div className="flex align-middle">
                  <input type="checkbox" className="border w-4 h-4 self-center mr-2" />
                  <p>Laura</p>
                </div>
                <div className="flex ">
                  <input type="checkbox" className="border w-4 h-4 self-center mr-2" />
                  <p>Laura</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex-col justify-between align-top ml-4">
            <div className="flex justify-between w-full align-middle mb-4">
              <p>Enfermedad:</p>
              <input type="text" className="border w-80" />
            </div>
            <div className="flex-col justify-between w-full align-middle mb-4">
              <p className="mb-4">Diagnóstico:</p>
              <div className="flex-col justify-between align-middle ml-10">
                <div className="flex align-middle">
                  <input type="checkbox" className="border w-4 h-4 self-center mr-2" />
                  <p>Sospechosos</p>
                </div>
                <div className="flex ">
                  <input type="checkbox" className="border w-4 h-4 self-center mr-2" />
                  <p>Confirmados</p>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <p className="mb-4">Llamados:</p>
              <div className="flex mb-2">
                <p className="mr-2">Cantidad total:</p>
                <input type="number" className="border w-6 h-6"/>
              </div>
              <div className="flex">
                <p className="mr-2">Frecuencia:</p>
                <input type="number" className="border w-6 h-6"/>
              </div>
            </div>
            <button type="submit" className="bg-cyan rounded-2xl shadow-md p-2 justify-self-end w-full text-white">Guardar</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddEdit;
