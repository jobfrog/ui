import React, { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  BookOpen,
  Calendar,
  Bookmark,
  MessageSquare,
} from "lucide-react";

// Import shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Types
interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  title: string;
  experience: number;
  skills: string[];
  education: string;
  availability: string;
  bio: string;
  saved: boolean;
}

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatarUrl: "",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    experience: 5,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    education: "BS Computer Science, Stanford University",
    availability: "Available immediately",
    bio: "Passionate frontend developer with 5+ years of experience building scalable web applications.",
    saved: false,
  },
  {
    id: "2",
    name: "Jamie Smith",
    avatarUrl: "",
    location: "New York, NY",
    title: "UX/UI Designer",
    experience: 3,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    education: "MFA Design, Rhode Island School of Design",
    availability: "Available in 2 weeks",
    bio: "Creative designer focused on crafting intuitive and accessible user experiences.",
    saved: true,
  },
  {
    id: "3",
    name: "Taylor Williams",
    avatarUrl: "",
    location: "Austin, TX",
    title: "Full Stack Developer",
    experience: 7,
    skills: ["JavaScript", "Python", "AWS", "Docker"],
    education: "MS Computer Engineering, Georgia Tech",
    availability: "Available in 1 month",
    bio: "Full stack developer with strong experience in cloud infrastructure and scalable architectures.",
    saved: false,
  },
  {
    id: "4",
    name: "Morgan Lee",
    avatarUrl: "",
    location: "Seattle, WA",
    title: "Data Scientist",
    experience: 4,
    skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
    education: "PhD Statistics, University of Washington",
    availability: "Available immediately",
    bio: "Data scientist specializing in machine learning models and predictive analytics.",
    saved: false,
  },
  {
    id: "5",
    name: "Jordan Chen",
    avatarUrl: "",
    location: "Chicago, IL",
    title: "DevOps Engineer",
    experience: 6,
    skills: ["Kubernetes", "CI/CD", "Terraform", "Linux"],
    education: "BS Information Technology, University of Illinois",
    availability: "Available in 2 weeks",
    bio: "DevOps professional focused on automating deployment pipelines and infrastructure management.",
    saved: true,
  },
];

const CandidatesPage: React.FC = () => {
  // State
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | undefined>();
  const [selectedExperience, setSelectedExperience] = useState<
    string | undefined
  >();
  const [selectedAvailability, setSelectedAvailability] = useState<
    string | undefined
  >();

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with filters
    console.log("Search with:", {
      searchQuery,
      selectedSkill,
      selectedExperience,
      selectedAvailability,
    });
  };

  const toggleSaved = (id: string) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id
          ? { ...candidate, saved: !candidate.saved }
          : candidate
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Find Candidates</h1>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Candidates</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="contacted">Contacted</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, skills, or location"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Select
                    value={selectedSkill}
                    onValueChange={setSelectedSkill}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="node">Node.js</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="aws">AWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Select
                    value={selectedExperience}
                    onValueChange={setSelectedExperience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Select
                    value={selectedAvailability}
                    onValueChange={setSelectedAvailability}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="2weeks">2 weeks</SelectItem>
                      <SelectItem value="1month">1 month</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-1">
                  <Button type="submit" className="w-full">
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-medium">{candidates.length}</span>{" "}
            candidates
          </p>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="experience">
                Experience (High to Low)
              </SelectItem>
              <SelectItem value="nameAZ">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 gap-4">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onToggleSaved={() => toggleSaved(candidate.id)}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

interface CandidateCardProps {
  candidate: Candidate;
  onToggleSaved: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onToggleSaved,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start gap-2 md:w-1/4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={candidate.avatarUrl} />
              <AvatarFallback>
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{candidate.name}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{candidate.location}</span>
            </div>
          </div>

          {/* Main Info */}
          <div className="flex flex-col gap-4 md:w-1/2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">{candidate.title}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{candidate.experience} years of experience</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{candidate.education}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {candidate.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:w-1/4">
            <div className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-sm font-medium">
              {candidate.availability}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={onToggleSaved}>
                <Bookmark
                  className={`h-5 w-5 ${
                    candidate.saved ? "fill-current text-primary" : ""
                  }`}
                />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact {candidate.name}</DialogTitle>
                    <DialogDescription>
                      Send a message to introduce yourself and express interest
                      in this candidate.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input placeholder="Subject" />
                    <textarea
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-32"
                      placeholder="Your message..."
                    />
                    <Button className="w-full">Send Message</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidatesPage;
