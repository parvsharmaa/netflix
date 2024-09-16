import Link from 'next/link';
import React from 'react';

const NavbarItem = ({ label, redirect }) => {
  const content = (
    <div className='text-white cursor-pointer hover:text-gray-300 transition'>
      {label}
    </div>
  );

  return redirect ? (
    <Link href={redirect} passHref>
      {content}
    </Link>
  ) : (
    content
  );
};

export default NavbarItem;
