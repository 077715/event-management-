import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Ticket, User, Mail, Phone, LogOut, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

interface RegisteredEvent {
  id: number;
  eventId: number;
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  location: string;
  price: string;
  category: string;
  image: string;
  registrationDate: string;
  paymentMethod: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user's registered events from localStorage
    const loadUserEvents = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Load from localStorage
      const storedRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
      
      // Convert stored data to RegisteredEvent format
      const userEvents: RegisteredEvent[] = storedRegistrations.map((reg: any) => ({
        id: reg.id,
        eventId: reg.eventId,
        eventName: reg.eventName,
        eventDate: reg.eventDate,
        eventTime: reg.eventTime,
        venue: reg.venue,
        location: reg.location,
        price: reg.price,
        category: reg.category,
        image: reg.image,
        registrationDate: reg.registrationDate,
        paymentMethod: reg.paymentMethod,
        status: reg.status
      }));
      
      setRegisteredEvents(userEvents);
      setIsLoading(false);
    };

    loadUserEvents();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Music: 'bg-purple text-white',
      Conference: 'bg-dark-blue text-white',
      Art: 'bg-violet text-white',
      Business: 'bg-neon-blue text-white',
      Food: 'bg-accent text-white',
      Entertainment: 'bg-gradient-to-r from-purple to-violet text-white'
    };
    return colors[category as keyof typeof colors] || 'bg-muted';
  };

  const handleCancelRegistration = (eventId: number) => {
    // Update local state
    setRegisteredEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, status: 'Cancelled' as const }
          : event
      )
    );
    
    // Update localStorage
    const storedRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
    const updatedRegistrations = storedRegistrations.map((reg: any) => 
      reg.id === eventId 
        ? { ...reg, status: 'Cancelled' }
        : reg
    );
    localStorage.setItem('userRegistrations', JSON.stringify(updatedRegistrations));
  };

  const totalSpent = registeredEvents
    .filter(event => event.status === 'Confirmed')
    .reduce((sum, event) => sum + parseInt(event.price.replace(/[₹,]/g, '')), 0);

  const upcomingEvents = registeredEvents.filter(event => 
    event.status === 'Confirmed' && new Date(event.eventDate) > new Date()
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
            <Avatar className="w-16 h-16 border-4 border-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl font-bold bg-white/20 text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-xl opacity-90">
                Manage your event registrations and stay updated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass border-border/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Events Registered
                </CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {registeredEvents.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {upcomingEvents.length} upcoming events
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ₹{totalSpent.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  On confirmed events
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Account Status
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  Active
                </div>
                <p className="text-xs text-muted-foreground">
                  Member since {new Date().getFullYear()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Registered Events */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-purple-600">
              Your Registered Events
            </h2>
            
            {isLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your events...</p>
              </div>
            ) : registeredEvents.length === 0 ? (
              <Card className="glass border-border/30">
                <CardContent className="text-center py-16">
                  <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-muted-foreground">
                    No Events Registered
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't registered for any events yet. Start exploring!
                  </p>
                  <Link to="/events">
                    <Button className="gradient-primary hover-scale">
                      Browse Events
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.map((event) => (
                  <Card key={event.id} className="group glass border-border/30 hover-glow transition-smooth">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.eventName}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-smooth">
                        {event.eventName}
                      </CardTitle>
                      <CardDescription>
                        Registered on {new Date(event.registrationDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                          <Clock className="w-4 h-4 text-primary ml-2" />
                          <span>{event.eventTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="line-clamp-1">{event.venue}, {event.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <Ticket className="w-4 h-4 text-primary" />
                          <span className="font-bold text-purple-600">{event.price}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Paid via {event.paymentMethod}
                        </div>
                      </div>
                      
                      {event.status === 'Confirmed' && (
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 glass border-border/30"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleCancelRegistration(event.id)}
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Account Actions */}
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="glass border-border/30">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="glass border-border/30">
                  <Mail className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="glass border-border/30">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={logout}
                  className="ml-auto"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UserDashboard;
