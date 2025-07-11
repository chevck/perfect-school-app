import React, { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-2'>
            <div className='p-2 bg-blue-600 rounded-lg'>
              <GraduationCap className='w-6 h-6 text-white' />
            </div>
            <span className='text-xl font-bold text-gray-900'>
              THE PERFECT SCHOOL APP
            </span>
          </div>

          <nav className='hidden space-x-8 md:flex'>
            <a
              href='#features'
              className='text-gray-600 transition-colors hover:text-blue-600'
            >
              Features
            </a>
            <a
              href='#about'
              className='text-gray-600 transition-colors hover:text-blue-600'
            >
              About
            </a>
            <a
              href='#contact'
              className='text-gray-600 transition-colors hover:text-blue-600'
            >
              Contact
            </a>
          </nav>

          <div className='hidden items-center space-x-4 md:flex'>
            <button className='font-medium text-blue-600 hover:text-blue-700'>
              Login
            </button>
            <button className='px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700'>
              Get Started
            </button>
          </div>

          <button
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className='py-4 border-t md:hidden'>
            <nav className='flex flex-col space-y-4'>
              <a
                href='#features'
                className='text-gray-600 transition-colors hover:text-blue-600'
              >
                Features
              </a>
              <a
                href='#about'
                className='text-gray-600 transition-colors hover:text-blue-600'
              >
                About
              </a>
              <a
                href='#contact'
                className='text-gray-600 transition-colors hover:text-blue-600'
              >
                Contact
              </a>
              <div className='flex flex-col pt-4 space-y-2'>
                <button className='font-medium text-left text-blue-600 hover:text-blue-700'>
                  Login
                </button>
                <button className='px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700'>
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
