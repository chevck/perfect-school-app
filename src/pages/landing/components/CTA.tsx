import React from "react";
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
          src='https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1200'
          alt='School background'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center relative z-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to Transform Your School?
          </h2>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
            Join hundreds of schools already using THE PERFECT SCHOOL APP to
            modernize their operations and enhance student learning.
          </p>

          <div className='flex flex-wrap justify-center gap-4 mb-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-full'
              >
                <CheckCircle className='h-4 w-4 text-green-300' />
                <span className='text-white text-sm'>{feature}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2'>
              <span>Start Your Free Trial</span>
              <ArrowRight className='h-5 w-5' />
            </button>
            <button className='border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300'>
              Schedule Demo
            </button>
          </div>

          <p className='text-blue-100 text-sm mt-6'>
            No credit card required • Cancel anytime • 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
