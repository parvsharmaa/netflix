'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import NavbarItem from './NavbarItem';
import MobileMenu from '../Menu/MobileMenu';
import AccountMenu from '../Menu/AccountMenu';
import Logo from '../Logo/Logo';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= TOP_OFFSET
        ? setShowBackground(true)
        : setShowBackground(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 w-full ${
          showBackground ? 'bg-[#141414]' : ''
        }`}
      >
        {/* Left side with logo */}
        <Logo style='h-auto w-[100px]' />

        {/* Middle with menu items */}
        <div className='flex-row ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Home' redirect='/' />
          <NavbarItem label='Series' />
          <NavbarItem label='Movies' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' redirect='/favourites' />
        </div>

        {/* Mobile menu toggle */}
        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
        >
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        {/* Right side */}
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className='flex flex-row items-center gap-2 cursor-pointer relative'
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <img src='/images/dp.png' alt='' />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
