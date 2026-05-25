import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import hero1 from '@/assets/hero1-concert.jpg';
import hero2 from '@/assets/hero2-festival.jpg';
import hero3 from '@/assets/hero3-conference.jpg';
import hero4 from '@/assets/hero4-gallery.jpg';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      title: 'Discover Amazing Events',
      subtitle: 'Join thousands of music lovers at incredible concerts and festivals worldwide',
      gradient: 'from-purple/20 via-dark-blue/15 to-transparent'
    },
    {
      image: hero2,
      title: 'Outdoor Festivals',
      subtitle: 'Experience the magic of outdoor festivals with amazing artists and communities',
      gradient: 'from-violet/20 via-purple/15 to-transparent'
    },
    {
      image: hero3,
      title: 'Professional Conferences',
      subtitle: 'Network with industry leaders and expand your knowledge at premium conferences',
      gradient: 'from-dark-blue/20 via-neon-blue/15 to-transparent'
    },
    {
      image: hero4,
      title: 'Art & Cultural Events',
      subtitle: 'Immerse yourself in art galleries, exhibitions, and cultural celebrations',
      gradient: 'from-purple/20 via-violet/15 to-transparent'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                  <Link to="/events">
                    <Button size="lg" className="gradient-primary hover-scale text-lg px-8 py-3">
                      Explore Events
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    className="gradient-primary hover-scale text-lg px-8 py-3"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 glass border-white/20 text-white hover:bg-white/10 w-12 h-12"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 glass border-white/20 text-white hover:bg-white/10 w-12 h-12"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;