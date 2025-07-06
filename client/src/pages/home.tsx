import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PetsUnspokenSide from "@/components/pets-unspoken-side";
import PetStatsSection from "@/components/pet-stats-section";
import PetHealthStatistics from "@/components/pet-health-statistics";
import EmotionalConnection from "@/components/emotional-connection";
import EmpathyBridge from "@/components/empathy-bridge";
import PetCarousel from "@/components/pet-carousel";
import StoryFeatures from "@/components/story-features";
import FeaturedStories from "@/components/featured-stories";
import StorySubmissionForm from "@/components/story-submission-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <HeroSection />
      <div id="unspoken">
        <PetsUnspokenSide />
      </div>
      <PetHealthStatistics />
      <PetStatsSection />
      <EmotionalConnection />
      <EmpathyBridge />
      <PetCarousel />
      <StoryFeatures />
      <FeaturedStories />
      <StorySubmissionForm />
      <Footer />
    </div>
  );
}
