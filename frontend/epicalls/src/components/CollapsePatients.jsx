"use client";

import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";

export const CollapsePatients = ({ name, dni, collapsed, children, edition, tel, boxPatient, setBoxPatient, setActualPatient, setNextCall, patientNextCall }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  

  function changeBoxPatient () {
    setBoxPatient(true)
    setActualPatient({name, dni})
    setNextCall(patientNextCall)
    console.log(dni)
  }

  return (
    <div className="mb-2 w-full" onClick={changeBoxPatient}>
      <header className="w-full h-10 border-solid shadow-md p-4 flex justify-between align-baseline mb-2">
        <h3 className=" w-9/12">
          {name}
        </h3>
        <h3 className=" w-3/12">
          {tel}
        </h3>
        {/* <h3 className="w-4/12">{dni}</h3> */}
        {/* {
            edition ?
            
            <div className=" flex justify-between align-middle w-1/12">
                      <FaPencilAlt className="cursor-pointer text-green" />
                      <RiDeleteBin4Line className="cursor-pointer text-magenta" />
                     
                    </div>
             :
            <></>
        } */}
        {isCollapsed ? (
          <LuEye
            className="cursor-pointer text-cyan w-1/12"
            onClick={() => setIsCollapsed(false)}
          />
        ) : (
          <LuEyeOff
            className="cursor-pointer text-cyan w-1/12"
            onClick={() => setIsCollapsed(true)}
          />
        )}
      </header>
      <div
        className={`p-4 bg-lightGrey ${isCollapsed ? "hidden" : "block"}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </div>
  );
};
