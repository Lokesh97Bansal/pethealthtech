import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
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
      <PetCarousel />
      <StoryFeatures />
      <FeaturedStories />
      <StorySubmissionForm />
      <Footer />
    </div>
  );
}
