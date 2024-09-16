'use client';

import React, { useCallback, useState } from 'react';
import Logo from '@/components/Logo/Logo';
import Input from '@/components/HOC/Input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

const Auth = () => {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn) {
    return router.push('/');
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:8080/api/auth/${variant}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: variant === 'register' ? name : undefined,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data?.token) {
          login(data);
          router.push('/');
        } else {
          alert('Registration successful! Please log in to continue.');
          toggleVariant();
        }
      } else {
        const error = await response.json();
        console.error('Authentication failed:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login_bg_gradient bg-cover h-screen grid place-items-center'>
      <div className='bg-black w-full h-full lg:bg-opacity-50 p-20'>
        <Logo style='w-40 absolute top-0 left-0 m-8 ml-12' />
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-3xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <div className='flex flex-col  gap-4'>
              {variant === 'register' && (
                <Input
                  label='Username'
                  onChange={(event) => setName(event.target.value)}
                  id='name'
                  value={name}
                />
              )}
              <Input
                label='Email'
                onChange={(event) => setEmail(event.target.value)}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onChange={(event) => setPassword(event.target.value)}
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              onClick={handleSubmit}
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <p className='text-neutral-500 mt-12 text-center'>
              {variant === 'login'
                ? 'New to Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Create an Account' : 'Login Now'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
