import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Waves, 
  Users, 
  Globe, 
  Zap, 
  Shield, 
  BarChart3,
  Target,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { label: 'Active ARGO Floats', value: '4,000+', icon: Waves },
    { label: 'Research Organizations', value: '150+', icon: Users },
    { label: 'Countries Served', value: '60+', icon: Globe },
    { label: 'Data Points Analyzed', value: '2M+', icon: BarChart3 }
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms process vast ocean datasets to extract meaningful insights.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security ensures your research data remains protected and confidential.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access to worldwide ARGO float network providing comprehensive ocean monitoring.'
    },
    {
      icon: Users,
      title: 'Collaborative Research',
      description: 'Share findings and collaborate with oceanographers and researchers worldwide.'
    }
  ];


const team = [
  {
    name: 'Labbai Irfan',
    role: 'Founder & CEO',
    avatar: 'LI',
    bio: 'Marine data scientist with 10+ years in oceanographic research and AI.',
    links: { github: '#', linkedin: '#', email: 'labbai.irfan@floatchat.com' }
  },
  {
    name: 'Dr. Sana Shaikh',
    role: 'Chief Science Officer',
    avatar: 'SS',
    bio: 'Oceanographer specializing in climate modeling and data visualization.',
    links: { github: '#', linkedin: '#', email: 'sana.shaikh@floatchat.com' }
  },
  {
    name: 'Amrut Pathankar',
    role: 'Head of Engineering',
    avatar: 'AP',
    bio: 'Full-stack developer focused on scalable ocean data platforms.',
    links: { github: '#', linkedin: '#', email: 'amrut.pathankar@floatchat.com' }
  },
  {
    name: 'Aafia Shaikh',
    role: 'Climate Data Specialist',
    avatar: 'AS',
    bio: 'Expert in climate modeling and ocean-atmosphere interactions, focusing on sustainability.',
    links: { github: '#', linkedin: '#', email: 'aafia.shaikh@floatchat.com' }
  },
  {
    name: 'Kashish Siddiqui',
    role: 'AI & Visualization Engineer',
    avatar: 'KS',
    bio: 'Specialist in AI-driven data visualization, making complex ocean data accessible and insightful.',
    links: { github: '#', linkedin: '#', email: 'kashish.siddiqui@floatchat.com' }
  }
];


  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: Target },
    { id: 'team', label: 'Meet the Team', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#cde1ff] dark:from-[#001f3f] dark:to-[#002d57]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 dark:bg-white/10 px-4 py-2 rounded-full mb-6">
            <Waves className="h-5 w-5 text-[#007acc]" />
            <span className="text-[#002d57] dark:text-white font-medium">About FloatChat</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-[#002d57] dark:text-white mb-6">
            Revolutionizing
            <span className="bg-gradient-to-r from-[#007acc] to-[#00d8ff] bg-clip-text text-transparent"> Ocean Science</span>
          </h1>
          
          <p className="text-xl text-[#575757] dark:text-[#cde1ff] max-w-3xl mx-auto mb-8">
            We're democratizing access to ocean data through AI-powered conversations, 
            making complex oceanographic research accessible to scientists worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              onClick={() => onNavigate('features')}
              className="bg-[#007acc] hover:bg-[#005f99] text-white"
            >
              Explore Features
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="border-[#007acc] text-[#007acc] hover:bg-[#007acc] hover:text-white"
            >
              Contact Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/50 dark:bg-white/10 border-white/20 text-center">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#002d57] dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[#575757] dark:text-[#cde1ff]">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#007acc] text-white shadow-lg'
                    : 'bg-white/50 dark:bg-white/10 text-[#002d57] dark:text-white hover:bg-white/70 dark:hover:bg-white/20'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-[#002d57] rounded-2xl p-8 md:p-12 ocean-shadow-lg">
            {activeTab === 'mission' && (
              <div className="space-y-8">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-[#002d57] dark:text-white mb-6">
                    Our Mission: Democratizing Ocean Science
                  </h2>
                  <p className="text-lg text-[#575757] dark:text-[#cde1ff] mb-8">
                    We believe that understanding our oceans is crucial for the future of our planet. 
                    FloatChat bridges the gap between complex oceanographic data and actionable insights, 
                    empowering researchers to make discoveries that matter.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {features.map((feature, index) => (
                    <Card key={index} className="border-gray-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#002d57] dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-[#575757] dark:text-[#cde1ff]">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-[#002d57] dark:text-white mb-4">
                    Meet Our Team
                  </h2>
                  <p className="text-lg text-[#575757] dark:text-[#cde1ff] max-w-2xl mx-auto">
                    Our diverse team of oceanographers, data scientists, and engineers 
                    are passionate about making ocean science accessible to everyone.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {team.map((member, index) => (
                    <Card key={index} className="border-gray-200 dark:border-gray-700 text-center">
                      <CardContent className="p-6">
                        <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-[#007acc]/20">
                          <AvatarFallback className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] text-white text-xl font-semibold">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold text-[#002d57] dark:text-white mb-1">
                          {member.name}
                        </h3>
                        <Badge variant="secondary" className="mb-3">
                          {member.role}
                        </Badge>
                        <p className="text-[#575757] dark:text-[#cde1ff] mb-4">
                          {member.bio}
                        </p>
                        <div className="flex justify-center space-x-3">
                          <Button size="sm" variant="ghost" className="p-2">
                            <Github className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-2">
                            <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-2">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-[#007acc] to-[#00d8ff] border-none text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Ocean Research?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of researchers who are already using FloatChat 
                to unlock insights from ocean data.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('signup')}
                  className="bg-white text-[#007acc] hover:bg-gray-100"
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('contact')}
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}