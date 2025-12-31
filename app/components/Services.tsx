import { Mic, Guitar, Music, Keyboard, Wind, Star } from 'lucide-react';

const services = [
  {
    title: "Vocal",
    icon: Mic,
    description: "Vozes emocionantes que tocam o coração."
  },
  {
    title: "Violão",
    icon: Guitar,
    description: "Acústica perfeita para momentos intimistas."
  },
  {
    title: "Violino",
    icon: Music,
    description: "A elegância clássica para sua cerimônia."
  },
  {
    title: "Piano / Teclado",
    icon: Keyboard,
    description: "Harmonia e sofisticação em cada nota."
  },
  {
    title: "Saxofone",
    icon: Wind,
    description: "O toque de brilho e modernidade."
  },
  {
    title: "Corneta Cerimonial",
    icon: Star, // Using Star as a placeholder for special ceremonial horn
    description: "O anúncio triunfal para a entrada da noiva."
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-black-900 text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-500 mb-4">
            Instrumentos & Serviços
          </h2>
          <div className="w-24 h-1 bg-gold-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto font-sans">
            Formações personalizadas para transformar seu sonho em realidade musical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 border border-gray-800 rounded-xl bg-black-800/50 hover:bg-black-800 transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] text-center"
            >
              <div className="inline-flex items-center justify-center p-4 bg-black-900 rounded-full mb-6 text-gold-500 group-hover:text-gold-400 group-hover:scale-110 transition-all duration-300">
                <service.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-gold-400 mb-3">
                {service.title}
              </h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
