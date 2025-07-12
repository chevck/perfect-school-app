import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className='sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm hover:shadow-md'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-2 animate-fade-in-left'>
            <div className='p-2 transition-all duration-500 bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-110 hover:rotate-3'>
              <GraduationCap className='w-6 h-6 text-white transition-transform duration-300 hover:scale-110' />
            </div>
            <span className='text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600'>
              THE PERFECT SCHOOL APP
            </span>
          </div>

          <nav className='hidden space-x-8 md:flex animate-fade-in-up animation-delay-200'>
            <a
              href='#features'
              className='text-gray-600 transition-all duration-300 text-decoration-none hover:text-blue-600 hover:scale-105'
            >
              Features
            </a>
            <a
              href='#about'
              className='text-gray-600 transition-all duration-300 hover:text-blue-600 hover:scale-105 text-decoration-none'
            >
              About
            </a>
            <a
              href='#contact'
              className='text-gray-600 transition-all duration-300 text-decoration-none hover:text-blue-600 hover:scale-105'
            >
              Contact
            </a>
          </nav>

          <div className='items-center hidden space-x-4 md:flex animate-fade-in-right animation-delay-400'>
            <button
              className='font-medium text-blue-600 transition-all duration-300 hover:text-blue-700 hover:scale-105'
              onClick={() => navigate("/sign-in")}
            >
              Login
            </button>
            <button
              className='px-4 py-2 text-white transition-all duration-500 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-110 hover:shadow-lg'
              onClick={() => navigate("sign-up")}
            >
              Get Started
            </button>
          </div>

          <button
            className='transition-all duration-300 md:hidden hover:scale-110'
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
                className='text-gray-600 transition-all duration-300 text-decoration-none hover:text-blue-600 hover:scale-105'
              >
                Features
              </a>
              <a
                href='#about'
                className='text-gray-600 transition-all duration-300 text-decoration-none hover:text-blue-600 hover:scale-105'
              >
                About
              </a>
              <a
                href='#contact'
                className='text-gray-600 transition-all duration-300 text-decoration-none hover:text-blue-600 hover:scale-105'
              >
                Contact
              </a>
              <div className='flex flex-col pt-4 space-y-2'>
                <button
                  className='font-medium text-left text-blue-600 transition-all duration-300 hover:text-blue-700 hover:translate-x-2'
                  onClick={() => navigate("sign-in")}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("sign-up")}
                  className='px-4 py-2 text-white transition-all duration-500 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105'
                >
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
