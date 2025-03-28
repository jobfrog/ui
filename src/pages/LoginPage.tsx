// src/pages/LoginPage.tsx
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginRedirect = async () => {
      // If user is already authenticated, redirect to dashboard
      if (isAuthenticated) {
        navigate("/dashboard");
        return;
      }

      // If not authenticated and not currently loading auth state,
      // redirect to Auth0 login page
      if (!isLoading) {
        await loginWithRedirect({
          appState: { returnTo: "/dashboard" },
          authorizationParams: {
            redirect_uri:
              import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
          },
        });
      }
    };

    handleLoginRedirect();
  }, [isAuthenticated, isLoading, loginWithRedirect, navigate]);

  // Show a loading state while we're figuring out auth status or redirecting
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="text-lg text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default LoginPage;
