import React from "react";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id='contact' className='bg-gray-900 text-white py-12 relative'>
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='md:col-span-2'>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='bg-blue-600 p-2 rounded-lg'>
                <GraduationCap className='h-6 w-6 text-white' />
              </div>
              <span className='text-xl font-bold'>THE PERFECT SCHOOL APP</span>
            </div>
            <p className='text-gray-400 mb-6 leading-relaxed'>
              Empowering schools with innovative technology solutions to create
              better learning experiences and streamline operations.
            </p>
            <div className='mb-6'>
              <img
                src='https://images.pexels.com/photos/5212361/pexels-photo-5212361.jpeg?auto=compress&cs=tinysrgb&w=400'
                alt='Happy students'
                className='rounded-lg w-48 h-32 object-cover'
              />
            </div>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Mail className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Phone className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <MapPin className='h-5 w-5' />
              </a>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Product</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Features
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Pricing
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Security
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Documentation
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Training
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2025 THE PERFECT SCHOOL APP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
