import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ToolList from "./pages/ToolList";
import ToolForm from "./pages/ToolForm";
import ToolDetails from "./pages/ToolDetails";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <header className="bg-blue-600 text-white p-4 shadow">
          <nav className="max-w-4xl mx-auto flex justify-between">
            <Link to="/" className="font-bold text-lg">AI Tools</Link>
            <Link to="/create" className="bg-white text-blue-600 px-3 py-1 rounded shadow hover:bg-gray-100">
              + Add Tool
            </Link>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto p-6">
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
