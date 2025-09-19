import { Waves, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Features', page: 'features' },
    { name: 'Dashboard', page: 'dashboard' },
    { name: 'AI Chat', page: 'chat' },
    { name: 'Documentation', page: 'resources' },
    { name: 'About', page: 'about' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', page: 'privacy' },
    { name: 'Terms of Service', page: 'terms' },
    { name: 'Cookie Policy', page: 'cookies' }
  ];

  return (
    <footer className="bg-[#002d57] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-[#00d8ff]" />
              <span className="text-2xl font-bold">FloatChat</span>
            </div>
            <p className="text-[#cde1ff] leading-relaxed">
              Revolutionizing ocean data analysis through AI-powered conversations and real-time ARGO float monitoring.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-[#00d8ff] hover:bg-white/10 hover:text-[#00d8ff]">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[#00d8ff] hover:bg-white/10 hover:text-[#00d8ff]">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[#00d8ff] hover:bg-white/10 hover:text-[#00d8ff]">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#00d8ff]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-[#cde1ff] hover:text-[#00d8ff] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#00d8ff]">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-[#cde1ff] hover:text-[#00d8ff] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-[#cde1ff]">
                <Mail className="h-4 w-4" />
                <span>contact@floatchat.com</span>
              </div>
              <div className="flex items-center space-x-2 text-[#cde1ff]">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-[#cde1ff]">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#00d8ff]">Stay Updated</h3>
            <p className="text-[#cde1ff]">
              Subscribe to our newsletter for the latest ocean data insights and platform updates.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#00d8ff]"
              />
              <Button className="w-full bg-[#00d8ff] text-[#002d57] hover:bg-[#00d8ff]/90 font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#cde1ff] text-sm">
            © 2024 FloatChat. All rights reserved.
          </p>
          <p className="text-[#cde1ff] text-sm mt-2 md:mt-0">
            Powered by ARGO ocean data • Built with ❤️ for marine science
          </p>
        </div>
      </div>
    </footer>
  );
}