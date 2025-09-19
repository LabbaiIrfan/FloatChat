import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  ArrowLeft,
  Shield,
  Users,
  BarChart3,
  HelpCircle
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string, password: string) => boolean;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const success = onLogin(email, password);
      setIsLoading(false);
      
      if (!success) {
        setError('Invalid email or password. Try: labbai.irfan@floatchat.com / password');
      }
    }, 1500);
  };

  const benefits = [
    {
      icon: Shield,
      title: "Secure Access",
      description: "Enterprise-grade security for your research data"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Share insights with your research team"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Access premium analysis tools and models"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#cde1ff] dark:from-[#001f3f] dark:to-[#002d57] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-8 text-[#002d57] dark:text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#002d57] dark:text-white mb-4">
                Welcome Back to FloatChat
              </h1>
              <p className="text-xl text-[#575757] dark:text-[#cde1ff]">
                Continue your ocean data exploration journey with AI-powered insights.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#007acc] to-[#00d8ff] w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#002d57] dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-[#575757] dark:text-[#cde1ff]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/50 dark:bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-[#002d57] dark:text-white mb-3">
                Demo Credentials
              </h3>
              <p className="text-[#575757] dark:text-[#cde1ff] mb-2 text-sm">
                Try the platform with these demo credentials:
              </p>
              <div className="text-sm text-[#575757] dark:text-[#cde1ff] mb-4 font-mono bg-white/30 dark:bg-black/20 p-3 rounded-lg">
                <div>Email: labbai.irfan@floatchat.com</div>
                <div>Password: password</div>
              </div>
              <Button
                variant="outline"
                onClick={() => onNavigate('signup')}
                className="border-[#007acc] text-[#007acc] hover:bg-[#007acc] hover:text-white w-full"
              >
                Create Account
              </Button>
            </div>
          </div>

          <Card className="w-full max-w-md mx-auto ocean-shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#002d57] dark:text-white">
                Sign In
              </CardTitle>
              <p className="text-[#575757] dark:text-[#cde1ff]">
                Access your FloatChat dashboard
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <Chrome className="h-5 w-5 mr-2" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <Github className="h-5 w-5 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-[#007acc] hover:text-[#005f99] p-0"
                    onClick={() => onNavigate('forgot-password')}
                  >
                    Forgot password?
                  </Button>
                </div>

                {error && (
                  <div className="text-red-600 dark:text-red-400 text-sm text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#007acc] hover:bg-[#005f99] text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  size="sm"
                  className="text-[#575757] dark:text-[#cde1ff] hover:text-[#007acc]"
                  onClick={() => onNavigate('support')}
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Need help signing in?
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}