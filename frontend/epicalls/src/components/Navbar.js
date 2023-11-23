'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';

export function Navbar() {
  const user = useSelector((state) => state.loginReducer.value);
console.log('user desde nav', user)
  return (
    <>
      {user.mail ? 
      user.role === 'admin' ?
        <>
          <div className='w-screen h-24 px-20 shadow-md flex justify-between items-end py-2'>
            <div >EPI</div>
            <div>user</div>
          </div>
          <div className='w-screen h-12 py-2 shadow-md flex justify-center items-center px-72'>
            <nav className='w-9/12 h-full flex justify-between items-center'>
              <Link href='/home/admin'>
              <div className='text-teal-600 cursor-pointer'>Home</div>
              </Link>
              <Link href='/users'>
              <div className='text-teal-600 cursor-pointer'>Users</div>
              </Link>
              <Link href='/projects'>
              <div className='text-teal-600 cursor-pointer'>Projects</div>
              </Link>
              <Link href='/calls'>
              <div className='text-teal-600 cursor-pointer'>Calls</div>
              </Link>
              <Link href='/charts'>
              <div className='text-teal-600 cursor-pointer'>Charts</div>
              </Link>
            </nav>
          </div>
        </>
       : user.role === 'client' ?
      <>
          <div className='w-screen h-24 px-20 shadow-md flex justify-between items-end py-2'>
            <div >EPI</div>
            <div>user</div>
          </div>
     
        </>
        : <></>
      : 
        <></>
      }
    </>
  );
}
