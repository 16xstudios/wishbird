import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using WishBird, operated by 16xstudios, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
            <p className="text-muted-foreground">
              WishBird is an automated WhatsApp greeting service that allows users to schedule and send personalized messages 
              to recipients via WhatsApp. We use AI to help generate message content and support various media formats.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>You must provide accurate recipient information</li>
              <li>You must have consent to send messages to recipients</li>
              <li>You must not use the service for spam, harassment, or illegal purposes</li>
              <li>You are responsible for all content you send through our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Credits and Payments</h2>
            <p className="text-muted-foreground">
              Our service operates on a credit system. Each wish sent consumes credits based on the features used. 
              Purchased credits are non-refundable. Subscription credits expire at the end of each billing period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Delivery</h2>
            <p className="text-muted-foreground">
              While we strive for 100% delivery, we cannot guarantee message delivery due to factors outside our control 
              (recipient's phone status, WhatsApp availability, etc.). Credits are consumed upon sending, regardless of delivery status.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              WishBird and 16xstudios shall not be liable for any indirect, incidental, or consequential damages 
              arising from your use of the service. Our total liability shall not exceed the amount you paid in the last 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of the service after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, contact us at:<br />
              Email: support@16xstudios.space<br />
              Phone: +91 7871282354
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
