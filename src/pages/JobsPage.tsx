import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  BookmarkPlus,
  Star,
  Filter,
  Globe,
  Building,
  CalendarClock,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Types
interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  locationType: "Remote" | "Hybrid" | "On-Site";
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Fractional" | "Internship";
  scheduleType: "Standard" | "Flexible" | "Shift-based";
  posted: string;
  description: string;
  skills: string[];
  matchPercentage?: number;
  isRecommended?: boolean;
  experienceLevel:
    | "Entry-level"
    | "Junior"
    | "Mid-level"
    | "Senior"
    | "Executive";
  industry: string;
}

interface FilterState {
  jobTypes: string[];
  experienceLevels: string[];
  locationTypes: string[];
  scheduleTypes: string[];
  industries: string[];
  salaryRange: [number, number];
  salaryMax: boolean;
}

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "https://placehold.co/64x64/252f3f/ffffff?text=TC",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    scheduleType: "Flexible",
    posted: "2 days ago",
    description:
      "We are looking for an experienced Frontend Developer to join our team.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    matchPercentage: 95,
    isRecommended: true,
    experienceLevel: "Senior",
    industry: "Technology",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "DesignHub",
    companyLogo: "https://placehold.co/64x64/4f46e5/ffffff?text=DH",
    location: "Remote",
    locationType: "Remote",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    scheduleType: "Standard",
    posted: "1 week ago",
    description: "Join our design team to create beautiful user interfaces.",
    skills: ["Figma", "UI Design", "User Testing"],
    matchPercentage: 85,
    experienceLevel: "Mid-level",
    industry: "Design",
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "DataSystems",
    companyLogo: "https://placehold.co/64x64/0891b2/ffffff?text=DS",
    location: "New York, NY",
    locationType: "On-Site",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    scheduleType: "Standard",
    posted: "3 days ago",
    description:
      "Looking for a skilled Backend Developer to help scale our infrastructure.",
    skills: ["Node.js", "Express", "MongoDB"],
    isRecommended: true,
    experienceLevel: "Senior",
    industry: "Technology",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    companyLogo: "https://placehold.co/64x64/0e7490/ffffff?text=CT",
    location: "Chicago, IL",
    locationType: "Hybrid",
    salary: "$125,000 - $155,000",
    type: "Contract",
    scheduleType: "Flexible",
    posted: "5 days ago",
    description:
      "Join our team to build and maintain our cloud infrastructure.",
    skills: ["Docker", "Kubernetes", "AWS"],
    matchPercentage: 78,
    experienceLevel: "Senior",
    industry: "Technology",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "ProductHub",
    companyLogo: "https://placehold.co/64x64/6d28d9/ffffff?text=PH",
    location: "Austin, TX",
    locationType: "Hybrid",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    scheduleType: "Standard",
    posted: "1 day ago",
    description:
      "We are looking for a Product Manager to lead our new SaaS platform.",
    skills: ["Product Strategy", "Agile", "User Research"],
    isRecommended: true,
    experienceLevel: "Mid-level",
    industry: "Product Management",
  },
  {
    id: "6",
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    companyLogo: "https://placehold.co/64x64/be185d/ffffff?text=AW",
    location: "Los Angeles, CA",
    locationType: "On-Site",
    salary: "$115,000 - $300,000",
    type: "Full-time",
    scheduleType: "Standard",
    posted: "4 days ago",
    description: "Develop and maintain our iOS applications using Swift.",
    skills: ["Swift", "iOS", "SwiftUI"],
    matchPercentage: 82,
    experienceLevel: "Mid-level",
    industry: "Mobile Development",
  },
  {
    id: "7",
    title: "Fractional CTO",
    company: "StartupBoost",
    companyLogo: "https://placehold.co/64x64/ca8a04/ffffff?text=SB",
    location: "Remote",
    locationType: "Remote",
    salary: "$200,000 - $300,000+",
    type: "Fractional",
    scheduleType: "Flexible",
    posted: "1 week ago",
    description:
      "Provide technical leadership to startups on a part-time basis.",
    skills: ["Technical Leadership", "Architecture", "Strategy"],
    experienceLevel: "Executive",
    industry: "Technology",
  },
  {
    id: "8",
    title: "Data Scientist (Part-time)",
    company: "AnalyticsAI",
    companyLogo: "https://placehold.co/64x64/1e40af/ffffff?text=AI",
    location: "Remote",
    locationType: "Remote",
    salary: "$70,000 - $90,000",
    type: "Part-time",
    scheduleType: "Flexible",
    posted: "3 days ago",
    description:
      "Looking for a data scientist to work 20 hours per week on our AI projects.",
    skills: ["Python", "Machine Learning", "Data Visualization"],
    matchPercentage: 91,
    experienceLevel: "Mid-level",
    industry: "Artificial Intelligence",
  },
];

// Extract unique values for filters
const jobTypes = [...new Set(sampleJobs.map((job) => job.type))];
const experienceLevels = [
  ...new Set(sampleJobs.map((job) => job.experienceLevel)),
];
const locationTypes = [...new Set(sampleJobs.map((job) => job.locationType))];
const scheduleTypes = [...new Set(sampleJobs.map((job) => job.scheduleType))];
const industries = [...new Set(sampleJobs.map((job) => job.industry))];

const JobsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    experienceLevels: [],
    locationTypes: [],
    scheduleTypes: [],
    industries: [],
    salaryRange: [50000, 300000],
    salaryMax: false,
  });

  // Format salary for display
  const formatSalary = (
    range: [number, number],
    includeMax: boolean
  ): string => {
    return includeMax
      ? `$${(range[0] / 1000).toFixed(0)}k - $300k+`
      : `$${(range[0] / 1000).toFixed(0)}k - $${(range[1] / 1000).toFixed(0)}k`;
  };

  // Toggle filter
  const toggleFilter = (
    type:
      | "jobTypes"
      | "experienceLevels"
      | "locationTypes"
      | "scheduleTypes"
      | "industries",
    value: string
  ) => {
    setFilters((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  // Update salary range
  const updateSalaryRange = (value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      salaryRange: value,
    }));
  };

  // Toggle "300k+" option
  const toggleSalaryMax = () => {
    setFilters((prev) => ({
      ...prev,
      salaryMax: !prev.salaryMax,
    }));
  };

  // Parse salary string to min/max values
  const parseSalary = (
    salary: string
  ): { min: number; max: number; hasPlus: boolean } => {
    const hasPlus = salary.includes("+");
    const matches = salary.match(/\$(\d+),000\s*-\s*\$(\d+),000/);

    if (matches && matches[1] && matches[2]) {
      return {
        min: parseInt(matches[1]) * 1000,
        max: parseInt(matches[2]) * 1000,
        hasPlus,
      };
    }
    return { min: 0, max: 300000, hasPlus };
  };

  // Filter jobs based on search query, active tab, and filters
  const filteredJobs = sampleJobs.filter((job) => {
    // Text search
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Tab filter
    let matchesTab = true;
    if (activeTab === "recommended") {
      matchesTab = !!job.isRecommended;
    } else if (activeTab === "matches") {
      matchesTab = job.matchPercentage !== undefined;
    }

    // Advanced filters
    const salaryInfo = parseSalary(job.salary);

    const matchesJobType =
      filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);
    const matchesExperienceLevel =
      filters.experienceLevels.length === 0 ||
      filters.experienceLevels.includes(job.experienceLevel);
    const matchesLocationType =
      filters.locationTypes.length === 0 ||
      filters.locationTypes.includes(job.locationType);
    const matchesScheduleType =
      filters.scheduleTypes.length === 0 ||
      filters.scheduleTypes.includes(job.scheduleType);
    const matchesIndustry =
      filters.industries.length === 0 ||
      filters.industries.includes(job.industry);

    // Check if salary matches, considering the "300k+" option
    let matchesSalary;
    if (filters.salaryMax && salaryInfo.hasPlus) {
      matchesSalary = true; // If user wants 300k+ and job has + indicator
    } else {
      matchesSalary =
        salaryInfo.max >= filters.salaryRange[0] &&
        salaryInfo.min <= filters.salaryRange[1];
    }

    return (
      matchesSearch &&
      matchesTab &&
      matchesJobType &&
      matchesExperienceLevel &&
      matchesSalary &&
      matchesLocationType &&
      matchesScheduleType &&
      matchesIndustry
    );
  });

  // Get location type icon
  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case "Remote":
        return <Globe className="h-4 w-4 mr-1" />;
      case "Hybrid":
        return <Building className="h-4 w-4 mr-1" />;
      case "On-Site":
        return <MapPin className="h-4 w-4 mr-1" />;
      default:
        return <MapPin className="h-4 w-4 mr-1" />;
    }
  };

  // Render job card
  const renderJobCard = (job: Job) => (
    <Card
      key={job.id}
      className="relative h-full flex flex-col overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 group"
    >
      {job.isRecommended && (
        <div className="absolute -right-16 top-7 bg-indigo-500 text-white py-1 px-16 transform rotate-45 z-[1] shadow-md font-bold text-sm tracking-wider">
          RECOMMENDED
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold truncate">
              {job.title}
            </CardTitle>
            <CardDescription className="text-base">
              {job.company}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-muted-foreground">
            {getLocationTypeIcon(job.locationType)}
            <span className="text-sm">
              {job.location} • {job.locationType}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.type}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarClock className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.scheduleType}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.posted}</span>
          </div>
        </div>

        <p className="text-sm mb-4 line-clamp-3">{job.description}</p>

        <div className="flex flex-wrap gap-1 mb-2">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="font-medium mt-2">{job.salary}</p>

        {job.matchPercentage && (
          <div className="bg-slate-50 py-2 px-3 rounded-md mt-3 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(job.matchPercentage! / 20)
                      ? "text-indigo-500 fill-indigo-500"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium text-slate-700">
              {job.matchPercentage}% Match
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex justify-between w-full">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
            Apply Now
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex max-w-7xl mx-auto">
      {/* Sidebar Filters */}
      <div className="w-72 flex-shrink-0 pr-6 pt-4">
        <div className="sticky top-[calc(6rem+1px)]">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2 text-slate-500" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          {/* Location Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Location Type</h3>
            <div className="space-y-2">
              {locationTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`location-type-${type}`}
                    checked={filters.locationTypes.includes(type)}
                    onCheckedChange={() => toggleFilter("locationTypes", type)}
                  />
                  <Label
                    htmlFor={`location-type-${type}`}
                    className="text-sm cursor-pointer flex items-center"
                  >
                    {getLocationTypeIcon(type)}
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Job Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`job-type-${type}`}
                    checked={filters.jobTypes.includes(type)}
                    onCheckedChange={() => toggleFilter("jobTypes", type)}
                  />
                  <Label
                    htmlFor={`job-type-${type}`}
                    className="text-sm cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Schedule Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Schedule</h3>
            <div className="space-y-2">
              {scheduleTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`schedule-type-${type}`}
                    checked={filters.scheduleTypes.includes(type)}
                    onCheckedChange={() => toggleFilter("scheduleTypes", type)}
                  />
                  <Label
                    htmlFor={`schedule-type-${type}`}
                    className="text-sm cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Experience Level Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Experience Level</h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <Checkbox
                    id={`exp-level-${level}`}
                    checked={filters.experienceLevels.includes(level)}
                    onCheckedChange={() =>
                      toggleFilter("experienceLevels", level)
                    }
                  />
                  <Label
                    htmlFor={`exp-level-${level}`}
                    className="text-sm cursor-pointer"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Salary Range Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Salary Range</h3>
            <div className="pb-2">
              <Slider
                defaultValue={[50000, 300000]}
                min={50000}
                max={300000}
                step={10000}
                value={filters.salaryRange}
                onValueChange={(value) =>
                  updateSalaryRange(value as [number, number])
                }
                disabled={filters.salaryMax}
                className={filters.salaryMax ? "opacity-50" : ""}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-3">
              {formatSalary(filters.salaryRange, filters.salaryMax)}
            </p>
            <div className="flex items-center gap-2">
              <Checkbox
                id="salary-max"
                checked={filters.salaryMax}
                onCheckedChange={toggleSalaryMax}
              />
              <Label htmlFor="salary-max" className="text-sm cursor-pointer">
                Include $300k+ positions
              </Label>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Industry Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Industry</h3>
            <div className="space-y-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center gap-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={filters.industries.includes(industry)}
                    onCheckedChange={() => toggleFilter("industries", industry)}
                  />
                  <Label
                    htmlFor={`industry-${industry}`}
                    className="text-sm cursor-pointer"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <Button
            variant="outline"
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800"
            onClick={() =>
              setFilters({
                jobTypes: [],
                experienceLevels: [],
                locationTypes: [],
                scheduleTypes: [],
                industries: [],
                salaryRange: [50000, 300000],
                salaryMax: false,
              })
            }
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
          <p className="text-muted-foreground">
            Discover opportunities that match your skills and career goals
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            className="pl-10 pr-4 py-6 text-lg border-slate-200 focus-visible:ring-slate-300 focus-visible:ring-opacity-50"
            placeholder="Search jobs, companies, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              All Jobs
            </TabsTrigger>
            <TabsTrigger
              value="recommended"
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              Recommended
            </TabsTrigger>
            <TabsTrigger
              value="matches"
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              Top Matches
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(renderJobCard)}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No jobs found matching your search criteria
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommended" className="mt-6">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(renderJobCard)}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No recommended jobs found
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="mt-6">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(renderJobCard)}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No job matches found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobsPage;
