import { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import LoginPrompt from '@/components/LoginPrompt';
import { useAuth } from '@/contexts/AuthContext';

const LatestEvents = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const events = [
    {
      id: 1,
      name: 'Summer Music Festival 2024',
      date: '2024-07-15',
      time: '18:00',
      venue: 'Central Park Amphitheater',
      location: 'New York, NY',
      price: '₹6,250',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
      status: 'Available',
      description: 'Experience the hottest music acts of summer in this incredible outdoor festival featuring multiple stages and food vendors.',
      attendees: 1250
    },
    {
      id: 2,
      name: 'Tech Innovation Conference',
      date: '2024-08-22',
      time: '09:00',
      venue: 'Convention Center',
      location: 'San Francisco, CA',
      price: '₹12,500',
      category: 'Conference',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400',
      status: 'Available',
      description: 'Join industry leaders and innovators for cutting-edge talks on AI, blockchain, and the future of technology.',
      attendees: 850
    },
    {
      id: 3,
      name: 'Art Gallery Opening',
      date: '2024-06-30',
      time: '19:00',
      venue: 'Modern Art Museum',
      location: 'Los Angeles, CA',
      price: '₹2,100',
      category: 'Art',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      status: 'Available',
      description: 'Discover contemporary masterpieces from emerging artists in this exclusive gallery opening event.',
      attendees: 320
    },
    {
      id: 4,
      name: 'Jazz Night Live',
      date: '2024-07-08',
      time: '20:30',
      venue: 'Blue Note Club',
      location: 'Chicago, IL',
      price: '₹3,750',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      status: 'Available',
      description: 'An intimate evening of smooth jazz with renowned musicians in Chicago\'s legendary Blue Note Club.',
      attendees: 180
    },
    {
      id: 5,
      name: 'Startup Pitch Competition',
      date: '2024-08-10',
      time: '14:00',
      venue: 'Innovation Hub',
      location: 'Austin, TX',
      price: '₹4,200',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
      status: 'Available',
      description: 'Watch exciting startups pitch their innovative ideas to investors and industry experts.',
      attendees: 450
    },
    {
      id: 6,
      name: 'Food & Wine Festival',
      date: '2024-09-05',
      time: '12:00',
      venue: 'Riverside Park',
      location: 'Portland, OR',
      price: '₹2,900',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      status: 'Available',
      description: 'Taste exquisite culinary creations from local chefs paired with finest wines from regional vineyards.',
      attendees: 680
    },
    {
      id: 7,
      name: 'Exclusive Art Exhibition',
      date: '2024-08-15',
      time: '18:00',
      venue: 'Metropolitan Museum',
      location: 'New York, NY',
      price: '₹3,200',
      category: 'Art',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      status: 'Sold Out',
      description: 'Limited capacity exhibition featuring rare masterpieces from renowned artists.',
      attendees: 500
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Music: 'bg-purple text-white',
      Conference: 'bg-dark-blue text-white',
      Art: 'bg-violet text-white',
      Business: 'bg-neon-blue text-white',
      Food: 'bg-accent text-white'
    };
    return colors[category as keyof typeof colors] || 'bg-muted';
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === 'available') {
      return 'bg-green-500 text-white';
    } else {
      return 'bg-red-500 text-white';
    }
  };

  const handleRegisterClick = (event) => {
    if (!isLoggedIn) {
      setSelectedEvent(event);
      setIsLoginPromptOpen(true);
      return;
    }
    
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
    setSelectedEvent(null);
  };

  const handleLoginSuccess = () => {
    setIsLoginPromptOpen(false);
    // After successful login, open the registration form
    setIsRegistrationOpen(true);
  };

  const handleCloseLoginPrompt = () => {
    setIsLoginPromptOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-600">
            Latest Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most recent approved events and secure your spot today
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id}
              className="group glass rounded-2xl overflow-hidden shadow-card hover-glow transition-smooth hover-scale"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
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

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-smooth">
                  {event.name}
                </h3>
                
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 text-primary ml-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold text-purple-600">
                      {event.price}
                    </span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="gradient-primary hover-scale"
                    onClick={() => handleRegisterClick(event)}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/events">
            <Button 
              size="lg" 
              variant="outline" 
              className="glass border-border/30 hover:border-primary/50 hover-scale"
            >
              View All Events
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Registration Form Modal */}
      <EventRegistrationForm
        event={selectedEvent}
        isOpen={isRegistrationOpen}
        onClose={handleCloseRegistration}
      />
      
      {/* Login Prompt Modal */}
      <LoginPrompt
        isOpen={isLoginPromptOpen}
        onClose={handleCloseLoginPrompt}
        onSuccess={handleLoginSuccess}
      />
    </section>
  );
};

export default LatestEvents;