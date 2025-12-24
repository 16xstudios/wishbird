import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground">
              Cookies are small text files stored on your device when you visit a website. 
              They help websites remember your preferences and improve your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
            <p className="text-muted-foreground mb-3">WishBird uses cookies for:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Essential Cookies:</strong> Required for authentication and security</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
            <div className="bg-card rounded-lg p-4 border border-border">
              <table className="w-full text-muted-foreground">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Cookie</th>
                    <th className="text-left py-2 text-foreground">Purpose</th>
                    <th className="text-left py-2 text-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2">sb-auth-token</td>
                    <td className="py-2">User authentication</td>
                    <td className="py-2">Session</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2">preferences</td>
                    <td className="py-2">User settings</td>
                    <td className="py-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can control cookies through your browser settings. Note that disabling essential cookies 
              may affect the functionality of our service, including the ability to log in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Cookies</h2>
            <p className="text-muted-foreground">
              We use Razorpay for payment processing, which may set its own cookies. 
              Please refer to Razorpay's cookie policy for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact</h2>
            <p className="text-muted-foreground">
              For questions about our cookie policy, contact us at:<br />
              Email: support@16xstudios.space
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
