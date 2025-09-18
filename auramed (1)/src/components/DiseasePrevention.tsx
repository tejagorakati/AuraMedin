import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BookOpen, Droplets, Shield, Users, Heart, Activity } from "lucide-react";
import { useData } from "./DataContext";

export function DiseasePrevention() {
  const { translate } = useData();

  const diseases = [
    {
      title: translate('prevention.cholera.title'),
      description: translate('prevention.cholera.desc'),
      icon: Droplets,
      color: "blue",
      tips: [
        translate('prevention.cholera.tip1') || "Drink only boiled or bottled water",
        translate('prevention.cholera.tip2') || "Wash hands frequently with soap",
        translate('prevention.cholera.tip3') || "Eat freshly cooked, hot food",
        translate('prevention.cholera.tip4') || "Avoid raw or undercooked seafood",
        translate('prevention.cholera.tip5') || "Use proper sanitation facilities"
      ]
    },
    {
      title: translate('prevention.typhoid.title'),
      description: translate('prevention.typhoid.desc'),
      icon: Shield,
      color: "green",
      tips: [
        translate('prevention.typhoid.tip1') || "Get vaccinated against typhoid",
        translate('prevention.typhoid.tip2') || "Practice good hand hygiene",
        translate('prevention.typhoid.tip3') || "Drink safe, boiled water",
        translate('prevention.typhoid.tip4') || "Avoid street vendor food",
        translate('prevention.typhoid.tip5') || "Wash fruits and vegetables thoroughly"
      ]
    },
    {
      title: translate('prevention.hepatitis.title'),
      description: translate('prevention.hepatitis.desc'),
      icon: Heart,
      color: "purple",
      tips: [
        translate('prevention.hepatitis.tip1') || "Get hepatitis A vaccination",
        translate('prevention.hepatitis.tip2') || "Maintain personal hygiene",
        translate('prevention.hepatitis.tip3') || "Avoid contaminated water",
        translate('prevention.hepatitis.tip4') || "Practice safe food handling",
        translate('prevention.hepatitis.tip5') || "Use clean cooking utensils"
      ]
    },
    {
      title: translate('prevention.diarrhea.title'),
      description: translate('prevention.diarrhea.desc'),
      icon: Activity,
      color: "orange",
      tips: [
        translate('prevention.diarrhea.tip1') || "Use oral rehydration therapy",
        translate('prevention.diarrhea.tip2') || "Maintain proper hydration",
        translate('prevention.diarrhea.tip3') || "Practice good sanitation",
        translate('prevention.diarrhea.tip4') || "Avoid contaminated food/water",
        translate('prevention.diarrhea.tip5') || "Seek medical care if severe"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-black",
        border: "border-blue-200",
        text: "text-blue-400",
        icon: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      green: {
        bg: "bg-black",
        border: "border-green-200", 
        text: "text-green-400",
        icon: "text-green-600",
        button: "bg-green-600 hover:bg-green-700"
      },
      purple: {
        bg: "bg-black",
        border: "border-purple-200",
        text: "text-purple-400", 
        icon: "text-purple-600",
        button: "bg-purple-600 hover:bg-purple-700"
      },
      orange: {
        bg: "bg-black",
        border: "border-orange-200",
        text: "text-orange-400",
        icon: "text-orange-600", 
        button: "bg-orange-600 hover:bg-orange-700"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="disease-prevention" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
            <BookOpen className="w-3 h-3 mr-1" />
            {translate('prevention.badge')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {translate('prevention.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {translate('prevention.subtitle')}
          </p>
        </div>

        {/* Disease Prevention Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {diseases.map((disease, index) => {
            const colors = getColorClasses(disease.color);
            const IconComponent = disease.icon;
            
            return (
              <Card key={index} className={`${colors.bg} ${colors.border} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                      <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <span className={colors.text}>{disease.title}</span>
                  </CardTitle>
                  <CardDescription className={colors.text}>
                    {disease.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className={`font-semibold ${colors.text}`}>{translate('prevention.tips')}:</h4>
                  <ul className="space-y-2">
                    {disease.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className={`text-sm ${colors.text} flex items-start gap-2`}>
                        <span className="text-xs mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`${colors.button} text-white mt-4`}>
                    {translate('prevention.readmore')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* General Health Guidelines */}
        <Card className="bg-black border-blue-200 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-400">{translate('prevention.general_health')}</CardTitle>
            <CardDescription className="text-blue-300">
              Essential practices for maintaining good health and preventing waterborne diseases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-400">Safe Water</h4>
                <p className="text-sm text-blue-300">
                  Always boil water for at least 1 minute or use water purification tablets. Store treated water in clean containers.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-400">Personal Hygiene</h4>
                <p className="text-sm text-green-300">
                  Wash hands with soap for 20 seconds, especially before eating and after using the toilet.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-400">Community Care</h4>
                <p className="text-sm text-purple-300">
                  Report illness to community health workers. Maintain clean surroundings and proper waste disposal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Health Education Resources */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-black border-cyan-200">
            <CardHeader>
              <CardTitle className="text-xl text-cyan-400">{translate('prevention.water_safety')}</CardTitle>
              <CardDescription className="text-cyan-300">
                Comprehensive guide to safe water practices for rural communities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h5 className="font-semibold text-cyan-300">Boiling Method:</h5>
                <ul className="text-sm text-cyan-200 space-y-1 ml-4">
                  <li>• Bring water to a rolling boil for at least 1 minute</li>
                  <li>• At altitudes above 2000m, boil for 3 minutes</li>
                  <li>• Cool and store in clean, covered containers</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="font-semibold text-cyan-300">Chemical Treatment:</h5>
                <ul className="text-sm text-cyan-200 space-y-1 ml-4">
                  <li>• Use water purification tablets as per instructions</li>
                  <li>• Add 2 drops of bleach per liter of clear water</li>
                  <li>• Wait 30 minutes before drinking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-yellow-200">
            <CardHeader>
              <CardTitle className="text-xl text-yellow-400">{translate('prevention.symptom_recognition')}</CardTitle>
              <CardDescription className="text-yellow-300">
                Early warning signs of waterborne diseases to watch for
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h5 className="font-semibold text-yellow-300">Immediate Medical Attention Required:</h5>
                <ul className="text-sm text-yellow-200 space-y-1 ml-4">
                  <li>• Severe dehydration (dizziness, dry mouth)</li>
                  <li>• Blood in stool or vomit</li>
                  <li>• High fever above 102°F (39°C)</li>
                  <li>• Persistent vomiting for more than 24 hours</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="font-semibold text-yellow-300">Monitor Closely:</h5>
                <ul className="text-sm text-yellow-200 space-y-1 ml-4">
                  <li>• Mild fever and fatigue</li>
                  <li>• Occasional nausea or stomach discomfort</li>
                  <li>• Changes in appetite</li>
                  <li>• Mild headaches</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nutrition and Recovery */}
        <Card className="bg-black border-indigo-200 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-indigo-400">{translate('prevention.nutrition_recovery')}</CardTitle>
            <CardDescription className="text-indigo-300">
              Proper nutrition helps speed recovery from waterborne illnesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-300">Recommended Foods:</h4>
                <ul className="text-sm text-indigo-200 space-y-2">
                  <li>• <strong>Rice water:</strong> Easy to digest, provides energy</li>
                  <li>• <strong>Bananas:</strong> Rich in potassium, gentle on stomach</li>
                  <li>• <strong>Toast/Plain crackers:</strong> Helps with nausea</li>
                  <li>• <strong>Boiled potatoes:</strong> Provides nutrients without irritation</li>
                  <li>• <strong>Coconut water:</strong> Natural electrolyte replacement</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-300">Foods to Avoid:</h4>
                <ul className="text-sm text-indigo-200 space-y-2">
                  <li>• <strong>Dairy products:</strong> Can worsen diarrhea</li>
                  <li>• <strong>Fatty/fried foods:</strong> Hard to digest</li>
                  <li>• <strong>Spicy foods:</strong> Can irritate the stomach</li>
                  <li>• <strong>Raw fruits/vegetables:</strong> May contain bacteria</li>
                  <li>• <strong>Caffeine/alcohol:</strong> Can cause dehydration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="mt-8 bg-black border-red-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h4 className="font-semibold text-red-400 mb-4">{translate('prevention.emergency_contacts')}</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-red-300">
                  <strong>State Health Department:</strong><br />
                  1800-xxx-xxxx
                </div>
                <div className="text-red-300">
                  <strong>District Hospital:</strong><br />
                  1800-xxx-xxxx
                </div>
                <div className="text-red-300">
                  <strong>Emergency Services:</strong><br />
                  108 (Ambulance)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}