import AOS from "aos";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProductDetails,
  getRelatedProducts
} from "../Product/fetcher/fetcher";
import type { Product } from "@/types";
import ProductCard from "../Product/productCard";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";

export default function ProductDetail() {
  const { slug } = useParams<{ slug?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const getWordCount = (html: string) => {
    const text = html.replace(/<[^>]+>/g, " ");
    return text.trim().split(/\s+/).length;
  };

  const truncateHtml = (html: string, limit: number) => {
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return html;
    return words.slice(0, limit).join(" ") + "...";
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const data: Product = await getProductDetails(slug);
        setProduct(data);
        setMainImage(data.default_image || null);
        if (data?.id && data?.category_id) {
          const related = await getRelatedProducts(data.id, data.category_id);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p className="mt-20 text-center">Loading product...</p>;
  if (!product) return <p className="mt-20 text-center">Product not found.</p>;

  const originalPrice = Number(product.price);
  const discountAmount = Number(product.discount) || 0;
  const finalPrice = originalPrice - discountAmount;

  return (
    <>
      <div className="max-w-6xl px-6 py-12 mx-auto">
        <h2 className="py-10 mb-10 text-3xl font-bold text-center text-dark">
          Detail Products
        </h2>

        <div
          className="grid grid-cols-1 gap-10 md:grid-cols-2"
          data-aos="fade-right"
        >
          <div data-aos="zoom-in">
            <img
              src={mainImage || product.default_image}
              alt={product.name}
              className="object-contain w-full border rounded-lg h-96"
            />

            <div className="flex justify-center gap-2 mt-4">
              {product.images?.map((imgObj) => (
                <img
                  key={imgObj.id}
                  src={imgObj.image.url}
                  alt={`${product.name} ${imgObj.id}`}
                  className={`w-20 h-20 object-contain border rounded cursor-pointer transition-transform hover:scale-105 
                    ${mainImage === imgObj.image.url ? "border-blue-500" : ""}`}
                  onClick={() => setMainImage(imgObj.image.url)}
                />
              ))}
            </div>
          </div>

          <div data-aos="fade-left">
            <h1 className="mb-3 text-3xl font-bold">{product.name}</h1>

            <div className="mb-4">
              {discountAmount > 0 && (
                <p className="mb-2 text-gray-500 line-through">
                  Ks {originalPrice}
                </p>
              )}
              <p className="mb-2 text-2xl font-bold text-green-600">
                Ks {finalPrice}
              </p>
              {discountAmount > 0 && (
                <p className="text-sm text-red-600">
                  {product.discount}% OFF (Save - Ks {discountAmount})
                </p>
              )}
            </div>

            <p className="mb-2">
              {product.instock ? (
                <span className="text-green-600">✔ Instock Now</span>
              ) : (
                <span className="text-red-600">✘ Out of stock</span>
              )}
            </p>

            <div className="mt-8">
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <div
                className="space-y-2 leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: truncateHtml(product.description || "", 50)
                }}
              ></div>

              {getWordCount(product.description || "") > 50 && (
                <button
                  onClick={() => setShowPopup(true)}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  See More
                </button>
              )}
            </div>
          </div>
        </div>

        <h2 className="mt-10 mb-4 text-xl font-semibold">Specification</h2>
        <div
          className="mb-4 space-y-2 leading-relaxed text-gray-700 ms-5"
          dangerouslySetInnerHTML={{
            __html: product.specification || ""
          }}
        ></div>

        <div className="text-center" data-aos="fade-up">
          <Link
            to={"/contact"}
            className="px-10 my-20 py-3 bg-[#0067c2] hover:bg-[#1381dcff] text-white font-semibold transition-colors duration-200 rounded-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2
              className="mb-6 text-2xl font-bold text-center text-gray-800"
              data-aos="fade-up"
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedProducts.map((rp, index) => (
                <div
                  key={rp.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <ProductCard product={rp} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute text-gray-600 top-3 right-3 hover:text-black"
            >
              ✕
            </button>
            <h2 className="mb-4 text-xl font-semibold">Full Description</h2>
            <div
              className="space-y-2 leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            ></div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
