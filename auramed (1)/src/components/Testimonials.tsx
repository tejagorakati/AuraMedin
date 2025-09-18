import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    company: "Heart Health Center",
    content: "This platform has revolutionized how I monitor my patients. The real-time data and AI insights have helped us prevent several cardiac events.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Patient",
    company: "Diabetes Management",
    content: "As someone with diabetes, this app has been life-changing. The continuous monitoring and alerts help me stay on top of my health every day.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Family Physician",
    company: "Community Health Clinic",
    content: "The comprehensive dashboard makes it easy to track multiple patients' progress. The data visualization is excellent and saves me hours of analysis.",
    rating: 5,
    avatar: "ER"
  },
  {
    name: "James Wilson",
    role: "Fitness Enthusiast",
    company: "Marathon Runner",
    content: "The detailed analytics help me optimize my training. The sleep and recovery insights have improved my performance significantly.",
    rating: 5,
    avatar: "JW"
  },
  {
    name: "Lisa Thompson",
    role: "Nurse Practitioner",
    company: "Elderly Care Facility",
    content: "Perfect for monitoring our elderly residents. The family sharing feature keeps everyone informed and the emergency alerts provide peace of mind.",
    rating: 5,
    avatar: "LT"
  },
  {
    name: "Robert Kim",
    role: "Health Researcher",
    company: "Medical University",
    content: "The data quality and accuracy are exceptional. We've used this platform for several research studies with great success.",
    rating: 5,
    avatar: "RK"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-50 text-yellow-700 border-yellow-200">
            <Star className="w-3 h-3 mr-1" />
            Customer Stories
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Trusted by healthcare
            <br />
            <span className="text-yellow-600">professionals & patients</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our platform is making a difference in the lives of patients, 
            healthcare providers, and fitness enthusiasts around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-muted-foreground/30" />
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-4 border-t">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold">4.9★</div>
            <div className="text-sm text-muted-foreground">App Store Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-muted-foreground">Expert Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">HIPAA</div>
            <div className="text-sm text-muted-foreground">Compliant & Secure</div>
          </div>
        </div>
      </div>
    </section>
  );
}