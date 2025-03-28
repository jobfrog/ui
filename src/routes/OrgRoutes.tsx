import React from "react";
import { Route, Routes } from "react-router-dom";

// Import organization-related pages
import OrgDashboardPage from "@/pages/org/DashboardPage";
import CandidatesPage from "@/pages/org/CandidatesPage";
import TeamMembersPage from "@/pages/org/TeamMembersPage";
import JobPostingsPage from "@/pages/org/JobPostingsPage";

/**
 * Organization management routes grouped together for lazy loading
 * This component handles all the routes related to organization management
 * that should only be accessible to authenticated users
 */
const OrgRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<OrgDashboardPage />} />
      <Route path="candidates" element={<CandidatesPage />} />
      <Route path="team" element={<TeamMembersPage />} />
      <Route path="jobs" element={<JobPostingsPage />} />
    </Routes>
  );
};

export default OrgRoutes;
