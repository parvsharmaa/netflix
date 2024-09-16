'use client';

import React, { useRef } from 'react';
import { isEmpty } from 'lodash';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import MovieCard from './MovieCard';

const MovieList = ({ data, title }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className='space-y-4'>
      {/* Title */}
      <h2 className='text-white text-lg md:text-xl lg:text-2xl font-semibold m-4'>
        {title}
      </h2>

      <div className='relative group'>
        {/* Left arrow */}
        <BiChevronLeft
          className='absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-110 group-hover:opacity-100'
          onClick={() => handleScroll('left')}
        />

        {/* Scrollable Row with Increased Space Between Cards */}
        <div
          ref={rowRef}
          className='flex items-center space-x-6 overflow-x-scroll scrollbar-hide px-2'
        >
          {data.map((movie) => (
            <div key={movie?.imdbID} className='flex-shrink-0'>
              <MovieCard data={movie} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <BiChevronRight
          className='absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-110 group-hover:opacity-100'
          onClick={() => handleScroll('right')}
        />
      </div>
    </div>
  );
};

export default MovieList;
