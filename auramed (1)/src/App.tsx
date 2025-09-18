import React, { useState } from 'react';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { DataEntry } from "./components/DataEntry";
import { NewDashboard } from "./components/NewDashboard";
import { Community } from "./components/Community";
import { Alerts } from "./components/Alerts";
import { Chatbot } from "./components/Chatbot";
import { DiseasePrevention } from "./components/DiseasePrevention";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { DataProvider, useData } from "./components/DataContext";

function MainApp() {
  const { currentLanguage } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} language={currentLanguage} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <DataEntry />
        <NewDashboard />
        <Community />
        <Alerts />
        <DiseasePrevention />
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}