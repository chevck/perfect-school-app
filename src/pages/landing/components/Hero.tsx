import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className='relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-white'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid items-center grid-cols-1 gap-12 lg:grid-cols-2'>
          <div className='text-center lg:text-left'>
            <h1 className='mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl animate-fade-in-up'>
              Transform Your School with{" "}
              <span className='text-blue-600'>THE PERFECT SCHOOL APP</span>
            </h1>
            <p className='max-w-3xl mx-auto mb-8 text-xl leading-relaxed text-gray-600 lg:mx-0 animate-fade-in-up animation-delay-200'>
              Streamline operations, enhance learning, and manage your
              institution efficiently with our comprehensive school management
              platform featuring AI-powered tutoring.
            </p>

            <div className='flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row lg:justify-start animate-fade-in-up animation-delay-400'>
              <button className='flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-white transition-all duration-500 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-110 hover:shadow-xl group'>
                <span>Start Free Trial</span>
                <ArrowRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' />
              </button>
              <button className='flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-blue-600 transition-all duration-500 transform border-2 border-blue-600 rounded-lg hover:bg-blue-50 hover:scale-105 hover:shadow-lg group'>
                <Play className='w-5 h-5' />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          <div className='relative animate-fade-in-right animation-delay-600'>
            <div className='relative z-10'>
              <img
                src='https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=800'
                alt='Black students using technology in classroom'
                className='w-full h-auto transition-transform duration-700 shadow-2xl rounded-2xl hover:scale-105'
              />
              <div className='absolute p-4 transition-all duration-500 bg-white shadow-lg -bottom-6 -left-6 rounded-xl hover:shadow-2xl hover:-translate-y-1'>
                <div className='flex items-center space-x-3'>
                  <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full animate-pulse'>
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
            <div className='absolute px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full top-4 right-4 animate-bounce'>
              Live Demo
            </div>
          </div>
        </div>

        <div className='mt-16'>
          <div className='grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3 animate-fade-in-up animation-delay-800'>
            <div className='p-6 transition-all duration-500 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-2 hover:scale-105'>
              <div className='mb-2 text-3xl font-bold text-blue-600'>500+</div>
              <div className='text-gray-600'>Schools Trust Us</div>
            </div>
            <div className='p-6 transition-all duration-500 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-2 hover:scale-105 animation-delay-100'>
              <div className='mb-2 text-3xl font-bold text-blue-600'>50K+</div>
              <div className='text-gray-600'>Students Enrolled</div>
            </div>
            <div className='p-6 transition-all duration-500 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-2 hover:scale-105 animation-delay-200'>
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
