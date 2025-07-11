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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up'>
          <div className='animate-fade-in-left'>
            <div className='mb-8 overflow-hidden rounded-2xl'>
              <img
                src='https://images.pexels.com/photos/5212361/pexels-photo-5212361.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt='Black students with modern school technology'
                className='shadow-lg w-full h-64 object-cover transition-transform duration-700 hover:scale-110'
              />
            </div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6 transition-all duration-500 hover:text-blue-600'>
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
                <div
                  key={index}
                  className={`flex items-start space-x-3 transition-all duration-500 hover:transform hover:translate-x-2 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className='bg-blue-100 p-2 rounded-lg transition-all duration-300 hover:bg-blue-200 hover:scale-110'>
                    <benefit.icon className='h-5 w-5 text-blue-600 transition-transform duration-300 hover:scale-110' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1 transition-colors duration-300 hover:text-blue-600'>
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

          <div className='bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl animate-fade-in-right transition-all duration-500 hover:shadow-xl hover:scale-105'>
            <div className='text-center'>
              <div className='bg-white p-6 rounded-xl shadow-lg mb-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group'>
                <Brain className='h-12 w-12 text-blue-600 mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-700' />
                <h3 className='text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600'>
                  TUTOR MY CHILD
                </h3>
                <p className='text-gray-600'>
                  Our flagship AI tutoring feature adapts to each student's
                  learning style, providing personalized assistance and helping
                  them stay ahead of the curriculum.
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div className='bg-white p-4 rounded-lg transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105'>
                  <div className='text-2xl font-bold text-blue-600'>24/7</div>
                  <div className='text-sm text-gray-600'>AI Availability</div>
                </div>
                <div className='bg-white p-4 rounded-lg transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:scale-105 animation-delay-100'>
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
