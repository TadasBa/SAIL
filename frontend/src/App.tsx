import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ToolList from "./pages/ToolList";
import ToolForm from "./pages/ToolForm";
import ToolDetails from "./pages/ToolDetails";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ToolList />} />
        <Route path="create" element={<ToolForm />} />
        <Route path="edit/:id" element={<ToolForm />} />
        <Route path="tools/:id" element={<ToolDetails />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
