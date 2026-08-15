import Hero from "@/components/home/Hero";
import TaskSelector from "@/components/home/TaskSelector";
import WeHandleItAll from "@/components/home/WeHandleItAll";
import CaseShowcase from "@/components/home/CaseShowcase";
import Calculator from "@/components/home/calculator/Calculator";
import TechStack from "@/components/home/TechStack";
import BlogSection from "@/components/home/BlogSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TaskSelector />
      <WeHandleItAll />
      <CaseShowcase />
      <Calculator />
      <TechStack />
      <BlogSection />
      <ContactCTA />
    </div>
  );
}
