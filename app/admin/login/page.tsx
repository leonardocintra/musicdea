import Link from 'next/link';

export default function AdminLogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
            <h2 className="font-serif text-2xl text-black-900 mb-2">Acesso Restrito</h2>
            <p className="text-gray-500 text-sm">Entre com suas credenciais para gerenciar contratos.</p>
        </div>

        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500 outline-none transition-all"
                    placeholder="admin@deamusic.com"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500 outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            <Link 
                href="/admin"
                className="block w-full text-center bg-black-900 text-gold-500 font-medium py-3 rounded-md hover:bg-black-800 transition-colors"
                // In a real app, this would be a button submitting the form
            >
                Entrar
            </Link>
        </form>
        
        <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-black-900">
                ← Voltar para o site
            </Link>
        </div>
      </div>
    </div>
  );
}
