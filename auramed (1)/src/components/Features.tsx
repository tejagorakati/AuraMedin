import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Activity, 
  Heart, 
  Brain, 
  Shield, 
  Smartphone, 
  Bell,
  BarChart3,
  Users,
  Clock,
  Zap,
  Eye,
  Headphones
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Continuous tracking of vital signs with instant alerts for any irregularities.",
    category: "Core Feature"
  },
  {
    icon: Heart,
    title: "Heart Health Analytics",
    description: "Advanced cardiovascular monitoring with ECG analysis and rhythm detection.",
    category: "Health Analytics"
  },
  {
    icon: Brain,
    title: "AI Health Insights",
    description: "Machine learning algorithms provide personalized health recommendations.",
    category: "AI Powered"
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Military-grade encryption ensures your health data remains completely private.",
    category: "Security"
  },
  {
    icon: Smartphone,
    title: "Mobile Integration",
    description: "Seamless synchronization across all your devices and wearables.",
    category: "Integration"
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Intelligent notifications for medication reminders and health milestones.",
    category: "Smart Features"
  },
  {
    icon: BarChart3,
    title: "Health Dashboard",
    description: "Comprehensive analytics dashboard with trends and historical data.",
    category: "Analytics"
  },
  {
    icon: Users,
    title: "Care Team Access",
    description: "Share data securely with healthcare providers and family members.",
    category: "Collaboration"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock monitoring with emergency response capabilities.",
    category: "Support"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="w-3 h-3 mr-1" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Everything you need for
            <br />
            <span className="text-blue-600">comprehensive health monitoring</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design to deliver 
            the most advanced health monitoring experience available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Eye className="w-4 h-4" />
            <span>Want to see these features in action?</span>
          </div>
          <div className="space-x-4">
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              Schedule a Demo →
            </button>
            <span className="text-muted-foreground">or</span>
            <button className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1">
              <Headphones className="w-4 h-4" />
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}