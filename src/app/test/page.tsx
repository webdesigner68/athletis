export default function TestPage() {
  return (
    <div className="min-h-screen bg-athletis-dark flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-athletis-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-athletis-green-500 mb-4">
          Test des styles Tailwind
        </h1>
        <p className="text-white mb-6">
          Si vous voyez ce texte en blanc sur un fond sombre, avec un titre en vert, cela signifie que les styles Tailwind sont correctement appliqués.
        </p>
        <div className="flex space-x-4">
          <button className="bg-athletis-green-600 hover:bg-athletis-green-700 text-white px-4 py-2 rounded-md transition-colors">
            Bouton vert
          </button>
          <button className="border border-white text-white hover:bg-white hover:text-athletis-dark px-4 py-2 rounded-md transition-colors">
            Bouton blanc
          </button>
        </div>
      </div>
    </div>
  );
} 