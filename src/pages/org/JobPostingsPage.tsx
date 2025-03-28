import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Search, MapPin, Calendar, ArrowRight } from "lucide-react";

// Import shadcn components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Types
interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  postedDate: string;
  description: string;
  salary?: string;
}

// Mock job postings data
const getJobPostings = (orgSlug: string): JobPosting[] => {
  console.log("getJobPostings", orgSlug);
  // This would be replaced with an API call in a real application
  const mockJobPostings: JobPosting[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedDate: "1 week ago",
      description:
        "We're looking for an experienced frontend developer to join our team. You'll be responsible for building user interfaces and implementing new features.",
      salary: "$130,000 - $160,000",
    },
    {
      id: "2",
      title: "Product Designer",
      department: "Design",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      postedDate: "2 weeks ago",
      description:
        "We need a product designer to create intuitive and engaging user experiences for our products. You'll work closely with product managers and engineers.",
      salary: "$110,000 - $140,000",
    },
    {
      id: "3",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "New York, NY (Remote)",
      type: "Full-time",
      postedDate: "3 days ago",
      description:
        "Join our infrastructure team to build and maintain our cloud systems. You'll focus on automation, reliability, and scaling our platform.",
      salary: "$125,000 - $155,000",
    },
    {
      id: "4",
      title: "Marketing Manager",
      department: "Marketing",
      location: "San Francisco, CA (Onsite)",
      type: "Full-time",
      postedDate: "1 month ago",
      description:
        "Lead our marketing initiatives and grow our brand presence. You'll manage campaigns, analyze results, and work with creative teams.",
    },
    {
      id: "5",
      title: "Customer Success Representative",
      department: "Customer Support",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      postedDate: "2 weeks ago",
      description:
        "Help our customers get the most value from our products. You'll provide support, training, and ensure customer satisfaction.",
    },
  ];

  return mockJobPostings;
};

// Department options
const departments = [
  "All Departments",
  "Engineering",
  "Design",
  "Marketing",
  "Customer Support",
  "Sales",
  "Product",
  "HR",
];

// Location options
const locations = [
  "All Locations",
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "London, UK",
  "Remote",
];

// Job type options
const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const JobPostingsPage: React.FC = () => {
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const jobPostings = getJobPostings(orgSlug || "");

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [typeFilter, setTypeFilter] = useState("All Types");

  // Filter job postings based on search and filters
  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All Departments" ||
      job.department === departmentFilter;
    const matchesLocation =
      locationFilter === "All Locations" ||
      job.location.includes(locationFilter);
    const matchesType = typeFilter === "All Types" || job.type === typeFilter;

    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Job Openings</h1>
        <p className="text-muted-foreground mt-1">
          Explore career opportunities at {orgSlug?.replace("-", " ")}
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job titles or descriptions"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setDepartmentFilter("All Departments");
                  setLocationFilter("All Locations");
                  setTypeFilter("All Types");
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Counter */}
      <div className="text-muted-foreground">
        Showing {filteredJobs.length} of {jobPostings.length} job openings
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{job.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {job.department}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-normal">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-normal">
                      <Calendar className="h-3 w-3 mr-1" />
                      {job.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {job.description}
                  </p>
                  {job.salary && <p className="font-medium">{job.salary}</p>}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground mb-2">
                    Posted {job.postedDate}
                  </span>
                  <Button>
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="py-12 text-center">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium">No job openings found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setDepartmentFilter("All Departments");
              setLocationFilter("All Locations");
              setTypeFilter("All Types");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* CTA Section */}
      <Separator className="my-8" />
      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Don't see the right position?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals to join our team. Send
          us your resume and we'll keep you in mind for future openings.
        </p>
        <Button variant="outline">Submit Your Resume</Button>
      </div>
    </div>
  );
};

export default JobPostingsPage;
