import { Badge } from "./ui/badge";
import { TrendingUp, Users, Shield, Globe } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

const stats = [
  {
    icon: Users,
    value: "500K+",
    label: "Active Users",
    description: "Trust our platform daily"
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime",
    description: "Reliable monitoring"
  },
  {
    icon: TrendingUp,
    value: "50M+",
    label: "Data Points",
    description: "Collected monthly"
  },
  {
    icon: Globe,
    value: "80+",
    label: "Countries",
    description: "Worldwide coverage"
  }
];

export function Statistics() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trusted by Millions
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Leading the future of
                <br />
                <span className="text-purple-600">digital health</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Join millions of users worldwide who trust our platform to monitor, 
                analyze, and improve their health with cutting-edge technology and 
                AI-powered insights.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              ))}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">98%</div>
                <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center border-l border-r">
                <div className="text-xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">HIPAA</div>
                <div className="text-xs text-muted-foreground">Compliant</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1698306642516-9841228dcff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1ODAxNDA1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Medical dashboard analytics" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Achievement Badge */}
            <div className="absolute top-8 -left-8 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Health Improved</div>
                  <div className="text-xs text-muted-foreground">+15% this month</div>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-2xl -z-10 transform -rotate-3"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}