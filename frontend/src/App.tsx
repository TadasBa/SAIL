import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ToolList from "./pages/ToolList";
import ToolForm from "./pages/ToolForm";
import ToolDetails from "./pages/ToolDetails";

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen text-gray-800 flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 
                        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#900f_100%)]">
        </div>

        {/* Navbar */}
        <header className="bg-black backdrop-blur shadow">
          <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center">
            <Link to="/" className="font-bold text-2xl sm:text-3xl hover:underline text-white">
              AI Library
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-5xl mx-auto mt-6 px-4 w-full pb-16">
          <Routes>
            <Route path="/" element={<ToolList />} />
            <Route path="/create" element={<ToolForm />} />
            <Route path="/edit/:id" element={<ToolForm />} />
            <Route path="/tools/:id" element={<ToolDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

