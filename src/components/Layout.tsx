// src/components/Layout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Home,
  Menu,
  LogIn,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Layout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      path: "/jobs",
      label: "Jobs",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
    },
    {
      path: "/applications",
      label: "Applications",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Link
              to="/"
              className="font-bold text-xl text-primary flex items-center"
            >
              <span>JobFrog</span>
              <span className="ml-1">🐸</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>

            {/* Mobile navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden ml-2"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.path)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/login"
                    className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary mt-4"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 w-full">
        <Outlet />
      </main>

      <footer className="border-t py-4 mt-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JobFrog. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms
            </a>{" "}
            ·
            <a
              href="#"
              className="ml-2 underline underline-offset-4 hover:text-primary"
            >
              Privacy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
