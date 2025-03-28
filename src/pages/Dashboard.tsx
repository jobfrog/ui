// src/pages/Dashboard.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageCircle,
  Briefcase,
  CheckCircle2,
  CircleDashed,
  Globe,
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";

interface ProfileStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  workType: string;
  tags: string[];
  postedDays: number;
  applicants: number;
  logo?: string;
  description: string;
}

const profileSteps: ProfileStep[] = [
  {
    id: "step-1",
    title: "Complete your profile",
    description: "Add your skills, experience, and preferences",
    completed: true,
  },
  {
    id: "step-2",
    title: "Set job preferences",
    description: "Tell us what kind of roles you're looking for",
    completed: false,
  },
  {
    id: "step-3",
    title: "Add portfolio items",
    description: "Showcase your best work to potential employers",
    completed: false,
  },
];

// Sample data
const recommendedJobs: Job[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "TechSolutions Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    workType: "Remote",
    tags: ["React", "TypeScript", "UI/UX"],
    postedDays: 2,
    applicants: 45,
    description:
      "We're looking for a skilled Frontend Developer to join our team. You'll be responsible for building responsive web applications with modern JavaScript frameworks.",
  },
  {
    id: "job-2",
    title: "Full Stack Engineer",
    company: "Innovate Labs",
    location: "New York, NY",
    salary: "$130,000 - $160,000",
    workType: "Hybrid",
    tags: ["React", "Node.js", "MongoDB"],
    postedDays: 1,
    applicants: 28,
    description:
      "Join our engineering team to develop cutting-edge web applications. You'll work across the entire stack, from front-end interfaces to back-end services.",
  },
  {
    id: "job-3",
    title: "UI/UX Developer",
    company: "DesignWorks Co.",
    location: "Austin, TX",
    salary: "$110,000 - $135,000",
    workType: "Remote",
    tags: ["React", "Figma", "CSS"],
    postedDays: 3,
    applicants: 37,
    description:
      "We're seeking a talented UI/UX Developer who can bridge the gap between design and implementation, creating beautiful and functional user interfaces.",
  },
  // This isn't a real job, but a "see more" slide
  {
    id: "see-more",
    title: "Looking for more opportunities?",
    company: "JobConnect",
    location: "",
    salary: "",
    workType: "",
    tags: [],
    postedDays: 0,
    applicants: 0,
    description:
      "We have thousands of additional positions matching your skills and preferences. Refine your search or browse our full job database to find your perfect match.",
  },
];

// Dashboard Component
const Dashboard = () => {
  const { user } = useAuth0();
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  // Calculate profile completion percentage
  const completedSteps = profileSteps.filter((step) => step.completed).length;
  const profilePercentage = Math.round(
    (completedSteps / profileSteps.length) * 100
  );

  // Get user initials for avatar fallback
  const getUserInitials = (name: string = user?.name || "User") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Job navigation functions
  const nextJob = () => {
    if (currentJobIndex < recommendedJobs.length - 1) {
      setCurrentJobIndex(currentJobIndex + 1);
    }
  };

  const prevJob = () => {
    if (currentJobIndex > 0) {
      setCurrentJobIndex(currentJobIndex - 1);
    }
  };

  const currentJob = recommendedJobs[currentJobIndex];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Profile and Stats */}
        <div className="lg:col-span-1 space-y-5">
          {/* Profile Card */}
          <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="px-4 pb-4 -mt-12">
              <Avatar className="border-4 border-background w-24 h-24">
                <AvatarImage src={user?.picture} alt={user?.name} />
                <AvatarFallback className="text-2xl">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="mt-2">
                <h2 className="text-xl font-bold">
                  {user?.email || "Unknown"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Job Seeker & Developer
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  San Francisco, California
                </div>
                <div className="mt-3">
                  <Button className="w-full">Edit profile</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Strength Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Profile Strength</CardTitle>
              <CardDescription>
                Complete recommended actions to improve your job matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <div className="font-medium">Progress</div>
                  <div className="font-medium text-primary">
                    {profilePercentage}%
                  </div>
                </div>
                <Progress value={profilePercentage} className="h-2" />
              </div>
              <div className="space-y-4">
                {profileSteps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3">
                    {step.completed ? (
                      <CheckCircle2 size={20} className="text-primary mt-0.5" />
                    ) : (
                      <CircleDashed
                        size={20}
                        className="text-muted-foreground mt-0.5"
                      />
                    )}
                    <div>
                      <p
                        className={`font-medium ${
                          step.completed ? "" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      {!step.completed && (
                        <Button variant="link" className="p-0 h-auto mt-1">
                          Complete Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3 space-y-5">
          {/* Job Recommendation Card with carousel interface */}
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    Recommended Jobs ({recommendedJobs.length - 1})
                  </CardTitle>
                  <CardDescription>
                    Based on your profile and preferences
                  </CardDescription>
                </div>
                <div className="text-sm font-medium">
                  {currentJobIndex + 1}/{recommendedJobs.length}
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative pb-6">
              {/* Navigation buttons - full height */}
              {currentJobIndex > 0 && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center cursor-pointer z-10 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  onClick={prevJob}
                >
                  <ArrowLeft size={24} className="text-gray-500" />
                </div>
              )}
              {currentJobIndex < recommendedJobs.length - 1 && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center cursor-pointer z-10 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  onClick={nextJob}
                >
                  <ArrowRight size={24} className="text-gray-500" />
                </div>
              )}

              <div className="px-12">
                {/* "See More" slide special styling */}
                {currentJobIndex === recommendedJobs.length - 1 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Briefcase size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {currentJob.title}
                    </h3>
                    <p className="text-sm max-w-md">{currentJob.description}</p>
                    <Button className="mt-4" size="lg">
                      Browse All Jobs
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Company info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {currentJob.company.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {currentJob.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building2 size={14} className="mr-1" />
                          <span>{currentJob.company}</span>
                          <span className="mx-1">•</span>
                          <MapPin size={14} className="mr-1" />
                          <span>{currentJob.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <DollarSign
                          size={16}
                          className="text-muted-foreground"
                        />
                        <span>{currentJob.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-muted-foreground" />
                        <span>{currentJob.workType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span>Posted {currentJob.postedDays} days ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-muted-foreground" />
                        <span>{currentJob.applicants} applicants</span>
                      </div>
                    </div>

                    {/* Job description */}
                    <p className="text-sm">{currentJob.description}</p>

                    {/* Skills/tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentJob.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            {currentJobIndex !== recommendedJobs.length - 1 && (
              <CardFooter className="flex gap-2 pt-4 border-t">
                <Button className="flex-1" variant="default">
                  Apply now
                </Button>
                <Button className="flex-1" variant="outline">
                  Not interested
                </Button>
                <Button className="flex-1" variant="secondary">
                  Save for later
                </Button>
              </CardFooter>
            )}
          </Card>

          {/* Social Feed Placeholder */}
          <Card className="border-2 border-dashed rounded-lg p-8 mt-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <MessageCircle size={40} className="text-muted-foreground/50" />
              <h3 className="text-xl font-medium text-muted-foreground">
                Social Feed Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Connect with professionals in your field, share updates, and
                stay informed about industry trends and opportunities.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
