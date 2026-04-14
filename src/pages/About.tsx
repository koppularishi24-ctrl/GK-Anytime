export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About Daily GK Explorer</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-lg text-muted-foreground">
        <p>
          Daily GK Explorer is a powerful platform designed to help students, professionals, and history enthusiasts master General Knowledge.
        </p>
        <p>
          Our mission is to make learning history and current affairs engaging and accessible. By leveraging advanced AI technology, we provide structured, categorized overviews of significant events for any date in history.
        </p>
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Date Explorer:</strong> Instantly retrieve historical events categorized into Politics, Law, International Affairs, Economics, Science, and major incidents.</li>
          <li><strong>GK Quiz Generator:</strong> Test your knowledge with AI-generated multiple-choice questions tailored to specific months and years.</li>
          <li><strong>Personalized Experience:</strong> Log in to track your progress and save your favorite historical dates.</li>
        </ul>
        <p className="mt-8">
          Built with modern web technologies, Daily GK Explorer ensures a fast, responsive, and intuitive experience across all devices.
        </p>
      </div>
    </div>
  );
}
