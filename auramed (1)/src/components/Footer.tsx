import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { useData } from "./DataContext";

export function Footer() {
  const { translate } = useData();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">AuraMED.in</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {translate('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{translate('footer.quicklinks')}</h4>
            <div className="space-y-2 text-sm">
              <a href="#home" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('header.home')}
              </a>
              <a href="#dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('header.dashboard')}
              </a>
              <a href="#community" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('header.community')}
              </a>
              <a href="#alerts" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('header.alerts')}
              </a>
              <a href="#disease-prevention" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('prevention.title')}
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('footer.about')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('footer.contact')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('footer.privacy')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                {translate('footer.terms')}
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">{translate('footer.contact')}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@auramed.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 xxx-xxx-xxxx</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Northeast India<br />Health Monitoring Center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 AuraMED.in. {translate('footer.rights')}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for Northeast India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}