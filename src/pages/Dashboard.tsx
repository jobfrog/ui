// src/pages/Dashboard.tsx
import { useAuth0 } from "@auth0/auth0-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth0();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button className="flex items-center gap-1">
          <PlusCircle size={16} />
          <span>Create New</span>
        </Button>
      </div>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.name || "there"}!</CardTitle>
            <CardDescription>
              This is your jobfrog dashboard where you can manage your
              recruiting journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We're still building out the platform. Here's what you can expect
              in the coming weeks:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Profile builder to showcase your skills and experience</li>
              <li>
                Job search with filters for tech stack, location, and more
              </li>
              <li>Application tracking to manage your job hunt</li>
              <li>Employer tools for posting jobs and reviewing candidates</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of your activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Interviews</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Saved Jobs</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Profile Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Complete these steps to get the most out of jobfrog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  1
                </div>
                <div>
                  <p className="font-medium">Complete your profile</p>
                  <p className="text-sm text-muted-foreground">
                    Add your skills, experience, and preferences
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  2
                </div>
                <div>
                  <p className="font-medium">Set job preferences</p>
                  <p className="text-sm text-muted-foreground">
                    Tell us what kind of roles you're looking for
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  3
                </div>
                <div>
                  <p className="font-medium">Explore jobs</p>
                  <p className="text-sm text-muted-foreground">
                    Browse available opportunities that match your skills
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
