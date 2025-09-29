"use client";

import React, { useEffect, useState } from "react";
import { getFullRoadmap } from "./fetcher/roadmapFetch";
import type { RoadmapItem } from "./type/roadmapType";

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
      <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
      <ul className="space-y-4">
        {roadmap.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
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
