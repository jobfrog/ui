import React from "react";
import { useParams } from "react-router-dom";
import {
  Users,
  Briefcase,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

// Import shadcn components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the dashboard
interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

interface RecentCandidate {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  matchPercentage: number;
  tags: string[];
  date: string;
}

interface ActiveJob {
  id: string;
  title: string;
  location: string;
  applicants: number;
  newApplicants: number;
  daysLeft: number;
}

interface UpcomingInterview {
  id: string;
  candidateName: string;
  avatarUrl: string;
  position: string;
  date: string;
  time: string;
  interviewer: string;
}

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  date: string;
  target: string;
}

const DashboardPage: React.FC = () => {
  const { orgSlug } = useParams<{ orgSlug: string }>();

  // Mock metrics data
  const metrics: MetricCard[] = [
    {
      title: "Active Candidates",
      value: "247",
      change: "+12% this month",
      isPositive: true,
      icon: Users,
    },
    {
      title: "Open Positions",
      value: "18",
      change: "+3 since last month",
      isPositive: true,
      icon: Briefcase,
    },
    {
      title: "Interviews Scheduled",
      value: "32",
      change: "+8 this week",
      isPositive: true,
      icon: Calendar,
    },
    {
      title: "Average Time to Hire",
      value: "23 days",
      change: "-2 days from last quarter",
      isPositive: true,
      icon: Clock,
    },
  ];

  // Mock recent candidates
  const recentCandidates: RecentCandidate[] = [
    {
      id: "1",
      name: "Alex Morgan",
      avatarUrl: "",
      title: "Senior Frontend Developer",
      matchPercentage: 92,
      tags: ["React", "TypeScript"],
      date: "Today",
    },
    {
      id: "2",
      name: "Casey Kim",
      avatarUrl: "",
      title: "UX Designer",
      matchPercentage: 87,
      tags: ["Figma", "User Research"],
      date: "Yesterday",
    },
    {
      id: "3",
      name: "Jordan Roberts",
      avatarUrl: "",
      title: "Full Stack Engineer",
      matchPercentage: 85,
      tags: ["Node.js", "MongoDB"],
      date: "2 days ago",
    },
    {
      id: "4",
      name: "Taylor Patel",
      avatarUrl: "",
      title: "DevOps Engineer",
      matchPercentage: 78,
      tags: ["Kubernetes", "AWS"],
      date: "3 days ago",
    },
  ];

  // Mock active jobs
  const activeJobs: ActiveJob[] = [
    {
      id: "1",
      title: "Senior React Developer",
      location: "San Francisco, CA (Remote)",
      applicants: 48,
      newApplicants: 12,
      daysLeft: 14,
    },
    {
      id: "2",
      title: "Product Designer",
      location: "New York, NY (Hybrid)",
      applicants: 34,
      newApplicants: 5,
      daysLeft: 21,
    },
    {
      id: "3",
      title: "Backend Engineer",
      location: "Austin, TX (Onsite)",
      applicants: 27,
      newApplicants: 8,
      daysLeft: 7,
    },
  ];

  // Mock upcoming interviews
  const upcomingInterviews: UpcomingInterview[] = [
    {
      id: "1",
      candidateName: "Morgan Chen",
      avatarUrl: "",
      position: "Senior React Developer",
      date: "Today",
      time: "2:00 PM",
      interviewer: "Alex Johnson",
    },
    {
      id: "2",
      candidateName: "Jamie Taylor",
      avatarUrl: "",
      position: "Product Designer",
      date: "Tomorrow",
      time: "10:30 AM",
      interviewer: "Sam Rodriguez",
    },
    {
      id: "3",
      candidateName: "Riley Kim",
      avatarUrl: "",
      position: "Backend Engineer",
      date: "Mar 30",
      time: "1:15 PM",
      interviewer: "Jordan Lee",
    },
  ];

  // Mock activity feed
  const activityFeed: ActivityItem[] = [
    {
      id: "1",
      action: "added a new candidate",
      user: "Alex Johnson",
      date: "10 min ago",
      target: "Senior React Developer",
    },
    {
      id: "2",
      action: "scheduled an interview with",
      user: "Sam Rodriguez",
      date: "1 hour ago",
      target: "Jamie Taylor",
    },
    {
      id: "3",
      action: "posted a new job",
      user: "Jordan Lee",
      date: "3 hours ago",
      target: "DevOps Engineer",
    },
    {
      id: "4",
      action: "moved candidate to final round",
      user: "Taylor Williams",
      date: "Yesterday",
      target: "Riley Kim",
    },
    {
      id: "5",
      action: "sent an offer to",
      user: "Morgan Chen",
      date: "Yesterday",
      target: "Senior Backend Developer",
    },
  ];

  // Mock hiring funnel data
  const hiringFunnelData = [
    { stage: "Applied", count: 382, percentage: 100 },
    { stage: "Screened", count: 215, percentage: 56 },
    { stage: "Interview", count: 94, percentage: 25 },
    { stage: "Assessment", count: 47, percentage: 12 },
    { stage: "Final", count: 23, percentage: 6 },
    { stage: "Offer", count: 12, percentage: 3 },
    { stage: "Hired", count: 8, percentage: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Organization overview and hiring metrics for{" "}
            {orgSlug?.replace("-", " ")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            View All Candidates
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold mt-1">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs ${
                        metric.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Candidates */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Recent Candidates
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={candidate.avatarUrl} />
                    <AvatarFallback>
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm truncate">
                        {candidate.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 ml-2"
                      >
                        {candidate.matchPercentage}% match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {candidate.title}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {candidate.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs h-5 px-1.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {candidate.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Middle Column - Active Jobs */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Active Job Postings
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
              Manage Jobs <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{job.title}</h3>
                    <Badge
                      variant={job.daysLeft <= 7 ? "destructive" : "outline"}
                      className="text-xs"
                    >
                      {job.daysLeft} days left
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {job.location}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <span className="text-sm font-medium">
                        {job.applicants}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        applicants
                      </span>
                      {job.newApplicants > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-1 text-xs h-5 px-1.5"
                        >
                          +{job.newApplicants} new
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full">
              <Briefcase className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column - Tabs for Upcoming Interviews and Activity */}
        <Card className="lg:col-span-1">
          <Tabs defaultValue="interviews">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="interviews">
                    Upcoming Interviews
                  </TabsTrigger>
                  <TabsTrigger value="activity">Activity Feed</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="interviews" className="mt-0 space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={interview.avatarUrl} />
                      <AvatarFallback>
                        {interview.candidateName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">
                        {interview.candidateName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {interview.position}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{interview.date}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{interview.time}</span>
                        </div>
                        <div className="ml-auto flex items-center text-xs">
                          <span>with {interview.interviewer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="space-y-3">
                  {activityFeed.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-2 py-2 border-b border-border last:border-0"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">
                            {activity.action}
                          </span>{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      {/* Hiring Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Hiring Funnel</CardTitle>
          <CardDescription>
            Overview of candidates at each stage of your hiring process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hiringFunnelData.map((stage, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">
                      ({stage.count})
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stage.percentage}%
                  </span>
                </div>
                <Progress value={stage.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between text-xs text-muted-foreground">
            <span>Last 30 days</span>
            <Button variant="link" className="h-auto p-0">
              View detailed analytics
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardPage;
