import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  email?: string;
}

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/team') // Change if needed
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch team members.');
        return res.json();
      })
      .then((data: TeamMember[]) => {
        setTeam(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-20">Loading team members...</p>;
  if (error) return <p className="text-center py-20 text-red-600">Error: {error}</p>;

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate professionals behind our success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 mb-4 text-sm">{member.bio}</p>

                <div className="flex justify-center gap-4">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-500">
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800">
                      <Github size={20} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-red-500">
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Interested in joining our team?</p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Join Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;
