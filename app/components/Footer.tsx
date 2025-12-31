import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-900 border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 text-center">
        
        {/* Brand */}
        <h3 className="font-serif text-2xl text-gold-500 mb-4 tracking-wide">
          D & A Music
        </h3>
        <p className="font-sans text-gray-500 text-sm mb-2">
          Música para Casamentos em Franca - SP
        </p>
        <p className="font-sans text-gray-600 text-xs mb-8">
          CNPJ: 45.262.814/0001-32
        </p>

        {/* Social - Optional */}
        <div className="flex justify-center gap-6 mb-12">
            <Link href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
            </Link>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 text-xs text-gray-600 font-sans">
          <p>© {currentYear} D & A Music. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link 
              href="https://leonardocintra.com.br" 
              target="_blank" 
              className="hover:text-gray-400 transition-colors"
            >
              Desenvolvido por Leonardo Cintra
            </Link>
            
            <Link 
              href="/admin/login" 
              className="text-gray-800 hover:text-gray-600 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
