import ResponsiveHero from "@/app/(landing)/components/hero";
import TransparentHeader from "./components/landing-header";
import FeaturesSection from "./components/features";
import DetailedFeature from "./components/detailed-feature";
import LastCTA from "./components/last-cta";
import SimpleFooter from "./components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mx-auto">
      <TransparentHeader />
      <ResponsiveHero />
      <FeaturesSection />

      <DetailedFeature 
        headline="Resource Hub"
        subheadline="Access a curated collection of past exams, notes, and quizzes to boost your study sessions."
        bulletPoints={["Curated academic resources", "Searchable content", "Past exams and notes"]}
        imageSrc="/exam.jpg"
        imageAlt="Resource Hub"
      />

      <DetailedFeature 
        headline="Quizzes"
        subheadline="Test your knowledge with custom quizzes and compete on leaderboards for engaging revision."
        bulletPoints={["Customizable quizzes", "Leaderboards", "Engaging revision"]}
        imageSrc="/leaderboard.jpg"
        imageAlt="Quizzes"
        reverse={true}
      />

      <DetailedFeature 
          headline="Study Groups"
          subheadline="Collaborate in real-time with peers in study groups to share resources and knowledge."
          bulletPoints={["Create or join groups", "Real-time collaboration", "Share resources and notes"]}
          imageSrc="/study_group.jpg"
          imageAlt="Study Groups"
      />

      <LastCTA />

      <SimpleFooter />
    </main>
  );
}
