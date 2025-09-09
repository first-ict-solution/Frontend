// @ts-ignore
import AOS from "aos";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentDetails } from "../content/fetcher/fetcher";
import type { Content } from "../content/type/type";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";

export default function ContentDetailPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);


  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchContent = async () => {
      try {
        const data: Content = await getContentDetails(slug);
        setContent(data);
        setMainImage(data.content_image || null);
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  if (loading) return <p className="text-center mt-20">Loading content...</p>;
  if (!content) return <p className="text-center mt-20">Content not found.</p>;

  return (
    <>
      <div className="max-w-2xl mx-auto px-6 py-12">
        
        <div
          className="bg-white rounded-lg shadow-lg mt-5 overflow-hidden p-6 flex flex-col items-center"
          data-aos="fade-up"
        >
          
          {mainImage ? (
            <img
              src={mainImage}
              alt={content.name}
              className="w-40 h-40 object-cover rounded-full mb-6 border-4 border-blue-500"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-full mb-6 border-4 border-gray-300">
              No Image
            </div>
          )}

          
          <h1 className="text-2xl font-bold mb-4 text-center">{content.name}</h1>

          
          {content.description && (
            <div className="w-full mb-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{content.description}</p>
            </div>
          )}

          
          {content.paragraph && (
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-2">Content Paragraph</h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: content.paragraph }}
              />
            </div>
          )}

          {/* <p className="mt-6 text-gray-500 text-sm">
            Created at: {content.created_at}
          </p> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
