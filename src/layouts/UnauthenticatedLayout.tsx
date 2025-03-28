// src/layouts/UnauthenticatedLayout.tsx
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const UnauthenticatedLayout = () => {
  const { loginWithRedirect } = useAuth0();

  // Auth0 redirect functions
  const handleSignIn = () => {
    loginWithRedirect({
      appState: { returnTo: "/dashboard" },
      authorizationParams: {
        redirect_uri:
          import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
      },
    });
  };

  const handleSignUp = () => {
    loginWithRedirect({
      appState: { returnTo: "/dashboard" },
      authorizationParams: {
        redirect_uri:
          import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
        screen_hint: "signup",
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">jobfrog</span>
            <span className="text-sm text-muted-foreground">beta</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleSignIn}>
              Sign in
            </Button>
            <Button variant="default" onClick={handleSignUp}>
              Sign up
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 jobfrog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UnauthenticatedLayout;
