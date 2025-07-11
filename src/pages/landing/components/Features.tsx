import {
  FileText,
  Users,
  UserCheck,
  CreditCard,
  Brain,
  BookOpen,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Examination Portals",
      description:
        "Create, manage, and conduct online exams with automated grading and detailed analytics.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Student Registration",
      description:
        "Streamlined student enrollment process with digital records and document management.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: UserCheck,
      title: "Teacher Registration",
      description:
        "Efficient teacher onboarding with credential verification and role assignment.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CreditCard,
      title: "Billing & Payment System",
      description:
        "Automated fee collection, invoice generation, and payment tracking for seamless transactions.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Brain,
      title: "TUTOR MY CHILD",
      description:
        "AI-powered personalized tutoring that adapts to each student's learning pace and style.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: BookOpen,
      title: "Curriculum Management",
      description:
        "Organize and track curriculum progress with digital lesson plans and resources.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section id='features' className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-500 hover:text-blue-600'>
            Everything Your School Needs
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Comprehensive features designed to modernize your school operations
            and enhance the learning experience.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up animation-delay-300'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden group animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {index === 4 && (
                <div className='absolute top-0 right-0 w-32 h-32 opacity-10'>
                  <img
                    src='https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=400'
                    alt='Black student with AI technology'
                    className='w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110'
                  />
                </div>
              )}
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <feature.icon className='h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-blue-600'>
                {feature.title}
              </h3>
              <p className='text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
