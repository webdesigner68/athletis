import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | ATHLÉTIS Pure Musculation',
  description: 'Notre politique de confidentialité détaille comment nous protégeons vos données personnelles et respectons votre vie privée.',
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="bg-gray-950 text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold mb-10 text-center uppercase tracking-wide">Politique de Confidentialité</h1>
        
        <div className="space-y-12">
          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Introduction</h2>
            <p className="mb-4">
              Chez ATHLÉTIS Pure Musculation, nous accordons une grande importance à la protection de votre vie privée et de vos données personnelles. Cette politique de confidentialité vous informe de la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
            </p>
            <p>
              Cette politique s'applique à tous les utilisateurs de notre site web et à nos clients, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Collecte des données personnelles</h2>
            <p className="mb-4">
              Nous collectons différents types d'informations vous concernant, notamment :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Informations d'identification :</strong> nom, prénom, date de naissance, adresse, numéro de téléphone, adresse e-mail.</li>
              <li><strong>Informations de paiement :</strong> coordonnées bancaires (sécurisées via nos partenaires de paiement).</li>
              <li><strong>Informations de santé :</strong> certificat médical, informations sur votre condition physique (uniquement avec votre consentement explicite).</li>
              <li><strong>Données de navigation :</strong> adresse IP, cookies, pages visitées, durée de visite.</li>
              <li><strong>Données d'utilisation :</strong> fréquentation de la salle, utilisation des équipements (via votre badge d'accès).</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Finalités du traitement</h2>
            <p className="mb-4">
              Nous utilisons vos données personnelles pour les finalités suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Gestion de votre abonnement et de votre compte client.</li>
              <li>Traitement de vos paiements.</li>
              <li>Communication concernant nos services (modifications d'horaires, événements spéciaux, etc.).</li>
              <li>Personnalisation de votre expérience d'entraînement (si vous avez opté pour un coaching).</li>
              <li>Amélioration de nos services et de notre site web.</li>
              <li>Respect de nos obligations légales et réglementaires.</li>
              <li>Envoi d'informations commerciales et promotionnelles (avec votre consentement).</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Base légale du traitement</h2>
            <p className="mb-4">
              Le traitement de vos données personnelles est fondé sur :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>L'exécution du contrat</strong> que nous avons conclu avec vous (abonnement, prestation de services).</li>
              <li><strong>Notre intérêt légitime</strong> à développer et promouvoir nos activités.</li>
              <li><strong>Votre consentement</strong> pour certains traitements spécifiques (marketing, données de santé).</li>
              <li><strong>Nos obligations légales</strong> (facturation, comptabilité, sécurité).</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Destinataires des données</h2>
            <p className="mb-4">
              Vos données personnelles peuvent être partagées avec :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Notre personnel autorisé (accueil, coachs, administration).</li>
              <li>Nos sous-traitants pour la fourniture de services (hébergement web, maintenance, système de gestion des accès).</li>
              <li>Nos partenaires de paiement pour le traitement des transactions.</li>
              <li>Les autorités compétentes en cas d'obligation légale.</li>
            </ul>
            <p className="mt-4">
              Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous veillons à ce que tous nos partenaires et sous-traitants respectent les mêmes niveaux de protection des données que nous.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Durée de conservation</h2>
            <p className="mb-4">
              Nous conservons vos données personnelles uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Données relatives à votre compte et abonnement : pendant toute la durée de notre relation contractuelle et jusqu'à 3 ans après la fin de celle-ci.</li>
              <li>Données de paiement : selon les obligations légales en matière comptable et fiscale (généralement 10 ans).</li>
              <li>Certificats médicaux : 1 an.</li>
              <li>Données de navigation et cookies : 13 mois maximum.</li>
            </ul>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Vos droits</h2>
            <p className="mb-4">
              Conformément à la réglementation applicable, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Droit d'accès :</strong> vous pouvez obtenir une copie des données que nous détenons vous concernant.</li>
              <li><strong>Droit de rectification :</strong> vous pouvez demander la correction des données inexactes vous concernant.</li>
              <li><strong>Droit à l'effacement :</strong> vous pouvez demander la suppression de vos données dans certains cas.</li>
              <li><strong>Droit à la limitation du traitement :</strong> vous pouvez demander que l'utilisation de vos données soit limitée.</li>
              <li><strong>Droit à la portabilité :</strong> vous pouvez récupérer vos données dans un format structuré pour les transmettre à un tiers.</li>
              <li><strong>Droit d'opposition :</strong> vous pouvez vous opposer au traitement de vos données, notamment à des fins de prospection commerciale.</li>
              <li><strong>Droit de retirer votre consentement</strong> à tout moment pour les traitements fondés sur cette base légale.</li>
              <li><strong>Droit de définir des directives</strong> relatives au sort de vos données après votre décès.</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, vous pouvez nous contacter par email à rgpd@athletis-musculation.fr ou par courrier à l'adresse de notre siège social. Nous nous efforcerons de répondre à votre demande dans un délai d'un mois.
            </p>
            <p className="mt-4">
              Vous avez également le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) si vous estimez que le traitement de vos données constitue une violation de la réglementation.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Cookies et technologies similaires</h2>
            <p className="mb-4">
              Notre site utilise des cookies et technologies similaires pour améliorer votre expérience de navigation et nous permettre d'analyser l'utilisation du site.
            </p>
            <p className="mb-4">
              Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site. Ils nous permettent de reconnaître votre navigateur et de vous offrir une expérience personnalisée.
            </p>
            <p className="mb-4">
              Nous utilisons différents types de cookies :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site.</li>
              <li><strong>Cookies analytiques :</strong> pour comprendre comment les visiteurs interagissent avec notre site.</li>
              <li><strong>Cookies de fonctionnalité :</strong> pour mémoriser vos préférences.</li>
              <li><strong>Cookies de ciblage :</strong> pour vous proposer des contenus personnalisés.</li>
            </ul>
            <p className="mt-4">
              Vous pouvez contrôler et gérer les cookies via les paramètres de votre navigateur. Veuillez noter que la désactivation de certains cookies peut affecter votre expérience sur notre site.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Sécurité des données</h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération ou la destruction.
            </p>
            <p>
              Ces mesures incluent le chiffrement des données sensibles, l'accès restreint aux données pour le personnel autorisé, des audits de sécurité réguliers et des procédures de gestion des incidents.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Modification de la politique de confidentialité</h2>
            <p className="mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de révision mise à jour. Nous vous encourageons à consulter régulièrement cette politique pour rester informé des changements.
            </p>
            <p>
              En cas de modifications substantielles, nous vous en informerons par email ou par une notification sur notre site.
            </p>
          </section>

          <section className="bg-gray-900/50 rounded-xl p-8 shadow-athletis">
            <h2 className="text-2xl font-semibold mb-4 text-athletis-green-500">Contact</h2>
            <p className="mb-4">
              Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, veuillez nous contacter :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Email :</strong> rgpd@athletis-musculation.fr</li>
              <li><strong>Adresse postale :</strong> ATHLÉTIS Pure Musculation, 25 Avenue de la République, 68100 Mulhouse, France</li>
              <li><strong>Téléphone :</strong> 03 XX XX XX XX</li>
            </ul>
            <p className="mt-4">
              Responsable de la protection des données : [Nom du DPO ou du responsable]
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