import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Star,
  Award,
  Users,
  Search,
  BookOpen,
  User,
  FileText,
  Code,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const CertificationPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Define the certification levels
  const certificationLevels = [
    { name: "Basic", color: "bg-blue-100 text-blue-800" },
    { name: "Intermediate", color: "bg-amber-100 text-amber-800" },
    { name: "Advanced", color: "bg-purple-100 text-purple-800" },
  ];

  // Online certifications with Silicon Valley references
  const onlineCertifications = [
    {
      id: 1,
      title: "Richard's Basic Compression",
      description: "Learn the fundamentals of middle-out compression.",
      duration: "2 hours",
      level: "Basic",
      students: 3750,
      popular: true,
      skills: ["Middle-Out", "Java", "Server Setup"],
      category: "Engineering",
    },
    {
      id: 2,
      title: "Dinesh's Frontend Crash Course",
      description:
        "Build dynamic web interfaces and expand your comedic banter.",
      duration: "4 hours",
      level: "Intermediate",
      students: 2450,
      popular: true,
      skills: ["React", "JavaScript", "APIs", "CSS Tricks"],
      category: "Engineering",
    },
    {
      id: 3,
      title: "Gilfoyle's Advanced Security",
      description:
        "Master server security, system architecture, and devil worship.",
      duration: "5 hours",
      level: "Advanced",
      students: 890,
      popular: false,
      skills: [
        "Linux Administration",
        "System Architecture",
        "Security Protocols",
      ],
      category: "Engineering",
    },
    {
      id: 4,
      title: "Erlich's Pitch Deck Basics",
      description:
        "Introduction to pitching, valley speak, and investor relations.",
      duration: "3 hours",
      level: "Basic",
      students: 3100,
      popular: true,
      skills: ["Pitching", "Slide Decks", "Buzzwords"],
      category: "Design",
    },
    {
      id: 5,
      title: "Big Head's Project Management",
      description: "Learn how to manage projects while barely trying.",
      duration: "3.5 hours",
      level: "Intermediate",
      students: 1820,
      popular: false,
      skills: ["Slack Usage", "Delegation", "Passive Participation"],
      category: "Design",
    },
    {
      id: 6,
      title: "Jared's Organizational Scalability",
      description: "Streamline operations and synergy across teams.",
      duration: "2.5 hours",
      level: "Basic",
      students: 2750,
      popular: true,
      skills: ["Process Management", "Documentation", "Corporate Culture"],
      category: "Engineering",
    },
    {
      id: 7,
      title: "Russ Hanneman's Branding",
      description: "Make everything 'ThisGuyF*cks.' Grow your personal brand.",
      duration: "4 hours",
      level: "Intermediate",
      students: 1950,
      popular: false,
      skills: ["Branding", "Social Media", "Investor Hype"],
      category: "Design",
    },
    {
      id: 8,
      title: "Gavin Belson's Data Control",
      description:
        "Nucleus, box-based analytics, and forced synergy explained.",
      duration: "3 hours",
      level: "Basic",
      students: 2200,
      popular: false,
      skills: ["Data Analytics", "Hooli Integration", "Corporate Espionage"],
      category: "Data",
    },
  ];

  // Advanced (interview-based) certifications with Silicon Valley references
  const advancedCertifications = [
    {
      id: 1,
      title: "Pied Piper Architect",
      description:
        "In-depth assessment of distributed compression architecture.",
      prerequisites: [
        "Richard's Basic Compression",
        "2+ years professional compression experience",
      ],
      format: "90-minute technical interview",
      level: "Expert",
      category: "Engineering",
      duration: "90 minutes",
      ratingDimensions: [
        {
          name: "Compression Algorithm Knowledge",
          description:
            "Understanding of the middle-out approach and data structures",
        },
        {
          name: "Architecture",
          description: "Designing scalable compression systems",
        },
        {
          name: "Problem Solving",
          description: "Approach to tackling complex compression challenges",
        },
        {
          name: "Code Quality",
          description: "Writing maintainable, well-tested code",
        },
        {
          name: "System Design",
          description: "Building robust architectures for large-scale data",
        },
      ],
    },
    {
      id: 2,
      title: "Hooli Full Stack Developer",
      description:
        "Evaluation of your capacity to handle the entire Hooli stack.",
      prerequisites: [
        "Dinesh's Frontend Crash Course",
        "Jared's Organizational Scalability",
      ],
      format: "60-minute system design interview + 45-minute coding challenge",
      level: "Expert",
      category: "Engineering",
      duration: "105 minutes",
      ratingDimensions: [
        {
          name: "Frontend Skills",
          description: "UI development with maximum synergy",
        },
        {
          name: "Backend Skills",
          description: "Server architecture and database management",
        },
        {
          name: "System Integration",
          description: "Connecting Nucleus with the rest of Hooli's services",
        },
        {
          name: "DevOps Knowledge",
          description: "Continuous deployment with Hooli-level efficiency",
        },
        {
          name: "Full Stack Architecture",
          description: "End-to-end design for robust data flow",
        },
      ],
    },
    {
      id: 3,
      title: "Aviato UX Visionary",
      description:
        "Assess your ability to create stunning pitch decks and experiences.",
      prerequisites: [
        "Erlich's Pitch Deck Basics",
        "Solid portfolio and self-promotion skills",
      ],
      format: "Case study presentation and critique session",
      level: "Expert",
      category: "Design",
      duration: "75 minutes",
      ratingDimensions: [
        {
          name: "User Research",
          description: "Gathering and analyzing user feedback",
        },
        {
          name: "Interaction Design",
          description: "Smooth user flows and interactions",
        },
        {
          name: "Visual Design",
          description: "Brand consistency and aesthetic excellence",
        },
        {
          name: "Prototyping",
          description: "Building effective wireframes and clickable prototypes",
        },
        {
          name: "Design Systems",
          description: "Maintaining design patterns at scale",
        },
      ],
    },
    {
      id: 4,
      title: "Nucleus Data Wizard",
      description:
        "Demonstrate your data manipulation skills with next-level analytics.",
      prerequisites: [
        "Gavin Belson's Data Control",
        "Familiarity with SQL or NoSQL",
      ],
      format: "Data analysis project and presentation",
      level: "Expert",
      category: "Data",
      duration: "120 minutes",
      ratingDimensions: [
        {
          name: "Data Preparation",
          description: "Cleaning, transforming, and validating data",
        },
        {
          name: "Analysis Methods",
          description: "Applying appropriate analytics techniques",
        },
        {
          name: "Data Visualization",
          description: "Creating clear and insightful representations",
        },
        {
          name: "Statistical Knowledge",
          description: "Using stats effectively for deeper insights",
        },
        {
          name: "Insight Generation",
          description: "Delivering game-changing ideas to management",
        },
      ],
    },
  ];

  // Filter certifications based on search and filter options
  const filteredOnlineCerts = onlineCertifications
    .filter((cert) => {
      // Apply category/level filter
      if (filter !== "all" && filter !== "popular") {
        if (
          filter === "Basic" ||
          filter === "Intermediate" ||
          filter === "Advanced"
        ) {
          return cert.level === filter;
        } else {
          return cert.category.toLowerCase() === filter.toLowerCase();
        }
      }
      // Apply popular filter
      if (filter === "popular") return cert.popular;
      return true;
    })
    .filter((cert) => {
      // Apply search filter
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        cert.title.toLowerCase().includes(query) ||
        cert.description.toLowerCase().includes(query) ||
        cert.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Simple Hero (no example certificate) */}
      <div className="rounded-lg border bg-card text-card-foreground shadow mb-12">
        <div className="p-6 md:p-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            JobFrog Certification Center
          </h1>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Validate your skills with practical, industry-relevant assessments
            designed to help you stand out in the job market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm">Skill-based</h3>
                <p className="text-sm text-muted-foreground">
                  Focused on practical abilities
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm">Time-efficient</h3>
                <p className="text-sm text-muted-foreground">
                  Most take just a few hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm">Standardized</h3>
                <p className="text-sm text-muted-foreground">
                  Consistent evaluation criteria
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm">Expert-reviewed</h3>
                <p className="text-sm text-muted-foreground">
                  Assessed by professionals
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button>Browse Certifications</Button>
            <Button variant="outline">How It Works</Button>
          </div>
        </div>
      </div>

      {/* Main Certification Content Tabs */}
      <Tabs defaultValue="online" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="online">Online Certifications</TabsTrigger>
          <TabsTrigger value="advanced">Interview Assessments</TabsTrigger>
        </TabsList>

        {/* Online Certifications Tab */}
        <TabsContent value="online">
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certifications..."
                  className="pl-10 w-full sm:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filter === "popular" ? "default" : "outline"}
                  onClick={() => setFilter("popular")}
                  size="sm"
                >
                  <Star className="h-3 w-3 mr-1" /> Popular
                </Button>
                <Button
                  variant={filter === "Engineering" ? "default" : "outline"}
                  onClick={() => setFilter("Engineering")}
                  size="sm"
                >
                  Engineering
                </Button>
                <Button
                  variant={filter === "Design" ? "default" : "outline"}
                  onClick={() => setFilter("Design")}
                  size="sm"
                >
                  Design
                </Button>
                <Button
                  variant={filter === "Data" ? "default" : "outline"}
                  onClick={() => setFilter("Data")}
                  size="sm"
                >
                  Data
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {certificationLevels.map((level) => (
                <Button
                  key={level.name}
                  variant={filter === level.name ? "default" : "outline"}
                  onClick={() => setFilter(level.name)}
                  size="sm"
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </div>

          {filteredOnlineCerts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                No certifications found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOnlineCerts.map((cert) => {
                // Find the level object for this certification
                const levelObj = certificationLevels.find(
                  (l) => l.name === cert.level
                );

                return (
                  <Card
                    key={cert.id}
                    className="flex flex-col h-full hover:shadow-sm transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {cert.category}
                        </Badge>
                        <Badge
                          className={
                            levelObj?.color +
                            " dark:bg-opacity-20 dark:text-opacity-90"
                          }
                        >
                          {cert.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{cert.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {cert.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>Duration: {cert.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>{cert.students.toLocaleString()} enrolled</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Skills covered:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="font-normal"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button className="w-full">Start Certification</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Advanced Assessments Tab */}
        <TabsContent value="advanced">
          <div className="space-y-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Interview-Based Assessments</CardTitle>
                <CardDescription>
                  Our expert-led interview assessments evaluate your real-world
                  skills through conversation, problem-solving, and hands-on
                  challenges. These certifications demonstrate deeper expertise
                  and practical abilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Live Assessment</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Conducted via video call with a JobFrog expert
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">60-120 Minutes</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Focused evaluation of your practical abilities
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Detailed Feedback</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive actionable insights regardless of outcome
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedCertifications.map((cert) => (
                <Card
                  key={cert.id}
                  className="hover:shadow-sm transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{cert.category}</Badge>
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        Expert Level
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-2">{cert.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {cert.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-1">
                          Prerequisites
                        </h3>
                        <ul className="space-y-1">
                          {cert.prerequisites.map((prereq, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{prereq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Duration: {cert.duration}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">Format: {cert.format}</span>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-3">
                          Skills Evaluated
                        </h3>
                        <div className="space-y-3">
                          {cert.ratingDimensions.map((dimension, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">
                                  {dimension.name}
                                </span>
                                <div className="w-32">
                                  <Progress
                                    value={70}
                                    className="h-2 bg-muted"
                                  />
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {dimension.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Learn More</Button>
                    {/* Renamed to "Apply for Assessment" here */}
                    <Button>Apply for Assessment</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Sample Certificate (less wide) */}
            <div className="mt-10 max-w-xl mx-auto">
              <h3 className="text-lg font-bold mb-4">
                Sample Engineering Certificate
              </h3>
              <Card className="overflow-hidden border dark:border-muted">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 w-full"></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">JobFrog</h2>
                        <p className="text-sm text-muted-foreground">
                          Full Stack Engineering Assessment
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      Expert Level
                    </Badge>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-1">Michael Chen</h3>
                    <p className="text-muted-foreground">
                      Senior Full Stack Developer
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Issued: March 12, 2025 • ID: JF-9271-FS
                    </p>
                  </div>

                  <div className="grid gap-6 mb-8">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        Skill Assessment
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              Backend Architecture
                            </span>
                            <span>Level 5 - Expert</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              Frontend Development
                            </span>
                            <span>Level 4 - Advanced</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                              style={{ width: "78%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Database Design</span>
                            <span>Level 5 - Expert</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                              style={{ width: "95%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">API Design</span>
                            <span>Level 4 - Advanced</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                              style={{ width: "83%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">System Design</span>
                            <span>Level 4 - Advanced</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                              style={{ width: "76%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        Skill Level Definition
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-start gap-2">
                          <div className="h-4 w-4 rounded-full bg-purple-500 flex-shrink-0 mt-0.5"></div>
                          <div>
                            <span className="font-medium">
                              Expert (Level 5)
                            </span>
                            <p className="text-muted-foreground">
                              Skill expected of the best senior engineers
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-4 w-4 rounded-full bg-purple-400 flex-shrink-0 mt-0.5"></div>
                          <div>
                            <span className="font-medium">
                              Advanced (Level 4)
                            </span>
                            <p className="text-muted-foreground">
                              Skill expected of a senior engineer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm">
                      This certificate verifies that Michael Chen has
                      demonstrated expertise in full stack development through
                      JobFrog's rigorous assessment process.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificationPage;
