import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Moon, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

const healthMetrics = [
  {
    icon: Heart,
    label: "Heart Rate",
    value: "78",
    unit: "BPM",
    status: "normal",
    trend: "+2%",
    color: "text-red-500"
  },
  {
    icon: Activity,
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
    trend: "stable",
    color: "text-blue-500"
  },
  {
    icon: Thermometer,
    label: "Temperature",
    value: "98.6",
    unit: "°F",
    status: "normal",
    trend: "stable",
    color: "text-orange-500"
  },
  {
    icon: Droplets,
    label: "Blood Oxygen",
    value: "98",
    unit: "%",
    status: "normal",
    trend: "+1%",
    color: "text-cyan-500"
  }
];

const recentAlerts = [
  {
    type: "success",
    message: "Daily step goal achieved",
    time: "2 hours ago",
    icon: CheckCircle
  },
  {
    type: "warning",
    message: "Reminder: Take evening medication",
    time: "4 hours ago",
    icon: Clock
  },
  {
    type: "info",
    message: "Weekly health report available",
    time: "1 day ago",
    icon: Activity
  }
];

export function Dashboard() {
  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            Dashboard Preview
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Your health data at
            <br />
            <span className="text-green-600">a glance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant insights into your health metrics with our intuitive dashboard 
            that makes complex data easy to understand.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Metrics Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {healthMetrics.map((metric, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                      </div>
                      <Badge 
                        variant={metric.status === 'normal' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          {metric.value}
                          <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                        </div>
                        <div className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {metric.trend}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Activity Chart */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Daily Activity</span>
                </CardTitle>
                <CardDescription>Your activity levels throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Steps</span>
                    <span className="font-semibold">8,542 / 10,000</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Sleep Quality</span>
                    <span className="font-semibold">7.5 hours</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Water Intake</span>
                    <span className="font-semibold">6 / 8 glasses</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Device Status */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Connected Devices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Apple Watch</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Blood Pressure Monitor</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Smart Scale</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Syncing</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-muted/30">
                    <alert.icon className={`w-4 h-4 mt-0.5 ${
                      alert.type === 'success' ? 'text-green-500' :
                      alert.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Health Score */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="text-center">
                  <Moon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="text-3xl font-bold">92</div>
                  <div className="text-sm opacity-80 mb-4">Health Score</div>
                  <p className="text-xs opacity-80">
                    Excellent! Keep up the great work with your health routine.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}