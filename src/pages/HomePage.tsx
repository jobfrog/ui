// src/pages/HomePage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  console.log("HomePage Auth0 Status:", { isAuthenticated });

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      {/* Hero section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Leap into your next role</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          jobfrog is a technical recruiting platform that helps match talented
          developers with companies that value their skills and potential.
        </p>
        <Button
          size="lg"
          onClick={() => {
            console.log("Get Started button clicked");
            loginWithRedirect({
              appState: { returnTo: "/dashboard" },
              authorizationParams: {
                redirect_uri:
                  import.meta.env.VITE_AUTH0_REDIRECT_URI ||
                  window.location.origin,
              },
            });
          }}
        >
          Get Started
        </Button>
      </section>

      {/* Features section */}
      <section className="w-full max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How we're building it
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Modern Tech Stack</h3>
            <p className="text-muted-foreground">
              Built with React, TypeScript, Vite, and shadcn/ui for a fast,
              type-safe, and beautiful user experience.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Transparent Process</h3>
            <p className="text-muted-foreground">
              We're building jobfrog in public, sharing our progress,
              challenges, and learnings along the way.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Developer-First</h3>
            <p className="text-muted-foreground">
              Created by developers for developers, with a focus on what
              matters: skills, culture fit, and meaningful work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="w-full max-w-3xl mx-auto bg-primary/5 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join us on this journey</h2>
        <p className="text-muted-foreground mb-6">
          Whether you're looking for your next role or building your team,
          jobfrog is here to help you make the leap.
        </p>
        <Button
          onClick={() => {
            console.log("Sign Up Now button clicked");
            loginWithRedirect({
              appState: { returnTo: "/dashboard" },
            });
          }}
        >
          Sign Up Now
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
