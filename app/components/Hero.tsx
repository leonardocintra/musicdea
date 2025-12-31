import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const whatsappNumber = "5516999999999"; // Variable for WhatsApp number
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre a D & A Music para meu casamento.");

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black-900 text-center px-4">
      {/* Background Texture/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-900 via-black-800 to-black-900 opacity-80 z-0"></div>
      
      <div className="z-10 flex flex-col items-center animate-fade-in-up">
        <div className="w-64 md:w-80 lg:w-96 mb-8 relative">
           {/* Logo - assuming white/gold version suitable for dark bg */}
           <Image 
             src="/logo-gold.png" 
             alt="D & A Music Logo" 
             width={400} 
             height={400} 
             className="w-full h-auto drop-shadow-lg"
             priority
           />
        </div>

        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-gold-500 mb-6 tracking-wide">
          D & A Music
        </h1>

        <p className="font-sans text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Música ao vivo para cerimônias de casamento. <br/>
          <span className="text-gold-400">Momentos únicos, emoção e excelência.</span>
        </p>

        <Link 
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-black-900 bg-gold-500 rounded-full overflow-hidden transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transform hover:-translate-y-1"
        >
          <span className="mr-2">Entrar em contato</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}
