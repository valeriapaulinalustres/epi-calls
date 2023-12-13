"use client";

import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";

export const Collapse = ({ title, info, collapsed, children, edition }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  

  return (
    <div className="mb-2">
      <header className="w-full h-10 border-solid shadow-md p-4 flex justify-between align-baseline mb-2">
        <h3 className=" w-7/12">
          {title}
        </h3>
        <h3 className="w-5/12">{info}</h3>
        {
            edition ?
            
            <div className=" flex justify-between align-middle w-1/12">
                      <FaPencilAlt className="cursor-pointer text-green" />
                      <RiDeleteBin4Line className="cursor-pointer text-magenta" />
                     
                    </div>
             :
            <></>
        }
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
