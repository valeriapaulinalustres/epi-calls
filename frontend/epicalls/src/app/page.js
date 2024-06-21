'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  usePruebaQuery,
  useLoginMutation,
} from '../redux/services/loginServices';
import Link from 'next/link';
import { setUser } from '@/redux/features/login/loginSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Home() {
  const { data, error, isLoading } = usePruebaQuery();
  const [triggerLogin, result] = useLoginMutation();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const router = useRouter();

  const client = useSelector((state) => state.loginReducer.value.name);
  console.log(client);

  useEffect(() => {
    (async () => {
      try {
        if (result.isSuccess) {
          console.log(result);
          dispatch(setUser(result.data));
          if (result.data.role === 'admin') {
            router.push('/home/admin');

          } else if (result.data.role === 'client'){
            router.push('/home/client')
          }
        } else if (result.isError) {
          console.log(result.isError);
        }
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, [result]);

  function handleLogin() {
    console.log(mail, password);

    try {
      triggerLogin({ mail, password });
    } catch (error) {
      console.log('error', error);
    }
    setMail('');
    setPassword('');
  }

  console.log(data);

  return (
    // <main className='flex min-h-screen flex-col items-center justify-between p-24'>
    //   <p>EPIcalls login</p>
    //   <input
    //     type='mail'
    //     onChange={(e) => setMail(e.target.value)}
    //     value={mail}
    //     className='bg-cyan'
    //   />
    //   <input
    //     type='password'
    //     onChange={(e) => setPassword(e.target.value)}
    //     value={password}
    //     className=' bg-cyan'
    //   />
    //   <Link href='/'>
    //     <button onClick={handleLogin}>Login</button>
    //   </Link>
    // </main>
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-primary">
        <span className="text-cyan">E</span>
          <span className="text-green">P</span>
          <span className="text-orange">I</span>
          <span className="text-magenta">c</span>
          <span className="text-purple">a</span>
          <span className="text-cyan">l</span>
          <span className="text-green">l</span>
          <span className="text-orange">s</span>
        </h1>
        <p className="text-center text-gray-600 text-green">Login</p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
            className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange text-purple"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange  text-purple"
          />
          <Link href="/">
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 font-semibold text-white  bg-cyan rounded-2xl shadow-md p-2  hover:bg-magenta duration-700 mt-5"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
