import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { OceanMap } from '../OceanMap';
import {
  Send,
  Bot,
  MapPin,
  Filter,
  History,
  HelpCircle,
  ChevronDown,
  Thermometer,
  Droplets,
  Activity,
  TrendingUp,
  Copy,
  RefreshCw,
  Bookmark,
  Share2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  location?: { lat: number; lng: number };
  attachments?: Array<{ type: string; url: string; name: string }>;
}

interface ChatSession {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatPageProps {
  onNavigate: (page: string) => void;
  isDark: boolean;
  user?: { name: string; email: string; avatar: string } | null;
}

export function ChatPage({ onNavigate, isDark }: ChatPageProps) {
  // messages: list of chat messages shown in the UI (user and AI)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello Labbai Irfan! I\'m your FloatChat AI assistant. I can help you analyze ocean data, explore ARGO float measurements, and answer questions about marine science. What would you like to explore today?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('global');
  const [selectedParameter, setSelectedParameter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      name: 'Pacific Temperature Analysis',
      lastMessage: 'highest density in first 100 rows',
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 15
    },
    {
      id: '2',
      name: 'ARGO Float Performance',
      lastMessage: 'what is the average depth?',
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8
    },
    {
      id: '3',
      name: 'what is the average temperature in first 200 rows',
      lastMessage: '',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 22
    }
  ]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: inputMessage,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsTyping(true);
  try {
    const response = await fetch(`https://floatbackend-production.up.railway.app/chat-query/${encodeURIComponent(inputMessage)}`);
    const data = await response.json();
    console.log('API response:', data);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: data.answer || 'Sorry, I couldn\'t process that request.', 
      timestamp: new Date(),
      location: Math.random() > 0.7 ? { lat: 35.5, lng: -125.2 } : undefined 
    };
    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    console.error('Error fetching from API:', error);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: 'Sorry, there was an error connecting to the server.', 
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  } finally {
    setIsTyping(false); 
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const suggestedQuestions = [
    "highest density in first 100 rows ?",
    "what is the average depth?",
    "what is the average temperature in first 200 rows",
  ];

  const quickFilters = [
    { label: 'Active Floats', value: 'active', icon: Activity },
    { label: 'Temperature', value: 'temperature', icon: Thermometer },
    { label: 'Salinity', value: 'salinity', icon: Droplets },
    { label: 'Recent Data', value: 'recent', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Ocean Chat</h1>
            <p className="text-muted-foreground">
              Explore ocean data through intelligent conversations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('dashboard')}
            >
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        <Collapsible open={showFilters} onOpenChange={setShowFilters}>
          <CollapsibleContent>
            <Card className="mb-6 ocean-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Query Refinement Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="pacific">Pacific Ocean</SelectItem>
                        <SelectItem value="atlantic">Atlantic Ocean</SelectItem>
                        <SelectItem value="indian">Indian Ocean</SelectItem>
                        <SelectItem value="arctic">Arctic Ocean</SelectItem>
                        <SelectItem value="southern">Southern Ocean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Parameter</label>
                    <Select value={selectedParameter} onValueChange={setSelectedParameter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parameter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Parameters</SelectItem>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="salinity">Salinity</SelectItem>
                        <SelectItem value="pressure">Pressure</SelectItem>
                        <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                        <SelectItem value="ph">pH Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Quick Filters</label>
                    <div className="flex flex-wrap gap-2">
                      {quickFilters.map((filter) => (
                        <Badge
                          key={filter.value}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <filter.icon className="h-3 w-3 mr-1" />
                          {filter.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="h-[600px] flex flex-col ocean-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-primary" />
                    Chat Session
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {messages.length} messages
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === 'ai' && (
                              <Bot className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              {message.location && (
                                <div className="flex items-center mt-2 text-xs opacity-70">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {message.location.lat.toFixed(2)}°N, {Math.abs(message.location.lng).toFixed(2)}°W
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">
                                  {message.timestamp.toLocaleTimeString()}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                                  onClick={() => copyMessage(message.content)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl px-4 py-3 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-primary" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                {messages.length === 1 && (
                  <div className="px-4 py-3 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setInputMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      placeholder="Ask about ocean data, ARGO floats, or marine science..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="ocean-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Live Ocean Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden">
                  <OceanMap className="h-[300px]" darkMode={isDark} />
                </div>
              </CardContent>
            </Card>
            <Card className="ocean-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <History className="h-4 w-4 mr-2" />
                    Chat History
                  </span>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{session.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {session.lastMessage}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {session.messageCount} messages
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {session.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="ocean-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Tips & FAQ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tips" className="space-y-3">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tips">Tips</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tips" className="space-y-3">
                    <div className="text-sm space-y-2">
                      <p>• Ask specific questions about locations, depths, or time periods</p>
                      <p>• Use natural language - "Show me temperature data for Pacific"</p>
                      <p>• Request data exports or visualizations</p>
                      <p>• Ask for trend analysis and predictions</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="space-y-3">
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-sm">
                        <span>How current is the data?</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="text-xs text-muted-foreground mt-2">
                        ARGO float data is updated in real-time, typically within 6-24 hours of collection.
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-sm">
                        <span>Can I export data?</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="text-xs text-muted-foreground mt-2">
                        Yes, ask the AI to generate reports in CSV, JSON, or PDF formats.
                      </CollapsibleContent>
                    </Collapsible>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}