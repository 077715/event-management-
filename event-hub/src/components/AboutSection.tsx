import { Users, Calendar, MapPin } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'For Everyone',
      description: 'Performers, venue owners, and event enthusiasts - we bring everyone together'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Easy Booking',
      description: 'Simple and secure event registration with instant confirmation'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Amazing Venues',
      description: 'Discover unique venues and spaces for unforgettable experiences'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background to-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-600">
            About EventHub
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive event booking services that connect performers with audiences 
            and venues with events. Our platform empowers performers to showcase their talents, 
            enables venue providers to list their spaces, and allows event enthusiasts to discover 
            and register for amazing experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl glass shadow-card hover-glow transition-smooth hover-scale"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6 text-white">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-8 p-8 rounded-2xl glass shadow-glass">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-sm text-muted-foreground">Events Hosted</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-muted-foreground">Venues Listed</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;