import { useState } from 'react';
import { Search, Menu, X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'attendee' });
  const [signupError, setSignupError] = useState<string | null>(null);
  const { isLoggedIn, user, login, signup, logout } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      setLoginData({ email: '', password: '' });
      // Redirect based on user role
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'venue_provider') {
        window.location.href = '/venue/dashboard.html';
      } else if (user.role === 'event_performer') {
        window.location.href = '/performer/dashboard.html';
      }
      // Attendees stay on the current page or go to dashboard
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }
    setSignupError(null);
    const success = await signup(signupData.name, signupData.email, signupData.password, signupData.role);
    if (success) {
      setSignupData({ name: '', email: '', password: '', confirmPassword: '', role: 'attendee' });
      // Redirect based on user role
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'venue_provider') {
        window.location.href = '/venue/dashboard.html';
      } else if (user.role === 'event_performer') {
        window.location.href = '/performer/dashboard.html';
      }
      // Attendees stay on the current page or go to dashboard
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-100/20 backdrop-blur-md border-b border-purple-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img 
              src="/icons8-event-50.png" 
              alt="EventHub Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-black">
              EventHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-10 bg-white/30 backdrop-blur-sm border-purple-300/50 focus:border-purple-400/70 transition-smooth text-black placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Desktop Links & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                {link.name}
              </a>
            ))}
            
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-purple-300/50 hover:border-purple-400/70 hover:bg-white/30">
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full gradient-primary hover-scale">
                        Login
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gradient-primary hover-scale">
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center">Create Account</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signupData.email}
                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={signupData.password}
                            onChange={(e) => { setSignupData({ ...signupData, password: e.target.value }); if (signupError) setSignupError(null); }}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="signup-confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={signupData.confirmPassword}
                            onChange={(e) => { setSignupData({ ...signupData, confirmPassword: e.target.value }); if (signupError) setSignupError(null); }}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      {signupError && (
                        <p className="text-sm text-red-600" role="alert">{signupError}</p>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="signup-role">Account Type</Label>
                        <Select value={signupData.role} onValueChange={(value) => setSignupData({ ...signupData, role: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="attendee">Attendee</SelectItem>
                            <SelectItem value="event_performer">Event Performer</SelectItem>
                            <SelectItem value="venue_provider">Venue Provider</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full gradient-primary hover-scale">
                        Sign Up
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Welcome back!</p>
                  <p className="font-medium text-foreground">{user?.name}</p>
                </div>
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    className="bg-white/20 backdrop-blur-sm border-purple-300/50 hover:border-purple-400/70 hover:bg-white/30 mr-2"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="bg-white/20 backdrop-blur-sm border-purple-300/50 hover:border-purple-400/70 hover:bg-white/30"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-200/30 bg-purple-100/20 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-10 bg-white/30 backdrop-blur-sm border-purple-300/50 focus:border-purple-400/70 text-black placeholder:text-gray-600"
                />
              </div>
              
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium"
                >
                  {link.name}
                </a>
              ))}
              
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-purple-300/50 hover:border-purple-400/70 hover:bg-white/30">
                        Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobile-login-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="mobile-login-email"
                              type="email"
                              placeholder="Enter your email"
                              value={loginData.email}
                              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile-login-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="mobile-login-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <Button type="submit" className="w-full gradient-primary hover-scale">
                          Login
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gradient-primary">
                        Sign Up
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Create Account</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobile-signup-name">Full Name</Label>
                          <Input
                            id="mobile-signup-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={signupData.name}
                            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile-signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="mobile-signup-email"
                              type="email"
                              placeholder="Enter your email"
                              value={signupData.email}
                              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile-signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="mobile-signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={signupData.password}
                            onChange={(e) => { setSignupData({ ...signupData, password: e.target.value }); if (signupError) setSignupError(null); }}
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile-signup-confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="mobile-signup-confirm-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              value={signupData.confirmPassword}
                            onChange={(e) => { setSignupData({ ...signupData, confirmPassword: e.target.value }); if (signupError) setSignupError(null); }}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      {signupError && (
                        <p className="text-sm text-red-600" role="alert">{signupError}</p>
                      )}
                        <div className="space-y-2">
                          <Label htmlFor="mobile-signup-role">Account Type</Label>
                          <Select value={signupData.role} onValueChange={(value) => setSignupData({ ...signupData, role: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your account type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="attendee">Attendee</SelectItem>
                              <SelectItem value="event_performer">Event Performer</SelectItem>
                              <SelectItem value="venue_provider">Venue Provider</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full gradient-primary hover-scale">
                          Sign Up
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Welcome back!</p>
                    <p className="font-medium text-foreground">{user?.name}</p>
                  </div>
                  <Link to="/dashboard" className="block">
                    <Button 
                      variant="outline" 
                      className="bg-white/20 backdrop-blur-sm border-purple-300/50 hover:border-purple-400/70 hover:bg-white/30 w-full mb-2"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="bg-white/20 backdrop-blur-sm border-purple-300/50 hover:border-purple-400/70 hover:bg-white/30 w-full"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;