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
          router.push('/home/client');

          //navegar a home y en su useffect llamar con el access token a los pacientes
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
    //falta chequear que tenga formato de mail
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
      />
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Link href='/'>
        <button onClick={handleLogin}>Login</button>
      </Link>
    </main>
  );
}

export default Home;
