import React, { useEffect, useState } from "react";
import { getFullRoadmap } from "./fetcher/roadmapFetch";
import type { RoadmapItem } from "@/types";

const Roadmap: React.FC = () => {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFullRoadmap();
        setRoadmap(data);
      } catch (error) {
        console.error("Failed to fetch roadmap:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading roadmap...</p>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Roadmap</h2>
      <ul className="space-y-4">
        {roadmap.map((item) => (
          <li
            key={item.id}
            className="p-4 transition border rounded shadow hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <div className="text-gray-700">
              {item.description.replace(/<[^>]+>/g, "")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roadmap;
