"use client";

import { setUser } from "@/redux/features/login/loginSlice";
import { useTokenMutation } from "@/redux/services/loginServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import AddEdit from "./AddEdit";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Collapse } from "@/components/Collapse";

function Projects() {
  const [addEditModal, setAddEditModal] = useState(false);

  const dispatch = useDispatch();
  const [triggerToken, result] = useTokenMutation();

  const refreshToken = useSelector(
    (state) => state.loginReducer.value.refreshTokenToken
  );
  console.log("ver token", refreshToken);
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

  function handleAdd() {
    setAddEditModal(true);
  }

  const aboutUs = [
    {
      title: "Dengue",
      state: "active",
      content: "descripción oculta",

    },
    {
      title: "Vision",
      state: "active",
      content: "descripción oculta",
    },
    {
      title: "Valores",
      state: "active",
      content: "descripción oculta",
    },
  ];

  return (
    <div className="w-screen h-screen px-20 py-20">
      <div className="w-full flex justify-between align-middle mb-16">
        <div className="w-full rounded-3xl  shadow-md">
          <div className="w-full h-14 bg-green rounded-t-3xl flex justify-center align-middle">
            <div className="w-full flex justify-between align-middle px-5">
              <div className=" text-white text-2xl my-auto w-9/10">
                Proyectos
              </div>
              <div
                className="w-1/10 text-white text-2xl text-right self-center cursor-pointer"
                onClick={handleAdd}
              >
                +
              </div>
            </div>
          </div>
          <div className="w-full p-5">
          {aboutUs.map((item, index) => {
        return (
          <Collapse key={index} title={item.title} info={item.state} collapsed={true} edition={true}>
            <p>{item.content}</p>
          </Collapse>
        )
      })}
            
            
          </div>
        </div>
      </div>
      {addEditModal && <AddEdit setAddEditModal={setAddEditModal} />}
    </div>
  );
}

export default Projects;
