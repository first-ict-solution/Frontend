import { useState, useEffect, useRef } from "react";
import { Search, X, Menu } from "lucide-react";
import Logo from "../assets/Artboard 6.png";
import { Product, Service } from "@/types";
import { searchItems } from "@/pages/search/fetcher/fetcher";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Contents", href: "/contents" },
  { name: "Resources", href: "/resources" },
  { name: "Contact Us", href: "/contact" }
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    products: Product[];
    services: Service[];
  }>({
    products: [],
    services: []
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setResults({ products: [], services: [] });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchItems(query);

        const matchedProducts = data.products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        const matchedService = data.services.filter((service) =>
          service.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults({
          products: matchedProducts,
          services: matchedService
        });
      } catch (err) {
        console.error(err);
        setResults({ products: [], services: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } fixed top-0 left-0 z-50 w-full bg-white shadow transition-all duration-300`}
      >
        <div className="container flex items-center justify-between px-6 py-3 mx-auto">
          <img
            onClick={handleHome}
            src={Logo}
            alt="Logo"
            className="w-auto h-10 cursor-pointer"
          />
          <nav className="hidden space-x-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-gray-600"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to={"/contact"}
              className="flex items-center gap-2 px-4 py-1 text-white bg-blue-600 rounded-sm hover:bg-blue-700 text-md"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => setShowSearch(true)}
              className="hover:text-gray-300"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="px-6 py-4 space-y-2 text-white bg-gray-800 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 hover:text-gray-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed top-0 left-0 w-full h-[100] bg-gray-100 z-50 p-6 overflow-auto">
          <button
            onClick={() => setShowSearch(false)}
            className="absolute text-black right-6 top-6 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products and services..."
              className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4 overflow-y-auto bg-white rounded-md shadow-lg max-h-80">
              {loading && <p className="p-4 text-gray-500">Searching...</p>}

              {!loading &&
              query &&
              results.products.length === 0 &&
              results.services.length === 0 ? (
                <p className="p-4 text-gray-500">No results found.</p>
              ) : null}

              {!loading && results.products.length > 0 ? (
                <div className="px-4 py-2 border-b">
                  <h4 className="mb-2 font-bold">Products</h4>
                  {results.products.map((item) => (
                    <Link
                      key={item.id}
                      to={`/products/${item.slug}`}
                      className="block px-2 py-1 rounded hover:bg-gray-100"
                      onClick={() => setShowSearch(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ) : null}

              {!loading && results.services.length > 0 ? (
                <div className="px-4 py-2">
                  <h4 className="mb-2 font-bold">Services</h4>
                  {results.services.map((item) => (
                    <Link
                      key={item.id}
                      to={`/services/${item.slug.trim()}`}
                      className="block px-2 py-1 rounded hover:bg-gray-100"
                      onClick={() => setShowSearch(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
