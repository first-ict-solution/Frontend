import React, { useEffect, useState } from "react";
import { getLatestContents } from "../content/fetcher/fetcher";
import type { Content } from "../content/type/type";
import ContentCard from "../content/contentCard";
import Footer from "@/components/Footer";

const ContentPage: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await getLatestContents(); 
        setContents(data);
      } catch (err) {
        console.error("Failed to fetch contents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading contents...</p>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0067c2]">Latest Contents</h2>
          <p className="text-gray-500 mt-2 mb-20">
            Discover the latest articles, tutorials, and guides to boost your knowledge.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>

      
      <Footer />
    </>
  );
};

export default ContentPage;
