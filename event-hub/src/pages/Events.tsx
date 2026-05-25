import { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import LoginPrompt from '@/components/LoginPrompt';
import { useAuth } from '@/contexts/AuthContext';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
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
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600',
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
      price: '₹2,500',
      category: 'Conference',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
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
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
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
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
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
      price: '₹1,200',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600',
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
      price: '₹890',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
      status: 'Available',
      description: 'Taste exquisite culinary creations from local chefs paired with finest wines from regional vineyards.',
      attendees: 680
    },
    {
      id: 7,
      name: 'Digital Marketing Summit',
      date: '2024-07-28',
      time: '10:00',
      venue: 'Business Center',
      location: 'Miami, FL',
      price: '₹1000',
      category: 'Conference',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600',
      status: 'Available',
      description: 'Learn the latest digital marketing strategies from industry experts and successful entrepreneurs.',
      attendees: 720
    },
    {
      id: 8,
      name: 'Comedy Night Special',
      date: '2024-08-03',
      time: '21:00',
      venue: 'Laugh Factory',
      location: 'Las Vegas, NV',
      price: '₹550',
      category: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
      status: 'Available',
      description: 'Hilarious stand-up comedy show featuring top comedians for an unforgettable night of laughter.',
      attendees: 280
    },
    {
      id: 9,
      name: 'Rock Concert 2024',
      date: '2024-07-20',
      time: '19:30',
      venue: 'Madison Square Garden',
      location: 'New York, NY',
      price: '₹8,500',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
      status: 'Sold Out',
      description: 'Epic rock concert featuring legendary bands in the heart of New York City.',
      attendees: 20000
    },
    {
      id: 10,
      name: 'Tech Summit 2024',
      date: '2024-09-15',
      time: '08:00',
      venue: 'Convention Center',
      location: 'Seattle, WA',
      price: '₹15,000',
      category: 'Conference',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
      status: 'Cancelled',
      description: 'Annual technology summit cancelled due to unforeseen circumstances.',
      attendees: 0
    }
  ];

  const categories = ['All', 'Music', 'Conference', 'Art', 'Business', 'Food', 'Entertainment'];
  const locations = ['All', 'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL', 'Austin, TX', 'Portland, OR', 'Miami, FL', 'Las Vegas, NV'];

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

  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === 'available') {
      return 'bg-green-500 text-white';
    } else {
      return 'bg-red-500 text-white';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           event.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesLocation = selectedLocation === 'all' || 
                           event.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Find amazing events happening near you. From concerts to conferences, 
            art shows to festivals - there's something for everyone.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search events, venues, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-border/30 focus:border-primary/50"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 glass border-border/30">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48 glass border-border/30">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-600">
              {filteredEvents.length} Events Found
            </h2>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-50">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-muted-foreground">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
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
                    <div className="absolute bottom-4 left-4">
                      <div className="text-black text-sm glass px-2 py-1 rounded">
                        {event.attendees} attending
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                      {event.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <Clock className="w-4 h-4 text-primary ml-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="line-clamp-1">{event.venue}, {event.location}</span>
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
          )}
        </div>
      </section>

      <Footer />
      
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
    </div>
  );
};

export default Events;