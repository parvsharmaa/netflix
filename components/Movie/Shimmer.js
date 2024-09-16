import React from 'react';

const Shimmer = () => {
  return (
    <div className='relative group'>
      <h2 className='text-white text-lg md:text-xl lg:text-2xl font-semibold m-4'>
        Loading ...
      </h2>
      <div className='flex items-center space-x-6 overflow-x-scroll scrollbar-hide px-2'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='relative h-[300px] w-[200px] flex flex-col overflow-hidden rounded-md'
          >
            <div className='w-full h-full bg-gray-600 animate-pulse'></div>
            <div className='absolute inset-0 flex flex-col justify-end items-center p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100'>
              <div className='p-4 rounded-md shadow-md w-full text-center bg-gray-600'>
                <div className='flex justify-center gap-3 mb-2'>
                  <div className='w-10 h-10 bg-gray-500 rounded-full'></div>
                  <div className='w-10 h-10 bg-gray-500 rounded-full'></div>
                </div>
                <p className='bg-gray-700 h-4 rounded-md'></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
