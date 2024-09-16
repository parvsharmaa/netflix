import React from 'react';

const Footer = () => {
  return (
    <div className='relative h-[10vw] flex justify-center items-center'>
      <div>
        <p className='text-gray-400 text-[8px] md:text-lg drop-shadow-xl'>
          Developed by{' '}
          <a className='text-white' href='https://github.com/parvsharmaa'>
            Parv
          </a>{' '}
          🚀
        </p>
      </div>
    </div>
  );
};

export default Footer;
