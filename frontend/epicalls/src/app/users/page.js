"use client";

import { setUser } from "@/redux/features/login/loginSlice";
import { useTokenMutation } from "@/redux/services/loginServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import AddEditUsers from "./AddEditUsers";
import { useGetusersQuery } from "@/redux/services/userServices";

function Users() {
  const [addEditModalUsers, setAddEditModalUsers] = useState(false);

  const dispatch = useDispatch();
  const [triggerToken, result] = useTokenMutation();
  const { data, isLoading, isError } = useGetusersQuery();

  console.log('loading',isLoading)
  console.log('users',data)

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

  function handleAddUser() {
    setAddEditModalUsers(true);
  }



  return (
    <div className="w-screen h-screen px-20 py-20">
      <div className="w-full flex justify-between align-middle mb-16">
        <div className="w-full rounded-3xl  shadow-md">
          <div className="w-full h-14 bg-green rounded-t-3xl flex justify-center align-middle">
            <div className="w-full flex justify-between align-middle px-5">
              <div className=" text-white text-2xl my-auto w-9/10">
                Usuarios
              </div>
              <div
                className="w-1/10 text-white text-2xl text-right self-center cursor-pointer"
                onClick={handleAddUser}
              >
                +
              </div>
            </div>
          </div>
          <div className="w-full p-5">
            {!isLoading && data.users.map((el, index) => {
              return (
                <div
                  className="w-full flex justify-between align-middle hover:bg-lightGrey p-2"
                  key={index}
                >
                  <div>{el.name}</div>
                  <div>{el.mail}</div>
                  <div>{el.profession}</div>
                  <div>{el.role}</div>
                  <div>{el.lastConnection}</div>
                  <div className="w-20 flex justify-between align-middle">
                    <FaPencilAlt className="cursor-pointer text-green" />
                    <RiDeleteBin4Line className="cursor-pointer text-magenta" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {addEditModalUsers && (
        <AddEditUsers setAddEditModalUsers={setAddEditModalUsers} />
      )}
    </div>
  );
}

export default Users;
