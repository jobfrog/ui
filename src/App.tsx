import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

// Lazy load all page components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const JobsPage = lazy(() => import("./pages/JobsPage"));
const CertificationPage = lazy(() => import("./pages/CertificationsPage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const OrgProfilePage = lazy(() => import("./pages/org/OrgProfilePage"));
const OrgDashboardPage = lazy(() => import("./pages/org/DashboardPage"));
const CandidatesPage = lazy(() => import("./pages/org/CandidatesPage"));
const TeamMembersPage = lazy(() => import("./pages/org/TeamMembersPage"));
const JobPostingsPage = lazy(() => import("./pages/org/JobPostingsPage"));

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
  </div>
);

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  useEffect(() => {
    if (error) {
      console.error("Auth0 Error:", error);
    }
  }, [isLoading, isAuthenticated, error]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Root path - conditionally render based on auth state */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <AuthenticatedLayout />
              ) : (
                <UnauthenticatedLayout />
              )
            }
          >
            <Route
              index
              element={
                isAuthenticated ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <Dashboard />
                  </Suspense>
                ) : (
                  <HomePage />
                )
              }
            />
          </Route>

          {/* Public routes (still always unauthenticated layout) */}
          <Route element={<UnauthenticatedLayout />}>
            <Route path="/login" element={<LoginPage />} />
            {/* ...any other truly public routes here... */}
          </Route>

          {/* Routes that adapt layout based on authentication status */}

          {/* User profiles */}
          <Route
            path="/u/:username"
            element={
              isAuthenticated ? (
                <AuthenticatedLayout />
              ) : (
                <UnauthenticatedLayout />
              )
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <UserProfile />
                </Suspense>
              }
            />
          </Route>

          {/* Organization profiles - use auth layout if logged in, unauth if not */}
          <Route
            path="/orgs/:orgSlug"
            element={
              isAuthenticated ? (
                <AuthenticatedLayout />
              ) : (
                <UnauthenticatedLayout />
              )
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <OrgProfilePage />
                </Suspense>
              }
            />
          </Route>

          {/* Authenticated-only routes */}
          <Route
            element={
              isAuthenticated ? (
                <AuthenticatedLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            <Route
              path="/jobs"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <JobsPage />
                </Suspense>
              }
            />

            <Route
              path="/certifications"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <CertificationPage />
                </Suspense>
              }
            />

            {/* Organization routes grouped together */}
            <Route path="/orgs/:orgSlug">
              <Route
                path="dashboard"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <OrgDashboardPage />
                  </Suspense>
                }
              />

              <Route
                path="candidates"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CandidatesPage />
                  </Suspense>
                }
              />

              <Route
                path="team"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <TeamMembersPage />
                  </Suspense>
                }
              />

              <Route
                path="jobs"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <JobPostingsPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>

          {/* 404: Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
