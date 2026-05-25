import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, Clock, Ticket, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: string;
  category: string;
  image: string;
  status: string;
  description: string;
  attendees: number;
}

interface EventRegistrationFormProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  dietaryRequirements: string;
  specialRequests: string;
  paymentMethod: string;
}

const EventRegistrationForm = ({ event, isOpen, onClose }: EventRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegistrationFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      emergencyContact: '',
      emergencyPhone: '',
      dietaryRequirements: '',
      specialRequests: '',
      paymentMethod: '',
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store registration data in localStorage (in real app, this would be sent to API)
    const registrationData = {
      id: Date.now(),
      eventId: event?.id,
      eventName: event?.name,
      eventDate: event?.date,
      eventTime: event?.time,
      venue: event?.venue,
      location: event?.location,
      price: event?.price,
      category: event?.category,
      image: event?.image,
      registrationDate: new Date().toISOString(),
      paymentMethod: data.paymentMethod,
      status: 'Confirmed',
      userInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        dietaryRequirements: data.dietaryRequirements,
        specialRequests: data.specialRequests,
      }
    };
    
    // Get existing registrations and add new one
    const existingRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
    existingRegistrations.push(registrationData);
    localStorage.setItem('userRegistrations', JSON.stringify(existingRegistrations));
    
    console.log('Registration data:', registrationData);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form and close after success
    setTimeout(() => {
      form.reset();
      setIsSuccess(false);
      onClose();
    }, 3000);
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

  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === 'available') {
      return 'bg-green-500 text-white';
    } else {
      return 'bg-red-500 text-white';
    }
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Register for Event
          </DialogTitle>
          <DialogDescription>
            Complete the form below to register for this event
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <>
            {/* Event Details */}
            <div className="glass rounded-lg p-4 mb-6">
              <div className="flex gap-4">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{event.name}</h3>
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 text-primary ml-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Ticket className="w-4 h-4 text-primary" />
                      <span className="font-bold text-purple-600">{event.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{ required: 'First name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>First Name</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: 'Last name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    rules={{ required: 'Emergency contact is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Emergency contact name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emergencyPhone"
                    rules={{ required: 'Emergency contact phone is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Emergency contact phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dietaryRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Requirements</FormLabel>
                      <FormControl>
                        <Input placeholder="Any dietary restrictions or allergies?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests</FormLabel>
                      <FormControl>
                        <Input placeholder="Any special requests or accommodations?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  rules={{ required: 'Payment method is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Ticket className="w-4 h-4" />
                        <span>Payment Method</span>
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="card">Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payment Summary */}
                <div className="glass rounded-lg p-4 border border-border/30">
                  <h4 className="font-semibold mb-3 text-foreground">Payment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Event Price:</span>
                      <span className="font-medium">{event.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span className="font-medium capitalize">
                        {form.watch('paymentMethod') || 'Not selected'}
                      </span>
                    </div>
                    <hr className="border-border/30" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-purple-600">{event.price}</span>
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="gradient-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Register Now'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2 text-green-600">Registration Successful!</h3>
            <p className="text-muted-foreground mb-4">
              You have successfully registered for <strong>{event.name}</strong>
            </p>
            <div className="glass rounded-lg p-4 mb-4 border border-border/30">
              <p className="text-sm text-muted-foreground mb-2">Payment Details:</p>
              <p className="font-medium">Amount: {event.price}</p>
              <p className="font-medium capitalize">Method: {form.getValues('paymentMethod')}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email will be sent to you shortly.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationForm;
