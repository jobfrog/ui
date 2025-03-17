// src/pages/HomePage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, BarChart4, Calendar } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Track Job Listings",
      description: "Save and organize job opportunities in one place.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Manage Applications",
      description: "Track the status of all your job applications.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Interviews",
      description: "Keep track of upcoming interviews and deadlines.",
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      title: "Visualize Progress",
      description: "Get insights into your job search with detailed analytics.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Leap ahead in your job search
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mb-8">
            JobFrog helps you organize your job search, track applications, and
            land your dream role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your job search
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to streamline your job search?
          </h2>
          <p className="text-lg mb-8 max-w-[600px] mx-auto opacity-90">
            Join thousands of job seekers who are organizing their search and
            landing offers faster.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/dashboard")}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
