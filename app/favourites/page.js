'use client';

import React from 'react';
import MovieList from '@/components/Movie/MovieList';
import Navbar from '@/components/Navbar/Navbar';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';

export default function Favourites() {
  const { isLoggedIn, userData } = useAuth();
  const favourites = userData?.favourites || [];

  return (
    <>
      <Navbar />
      <div className='p-40'>
        {favourites.length > 0 ? (
          <>
            <p className='text-white text-center text-3xl mb-6'>My List</p>
            <MovieList
              data={favourites.map((movie) => ({
                ...movie,
                isInMyList: true,
              }))}
              title=''
            />
          </>
        ) : (
          <div className='text-white text-center'>
            <p className='text-3xl mb-4'>Nothing to show :/</p>
            <Link href={isLoggedIn ? '/' : '/auth'} passHref>
              <span className=' text-green-500 p-1 rounded-md hover:cursor-pointer'>
                {isLoggedIn ? 'Add to List?' : 'Sign In?'}
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
