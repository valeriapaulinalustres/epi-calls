'use client';

import { setUser } from '@/redux/features/login/loginSlice';
import { useTokenMutation } from '@/redux/services/loginServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';

function HomeClient() {
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

  return (
    <div className='w-screen h-screen px-20 py-20'>
      <div className='w-full flex justify-between align-middle mb-16'>
        <div className='w-1/3 rounded-3xl  shadow-md'>
          <div className='w-full h-14 bg-orange rounded-t-3xl flex justify-center align-middle'>
            <div className=' text-white text-2xl my-auto'>
              Llamados a realizar el ...
            </div>
          </div>
          <div className='w-full flex justify-between align-top p-5'>
            <div className='w-full flex-col justify-between align-middle'>
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
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default HomeClient;
