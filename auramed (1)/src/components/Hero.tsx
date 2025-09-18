import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookOpen, ArrowRight, Activity, Shield, Smartphone } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useData } from "./DataContext";

export function Hero() {
  const { translate } = useData();

  return (
    <section id="home" className="pt-16 pb-20 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge className="w-fit bg-blue-50 text-blue-700 border-blue-200">
              <Activity className="w-3 h-3 mr-1" />
              {translate('hero.badge')}
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {translate('hero.title1')}
                <span className="text-blue-600"> {translate('hero.title2')}</span>
                <br />
                {translate('hero.title3')}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {translate('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('data-entry')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {translate('hero.start_data_entry')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="group border-primary/20 bg-card hover:bg-primary/10"
                onClick={() => document.getElementById('disease-prevention')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {translate('hero.get_educated')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-sm font-bold">{translate('hero.stats.multilanguage')}</div>
                <div className="text-xs text-muted-foreground">{translate('hero.stats.support')}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">{translate('hero.stats.works')}</div>
                <div className="text-xs text-muted-foreground">{translate('hero.stats.offline')}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">{translate('hero.stats.ai')}</div>
                <div className="text-xs text-muted-foreground">{translate('hero.stats.chatbot')}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">{translate('hero.stats.sms')}</div>
                <div className="text-xs text-muted-foreground">{translate('hero.stats.notification')}</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1639401122139-68a5840cb3bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb2xpbyUyMHZhY2NpbmF0aW9uJTIwY2hpbGQlMjB1cmJhbiUyMGluZGlhfGVufDF8fHx8MTc1ODA5OTczNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Doctor administering polio vaccination to child in urban area" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute top-4 -left-4 bg-[rgba(16,1,1,1)] rounded-xl shadow-lg border px-[16px] py-[0px]">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-semibold">Heart Rate</div>
                  <div className="text-xs text-muted-foreground">78 BPM</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 -right-4 bg-[rgba(14,1,1,1)] rounded-[0px] shadow-lg border p-[0px]">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="text-sm font-semibold">Protected</div>
                  <div className="text-xs text-muted-foreground">Data Encrypted</div>
                </div>
              </div>
            </div>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl -z-10 transform rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}