import { ArrowRight, CheckCircle } from "lucide-react";

const CTA = () => {
  const features = [
    "30-day free trial",
    "No setup fees",
    "Dedicated support",
    "Data migration included",
  ];

  return (
    <section className='py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden'>
      <div className='absolute inset-0 opacity-10'>
        <img
          src='https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=1200'
          alt='Black students in school background'
          className='w-full h-full object-cover transition-transform duration-1000 hover:scale-105'
        />
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center relative z-10 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-500 hover:scale-105'>
            Ready to Transform Your School?
          </h2>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200'>
            Join hundreds of schools already using THE PERFECT SCHOOL APP to
            modernize their operations and enhance student learning.
          </p>

          <div className='flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up animation-delay-400'>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-full transition-all duration-500 hover:bg-opacity-20 hover:scale-105 animate-fade-in-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <CheckCircle className='h-4 w-4 text-green-300 transition-transform duration-300 hover:scale-110' />
                <span className='text-white text-sm'>{feature}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600'>
            <button className='bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl flex items-center justify-center space-x-2 group'>
              <span>Start Your Free Trial</span>
              <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-2' />
            </button>
            <button className='border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-500 transform hover:scale-105 hover:shadow-xl'>
              Schedule Demo
            </button>
          </div>

          <p className='text-blue-100 text-sm mt-6 animate-fade-in-up animation-delay-800'>
            No credit card required • Cancel anytime • 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
