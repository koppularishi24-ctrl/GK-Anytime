export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
        <p>When you use Daily GK Explorer, we may collect the following information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Authentication Data:</strong> If you choose to log in via Google, we collect your basic profile information (name, email address) to create and manage your account.</li>
          <li><strong>Usage Data:</strong> We collect anonymous data regarding how you interact with the application, such as dates explored and quiz scores, to improve our services.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve the Daily GK Explorer platform.</li>
          <li>Personalize your experience by saving your quiz scores and bookmarked dates.</li>
          <li>Communicate with you regarding updates or support requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Third-Party Services</h2>
        <p>We use third-party services, including Google Firebase for authentication and database management, and Google Gemini API for content generation. These services have their own privacy policies governing the data they collect.</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at koppularishi.24@gmail.com.</p>
      </div>
    </div>
  );
}
