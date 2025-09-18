import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent} from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { OceanMap } from '../OceanMap';
import { 
  ArrowRight,  
  Database, 
  TrendingUp, 
  Play,
  CheckCircle,
  Globe,
  Waves,
  Activity,
  MapPin,
  Award,
  Target,
  Download,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  isDark: boolean;
  isLoggedIn: boolean;
}

export function HomePage({ onNavigate, isDark, isLoggedIn }: HomePageProps) {
  const [currentUseCaseIndex, setCurrentUseCaseIndex] = useState(0);
  const [stats, setStats] = useState({
    dataPoints: 0,
    activeUsers: 0,
    modelsDeployed: 0,
    floatsMonitored: 0
  });

  const finalStats = {
    dataPoints: 2485672,
    activeUsers: 12847,
    modelsDeployed: 156,
    floatsMonitored: 3947
  };

  const formatShort = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M+`;
    if (n >= 1000) return `${Math.round(n / 100) / 10}K+`;
    return `${n}`;
  };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2500;
      const interval = 50;
      const steps = duration / interval;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          dataPoints: Math.floor(finalStats.dataPoints * easeOut),
          activeUsers: Math.floor(finalStats.activeUsers * easeOut),
          modelsDeployed: Math.floor(finalStats.modelsDeployed * easeOut),
          floatsMonitored: Math.floor(finalStats.floatsMonitored * easeOut)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(finalStats);
        }
      }, interval);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUseCaseIndex((prev) => (prev + 1) % useCases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const useCases = [
    {
      title: "Climate Research",
      description: "Track long-term temperature trends and predict climate impacts",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Marine Biology",
      description: "Study ecosystem changes and marine life distribution patterns",
      icon: Activity,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Weather Forecasting",
      description: "Improve weather models with real-time ocean temperature data",
      icon: Waves,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Shipping & Navigation",
      description: "Optimize routes using current patterns and temperature data",
      icon: MapPin,
      color: "from-orange-500 to-red-500"
    }
  ];

  const platformHighlights = [
    { label: "Data Sources", value: "12+", icon: Database },
    { label: "Research Papers", value: "240+", icon: Award },
    { label: "Countries", value: "45+", icon: Globe },
    { label: "Universities", value: "120+", icon: Target }
  ];

  return (
    <div className="min-h-screen">
      {isLoggedIn && (
        <div className="fixed top-4 right-4">
          <span className="px-3 py-1 bg-[#007acc] text-white rounded-full text-sm">Signed in</span>
        </div>
      )}
      <section className="relative bg-gradient-to-br from-[#002d57] via-[#005f99] to-[#007acc] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-8">
              <div>
                <Badge className="bg-[#00d8ff]/20 text-[#00d8ff] border-[#00d8ff]/30 mb-6 text-lg px-4 py-2 hover:bg-[#00d8ff]/30 transition-colors">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Next-Generation Ocean Analytics
                </Badge>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Unlock Ocean
                  <span className="block text-[#00d8ff] relative">
                    Intelligence
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00d8ff] to-transparent rounded-full opacity-60" />
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-[#cde1ff] leading-relaxed mt-6">
                  Transform complex ocean data into actionable insights through AI-powered conversations. 
                  Connect with real-time ARGO float data from <span className="text-[#00d8ff] font-semibold">3,947+ active floats</span> worldwide.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-[#cde1ff]">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#00d8ff] mr-2" />
                  <span>Trusted by 120+ Universities</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#00d8ff] mr-2" />
                  <span>99.9% Uptime SLA</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#00d8ff] mr-2" />
                  <span>SOC 2 Certified</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('signup')}
                  className="bg-[#00d8ff] text-[#002d57] hover:bg-[#00d8ff]/90 font-semibold px-8 py-4 text-lg ocean-shadow-lg hover-lift"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('chat')}
                  className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {platformHighlights.map((highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-[#00d8ff]">{highlight.value}</div>
                    <div className="text-sm text-[#cde1ff]">{highlight.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 ocean-shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Live Ocean Data Network</h3>
                    <p className="text-[#cde1ff] text-sm">3,947 active ARGO floats reporting</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#00d8ff] rounded-full pulse-glow" />
                    <span className="text-sm text-[#cde1ff]">Live</span>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden">
                  <OceanMap className="h-[400px]" darkMode={isDark} />
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-[#00d8ff]">{formatShort(stats.dataPoints)}</div>
                    <div className="text-xs text-[#cde1ff]">Data Points</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#00d8ff]">{stats.modelsDeployed}</div>
                    <div className="text-xs text-[#cde1ff]">AI Models</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#00d8ff]">{formatShort(stats.activeUsers)}</div>
                    <div className="text-xs text-[#cde1ff]">Researchers</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-20 hidden xl:block">
                <Card className={`w-48 bg-gradient-to-r ${useCases[currentUseCaseIndex].color} text-white border-0 transition-all duration-500 hover-lift`}>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      {(() => {
                        const IconComponent = useCases[currentUseCaseIndex].icon;
                        return <IconComponent className="h-5 w-5 mr-2" />;
                      })()}
                      <span className="font-semibold text-sm">{useCases[currentUseCaseIndex].title}</span>
                    </div>
                    <p className="text-xs text-white/90">{useCases[currentUseCaseIndex].description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      

      <section className="py-20 px-4 bg-[#f8fafc] dark:bg-[#001f3f]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powering Research Across Disciplines</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From climate science to marine biology, FloatChat enables breakthrough discoveries across multiple research domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              return (
                <Card key={index} className={`relative overflow-hidden border-0 group hover-lift`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-90`} />
                  <CardContent className="relative z-10 p-6 text-white">
                    <IconComponent className="h-8 w-8 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-white/90 leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>  

      <section className="py-16 px-4 bg-[#f8fafc] dark:bg-[#001f3f] border-t">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3">Stay Updated with Ocean Insights</h3>
              <p className="text-muted-foreground">
                Get the latest updates on ocean research, platform features, and breakthrough discoveries.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1"
              />
              <Button className="bg-[#007acc] hover:bg-[#005f99] px-6">
                <Download className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}