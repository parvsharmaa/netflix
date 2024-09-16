import React from 'react';
import { BsFillPlayFill, BsPlusLg } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlineCheck } from 'react-icons/ai';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

const MovieCard = ({ data }) => {
  const { isLoggedIn, userData, setUserCredentials } = useAuth();
  const router = useRouter();

  const isMovieInFavorites = userData?.favourites?.some(
    (movie) => movie.imdbID === data.imdbID
  );

  const handleAddToFavorites = async () => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }

    if (isMovieInFavorites) {
      alert('This movie is already in your favorites!');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(
        `http://localhost:8080/api/user/${userData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            favourites: [...userData.favourites, data],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      const updatedUser = await response.json();
      setUserCredentials(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const updatedFavourites = userData.favourites.filter(
        (movie) => movie.imdbID !== data.imdbID
      );

      const response = await fetch(
        `http://localhost:8080/api/user/${userData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            favourites: updatedFavourites,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      const updatedUser = await response.json();
      setUserCredentials(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };

  return (
    <div className='relative h-[300px] w-[200px] flex flex-col overflow-hidden rounded-md'>
      {/* Movie Poster */}
      <img
        className='cursor-pointer object-cover transition-all duration-300 w-full h-full'
        src={data.Poster}
        alt='Thumbnail'
      />

      {/* Hover Overlay with Details */}
      <div className='absolute inset-0 flex flex-col justify-end items-center p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-transparent to-transparent'>
        <div className='p-4 rounded-md shadow-md w-full text-center'>
          <div className='flex justify-center gap-3 mb-2'>
            <div className='cursor-pointer w-10 h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
              <BsFillPlayFill className='text-black' size={24} />
            </div>

            {/* Conditionally render Add/Remove button or a tick icon if already added */}
            {data?.isInMyList ? (
              <div
                onClick={handleRemoveFromFavorites}
                className='cursor-pointer w-10 h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
              >
                <AiOutlineMinus className='text-black' size={24} />
              </div>
            ) : isMovieInFavorites ? (
              <div
                onClick={() =>
                  alert('This movie is already in your favorites!')
                }
                className='cursor-pointer w-10 h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
              >
                <AiOutlineCheck className='text-black' size={24} />
              </div>
            ) : (
              <div
                onClick={handleAddToFavorites}
                className='cursor-pointer w-10 h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
              >
                <BsPlusLg className='text-black' size={24} />
              </div>
            )}
          </div>
          <p className='text-white text-sm text-center break-words'>
            {data.Title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
