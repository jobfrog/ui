// src/layouts/AuthenticatedLayout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ChevronDown, Home } from "lucide-react";

const AuthenticatedLayout = () => {
  const { logout, user } = useAuth0();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    // Add more navigation items as needed
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar navigation */}
      <div className="w-64 border-r border-border p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold text-primary">jobfrog</span>
          <span className="text-sm text-muted-foreground">beta</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
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
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="md:hidden flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">jobfrog</span>
              <span className="text-sm text-muted-foreground">beta</span>
            </div>

            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User size={18} />
                    <span className="hidden sm:inline-block">
                      {user?.name || user?.email}
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
