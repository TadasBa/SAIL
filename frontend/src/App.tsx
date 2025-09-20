import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ToolList from "./pages/ToolList";
import ToolForm from "./pages/ToolForm";
import ToolDetails from "./pages/ToolDetails";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="font-bold text-xl text-blue-600">
              AI Tools
            </Link>
            <Link
              to="/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Tool
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-5xl mx-auto p-6 w-full">
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
