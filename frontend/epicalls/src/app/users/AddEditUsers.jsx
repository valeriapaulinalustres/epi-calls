"use client";

import { MdClose } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useGetusersQuery, useRegisteruserMutation } from "../../redux/services/userServices";

function AddEditUsers({ setAddEditModalUsers, trigger }) {
  const [showPassword, setShowPassword] = useState(false);

  const [triggerNewUser, result] = useRegisteruserMutation();





async function handleSubmitUser(e) {
    e.preventDefault();
    console.log('ejecuta el handlesubmituser')
    
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    console.log(e.target[3].value);
    console.log(e.target[4].value);
    
    try {
     const response = await triggerNewUser({
        name: e.target[0].value,
        mail: e.target[1].value,
        role: e.target[3].value,
        password: e.target[4].value,
        profession: e.target[2].value,
      });
      console.log('resultado de crear usuario',result)
      
      
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
      
      if (response.data.success) {
        trigger()
        
              setAddEditModalUsers(false);
      } 
      

      
    } catch (error) {
      console.log("error", error);
    }

  }

  return (
    <div className="bg-white left-0 right-0 top-0 bottom-0 flex fixed z-50">
      <div className="bg-white rounded-2xl shadow-xl box-content flex-col m-auto w-4/6 relative ">
        <header className="bg-green w-full h-14 rounded-t-2xl p-5 flex justify-between align-middle">
          <div className=" text-white text-2xl my-auto w-9/10">
            Nuevo Usuario
          </div>
          <MdClose
            className="w-1/10 text-white text-2xl text-right self-center cursor-pointer"
            onClick={() => {
              setAddEditModalUsers(false);
            }}
          />
        </header>
        <form
          className="w-full overflow-x-hidden p-5 rounded-b-2xl flex-col"
          onSubmit={handleSubmitUser}
        >
          <div className="w-full flex">
            <div className="w-1/2 h-full flex-col mr-4 justify-between">
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Nombre:</p>
                <input type="text" className="border w-80 px-2" />
              </div>
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Mail:</p>
                <input type="mail" className="border w-80 px-2" />
              </div>
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Profesión:</p>
                <input type="text" className="border w-80 px-2" />
              </div>
            </div>
            <div className="w-1/2 h-full flex-col justify-between align-top ml-4">
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Rol:</p>
                <select className="border w-80">
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>
              <div className="flex justify-between w-full align-middle mb-4">
                <p>Contraseña:</p>
                {showPassword ? (
                  <LuEyeOff
                    className="cursor-pointer text-cyan w-1/12"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <LuEye
                    className="cursor-pointer text-cyan w-1/12"
                    onClick={() => setShowPassword(true)}
                  />
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  className="border w-80 px-2"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-cyan rounded-2xl shadow-md p-2 justify-self-end w-full text-white hover:bg-magenta duration-700"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditUsers;
