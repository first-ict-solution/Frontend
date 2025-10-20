import React, { useEffect, useState } from "react";
import { getLatestContents } from "../content/fetcher/fetcher";
import type { Content } from "@/types";
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
    return <p className="mt-10 text-center text-body">Loading contents...</p>;
  }

  return (
    <>
      <div className="px-6 py-20 mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="font-bold text-gray-900 text-h1">Our Contents</h1>
          <p className="mt-2 mb-20 text-gray-600 text-body">
            Discover the latest articles, tutorials, and guides to boost your
            knowledge.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
