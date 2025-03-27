// src/App.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import HomePage from "./pages/HomePage";

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
    console.log("Auth0 Status:", { isLoading, isAuthenticated });
  }, [isLoading, isAuthenticated, error]);

  // Show loading state while Auth0 initializes
  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated routes */}
        <Route element={<UnauthenticatedLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Add more public routes here */}
        </Route>

        {/* Authenticated routes */}
        <Route
          element={
            isAuthenticated ? (
              <AuthenticatedLayout />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </Suspense>
            }
          />
          {/* Add more authenticated routes here */}
        </Route>

        {/* Catch-all route redirects to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
