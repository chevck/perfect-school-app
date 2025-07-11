import React from "react";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className='overflow-hidden relative py-20 bg-gradient-to-br from-blue-50 to-white'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 items-center lg:grid-cols-2'>
          <div className='text-center lg:text-left md:text-left'>
            <h1 className='mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl'>
              Transform Your School with{" "}
              <span className='text-blue-600'>THE PERFECT SCHOOL APP</span>
            </h1>
            <p className='mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600 lg:mx-0'>
              Streamline operations, enhance learning, and manage your
              institution efficiently with our comprehensive school management
              platform featuring AI-powered tutoring.
            </p>

            <div className='flex flex-col gap-4 justify-center items-center mb-12 sm:flex-row lg:justify-start'>
              <button className='flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:scale-105'>
                <span>Start Free Trial</span>
                <ArrowRight className='w-5 h-5' />
              </button>
              <button className='flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-blue-600 rounded-lg border-2 border-blue-600 transition-all duration-300 hover:bg-blue-50'>
                <Play className='w-5 h-5' />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          <div className='relative'>
            <div className='relative z-10'>
              <img
                src='https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800'
                alt='Students using technology in classroom'
                className='w-full h-auto rounded-2xl shadow-2xl'
              />
              <div className='absolute -bottom-6 -left-6 p-4 bg-white rounded-xl shadow-lg'>
                <div className='flex items-center space-x-3'>
                  <div className='flex justify-center items-center w-12 h-12 bg-green-100 rounded-full'>
                    <span className='text-lg font-bold text-green-600'>AI</span>
                  </div>
                  <div>
                    <div className='font-semibold text-gray-900'>
                      TUTOR MY CHILD
                    </div>
                    <div className='text-sm text-gray-600'>Active Learning</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full'>
              Live Demo
            </div>
          </div>
        </div>

        <div className='mt-16'>
          <div className='grid grid-cols-1 gap-8 mx-auto max-w-4xl md:grid-cols-3'>
            <div className='p-6 bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl'>
              <div className='mb-2 text-3xl font-bold text-blue-600'>500+</div>
              <div className='text-gray-600'>Schools Trust Us</div>
            </div>
            <div className='p-6 bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl'>
              <div className='mb-2 text-3xl font-bold text-blue-600'>50K+</div>
              <div className='text-gray-600'>Students Enrolled</div>
            </div>
            <div className='p-6 bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl'>
              <div className='mb-2 text-3xl font-bold text-blue-600'>99.9%</div>
              <div className='text-gray-600'>Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
