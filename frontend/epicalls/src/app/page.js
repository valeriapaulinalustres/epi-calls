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
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p>EPIcalls login</p>
      <input
        type='mail'
        onChange={(e) => setMail(e.target.value)}
        value={mail}
        className='bg-cyan'
      />
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className=' bg-cyan'
      />
      <Link href='/'>
        <button onClick={handleLogin}>Login</button>
      </Link>
    </main>
  );
}

export default Home;
