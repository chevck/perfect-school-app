import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className='bg-gradient-to-br from-blue-50 to-white py-20 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up text-left'>
              Transform Your School with{" "}
              <span className='text-blue-600'>THE PERFECT SCHOOL APP</span>
            </h1>
            <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-200 text-left'>
              Streamline operations, enhance learning, and manage your
              institution efficiently with our comprehensive school management
              platform featuring AI-powered tutoring.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12 animate-fade-in-up animation-delay-400'>
              <button className='bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-500 transform hover:scale-110 hover:shadow-xl flex items-center space-x-2 group'>
                <span>Start Free Trial</span>
                <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </button>
              <button className='border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-500 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 group'>
                <Play className='h-5 w-5' />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          <div className='relative animate-fade-in-right animation-delay-600'>
            <div className='relative z-10'>
              <img
                src='https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=800'
                alt='Black students using technology in classroom'
                className='rounded-2xl shadow-2xl w-full h-auto transition-transform duration-700 hover:scale-105'
              />
              <div className='absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1'>
                <div className='flex items-center space-x-3'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse'>
                    <span className='text-green-600 font-bold text-lg'>AI</span>
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
            <div className='absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce'>
              Live Demo
            </div>
          </div>
        </div>

        <div className='mt-16'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800'>
            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105'>
              <div className='text-3xl font-bold text-blue-600 mb-2'>500+</div>
              <div className='text-gray-600'>Schools Trust Us</div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animation-delay-100'>
              <div className='text-3xl font-bold text-blue-600 mb-2'>50K+</div>
              <div className='text-gray-600'>Students Enrolled</div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animation-delay-200'>
              <div className='text-3xl font-bold text-blue-600 mb-2'>99.9%</div>
              <div className='text-gray-600'>Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
