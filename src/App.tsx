import { StoryHero } from './components/StoryHero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingCTA } from './components/FloatingCTA';
import { StepIndicator } from './components/StepIndicator';
import { StoryTransition } from './components/StoryTransition';
import { CTABanner } from './components/CTABanner';
import { useState } from 'react';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500" style={{ scrollBehavior: 'smooth' }}>
        <ScrollProgress />
        <StepIndicator />
        <FloatingCTA onBookClick={() => setIsBookingOpen(true)} />
        
        {/* Chapter 1: The Beginning */}
        <StoryHero />
        
        {/* Story Transition */}
        <StoryTransition 
          chapter="Chapter One"
          title="Your Perfect Service Awaits"
          subtitle="Every masterpiece begins with the right foundation. Discover the service that tells your unique story."
        />
        
        <Services />
        
        {/* Story Transition */}
        <StoryTransition 
          chapter="Chapter Two"
          title="Where Art Meets Elegance"
          subtitle="See the transformation. Feel the difference. Experience the artistry that makes every visit unforgettable."
        />
        
        <Gallery />
        
        {/* Mid-Story CTA */}
        <CTABanner onBookClick={() => setIsBookingOpen(true)} />
        
        {/* Story Transition */}
        <StoryTransition 
          chapter="Chapter Three"
          title="Stories from Our Family"
          subtitle="Real people. Real transformations. Real confidence. These are the stories that inspire us every day."
        />
        
        <Testimonials />
        
        {/* Story Transition */}
        <StoryTransition 
          chapter="Final Chapter"
          title="Begin Your Story Today"
          subtitle="Your transformation is just one appointment away. Let's write your next chapter together."
        />
        
        <Contact />
        
        <Footer />
        
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </div>
    </ThemeProvider>
  );
}