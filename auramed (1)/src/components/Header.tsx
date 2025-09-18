import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Menu, X, Heart, Activity, Globe, MessageCircle, Home, BarChart3, Users, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useData } from "./DataContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage, translate } = useData();

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language as 'english' | 'hindi' | 'assamese' | 'bengali');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">AuraMED.in</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="flex items-center space-x-1 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span>{translate('header.home')}</span>
            </a>
            <a href="#dashboard" className="flex items-center space-x-1 hover:text-primary transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>{translate('header.dashboard')}</span>
            </a>
            <a href="#community" className="flex items-center space-x-1 hover:text-primary transition-colors">
              <Users className="w-4 h-4" />
              <span>{translate('header.community')}</span>
            </a>
            <a href="#alerts" className="flex items-center space-x-1 hover:text-primary transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span>{translate('header.alerts')}</span>
            </a>
          </nav>

          {/* Language Selection & Chatbot */}
          <div className="hidden md:flex items-center space-x-4">
            <Select value={currentLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40 bg-card border-border">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English (English)</SelectItem>
                <SelectItem value="assamese">Assamese (অসমীয়া)</SelectItem>
                <SelectItem value="bengali">Bengali (বাংলা)</SelectItem>
                <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {translate('header.chatbot')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <a href="#home" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span>{translate('header.home')}</span>
            </a>
            <a href="#dashboard" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>{translate('header.dashboard')}</span>
            </a>
            <a href="#community" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <Users className="w-4 h-4" />
              <span>{translate('header.community')}</span>
            </a>
            <a href="#alerts" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span>{translate('header.alerts')}</span>
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="bg-card border-border">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English (English)</SelectItem>
                  <SelectItem value="assamese">Assamese (অসমীয়া)</SelectItem>
                  <SelectItem value="bengali">Bengali (বাংলা)</SelectItem>
                  <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
                className="justify-start bg-primary hover:bg-primary/90"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {translate('header.chatbot')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}