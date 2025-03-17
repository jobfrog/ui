import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import JobsPage from "./pages/JobsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
