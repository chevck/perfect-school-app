import { Shield, Clock, Users, Zap, Brain } from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security with 99.9% uptime guarantee",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate routine tasks and focus on education",
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "Intuitive interface for all users, no training required",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for smooth operations",
    },
  ];

  return (
    <section id='about' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <div className='mb-8'>
              <img
                src='https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt='Modern school technology'
                className='rounded-2xl shadow-lg w-full h-64 object-cover'
              />
            </div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
              Why Choose THE PERFECT SCHOOL APP?
            </h2>
            <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
              We understand the challenges schools face in today's digital age.
              Our platform is designed to simplify operations, enhance learning
              outcomes, and prepare students for the future with AI-powered
              education tools.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {benefits.map((benefit, index) => (
                <div key={index} className='flex items-start space-x-3'>
                  <div className='bg-blue-100 p-2 rounded-lg'>
                    <benefit.icon className='h-5 w-5 text-blue-600' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      {benefit.title}
                    </h4>
                    <p className='text-sm text-gray-600'>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl'>
            <div className='text-center'>
              <div className='bg-white p-6 rounded-xl shadow-lg mb-6'>
                <Brain className='h-12 w-12 text-blue-600 mx-auto mb-4' />
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  TUTOR MY CHILD
                </h3>
                <p className='text-gray-600'>
                  Our flagship AI tutoring feature adapts to each student's
                  learning style, providing personalized assistance and helping
                  them stay ahead of the curriculum.
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div className='bg-white p-4 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>24/7</div>
                  <div className='text-sm text-gray-600'>AI Availability</div>
                </div>
                <div className='bg-white p-4 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>85%</div>
                  <div className='text-sm text-gray-600'>Improvement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
