// src/layouts/AuthenticatedLayout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  ChevronDown,
  Home,
  Briefcase,
  Users,
  Settings,
  Search,
  Bell,
  Building,
  Lightbulb,
  Award,
  Menu,
  MessageSquare,
  BookOpen,
  Bookmark,
  PlusCircle,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

// Define interface for navigation items
interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

// Mock organizations for the demo
const organizations = [
  { id: "personal", name: "Personal Account", role: "Member" },
  { id: "acme", name: "Acme Inc", role: "Admin" },
  { id: "globex", name: "Globex Corporation", role: "Member" },
];

const AuthenticatedLayout = () => {
  const { logout, user } = useAuth0();
  const location = useLocation();
  const [activeOrg, setActiveOrg] = useState(organizations[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Network", href: "/network", icon: Users },
    { name: "Learning", href: "/learning", icon: BookOpen },
    { name: "Certifications", href: "/certifications", icon: Award },
    { name: "Messages", href: "/messages", icon: MessageSquare, badge: "3" },
    { name: "Saved", href: "/saved", icon: Bookmark },
  ];

  const organizationNav: NavItem[] = [
    { name: "Organization Profile", href: "/org/profile", icon: Building2 },
    { name: "Team Members", href: "/org/team", icon: Users },
    { name: "Job Postings", href: "/org/jobs", icon: Briefcase },
    { name: "Candidates", href: "/org/candidates", icon: Users },
    { name: "Analytics", href: "/org/analytics", icon: Lightbulb },
  ];

  // Determine which navigation to show based on active organization
  const showOrgNav = activeOrg.id !== "personal";
  const currentNav = showOrgNav ? organizationNav : navigation;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar navigation - desktop */}
      <div
        className={`w-64 border-r border-border hidden md:flex flex-col ${
          mobileMenuOpen ? "md:block" : "md:block"
        }`}
      >
        <div className="p-3 border-b border-border flex justify-center relative">
          <div className="relative">
            <span className="text-2xl font-bold text-primary">jobfrog</span>
            <span className="absolute -top-2 -right-12 text-xs font-medium px-1.5 py-0.5 rounded bg-orange-500 text-white">
              BETA
            </span>
          </div>
        </div>

        {/* Organization switcher */}
        <div className="p-3 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                    {activeOrg.id === "personal" ? (
                      <User size={12} className="text-primary" />
                    ) : (
                      <Building size={12} className="text-primary" />
                    )}
                  </div>
                  <span className="flex-1 text-sm font-medium truncate">
                    {activeOrg.name}
                  </span>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Switch account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={activeOrg.id}
                onValueChange={(value) => {
                  const org = organizations.find((o) => o.id === value);
                  if (org) setActiveOrg(org);
                }}
              >
                {organizations.map((org) => (
                  <DropdownMenuRadioItem
                    key={org.id}
                    value={org.id}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                        {org.id === "personal" ? (
                          <User size={12} className="text-primary" />
                        ) : (
                          <Building size={12} className="text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{org.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {org.role}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <PlusCircle size={14} className="mr-2" />
                <span>Create Organization</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 p-4">
          <nav className="flex flex-col gap-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="h-5 min-w-5 flex items-center justify-center"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>

          {/* Switch between personal and org mode */}
          {activeOrg.id === "personal" ? (
            showOrgNav ? null : (
              <button
                onClick={() =>
                  setActiveOrg(
                    organizations.find((o) => o.id === "acme") ||
                      organizations[0]
                  )
                }
                className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Building size={18} />
                <span>Switch to Organization</span>
              </button>
            )
          ) : (
            <button
              onClick={() =>
                setActiveOrg(
                  organizations.find((o) => o.id === "personal") ||
                    organizations[0]
                )
              }
              className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <User size={18} />
              <span>Switch to Personal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border sticky top-0 bg-background z-10">
          <div className="h-14 px-4 flex items-center">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={18} />
            </Button>

            <div className="md:hidden flex items-center relative">
              <span className="text-xl font-bold text-primary">jobfrog</span>
              <span className="absolute -top-2 -right-8 text-xs font-medium px-1.5 py-0.5 rounded bg-orange-500 text-white">
                BETA
              </span>
            </div>

            {/* Context indicator for organization */}
            {showOrgNav && (
              <div className="hidden md:flex items-center ml-4">
                <Badge variant="outline" className="font-normal">
                  <Building size={14} className="mr-1" />
                  {activeOrg.name}
                </Badge>
              </div>
            )}

            {/* Search bar */}
            <div className="flex-1 max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-muted-foreground" />
              </div>
              <Input
                placeholder={
                  showOrgNav
                    ? "Search candidates, jobs..."
                    : "Search jobs, people..."
                }
                className="pl-10"
              />
            </div>

            <div className="ml-4 flex items-center gap-2">
              {/* Notifications button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground relative"
                  >
                    <Bell size={18} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                      5
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <DropdownMenuItem key={i} className="cursor-pointer py-3">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">New job match</span>
                          <span className="text-xs text-muted-foreground">
                            Your profile matches a new Senior Developer position
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {i} hour{i !== 1 ? "s" : ""} ago
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer justify-center font-medium">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-9"
                  >
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {user?.picture ? (
                        <img
                          src={user.picture}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User size={14} className="text-primary" />
                      )}
                    </div>
                    <span className="hidden sm:inline-block max-w-[140px] truncate text-sm">
                      {user?.name || user?.email}
                    </span>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/resume" className="cursor-pointer">
                      My Resume
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/applications" className="cursor-pointer">
                      My Applications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Mobile navigation - slide-in panel */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="fixed inset-0 bg-background/80"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-background border-r border-border p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center relative">
                  <span className="text-xl font-bold text-primary">
                    jobfrog
                  </span>
                  <span className="absolute -top-2 -right-8 text-xs font-medium px-1.5 py-0.5 rounded bg-orange-500 text-white">
                    BETA
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>

              {/* Organization switcher - mobile */}
              <div className="mb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                          {activeOrg.id === "personal" ? (
                            <User size={12} className="text-primary" />
                          ) : (
                            <Building size={12} className="text-primary" />
                          )}
                        </div>
                        <span className="flex-1 text-sm font-medium truncate">
                          {activeOrg.name}
                        </span>
                        <ChevronDown
                          size={14}
                          className="text-muted-foreground"
                        />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Switch account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={activeOrg.id}
                      onValueChange={(value) => {
                        const org = organizations.find((o) => o.id === value);
                        if (org) setActiveOrg(org);
                      }}
                    >
                      {organizations.map((org) => (
                        <DropdownMenuRadioItem
                          key={org.id}
                          value={org.id}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                              {org.id === "personal" ? (
                                <User size={12} className="text-primary" />
                              ) : (
                                <Building size={12} className="text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{org.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {org.role}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <PlusCircle size={14} className="mr-2" />
                      <span>Create Organization</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Navigation links - mobile */}
              <nav className="flex flex-col gap-1">
                {currentNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon size={18} />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="h-5 min-w-5 flex items-center justify-center"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto">
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>

                {/* Switch between personal and org mode - mobile */}
                {activeOrg.id === "personal" ? (
                  showOrgNav ? null : (
                    <button
                      onClick={() => {
                        setActiveOrg(
                          organizations.find((o) => o.id === "acme") ||
                            organizations[0]
                        );
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
                    >
                      <Building size={18} />
                      <span>Switch to Organization</span>
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      setActiveOrg(
                        organizations.find((o) => o.id === "personal") ||
                          organizations[0]
                      );
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <User size={18} />
                    <span>Switch to Personal</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
