
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home/home";
import ProductsPage from "@/pages/Product/product";
import ProductDetail from "@/pages/Product/detailProduct";
import ServiceList from "@/pages/Service/service";
import ServiceDetail from "@/pages/Service/serviceDetail";
import ContentPage from "@/pages/content/content";
import ContentDetailPage from "@/pages/content/contentDetail";
import Resource from "@/pages/Resource/Resource";
import Contact from "@/components/contact";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/service" element={<ServiceList />} />
        <Route path="/service/:slug" element={<ServiceDetail />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/content/:slug" element={<ContentDetailPage />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </BrowserRouter>
  );
}
