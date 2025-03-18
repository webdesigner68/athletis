import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Administration - Athletis Pure Musculation",
  description: "Panneau d'administration pour gérer le planning",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-heading">ATHLETIS PURE MUSCULATION - ADMIN</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link 
                  href="/" 
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  Retour au site
                </Link>
              </li>
              <li>
                <Link 
                  href="/planning" 
                  className="px-4 py-2 bg-athletis-green-600 hover:bg-athletis-green-700 rounded-md transition-colors"
                >
                  Voir le planning
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Panneau d'administration réservé aux employés autorisés d'Athletis Pure Musculation</p>
        </div>
      </footer>
    </div>
  );
} 