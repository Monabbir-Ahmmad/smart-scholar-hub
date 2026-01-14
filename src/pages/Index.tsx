import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExamPrepSection } from "@/components/sections/ExamPrepSection";
import { PersonalizedLearningSection } from "@/components/sections/PersonalizedLearningSection";
import { LiveClassesSection } from "@/components/sections/LiveClassesSection";
import { FamilyAccountsSection } from "@/components/sections/FamilyAccountsSection";
import { VerifiedTutorsSection } from "@/components/sections/VerifiedTutorsSection";
import { SchedulingSection } from "@/components/sections/SchedulingSection";
import { AdminSection } from "@/components/sections/AdminSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ExamPrepSection />
      <PersonalizedLearningSection />
      <LiveClassesSection />
      <FamilyAccountsSection />
      <VerifiedTutorsSection />
      <SchedulingSection />
      <AdminSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;