import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I register for an event?",
      answer: "Simply browse our events, click on the event you're interested in, and click the 'Register' button. You'll be guided through a secure checkout process where you can select ticket types and make payment. Once completed, you'll receive a confirmation email with your ticket details."
    },
    {
      question: "How can performers add their events?",
      answer: "Performers need to create a Performer account and submit event requests through their dashboard. Each request includes event details, venue requirements, and pricing. Our admin team reviews all submissions for quality and appropriateness before approval. Once approved, your event goes live on the platform."
    },
    {
      question: "How can proprietors add a venue?",
      answer: "Venue owners can register as Proprietors and submit venue listing requests. Include detailed information about your space, capacity, amenities, availability, and pricing. Our team verifies all venue information and may require additional documentation. Approved venues become available for event bookings."
    },
    {
      question: "How do payments work?",
      answer: "We use secure payment processing for all transactions. Users can pay with credit cards, debit cards, or digital wallets. Payments are processed instantly for event registration. For performers and venue owners, payments are processed according to our payout schedule after successful events."
    },
    {
      question: "What happens if an event is cancelled?",
      answer: "If an event is cancelled by the organizer, all registered attendees receive full refunds automatically within 5-7 business days. You'll be notified via email immediately when a cancellation occurs. We also help you find similar events you might be interested in."
    },
    {
      question: "Can I get a refund for my ticket?",
      answer: "Refund policies depend on the specific event and are set by the event organizer. Generally, refunds are available up to 48 hours before the event start time. Some events may have different policies which will be clearly stated during the registration process."
    },
    {
      question: "How do I become an admin?",
      answer: "Admin roles are restricted to EventHub staff members only. Admins are responsible for reviewing and approving event and venue requests, managing platform security, and ensuring quality standards. This role is not available for public registration."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We comply with industry-standard security practices and never share your information with third parties without your explicit consent. Payment information is handled by certified payment processors."
    }
  ];

  return (
    <section className="py-24 gradient-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="glass rounded-2xl p-8 shadow-hero">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 rounded-lg glass"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-black hover:text-gray-700 transition-smooth">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-black leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;