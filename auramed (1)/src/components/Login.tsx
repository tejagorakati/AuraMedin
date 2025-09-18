import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (isAuthenticated: boolean) => void;
  language: string;
}

export const Login: React.FC<LoginProps> = ({ onLogin, language }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const translations = {
    english: {
      title: "Welcome to AuraMED.in",
      subtitle: "Health Monitoring System for Rural Northeast India",
      loginTitle: "Login to Your Account",
      loginDescription: "Enter your credentials to access the health monitoring dashboard",
      username: "Username",
      password: "Password (must contain special characters)",
      loginButton: "Login",
      orText: "or",
      googleLogin: "Login with Google",
      usernamePlaceholder: "Enter your username",
      passwordPlaceholder: "Enter your password with special characters",
      loginError: "Invalid credentials. Please try again.",
      passwordError: "Password must contain at least one special character (@, #, $, %, etc.)",
    },
    hindi: {
      title: "AuraMED.in में आपका स्वागत है",
      subtitle: "ग्रामीण पूर्वोत्तर भारत के लिए स्वास्थ्य निगरानी प्रणाली",
      loginTitle: "अपने खाते में लॉगिन करें",
      loginDescription: "स्वास्थ्य निगरानी डैशबोर्ड तक पहुंचने के लिए अपनी साख दर्ज करें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड (विशेष अक्षरों के साथ)",
      loginButton: "लॉगिन",
      orText: "या",
      googleLogin: "Google के साथ लॉगिन करें",
      usernamePlaceholder: "अपना उपयोगकर्ता नाम दर्ज करें",
      passwordPlaceholder: "विशेष अक्षरों के साथ अपना पासवर्ड दर्ज करें",
      loginError: "अमान्य साख। कृपया पुनः प्रयास करें।",
      passwordError: "पासवर्ड में कम से कम एक विशेष अक्षर (@, #, $, %, आदि) होना चाहिए",
    },
    assamese: {
      title: "AuraMED.in লৈ আপোনাক স্বাগতম",
      subtitle: "গ্ৰাম্য উত্তৰ-পূৰ্ব ভাৰতৰ বাবে স্বাস্থ্য নিৰীক্ষণ ব্যৱস্থা",
      loginTitle: "আপোনাৰ একাউণ্টত লগিন কৰক",
      loginDescription: "স্বাস্থ্য নিৰীক্ষণ ডেশ্বব'ৰ্ড অভিগম কৰিবলৈ আপোনাৰ পৰিচয়পত্ৰ দিয়ক",
      username: "ব্যৱহাৰকাৰীৰ নাম",
      password: "পাছৱৰ্ড (বিশেষ চিহ্নৰ সৈতে)",
      loginButton: "লগিন",
      orText: "বা",
      googleLogin: "Google ৰ সৈতে লগিন কৰক",
      usernamePlaceholder: "আপোনাৰ ব্যৱহাৰকাৰীৰ নাম দিয়ক",
      passwordPlaceholder: "বিশেষ চিহ্নৰ সৈতে আপোনাৰ পাছৱৰ্ড দিয়ক",
      loginError: "অবৈধ পৰিচয়পত্ৰ। অনুগ্ৰহ কৰি পুনৰাই চেষ্টা কৰক।",
      passwordError: "পাছৱৰ্ডত কমেও এটা বিশেষ চিহ্ন (@, #, $, %, আদি) থাকিব লাগিব",
    },
    bengali: {
      title: "AuraMED.in-এ আপনাকে স্বাগতম",
      subtitle: "গ্রামীণ উত্তর-পূর্ব ভারতের জন্য স্বাস্থ্য নিরীক্ষণ ব্যবস্থা",
      loginTitle: "আপনার অ্যাকাউন্টে লগিন করুন",
      loginDescription: "স্বাস্থ্য নিরীক্ষণ ড্যাশবোর্ড অ্যাক্সেস করতে আপনার পরিচয়পত্র দিন",
      username: "ব্যবহারকারীর নাম",
      password: "পাসওয়ার্ড (বিশেষ অক্ষর সহ)",
      loginButton: "লগিন",
      orText: "অথবা",
      googleLogin: "Google দিয়ে লগিন করুন",
      usernamePlaceholder: "আপনার ব্যবহারকারীর নাম দিন",
      passwordPlaceholder: "বিশেষ অক্ষর সহ আপনার পাসওয়ার্ড দিন",
      loginError: "অবৈধ পরিচয়পত্র। অনুগ্রহ করে আবার চেষ্টা করুন।",
      passwordError: "পাসওয়ার্ডে কমপক্ষে একটি বিশেষ অক্ষর (@, #, $, %, ইত্যাদি) থাকতে হবে",
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const validatePassword = (password: string): boolean => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return specialChars.test(password);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (!validatePassword(password)) {
      setPasswordError(t.passwordError);
      return;
    }
    
    setIsLoading(true);
    
    // Mock authentication - replace with real Supabase authentication
    setTimeout(() => {
      if (username && password) {
        onLogin(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Mock Google authentication - replace with real Supabase Google OAuth
    onLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-300">{t.subtitle}</p>
        </div>
        
        <Card className="bg-gray-800 shadow-lg border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">{t.loginTitle}</CardTitle>
            <CardDescription className="text-center text-gray-300">
              {t.loginDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">{t.username}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t.usernamePlaceholder}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black text-white border-gray-700 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">{t.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black text-white border-gray-700 focus:border-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "..." : t.loginButton}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">{t.orText}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleGoogleLogin}
              variant="outline" 
              className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t.googleLogin}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};