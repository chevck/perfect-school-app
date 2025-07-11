import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 hover:shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-2 animate-fade-in-left'>
            <div className='bg-blue-600 p-2 rounded-lg transition-all duration-500 hover:bg-blue-700 hover:scale-110 hover:rotate-3'>
              <GraduationCap className='h-6 w-6 text-white transition-transform duration-300 hover:scale-110' />
            </div>
            <span className='text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600'>
              THE PERFECT SCHOOL APP
            </span>
          </div>

          <nav className='hidden md:flex space-x-8 animate-fade-in-up animation-delay-200'>
            <a
              href='#features'
              className='text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105'
            >
              Features
            </a>
            <a
              href='#about'
              className='text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105'
            >
              About
            </a>
            <a
              href='#contact'
              className='text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105'
            >
              Contact
            </a>
          </nav>

          <div className='hidden md:flex items-center space-x-4 animate-fade-in-right animation-delay-400'>
            <button className='text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105'>
              Login
            </button>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-500 transform hover:scale-110 hover:shadow-lg'>
              Get Started
            </button>
          </div>

          <button
            className='md:hidden transition-all duration-300 hover:scale-110'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className='md:hidden py-4 border-t'>
            <nav className='flex flex-col space-y-4'>
              <a
                href='#features'
                className='text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-2'
              >
                Features
              </a>
              <a
                href='#about'
                className='text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-2'
              >
                About
              </a>
              <a
                href='#contact'
                className='text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-2'
              >
                Contact
              </a>
              <div className='flex flex-col space-y-2 pt-4'>
                <button className='text-blue-600 hover:text-blue-700 font-medium text-left transition-all duration-300 hover:translate-x-2'>
                  Login
                </button>
                <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-500 transform hover:scale-105'>
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
