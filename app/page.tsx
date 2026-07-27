import BenchmarkFigure from "@/components/BenchmarkFigure";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import People from "@/components/People";
import Principles from "@/components/Principles";
import Research from "@/components/Research";
import Stats from "@/components/Stats";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <BenchmarkFigure />
        <Research />
        <Work />
        <Principles />
        <People />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
