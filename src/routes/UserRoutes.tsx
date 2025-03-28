import React from "react";
import { Route, Routes } from "react-router-dom";

// Import career-related pages
import JobsPage from "@/pages/JobsPage";
import CertificationPage from "@/pages/CertificationsPage";

/**
 * Career-related routes grouped together for lazy loading
 * This component handles routes related to jobs and professional development
 */
const CareerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/certifications" element={<CertificationPage />} />
      {/* Add more career-related routes here */}
    </Routes>
  );
};

export default CareerRoutes;
