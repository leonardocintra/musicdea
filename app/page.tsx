import Hero from "./components/Hero";
import Services from "./components/Services";
import Team from "./components/Team";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black-900 text-white selection:bg-gold-500 selection:text-black-900">
      <Hero />
      <Services />
      <Team />
      <Footer />
    </main>
  );
}
