import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { ChatPage } from './components/pages/ChatPage';
import { ContactPage } from './components/pages/ContactPage';
import { AboutPage } from './components/pages/AboutPage';
import { Toaster } from './components/ui/sonner';

const PlaceholderPage = ({ title, message, onNavigate }: { 
  title: string; 
  message: string; 
  onNavigate: (page: string) => void 
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] to-[#cde1ff] dark:from-[#001f3f] dark:to-[#002d57]">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-[#002d57] dark:text-white">{title}</h1>
      <p className="text-[#575757] dark:text-[#cde1ff]">{message}</p>
      <button 
        onClick={() => onNavigate('home')} 
        className="px-6 py-3 bg-[#007acc] text-white rounded-lg hover:bg-[#005f99] transition-colors"
      >
        Back to Home
      </button>
    </div>
  </div>
);

const LegalPage = ({ title, content, onNavigate }: { 
  title: string; 
  content: React.ReactNode; 
  onNavigate: (page: string) => void 
}) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4 max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#002d57] dark:text-white">{title}</h1>
      <div className="text-left space-y-4 text-[#575757] dark:text-[#cde1ff]">
        {content}
      </div>
      <button 
        onClick={() => onNavigate('home')} 
        className="px-6 py-3 bg-[#007acc] text-white rounded-lg hover:bg-[#005f99] transition-colors"
      >
        Back to Home
      </button>
    </div>
  </div>
);

type User = { name: string; email: string; avatar: string } | null;
type Page =
  | 'home'
  | 'login'
  | 'about'
  | 'contact'
  | 'signup'
  | 'insights'
  | 'resources'
  | 'profile'
  | 'features'
  | 'privacy'
  | 'terms'
  | 'dashboard'
  | 'chat'
  | 'visualization';

/**
 * Root application component.
 *
 * This component manages high-level application state such as
 * the current page, theme (dark/light), authentication status,
 * and the current user object. It decides which page component
 * to render based on `currentPage` and `isLoggedIn`.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  /**
   * Navigate to another page in the app.
   * Accepts a string (page id) and updates the `currentPage` state.
   * We call window.scrollTo to reset the viewport.
   */
  const navigate = (page: string) => {
    // Accept external string pages but cast to our Page union when updating state
    setCurrentPage(page as Page);
    // Always scroll to top after navigating so users see the top of the page
    window.scrollTo(0, 0);
  };

  /**
   * Very small demo login handler used by the sample LoginPage.
   * In a real app you'd call your API here and securely store a token.
   * For the demo we accept any non-empty email/password and set a fake user.
   * Returns true on success so the LoginPage can react.
   */
  const handleLogin = (email: string, password: string): boolean => {
    if (email && password) {
      const userData = {
        // Simple example: show a different name/avatar for the original author
        name: email === 'labbai.irfan@floatchat.com' ? 'Labbai Irfan' : 'Ocean Researcher',
        email: email,
        avatar: email === 'labbai.irfan@floatchat.com' ? 'LI' : 'OR'
      };
      // Update state to reflect the logged-in user
      setUser(userData);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  useEffect(() => {
    const protectedPages = ['dashboard', 'chat', 'insights', 'profile'];
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
      setCurrentPage('login');
    }
  }, [currentPage, isLoggedIn]);

  const renderPage = () => {
  const pages: Record<string, React.ReactNode> = {
      home: <HomePage onNavigate={navigate} isDark={isDark} isLoggedIn={isLoggedIn} />,
      login: <LoginPage onNavigate={navigate} onLogin={handleLogin} />,
      about: <AboutPage onNavigate={navigate} />,
      contact: <ContactPage onNavigate={navigate} />,
      signup: <PlaceholderPage title="Sign Up Coming Soon" message="We're working on the registration system." onNavigate={navigate} />,
      insights: <PlaceholderPage title="Insights & Predictions Coming Soon" message="AI-powered insights and predictions are in development." onNavigate={navigate} />,
      resources: <PlaceholderPage title="Resources & Documentation Coming Soon" message="Documentation and resources are being prepared." onNavigate={navigate} />,
      profile: <PlaceholderPage title="User Profile Coming Soon" message="User profile and settings page is in development." onNavigate={navigate} />,
      features: <PlaceholderPage title="Features Coming Soon" message="Detailed features page is in development." onNavigate={navigate} />,
      privacy: <LegalPage 
        title="Privacy Policy" 
        content={
          <>
            <p>Last updated: December 2024</p>
            <p>FloatChat is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our ocean data analysis platform.</p>
            <h2 className="text-2xl font-semibold text-[#002d57] dark:text-white">Information We Collect</h2>
            <p>We collect information necessary to provide our ocean data analysis services, including account information, usage data, and research queries.</p>
            <h2 className="text-2xl font-semibold text-[#002d57] dark:text-white">How We Use Your Information</h2>
            <p>Your information is used to provide personalized ocean data insights, improve our AI models, and facilitate scientific research collaboration.</p>
          </>
        } 
        onNavigate={navigate} 
      />,
      terms: <LegalPage 
        title="Terms of Service" 
        content={
          <>
            <p>Last updated: December 2024</p>
            <p>By using FloatChat, you agree to these Terms of Service. Please read them carefully.</p>
            <h2 className="text-2xl font-semibold text-[#002d57] dark:text-white">Use of Service</h2>
            <p>FloatChat provides ocean data analysis tools for scientific research. You must use the service responsibly and in accordance with applicable laws.</p>
            <h2 className="text-2xl font-semibold text-[#002d57] dark:text-white">Data Usage</h2>
            <p>ARGO float data is provided for research purposes. Commercial use requires separate licensing.</p>
          </>
        } 
        onNavigate={navigate} 
      />
    };

    if (isLoggedIn && currentPage === 'dashboard') {
      return <DashboardPage onNavigate={navigate} isDark={isDark} user={user} />;
    }
    
    if (isLoggedIn && currentPage === 'chat') {
      return <ChatPage onNavigate={navigate} isDark={isDark} user={user} />;
    }

    return pages[currentPage] || pages.home;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigate} 
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer onNavigate={navigate} />
      <Toaster />
    </div>
  );
}