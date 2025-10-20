import AOS from "aos";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "aos/dist/aos.css";
import { Calendar } from "lucide-react";

import {
  getContentDetails,
  getLatestContents
} from "../content/fetcher/fetcher";
import type { Content } from "@/types";
import Footer from "@/components/Footer";

export default function ContentDetailPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [latestPosts, setLatestPosts] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const detail = await getContentDetails(slug);
        setContent(detail);
        setMainImage(detail.content_image || null);

        const latest = await getLatestContents();
        setLatestPosts(latest.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p className="mt-20 text-center">Loading content...</p>;
  if (!content) return <p className="mt-20 text-center">Content not found.</p>;

  const cleanedParagraph = content.paragraph
    ? content.paragraph.replace(/<span[^>]*>/g, "").replace(/<\/span>/g, "")
    : "";

  return (
    <>
      <div className="grid grid-cols-1 gap-10 px-6 py-12 mx-auto max-w-7xl lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {mainImage && (
            <img
              src={mainImage}
              alt={content.name}
              className="object-cover w-full mb-6 rounded-lg h-100"
              data-aos="fade-up"
            />
          )}

          <div
            className="flex items-center justify-between mb-4"
            data-aos="fade-up"
          >
            <h1 className="text-3xl font-bold">{content.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(content.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            </div>
          </div>

          {content.description && (
            <div
              className="mb-6 leading-relaxed text-gray-900"
              data-aos="fade-up"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          )}

          {cleanedParagraph && (
            <div
              className="mt-4 prose text-gray-800 max-w-none"
              data-aos="fade-up"
              dangerouslySetInnerHTML={{ __html: cleanedParagraph }}
            />
          )}
        </div>

        {/* Sidebar - Latest Posts */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Latest Posts</h2>
            <div className="space-y-4">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <Link
                    to={`/contents/${post.slug}`}
                    key={post.slug}
                    className="flex items-center space-x-3 group"
                  >
                    <img
                      src={post.content_image || "/placeholder.jpg"}
                      alt={post.name}
                      className="object-cover w-16 h-16 rounded-md"
                    />
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })
                            .toUpperCase()}
                        </span>
                      </p>
                      <p className="transition group-hover:text-blue-600 line-clamp-2">
                        {post.name}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No recent posts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
