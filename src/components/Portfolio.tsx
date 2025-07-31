import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string; // e.g., 'web', 'mobile', 'cloud'
  description: string;
  image: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
}

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'cloud', label: 'Cloud Solutions' },
];

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects') // replace with your real endpoint
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch portfolio projects.');
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  if (loading) return <p className="text-center py-20">Loading projects...</p>;
  if (error) return <p className="text-center py-20 text-red-600">Error: {error}</p>;

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses achieve their digital transformation goals.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700 transition-colors duration-200">
                  View Details
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Interested in working with us on your next project?</p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
