// @ts-ignore
import AOS from "aos";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails, getRelatedProducts } from "../Product/fetcher/fetcher";
import type { Product } from "../Product/type/type";
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
  const navigate = useNavigate();
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

  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  const originalPrice = Number(product.price);
  const discountAmount = Number(product.discount) || 0;
  const finalPrice = originalPrice - discountAmount;

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-dark text-center py-10 mb-10">
          Detail Products
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          data-aos="fade-right"
        >

          <div data-aos="zoom-in">
            <img
              src={mainImage || product.default_image}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg border"
            />

            <div className="flex justify-center mt-4 gap-2">
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
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

            <div className="mb-4">
              {discountAmount > 0 && (
                <p className="text-gray-500 line-through mb-2">
                  Ks {originalPrice}
                </p>
              )}
              <p className="text-green-600 font-bold text-2xl mb-2">
                Ks {finalPrice}
              </p>
              {discountAmount > 0 && (
                <p className="text-red-600 text-sm">
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
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <div
                className="text-gray-700 leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{
                  __html: truncateHtml(product.description || "", 50),
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


        <h2 className="text-xl font-semibold mb-4 mt-10">Specification</h2>
        <div
          className="text-gray-700 mb-4 leading-relaxed space-y-2 ms-5"
          dangerouslySetInnerHTML={{
            __html:
              (product.specification || "")
          }}
        ></div>

        <div className="text-center" data-aos="fade-up">
          <button
            onClick={() => navigate("/contact")}
            className="px-10 my-20 py-3 bg-[#0067c2] hover:bg-[#1381dcff] text-white font-semibold transition-colors duration-200 rounded-sm"
          >
            Contact Us
          </button>
        </div>


        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2
              className="text-2xl font-bold mb-6 text-gray-800 text-center"
              data-aos="fade-up"
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Full Description</h2>
            <div
              className="text-gray-700 leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            ></div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
