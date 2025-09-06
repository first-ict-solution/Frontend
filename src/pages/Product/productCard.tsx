import React from "react";
import type { Product } from "./type/type";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const currentPrice = Number(product.price);
  const discount = Number(product.discount) || 0;
  const originalPrice = currentPrice + discount;
  const discountPercent = originalPrice > 0 ? Math.round((discount / originalPrice) * 100) : 0;

  const goToDetail = () => {
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    }
  };

  return (
    <div className="relative bg-[#414864] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">

      
      {discountPercent > 0 && (
        <div className="absolute top-0 right-0 w-20 h-20 z-10 overflow-hidden">
          <div
            className="w-full h-full bg-[#0067C2] relative"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
          >
            <span className="absolute top-3 right-2 text-white font-bold text-[12px] rotate-45">
              {discountPercent}% Off
            </span>
          </div>
        </div>
      )}

      
      {product.default_image ? (
        <img
          src={product.default_image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}

      
      <div className="p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-300 text-sm mb-4">{product.category?.name || product.category_name}</p>

        <div className="flex items-center gap-3 mb-3">
          {discount > 0 && (
            <span className="line-through text-gray-400">Ks {originalPrice}</span>
          )}
          <span className="font-bold text-lg">Ks {currentPrice}</span>
        </div>

        <p className="text-teal-400 font-medium mb-4">{product.instock ? "Instock" : "Out of Stock"}</p>

        <button
          onClick={goToDetail}
          className="w-full bg-[#0067c2] text-white py-2 rounded-lg hover:bg-[#1381dcff] transition-colors duration-200 font-semibold"
        >
          Show Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
