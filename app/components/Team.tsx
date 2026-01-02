import Image from 'next/image';

export default function Team() {
  return (
    <section className="py-20 bg-black-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl text-gold-500 mb-6">
              Nossa Equipe
            </h2>
            <div className="w-16 h-1 bg-gold-600 mb-8 rounded-full"></div>

            <p className="font-sans text-gray-300 text-lg leading-relaxed mb-6">
              A D & A Music é formada por músicos profissionais apaixonados por tornar sonhos em realidade.
              Com anos de experiência em cerimônias, nossa sintonia vai além das notas musicais.
            </p>
            <p className="font-sans text-gray-300 text-lg leading-relaxed">
              Nosso compromisso é levar emoção, elegância e o toque certo de sofisticação para o dia mais importante da sua vida.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="lg:w-1/2 order-1 lg:order-2 relative">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-700 shadow-2xl">


              <Image
                src="/team.webp"
                alt="Equipe D & A Music"
                fill
                className="object-cover"
              />

            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
