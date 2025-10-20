import AppRouter from "./lib/router/routes";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/scrollTop";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTop />
      <AppRouter />
    </div>
  );
}

export default App;
