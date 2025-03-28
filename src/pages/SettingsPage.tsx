import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Key,
  LogOut,
  Save,
  Trash2,
} from "lucide-react";

// Import shadcn components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NavItem {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
}

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth0();

  // User profile state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    title: "Software Engineer",
    bio: "Full-stack developer with experience in React, Node.js, and cloud technologies.",
    location: "San Francisco, CA",
    website: "https://example.com",
    github: "github.com/username",
    linkedin: "linkedin.com/in/username",
  });

  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    jobAlerts: true,
    twoFactorEnabled: false,
    darkMode: true,
    language: "English",
  });

  // Navigation items
  const navItems: NavItem[] = [
    {
      title: "Profile",
      value: "profile",
      icon: User,
      description: "Manage your personal information",
    },
    {
      title: "Account",
      value: "account",
      icon: Shield,
      description: "Manage account settings and preferences",
    },
    {
      title: "Notifications",
      value: "notifications",
      icon: Bell,
      description: "Configure how you receive notifications",
    },
    {
      title: "Billing",
      value: "billing",
      icon: CreditCard,
      description: "Manage your subscription and payment methods",
    },
  ];

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSettingToggle = (setting: string) => {
    setAccountSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and how others see you on the
                platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={user?.picture}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    This will be displayed on your profile and in comments
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Upload New
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    placeholder="john.doe@example.com"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Your email is managed through your login provider
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={profileForm.title}
                    onChange={handleProfileChange}
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileForm.location}
                    onChange={handleProfileChange}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us a bit about yourself"
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={profileForm.website}
                      onChange={handleProfileChange}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      name="github"
                      value={profileForm.github}
                      onChange={handleProfileChange}
                      placeholder="github.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={profileForm.linkedin}
                      onChange={handleProfileChange}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for the application
                      </p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={accountSettings.darkMode}
                      onCheckedChange={() => handleSettingToggle("darkMode")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred language
                      </p>
                    </div>
                    <Select
                      value={accountSettings.language}
                      onValueChange={(value) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          language: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorEnabled">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      id="twoFactorEnabled"
                      checked={accountSettings.twoFactorEnabled}
                      onCheckedChange={() =>
                        handleSettingToggle("twoFactorEnabled")
                      }
                    />
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full md:w-auto">
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-destructive">
                  Danger Zone
                </h3>

                <div className="rounded-md border border-destructive/20 p-4 bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove all associated data
                            from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Yes, delete my account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">
                        General Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about account activity and updates
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={accountSettings.emailNotifications}
                      onCheckedChange={() =>
                        handleSettingToggle("emailNotifications")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="jobAlerts">Job Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new job opportunities
                      </p>
                    </div>
                    <Switch
                      id="jobAlerts"
                      checked={accountSettings.jobAlerts}
                      onCheckedChange={() => handleSettingToggle("jobAlerts")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional emails and special offers
                      </p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={accountSettings.marketingEmails}
                      onCheckedChange={() =>
                        handleSettingToggle("marketingEmails")
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Frequency */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Frequency</h3>

                <div className="space-y-2">
                  <Label>Email Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-full md:w-auto md:min-w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Plan</h3>

                <div className="rounded-md border p-4 bg-muted/50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="font-medium">Free Plan</h4>
                      <p className="text-sm text-muted-foreground">
                        Basic features with limited access
                      </p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Methods</h3>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded bg-muted flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">No payment method</p>
                        <p className="text-sm text-muted-foreground">
                          Add a payment method to upgrade your plan
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Add Method</Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Billing History */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing History</h3>

                <div className="rounded-md border p-4 bg-muted/50 text-center py-8">
                  <p className="text-muted-foreground">
                    No billing history available
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
