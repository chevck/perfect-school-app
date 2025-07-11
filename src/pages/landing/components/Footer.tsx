import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      id='contact'
      className='bg-gray-900 text-white py-12 relative overflow-hidden'
    >
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-pulse'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in-up'>
          <div className='md:col-span-2 animate-fade-in-left'>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='bg-blue-600 p-2 rounded-lg transition-all duration-500 hover:bg-blue-700 hover:scale-110'>
                <GraduationCap className='h-6 w-6 text-white transition-transform duration-300 hover:rotate-12' />
              </div>
              <span className='text-xl font-bold'>THE PERFECT SCHOOL APP</span>
            </div>
            <p className='text-gray-400 mb-6 leading-relaxed'>
              Empowering schools with innovative technology solutions to create
              better learning experiences and streamline operations.
            </p>
            <div className='mb-6 overflow-hidden rounded-lg'>
              <img
                src='https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=400'
                alt='Happy Black students'
                className='object-cover transition-transform duration-700 hover:scale-110 w-full sm:w-1/2 md:w-1/3 h-full sm:h-1/2 md:h-1/3'
              />
            </div>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1'
              >
                <Mail className='h-5 w-5 transition-transform duration-300 hover:rotate-12' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1'
              >
                <Phone className='h-5 w-5 transition-transform duration-300 hover:rotate-12' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1'
              >
                <MapPin className='h-5 w-5 transition-transform duration-300 hover:rotate-12' />
              </a>
            </div>
          </div>

          <div className='animate-fade-in-up animation-delay-200'>
            <h4 className='font-semibold mb-4'>Product</h4>
            <ul className='space-y-2 text-gray-400 pl-0'>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div className='animate-fade-in-up animation-delay-400'>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2 text-gray-400 pl-0'>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-decoration-none text-[#e5e7eb] hover:text-white transition-all duration-300 hover:translate-x-2'
                >
                  Training
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up animation-delay-600'>
          <p>&copy; 2025 THE PERFECT SCHOOL APP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
