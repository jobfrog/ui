import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
            <CardDescription>Your current application stats</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Dashboard content will be implemented here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Interview content will be implemented here</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest job search activities</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Activity content will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
