import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Calendar, BrainCircuit, LogIn, LogOut, Menu, X, Moon, Sun, Settings as SettingsIcon, Video, Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navLinks = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Date Explorer', path: '/explorer', icon: Calendar },
    { name: 'GK Quiz', path: '/quiz', icon: BrainCircuit },
    { name: 'Category News', path: '/category-news', icon: Newspaper },
    { name: 'Videos', path: '/videos', icon: Video },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Daily GK Explorer</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">{user.displayName}</span>
                <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-1">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="flex items-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t">
              {user ? (
                <div className="space-y-4">
                  <div className="px-2 text-sm font-medium">Logged in as {user.displayName}</div>
                  <Button variant="outline" className="w-full justify-start" onClick={() => { logout(); setIsMenuOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button className="w-full justify-start">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login / Signup
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold">Daily GK Explorer</span>
          </div>
          
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link to="/settings" className="hover:text-foreground transition-colors">Settings</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact / Support</Link>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Koppula Rishi</p>
            <p>Support: koppularishi.24@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
