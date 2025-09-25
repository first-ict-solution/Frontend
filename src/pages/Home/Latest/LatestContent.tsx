"use client";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { getLatestContents } from "@/pages/content/fetcher/fetcher";
import type { Content } from "@/pages/content/type/type";
import ContentCard from "@/pages/content/contentCard";

export default function LatestContents() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const fetchContents = async () => {
      try {
        const data: Content[] = await getLatestContents(); 
        setContents(data.slice(0, 3)); 
      } catch (error) {
        console.error("Failed to fetch latest contents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  if (loading) return <p className="text-center py-10">Loading contents...</p>;
  if (contents.length === 0) return <p className="text-center py-10">No contents found.</p>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Articles</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the latest trends and insights across our content library.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contents.map((content, index) => (
          <div key={content.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <ContentCard content={content} />
          </div>
        ))}
      </div>
    </section>
  );
}
