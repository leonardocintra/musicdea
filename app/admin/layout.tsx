import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Simple Admin Header */}
      <header className="bg-black-900 text-gold-500 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="font-serif text-xl">D & A Music | Admin</h1>
            {/* Logout button placeholder */}
            {/* <button className="text-sm text-gray-400 hover:text-white">Sair</button> */}
            <Link href="/" className="text-gray-200 hover:text-white">Home</Link>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
}
