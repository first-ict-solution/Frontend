import { useEffect, useState } from "react";
import "./team.css";
import { getLatestTeams } from "./fetcher/fetcher";
import type { Team } from "./type/type";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

export default function TeamSection() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 800,     
      easing: "zoom-in", 
      once: true,         
    });

    getLatestTeams(8)
      .then((res) => setTeams(res.data))
      .catch(console.error);
  }, []);

  return (
    <section className="bg-white py-12 px-6 mb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 my-20 tracking-wide">
          OUR TEAM
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {teams.map((m, i) => (
            <div
              className="card-outer"
              key={i}
              data-aos="zoom-in" 
              data-aos-delay={i * 100} 
            >
              <div className="card-frame">
                <div className="card-face">
                  <div className="portrait-wrap">
                    {m.team_image ? (
                      <img
                        src={m.team_image}
                        alt={m.name}
                        className="portrait"
                      />
                    ) : (
                      <div className="portrait placeholder"></div>
                    )}
                  </div>

                  <div className="label-wrap">
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.position}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
