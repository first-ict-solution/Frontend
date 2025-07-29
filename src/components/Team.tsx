import React from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Visionary leader with 10+ years in software development and business strategy.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@firstict.com'
      }
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Technical architect specializing in scalable systems and cloud infrastructure.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'michael@firstict.com'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Frontend Developer',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'UI/UX expert with passion for creating beautiful and intuitive user experiences.',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'Senior Backend Developer',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Database optimization specialist and API architecture expert.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'david@firstict.com'
      }
    },
    {
      name: 'Lisa Thompson',
      role: 'Project Manager',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Agile methodology expert ensuring projects are delivered on time and within budget.',
      social: {
        linkedin: '#',
        email: 'lisa@firstict.com'
      }
    },
    {
      name: 'Alex Martinez',
      role: 'Mobile Developer',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Cross-platform mobile development specialist with focus on performance optimization.',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of experts brings together years of experience in software development, 
            design, and project management to deliver exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1"
            >
              <div className="relative mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
              
              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <a 
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {member.social.twitter && (
                  <a 
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {member.social.github && (
                  <a 
                    href={member.social.github}
                    className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                  >
                    <Github size={20} />
                  </a>
                )}
                {member.social.email && (
                  <a 
                    href={`mailto:${member.social.email}`}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Mail size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
          <p className="text-gray-600 mb-6">
            We're always looking for talented individuals to join our growing team.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            View Open Positions
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;