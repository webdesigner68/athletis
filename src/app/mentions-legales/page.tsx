import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales | ATHLÉTIS Pure Musculation',
  description: 'Mentions légales et informations sur le site ATHLÉTIS Pure Musculation. Découvrez nos engagements et obligations légales.',
};

export default function MentionsLegales() {
  return (
    <main className="bg-gray-950 text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold mb-10 text-center uppercase tracking-wide">Mentions Légales</h1>
        
        <div className="space-y-12">
          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Informations relatives à l'entreprise</h2>
            <p className="mb-4">Le site web ATHLÉTIS Pure Musculation est édité par :</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Raison sociale :</strong> ATHLÉTIS Pure Musculation</li>
              <li><strong>Forme juridique :</strong> SARL (Société à Responsabilité Limitée)</li>
              <li><strong>Capital social :</strong> 50 000 €</li>
              <li><strong>Adresse du siège social :</strong> 25 Avenue de la République, 68100 Mulhouse, France</li>
              <li><strong>SIRET :</strong> [Numéro SIRET]</li>
              <li><strong>Numéro de TVA intracommunautaire :</strong> [Numéro de TVA]</li>
              <li><strong>Directeur de la publication :</strong> [Nom du Directeur]</li>
              <li><strong>Contact :</strong> contact@athletis-musculation.fr</li>
              <li><strong>Téléphone :</strong> 03 XX XX XX XX</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Hébergement du site</h2>
            <p className="mb-4">Le site ATHLÉTIS Pure Musculation est hébergé par :</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Société :</strong> [Nom de l'hébergeur]</li>
              <li><strong>Adresse :</strong> [Adresse de l'hébergeur]</li>
              <li><strong>Site web :</strong> [Site web de l'hébergeur]</li>
              <li><strong>Téléphone :</strong> [Téléphone de l'hébergeur]</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble du contenu du site ATHLÉTIS Pure Musculation (structure, textes, logos, images, vidéos, graphismes, etc.) est protégé par le droit d'auteur et relève de la législation française et internationale en matière de propriété intellectuelle.
            </p>
            <p className="mb-4">
              Toute représentation, reproduction ou exploitation partielle ou totale des contenus, marques et services proposés par le site ATHLÉTIS Pure Musculation, par quelque procédé que ce soit, sans l'autorisation préalable, expresse et écrite de l'éditeur, est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
            <p>
              Les marques, logos, signes et tout autre contenu du site bénéficient de la protection de la législation française en vigueur sur la propriété intellectuelle et sont la propriété exclusive d'ATHLÉTIS Pure Musculation.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Limitation de responsabilité</h2>
            <p className="mb-4">
              ATHLÉTIS Pure Musculation s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur son site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
            </p>
            <p className="mb-4">
              Cependant, ATHLÉTIS Pure Musculation ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site. En conséquence, ATHLÉTIS Pure Musculation décline toute responsabilité :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.</li>
              <li>Pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site.</li>
              <li>Et plus généralement, pour tous dommages, directs ou indirects, qu'elles qu'en soient les causes, origines, natures ou conséquences, provoqués en raison de l'accès de quiconque au site ou de l'impossibilité d'y accéder.</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Liens hypertextes</h2>
            <p className="mb-4">
              Le site ATHLÉTIS Pure Musculation peut contenir des liens hypertextes vers d'autres sites internet ou d'autres ressources disponibles sur Internet. ATHLÉTIS Pure Musculation ne dispose d'aucun moyen pour contrôler les sites en connexion avec son site internet.
            </p>
            <p>
              ATHLÉTIS Pure Musculation ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit. Elle ne peut être tenue pour responsable de tout dommage, de quelque nature que ce soit, résultant du contenu de ces sites ou sources externes.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Droit applicable et juridiction compétente</h2>
            <p className="mb-4">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
            <p>
              Pour toute question relative aux présentes mentions légales ou pour toute demande concernant le site, vous pouvez nous contacter à l'adresse email : contact@athletis-musculation.fr
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </main>
  );
} 