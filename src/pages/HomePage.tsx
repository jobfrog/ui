import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
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
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Where Talent Meets Opportunity
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          JobFrog is a tech-forward hiring platform built to help professionals
          showcase their abilities and connect with the roles that need them
          most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleSignUp}>
            Sign up for free
          </Button>
          <Button size="lg" variant="outline" onClick={handleSignIn}>
            Sign in
          </Button>
        </div>
      </section>

      {/* Features / Value Props Section */}
      <section className="w-full max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why JobFrog?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Built for Speed</h3>
            <p className="text-muted-foreground">
              We've harnessed a modern tech stack for a seamless user
              experience—ensuring that job seekers and employers can focus on
              making meaningful connections.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">
              Focus on What Matters
            </h3>
            <p className="text-muted-foreground">
              Our platform highlights your real-world skills and experience. We
              cut out unnecessary steps so you can move forward faster.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">
              Transparent & Supportive
            </h3>
            <p className="text-muted-foreground">
              We value open communication. Expect clear feedback and
              straightforward pathways, whether you’re looking to hire or be
              hired.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Optional) */}
      <section className="w-full max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <blockquote className="text-muted-foreground italic mb-4">
              "JobFrog streamlined our hiring process so much that we saved
              weeks of back-and-forth. Finding qualified candidates has never
              been easier."
            </blockquote>
            <p className="font-semibold">— Alex, Startup Founder</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <blockquote className="text-muted-foreground italic mb-4">
              "I was able to showcase my skill set and skip the typical resume
              spam. JobFrog’s matching made the hiring process straightforward
              and stress-free."
            </blockquote>
            <p className="font-semibold">— Taylor, Software Engineer</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full max-w-3xl mx-auto bg-primary/5 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to jump in?</h2>
        <p className="text-muted-foreground mb-6">
          Whether you're a seasoned professional or just starting out, JobFrog
          is here to help you find the perfect match.
        </p>
        <Button size="lg" onClick={handleSignUp}>
          Sign up now
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
