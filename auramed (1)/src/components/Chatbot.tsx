import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageCircle, Bot, User, Send, Heart, Activity } from "lucide-react";
import { useState } from "react";
import { useData } from "./DataContext";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export function Chatbot() {
  const { translate } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: 'Hello! I\'m your AI health assistant. I can help you with information about waterborne diseases, symptoms, and prevention methods. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickQuestions = [
    "What are the symptoms of cholera?",
    "How to prevent diarrheal diseases?",
    "Is my water safe to drink?",
    "What should I do if I have fever and vomiting?",
    "How to treat dehydration?",
    "When should I see a doctor?"
  ];

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('cholera') || message.includes('symptoms')) {
      return "Cholera symptoms include severe watery diarrhea, vomiting, dehydration, and muscle cramps. If you suspect cholera, seek immediate medical attention and drink oral rehydration solution (ORS). Avoid solid foods until vomiting stops.";
    } else if (message.includes('fever') && message.includes('vomit')) {
      return "Fever and vomiting can indicate typhoid, viral infection, or food poisoning. Stay hydrated with small sips of water or ORS. If symptoms persist for more than 24 hours or worsen, consult a healthcare provider immediately.";
    } else if (message.includes('diarrhea') || message.includes('prevent')) {
      return "To prevent diarrheal diseases: 1) Drink only boiled/treated water, 2) Wash hands with soap frequently, 3) Eat freshly cooked hot food, 4) Avoid raw vegetables and fruits you can't peel, 5) Use proper sanitation facilities.";
    } else if (message.includes('water') && message.includes('safe')) {
      return "To ensure water safety: Boil water for at least 1 minute, use water purification tablets, or drink from sealed bottled water. Avoid ice, tap water, and water from wells unless properly treated.";
    } else if (message.includes('dehydration') || message.includes('ors')) {
      return "For dehydration treatment: Use ORS (Oral Rehydration Solution) - mix 1 packet in 1 liter of clean water. Drink small amounts frequently. Signs of severe dehydration include dizziness, no urination, or extreme weakness - seek immediate medical care.";
    } else if (message.includes('doctor') || message.includes('hospital')) {
      return "See a doctor immediately if you have: severe dehydration, blood in stool, high fever (>102°F), persistent vomiting, severe abdominal pain, or symptoms lasting >3 days. For emergencies, call 108 or visit the nearest health center.";
    } else {
      return "I understand you're asking about health concerns. For specific medical advice, please consult with a healthcare professional. I can provide general information about waterborne diseases, prevention methods, and when to seek medical care. Could you ask a more specific question?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      message: getAIResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: question,
      timestamp: new Date()
    };

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      message: getAIResponse(question),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  return (
    <section id="chatbot" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
            <Bot className="w-3 h-3 mr-1" />
            {translate('chatbot.badge')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {translate('chatbot.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {translate('chatbot.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat Interface */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                Health Assistant Chat
              </CardTitle>
              <CardDescription>
                Ask questions about waterborne diseases, symptoms, and health advice
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto mb-4 space-y-4 bg-muted/20 rounded-lg p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-100' 
                        : 'bg-purple-100'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <div className={`max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-black text-white border border-border'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder={translate('chatbot.placeholder')}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-card border-border"
                />
                <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Questions and Daily Health Tips - Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Quick Questions */}
            <Card className="bg-black border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-300">{translate('chatbot.quick_questions')}</CardTitle>
                <CardDescription className="text-purple-400">
                  Click on common questions to get instant answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3 text-sm text-purple-300 border-purple-200 hover:bg-purple-900/30 bg-gray-800"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Health Tips */}
            <Card className="bg-black border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-300 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {translate('chatbot.daily_health_tips')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-green-300">
                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 text-green-400" />
                    <span>Drink at least 8 glasses of safe, treated water daily</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 text-green-400" />
                    <span>Wash hands with soap for 20 seconds before meals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 text-green-400" />
                    <span>Eat freshly cooked food while it's still hot</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 mt-0.5 text-green-400" />
                    <span>Keep your surroundings clean and waste-free</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Card className="bg-amber-50 border-amber-200 mt-8">
            <CardContent className="p-4">
              <p className="text-xs text-amber-700">
                <strong>Disclaimer:</strong> This AI assistant provides general health information only. 
                For medical emergencies or specific health concerns, please consult qualified healthcare professionals 
                or call emergency services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}