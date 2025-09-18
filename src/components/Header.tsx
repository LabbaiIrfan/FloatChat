import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Menu, Waves, User, Sun, Moon, LogOut, Settings } from 'lucide-react';

/**
 * Props for the Header component
 * - currentPage: which page is active (used for highlighting)
 * - onNavigate: function to request navigation to a different page
 * - isDark / onToggleTheme: theme management
 * - isLoggedIn / user / onLogout: simple auth state used for conditional UI
 */
interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string; avatar: string } | null;
  onLogout: () => void;
}

/**
 * Top navigation bar for the app.
 * This file contains only presentational logic (buttons, menu) and
 * delegates actual navigation to the parent via `onNavigate`.
 */
export function Header({ currentPage, onNavigate, isDark, onToggleTheme, isLoggedIn, user, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicNavItems = [
    { name: 'Home', page: 'home' },
    { name: 'Features', page: 'features' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' }
  ];

  const protectedNavItems = [
    { name: 'Dashboard', page: 'dashboard' },
    { name: 'AI Chat', page: 'chat' },
    { name: 'Insights', page: 'insights' }
  ];

  const navItems = isLoggedIn ? [...publicNavItems, ...protectedNavItems] : publicNavItems;

  const handleNavClick = (page: string) => {
    // ask the parent App to navigate, then close any mobile menu
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#002d57] to-[#005f99] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavClick('home')}
          >
            <Waves className="h-8 w-8 text-[#00d8ff]" />
            <span className="text-2xl font-bold">FloatChat</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                  currentPage === item.page 
                    ? 'bg-white/20 text-[#00d8ff]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-white/10">
                    <Avatar className="h-8 w-8 border-2 border-white/20">
                      <AvatarFallback className="bg-[#00d8ff] text-[#002d57] font-semibold text-sm">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavClick('profile')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick('dashboard')}>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick('login')}
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => handleNavClick('signup')}
                  className="bg-[#00d8ff] text-[#002d57] hover:bg-[#00d8ff]/90 font-medium"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-[#002d57] text-white border-l border-white/10">
                <div className="flex flex-col space-y-4 pt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        currentPage === item.page 
                          ? 'bg-white/20 text-[#00d8ff]' 
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    {isLoggedIn && user ? (
                      <>
                        <div className="px-4 py-2">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 border-2 border-white/20">
                              <AvatarFallback className="bg-[#00d8ff] text-[#002d57] font-semibold">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-white/70">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => handleNavClick('profile')}
                          className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Profile Settings
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={onLogout}
                          className="w-full justify-start text-red-400 hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => handleNavClick('login')}
                          className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                        <Button
                          onClick={() => handleNavClick('signup')}
                          className="w-full bg-[#00d8ff] text-[#002d57] hover:bg-[#00d8ff]/90"
                        >
                          Get Started
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}