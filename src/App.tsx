// src/App.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobsPage from "./pages/JobsPage";
import CertificationPage from "./pages/CertificationsPage";

// Lazy load authenticated pages for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Loading state component
const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
  </div>
);

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  // Debug Auth0 connection
  useEffect(() => {
    if (error) {
      console.error("Auth0 Error:", error);
    }
  }, [isLoading, isAuthenticated, error]);

  // Show loading state while Auth0 initializes
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

          {/* Public routes that always use UnauthenticatedLayout */}
          <Route element={<UnauthenticatedLayout />}>
            <Route path="/login" element={<LoginPage />} />
            {/* Add more public routes here */}
          </Route>

          {/* Authenticated routes that require login */}
          <Route
            element={
              isAuthenticated ? (
                <AuthenticatedLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            {/* Dashboard path redirects to home when authenticated since they're the same */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            {/* Other authenticated routes */}
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/certifications" element={<CertificationPage />} />
            {/* Add more authenticated routes here */}
          </Route>

          {/* Custom 404 Not Found page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
