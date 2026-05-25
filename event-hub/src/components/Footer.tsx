import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Events', href: '#events' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', name: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer id="contact" className="gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
            <p className="text-white/80 mb-8 leading-relaxed">
              Have questions or suggestions? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass border-white/20 text-black placeholder:text-gray-500 focus:border-neon-blue"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="glass border-white/20 text-black placeholder:text-gray-500 focus:border-neon-blue"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white mb-2 block">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="glass border-white/20 text-black placeholder:text-gray-500 focus:border-neon-blue resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary hover-scale text-lg py-3"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Company Info & Quick Links */}
          <div className="space-y-8">
            {/* Company Info */}
            <div>
              <div className="text-3xl font-bold mb-6 text-white">
                EventHub
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Your premier destination for discovering, hosting, and managing events. 
                We connect performers, venues, and audiences to create unforgettable experiences.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-neon-blue" />
                  <span className="text-white/80">hello@eventhub.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-neon-blue" />
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-neon-blue" />
                  <span className="text-white/80">123 Event Street, City, State 12345</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/80 hover:text-neon-blue transition-smooth"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="glass border-white/20 p-3 rounded-lg text-white hover:text-neon-blue hover:border-neon-blue/50 transition-smooth hover-scale"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 EventHub. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Made with ❤️ for the event community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;