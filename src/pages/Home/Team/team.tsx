import { useEffect, useState } from "react";
import "./team.css";
import { getLatestTeams } from "./fetcher/fetcher";
import type { Team } from "./type/type";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { Github, Linkedin, Globe } from "lucide-react";

export default function TeamSection() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    getLatestTeams(8)
      .then((res) => setTeams(res.data))
      .catch(console.error);
  }, []);

  return (
    <section className="team-section bg-white py-12 px-6 mb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 my-20 tracking-wide">
          OUR TEAM
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {teams.map((member, index) => (
            <div
              className="team-card"
              key={member.id || index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={member.team_image}
                alt={member.name}
                className="team-image"
              />

              <div className="overlay-wrapper">
                <div className="overlay-blue">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.position}</p>
                </div>

                {/* Only render icons if data exists */}
                <div className="overlay-black flex space-x-3">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      <Github size={20} />
                    </a>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}

                  {member.portfolio && (
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
