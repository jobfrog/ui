import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Users,
  Globe,
  Briefcase,
  Calendar,
  ExternalLink,
  Building,
  Award,
  Heart,
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

// Import shadcn components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for organizations
interface Organization {
  id: string;
  slug: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  shortDescription: string;
  website: string;
  founded: number;
  headquarters: string;
  size: string;
  industry: string;
  specialties: string[];
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
  locations: {
    city: string;
    state: string;
    country: string;
    isHeadquarters: boolean;
  }[];
  benefits: { title: string; description: string; icon: React.ElementType }[];
  socialMedia: { platform: string; url: string; icon: React.ElementType }[];
}

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  salary?: string;
}

interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  department: string;
  featured: boolean;
}

// Mock organizations data
const orgData: Record<string, Organization> = {
  "acme-inc": {
    id: "acme",
    slug: "acme-inc",
    name: "Acme Inc",
    logo: "",
    coverImage: "",
    description:
      "Acme Inc is a technology company focused on creating innovative solutions for businesses. Our team of experts is dedicated to developing cutting-edge software that helps organizations streamline their operations and enhance productivity. With a commitment to excellence and customer satisfaction, we strive to deliver products that exceed expectations and drive measurable results.",
    shortDescription:
      "Creating innovative technology solutions for businesses worldwide",
    website: "https://acme-inc.example.com",
    founded: 2008,
    headquarters: "San Francisco, CA",
    size: "201-500 employees",
    industry: "Information Technology",
    specialties: [
      "Software Development",
      "Cloud Services",
      "Enterprise Solutions",
      "Data Analytics",
      "AI/ML",
    ],
    mission:
      "To empower businesses with technology solutions that drive growth and efficiency.",
    vision:
      "To be the global leader in innovative enterprise software solutions, transforming how businesses operate in the digital era.",
    values: [
      {
        title: "Innovation",
        description:
          "We embrace creativity and continuously seek new ways to solve complex problems.",
      },
      {
        title: "Excellence",
        description: "We strive for the highest quality in everything we do.",
      },
      {
        title: "Integrity",
        description: "We conduct business ethically and transparently.",
      },
      {
        title: "Collaboration",
        description:
          "We believe in the power of teamwork and diverse perspectives.",
      },
    ],
    locations: [
      {
        city: "San Francisco",
        state: "CA",
        country: "USA",
        isHeadquarters: true,
      },
      {
        city: "New York",
        state: "NY",
        country: "USA",
        isHeadquarters: false,
      },
      {
        city: "London",
        state: "",
        country: "UK",
        isHeadquarters: false,
      },
      {
        city: "Singapore",
        state: "",
        country: "Singapore",
        isHeadquarters: false,
      },
    ],
    benefits: [
      {
        title: "Health & Wellness",
        description:
          "Comprehensive health insurance, wellness programs, and gym memberships",
        icon: Heart,
      },
      {
        title: "Professional Growth",
        description:
          "Continuous learning opportunities, education stipends, and career development",
        icon: Award,
      },
      {
        title: "Work-Life Balance",
        description:
          "Flexible work hours, remote work options, and generous PTO",
        icon: Calendar,
      },
      {
        title: "Financial Benefits",
        description: "Competitive salary, equity options, and 401(k) matching",
        icon: Star,
      },
    ],
    socialMedia: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/acme-inc",
        icon: Linkedin,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/acmeinc",
        icon: Twitter,
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/acmeinc",
        icon: Facebook,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/acmeinc",
        icon: Instagram,
      },
    ],
  },
  "globex-corp": {
    id: "globex",
    slug: "globex-corp",
    name: "Globex Corporation",
    logo: "",
    coverImage: "",
    description:
      "Globex Corporation is a multinational conglomerate with diverse business interests spanning technology, manufacturing, and financial services. Founded with a vision to create revolutionary products, we've grown into a leading enterprise operating in over 50 countries worldwide. Our mission is to drive innovation that makes the world better, safer, and more efficient.",
    shortDescription:
      "A global leader in technology and manufacturing solutions",
    website: "https://globex-corp.example.com",
    founded: 1994,
    headquarters: "Chicago, IL",
    size: "1001-5000 employees",
    industry: "Conglomerate",
    specialties: [
      "Advanced Manufacturing",
      "Financial Technologies",
      "Industrial Automation",
      "Consumer Electronics",
    ],
    mission:
      "To build revolutionary products that improve the world and drive sustainable growth.",
    vision:
      "To be the most innovative and respected global enterprise, creating solutions that define the future.",
    values: [
      {
        title: "Innovation",
        description: "We pioneer new technologies and solutions.",
      },
      {
        title: "Sustainability",
        description:
          "We operate with a commitment to environmental responsibility.",
      },
      {
        title: "Quality",
        description: "We deliver excellence in every product and service.",
      },
      {
        title: "Global Citizenship",
        description: "We contribute positively to communities worldwide.",
      },
    ],
    locations: [
      {
        city: "Chicago",
        state: "IL",
        country: "USA",
        isHeadquarters: true,
      },
      {
        city: "Tokyo",
        state: "",
        country: "Japan",
        isHeadquarters: false,
      },
      {
        city: "Frankfurt",
        state: "",
        country: "Germany",
        isHeadquarters: false,
      },
      {
        city: "Sydney",
        state: "",
        country: "Australia",
        isHeadquarters: false,
      },
    ],
    benefits: [
      {
        title: "Global Opportunities",
        description: "International assignments and global mobility programs",
        icon: Globe,
      },
      {
        title: "Comprehensive Healthcare",
        description:
          "World-class medical, dental, and vision plans with global coverage",
        icon: Heart,
      },
      {
        title: "Education Benefits",
        description: "Tuition reimbursement and continuing education programs",
        icon: Award,
      },
      {
        title: "Retirement Planning",
        description:
          "Generous retirement plans with company matching and financial planning services",
        icon: Star,
      },
    ],
    socialMedia: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/globex-corporation",
        icon: Linkedin,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/globexcorp",
        icon: Twitter,
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/globexcorporation",
        icon: Facebook,
      },
    ],
  },
};

// Mock job postings
const jobPostings: Record<string, JobPosting[]> = {
  "acme-inc": [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedDate: "1 week ago",
      salary: "$130,000 - $160,000",
    },
    {
      id: "2",
      title: "Product Designer",
      department: "Design",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      postedDate: "2 weeks ago",
      salary: "$110,000 - $140,000",
    },
    {
      id: "3",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "New York, NY (Remote)",
      type: "Full-time",
      postedDate: "3 days ago",
      salary: "$125,000 - $155,000",
    },
    {
      id: "4",
      title: "Marketing Manager",
      department: "Marketing",
      location: "San Francisco, CA (Onsite)",
      type: "Full-time",
      postedDate: "1 month ago",
    },
    {
      id: "5",
      title: "Customer Success Representative",
      department: "Customer Support",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      postedDate: "2 weeks ago",
    },
  ],
  "globex-corp": [
    {
      id: "1",
      title: "Manufacturing Systems Engineer",
      department: "Operations",
      location: "Chicago, IL (Onsite)",
      type: "Full-time",
      postedDate: "5 days ago",
      salary: "$95,000 - $120,000",
    },
    {
      id: "2",
      title: "Financial Analyst",
      department: "Finance",
      location: "Chicago, IL (Hybrid)",
      type: "Full-time",
      postedDate: "2 weeks ago",
      salary: "$85,000 - $105,000",
    },
    {
      id: "3",
      title: "Software Engineer",
      department: "Technology",
      location: "Frankfurt, Germany (Onsite)",
      type: "Full-time",
      postedDate: "1 week ago",
    },
  ],
};

// Mock team members
const teamMembers: Record<string, TeamMember[]> = {
  "acme-inc": [
    {
      id: "1",
      name: "Sarah Johnson",
      avatarUrl: "",
      title: "Chief Executive Officer",
      department: "Executive",
      featured: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatarUrl: "",
      title: "Chief Technology Officer",
      department: "Engineering",
      featured: true,
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      avatarUrl: "",
      title: "VP of Product",
      department: "Product",
      featured: true,
    },
    {
      id: "4",
      name: "David Kim",
      avatarUrl: "",
      title: "Director of Engineering",
      department: "Engineering",
      featured: false,
    },
    {
      id: "5",
      name: "Priya Patel",
      avatarUrl: "",
      title: "Head of Design",
      department: "Design",
      featured: false,
    },
    {
      id: "6",
      name: "James Wilson",
      avatarUrl: "",
      title: "Director of Marketing",
      department: "Marketing",
      featured: false,
    },
  ],
  "globex-corp": [
    {
      id: "1",
      name: "Robert Thompson",
      avatarUrl: "",
      title: "Chief Executive Officer",
      department: "Executive",
      featured: true,
    },
    {
      id: "2",
      name: "Jennifer Lee",
      avatarUrl: "",
      title: "Chief Operations Officer",
      department: "Operations",
      featured: true,
    },
    {
      id: "3",
      name: "Thomas Schmidt",
      avatarUrl: "",
      title: "Chief Financial Officer",
      department: "Finance",
      featured: true,
    },
  ],
};

const OrgProfilePage: React.FC = () => {
  const { orgSlug } = useParams<{ orgSlug: string }>();

  // Find the organization data based on the slug
  const organization = orgData[orgSlug || ""] || null;
  const jobs = jobPostings[orgSlug || ""] || [];
  const team = teamMembers[orgSlug || ""] || [];

  // If organization not found
  if (!organization) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Building className="h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Organization Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The organization you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  // Get featured team members
  const featuredTeam = team.filter((member) => member.featured);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8">
      {/* Hero section with cover image */}
      <div className="w-full h-60 bg-gradient-to-r from-primary/20 to-primary/5 rounded-md relative overflow-hidden">
        {organization.coverImage && (
          <img
            src={organization.coverImage}
            alt={`${organization.name} cover`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Organization logo and basic info overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background/95 to-transparent">
          <div className="flex items-end gap-4">
            <div className="h-24 w-24 bg-background rounded-md border border-border flex items-center justify-center overflow-hidden shadow-md">
              {organization.logo ? (
                <img
                  src={organization.logo}
                  alt={organization.name}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <Building className="h-12 w-12 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{organization.name}</h1>
              <p className="text-muted-foreground">
                {organization.shortDescription}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" asChild>
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
              </Button>
              <Button>
                <Briefcase className="h-4 w-4 mr-2" />
                View Open Positions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile action buttons */}
      <div className="flex md:hidden gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <a
            href={organization.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="h-4 w-4 mr-2" />
            Visit Website
          </a>
        </Button>
        <Button className="flex-1">
          <Briefcase className="h-4 w-4 mr-2" />
          View Jobs
        </Button>
      </div>

      {/* Organization information and tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar with company info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Facts Card */}
          <Card>
            <CardHeader>
              <CardTitle>Company Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    {organization.website.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Industry</p>
                  <p className="text-sm text-muted-foreground">
                    {organization.industry}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Headquarters</p>
                  <p className="text-sm text-muted-foreground">
                    {organization.headquarters}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Company Size</p>
                  <p className="text-sm text-muted-foreground">
                    {organization.size}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Founded</p>
                  <p className="text-sm text-muted-foreground">
                    {organization.founded}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Locations Card */}
          <Card>
            <CardHeader>
              <CardTitle>Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {organization.locations.map((location, index) => (
                <div key={index} className="flex items-start gap-3">
                  <MapPin
                    className={`h-5 w-5 ${
                      location.isHeadquarters
                        ? "text-primary"
                        : "text-muted-foreground"
                    } mt-0.5`}
                  />
                  <div>
                    <p className="text-sm font-medium flex items-center">
                      {location.city}, {location.state && `${location.state}, `}
                      {location.country}
                      {location.isHeadquarters && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          HQ
                        </Badge>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Specialties Card */}
          <Card>
            <CardHeader>
              <CardTitle>Specialties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {organization.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                {organization.socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{social.platform}</span>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs for About, Jobs, and Team */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Open Positions</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6 pt-4">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About {organization.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base">{organization.description}</p>
                </CardContent>
              </Card>

              {/* Mission, Vision & Values */}
              <Card>
                <CardHeader>
                  <CardTitle>Mission, Vision & Values</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                    <p>{organization.mission}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Our Vision</h3>
                    <p>{organization.vision}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Our Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {organization.values.map((value, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-border"
                        >
                          <h4 className="font-medium">{value.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {value.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {organization.benefits.map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{benefit.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-6 pt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Open Positions</CardTitle>
                  <Button variant="outline" size="sm">
                    All Jobs
                  </Button>
                </CardHeader>
                <CardContent>
                  {jobs.length > 0 ? (
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className="text-xs font-normal"
                                >
                                  <Briefcase className="h-3 w-3 mr-1" />
                                  {job.department}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-xs font-normal"
                                >
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {job.location}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-xs font-normal"
                                >
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {job.type}
                                </Badge>
                              </div>
                              {job.salary && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  {job.salary}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-muted-foreground mb-2">
                                Posted {job.postedDate}
                              </span>
                              <Button size="sm">
                                Apply
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium">No open positions</h3>
                      <p className="text-muted-foreground mt-1">
                        Check back later for new opportunities
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6 pt-4">
              {/* Leadership */}
              <Card>
                <CardHeader>
                  <CardTitle>Leadership Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {featuredTeam.map((member) => (
                      <div
                        key={member.id}
                        className="flex flex-col items-center text-center"
                      >
                        <Avatar className="h-24 w-24 mb-3">
                          <AvatarImage src={member.avatarUrl} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Other Team Members */}
              {team.length > featuredTeam.length && (
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {team
                        .filter((member) => !member.featured)
                        .map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-3"
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={member.avatarUrl} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.title}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Join the Team CTA */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-2">Join Our Team</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      We're always looking for talented individuals to join our
                      growing team.
                    </p>
                    <Button>
                      View Open Positions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OrgProfilePage;
