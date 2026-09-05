import ClassSection from "@/components/ClassSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import People from "@/components/People";
import { classes } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {classes.map((c, i) => (
          <ClassSection key={c.id} cls={c} plate={i % 2 === 0} />
        ))}
        <People />
      </main>
      <Footer />
    </>
  );
}
