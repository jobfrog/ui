import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Users, Search, Briefcase, MapPin } from "lucide-react";

// Import shadcn components
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types
interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  avatarUrl: string;
  skills: string[];
}

// Mock team members data
const getTeamMembers = (orgSlug: string): TeamMember[] => {
  console.log("getTeamMembers", orgSlug);
  // This would be replaced with an API call in a real application
  const mockTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Chief Executive Officer",
      department: "Executive",
      location: "San Francisco, CA",
      avatarUrl: "",
      skills: ["Leadership", "Strategy"],
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Chief Technology Officer",
      department: "Engineering",
      location: "San Francisco, CA",
      avatarUrl: "",
      skills: ["System Architecture", "Engineering Leadership"],
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      title: "VP of Product",
      department: "Product",
      location: "New York, NY",
      avatarUrl: "",
      skills: ["Product Strategy", "UX Design"],
    },
    {
      id: "4",
      name: "David Kim",
      title: "Director of Engineering",
      department: "Engineering",
      location: "Austin, TX",
      avatarUrl: "",
      skills: ["Engineering Management", "DevOps"],
    },
    {
      id: "5",
      name: "Priya Patel",
      title: "Head of Design",
      department: "Design",
      location: "San Francisco, CA",
      avatarUrl: "",
      skills: ["UI/UX Design", "Design Systems"],
    },
    {
      id: "6",
      name: "James Wilson",
      title: "Director of Marketing",
      department: "Marketing",
      location: "New York, NY",
      avatarUrl: "",
      skills: ["Digital Marketing", "Brand Strategy"],
    },
  ];

  return mockTeamMembers;
};

const TeamMembersPage: React.FC = () => {
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const teamMembers = getTeamMembers(orgSlug || "");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = teamMembers.filter((member) => {
    return (
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Team Members</h1>
        <p className="text-muted-foreground mt-1">
          Meet the people behind {orgSlug?.replace("-", " ")}
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-md relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or title"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={member.avatarUrl} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.title}</p>

                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center justify-center text-sm">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{member.department}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{member.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredMembers.length === 0 && (
        <div className="py-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium">No team members found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSearchQuery("")}
          >
            Reset Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeamMembersPage;
