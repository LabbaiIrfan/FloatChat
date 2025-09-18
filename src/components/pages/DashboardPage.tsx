import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { OceanMap } from '../OceanMap';
import {
  BarChart3,
  Activity,
  Database,
  Bell,
  Settings,
  Download,
  Brain,
  Waves,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Star,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  isDark: boolean;
  user: { name: string; email: string; avatar: string } | null;
}

export function DashboardPage({ onNavigate, isDark, user }: DashboardPageProps) {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'New ARGO data available from Pacific region', time: '2 min ago', read: false },
    { id: 2, type: 'warning', message: 'Float ARGO-001 showing irregular temperature readings', time: '15 min ago', read: false },
    { id: 3, type: 'info', message: 'Monthly analysis report ready for download', time: '1 hour ago', read: true },
    { id: 4, type: 'success', message: 'AI model training completed successfully', time: '2 hours ago', read: true }
  ]);

  const [metrics, setMetrics] = useState({
    totalFloats: 0,
    activeQueries: 0,
    dataProcessed: 0,
    uptime: 0
  });

  const finalMetrics = {
    totalFloats: 3847,
    activeQueries: 156,
    dataProcessed: 2.4,
    uptime: 99.9
  };

  useEffect(() => {
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setMetrics({
        totalFloats: Math.floor(finalMetrics.totalFloats * easeOut),
        activeQueries: Math.floor(finalMetrics.activeQueries * easeOut),
        dataProcessed: Number((finalMetrics.dataProcessed * easeOut).toFixed(1)),
        uptime: Number((finalMetrics.uptime * easeOut).toFixed(1))
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setMetrics(finalMetrics);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const temperatureData = [
    { time: '00:00', temperature: 15.2, salinity: 34.1 },
    { time: '04:00', temperature: 15.1, salinity: 34.0 },
    { time: '08:00', temperature: 15.3, salinity: 34.2 },
    { time: '12:00', temperature: 15.5, salinity: 34.1 },
    { time: '16:00', temperature: 15.4, salinity: 34.3 },
    { time: '20:00', temperature: 15.2, salinity: 34.0 }
  ];

  const activityData = [
    { day: 'Mon', queries: 45, insights: 12 },
    { day: 'Tue', queries: 52, insights: 15 },
    { day: 'Wed', queries: 38, insights: 8 },
    { day: 'Thu', queries: 67, insights: 18 },
    { day: 'Fri', queries: 74, insights: 22 },
    { day: 'Sat', queries: 29, insights: 6 },
    { day: 'Sun', queries: 31, insights: 9 }
  ];

  const recentActivities = [
    { type: 'query', description: 'Analyzed Pacific temperature trends', time: '5 min ago', user: 'You' },
    { type: 'insight', description: 'Generated climate prediction model', time: '23 min ago', user: 'Labbai Irfan' },
    { type: 'data', description: 'Downloaded ARGO float dataset', time: '1 hour ago', user: 'You' },
    { type: 'query', description: 'Compared salinity levels across regions', time: '2 hours ago', user: 'Prof. Rodriguez' }
  ];

  const favoriteReports = [
    { name: 'Pacific Temperature Analysis', lastAccessed: '2 hours ago', status: 'Updated' },
    { name: 'Global Salinity Trends', lastAccessed: '1 day ago', status: 'Stale' },
    { name: 'ARGO Float Performance', lastAccessed: '3 days ago', status: 'Updated' }
  ];

  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info': return <Bell className="h-4 w-4 text-blue-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        <div className="bg-gradient-to-r from-[#002d57] to-[#007acc] rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white/20">
                <AvatarFallback className="bg-[#00d8ff] text-[#002d57] text-xl font-bold">
                  {user?.avatar || 'LI'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Labbai Irfan'}</h1>
                <p className="text-[#cde1ff] text-lg">
                  Ready to explore today's ocean insights? You have {notifications.filter(n => !n.read).length} new notifications.
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => onNavigate('chat')}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start AI Chat
              </Button>
              <Button
                onClick={() => onNavigate('profile')}
                className="bg-[#00d8ff] text-[#002d57] hover:bg-[#00d8ff]/90"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="ocean-shadow hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active ARGO Floats</p>
                  <p className="text-3xl font-bold count-up">{metrics.totalFloats.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-green-600 mt-2">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+5.2% from last month</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Waves className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ocean-shadow hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">AI Queries Today</p>
                  <p className="text-3xl font-bold count-up">{metrics.activeQueries}</p>
                  <div className="flex items-center text-sm text-green-600 mt-2">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+12.3% from yesterday</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ocean-shadow hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Data Processed (TB)</p>
                  <p className="text-3xl font-bold count-up">{metrics.dataProcessed}</p>
                  <div className="flex items-center text-sm text-orange-600 mt-2">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>-2.1% from last week</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Database className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="ocean-shadow hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">System Uptime</p>
                  <p className="text-3xl font-bold count-up">{metrics.uptime}%</p>
                  <div className="mt-2">
                    <Progress value={metrics.uptime} className="h-2" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="ocean-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Live Ocean Data Network</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('visualization')}
                  >
                    Full View
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden">
                  <OceanMap className="h-[300px]" darkMode={isDark} />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="temperature" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="temperature">Ocean Temperature</TabsTrigger>
                <TabsTrigger value="activity">Platform Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="temperature">
                <Card className="ocean-shadow">
                  <CardHeader>
                    <CardTitle>24-Hour Temperature Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                        <XAxis dataKey="time" stroke="#575757" />
                        <YAxis stroke="#575757" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="#007acc" 
                          strokeWidth={3}
                          dot={{ fill: '#007acc', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card className="ocean-shadow">
                  <CardHeader>
                    <CardTitle>Weekly Platform Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                        <XAxis dataKey="day" stroke="#575757" />
                        <YAxis stroke="#575757" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="queries" 
                          stackId="1"
                          stroke="#007acc" 
                          fill="#007acc"
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="insights" 
                          stackId="1"
                          stroke="#00d8ff" 
                          fill="#00d8ff"
                          fillOpacity={0.8}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="ocean-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="secondary">{notifications.filter(n => !n.read).length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      notification.read 
                        ? 'bg-muted/30 border-muted' 
                        : 'bg-background border-[#007acc]/20 hover:bg-[#007acc]/5'
                    }`}
                    onClick={() => markNotificationRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            <Card className="ocean-shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-[#007acc]/10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      {activity.type === 'query' && <BarChart3 className="h-4 w-4 text-[#007acc]" />}
                      {activity.type === 'insight' && <Brain className="h-4 w-4 text-[#007acc]" />}
                      {activity.type === 'data' && <Download className="h-4 w-4 text-[#007acc]" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="ocean-shadow">
              <CardHeader>
                <CardTitle>Favorite Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {favoriteReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.lastAccessed}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={report.status === 'Updated' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}