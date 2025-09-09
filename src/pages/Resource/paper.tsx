"use client";
import React, { useEffect, useState } from "react";
import type { Paper } from "../Resource/type/paperType";
import { getLatestPapers } from "../Resource/fetcher/paperFetch";
import PaperCard from "../Resource/paperCard";

const PaperPage: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const data = await getLatestPapers(); 
        setPapers(data || []);               
      } catch (error) {
        console.error("Error fetching papers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPapers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Latest Papers
      </h2>

      {loading ? (
        <p className="text-center">Loading papers...</p>
      ) : papers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No papers available.</p>
      )}
    </div>
  );
};

export default PaperPage;
