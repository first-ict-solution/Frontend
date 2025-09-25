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
    return <p className="text-center mt-10 text-body">Loading contents...</p>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-h1 font-bold text-gray-900">Our Contents</h1>
          <p className="text-body text-gray-600 mt-2 mb-20">
            Discover the latest articles, tutorials, and guides to boost your
            knowledge.
          </p>
        </div>

        {/* Content Grid */}
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
