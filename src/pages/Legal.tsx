import React from 'react';
import {Shield, FileText, Activity, AlertTriangle, Scale, Server, User, CreditCard} from 'lucide-react';
import { motion } from 'framer-motion';

const Legal = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mentions Légales & Conditions
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>

        {/* 1. Mentions Légales Officielles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">1. Mentions Légales</h2>
          </div>

          <div className="space-y-6 text-gray-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                  <User className="w-5 h-5 text-red-500" /> Éditeur du Service
                </h3>
                <div className="space-y-2">
                  <p><span className="text-gray-500">Nom commercial :</span> <strong className="text-white">Body Titan</strong></p>
                  <p><span className="text-gray-500">Responsable :</span> <strong className="text-white">Grégory Mendez (TitanGryx)</strong></p>
                  <p><span className="text-gray-500">Adresse :</span> Saint-Jean-de-Luz, FRANCE</p>
                  <p><span className="text-gray-500">Statut :</span> Entrepreneur individuel</p>
                </div>
              </div>
              
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                  <Activity className="w-5 h-5 text-red-500" /> Contact
                </h3>
                <div className="space-y-2">
                  <p><span className="text-gray-500">Email :</span> <a href="mailto:bodytitan64@yahoo.com" className="text-red-400 hover:underline">bodytitan64@yahoo.com</a></p>
                  <p><span className="text-gray-500">Téléphone :</span> 06.62.11.84.44</p>
                  <div className="mt-4 inline-block bg-blue-900/30 border border-blue-500/30 rounded px-3 py-2">
                    <p className="text-blue-300 text-sm font-medium">
                      TVA non applicable, art. 293 B du CGI
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
                <Server className="w-5 h-5 text-red-500" /> Hébergement
              </h3>
              <p className="text-sm">
                Ce site est hébergé sur une infrastructure Cloud sécurisée (Lumi / Vercel Inc.).
              </p>
            </div>
          </div>
        </motion.section>

        {/* 2. CGV */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700">

          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-white">2. Conditions Générales de Vente (CGV)</h2>
          </div>
          
          <div className="space-y-5 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Article 1 : Objet et Acceptation</h3>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des transactions effectuées sur l'application Body Titan. 
                Toute commande passée sur l'application implique l'acceptation sans réserve des présentes conditions par le client.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Article 2 : Tarifs et Fiscalité</h3>
              <p className="mb-2">Les services sont fournis aux tarifs en vigueur mentionnés sur l'application :</p>
              <ul className="list-disc pl-5 space-y-1 mb-3 bg-gray-900/50 p-3 rounded border border-gray-700">
                <li><strong className="text-white">Premium Mensuel :</strong> 6,99 € / mois</li>
                <li><strong className="text-white">Premium Annuel :</strong> 49,00 € / an</li>
              </ul>
              <p className="text-sm italic">
                Les prix sont indiqués en euros (€). TVA non applicable, conformément à l'article 293 B du Code Général des Impôts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Article 3 : Paiement et Sécurité</h3>
              <p>
                Le règlement est exigible immédiatement à la commande. Les paiements sont sécurisés et gérés par nos partenaires agréés <strong>Stripe</strong> et <strong>PayPal</strong>. 
                Body Titan ne conserve aucune donnée bancaire.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                Article 4 : Droit de Rétractation <AlertTriangle className="w-4 h-4 text-yellow-500" />
              </h3>
              <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-3 text-sm">
                <p>
                  <strong>RENONCIATION AU DROIT DE RÉTRACTATION :</strong><br />
                  Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable.
                </p>
                <p className="mt-2">
                  En validant votre commande et en accédant immédiatement au contenu Premium, <strong>vous acceptez expressément de renoncer à votre droit de rétractation de 14 jours</strong>.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Article 5 : Résiliation</h3>
              <p>
                L'abonnement est sans engagement de durée. Il peut être résilié à tout moment par l'utilisateur. 
                La résiliation prend effet à la fin de la période de facturation en cours. Tout mois ou année entamé est dû.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 3. Avertissement Santé */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl p-8 border border-red-600/30 shadow-lg shadow-red-900/10">

          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-bold text-white">3. Avertissement Santé & Responsabilité</h2>
          </div>
          
          <div className="bg-red-900/20 border-l-4 border-red-600 p-4 mb-6 rounded-r">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <p className="text-gray-200 font-medium">
                CONSULTEZ IMPÉRATIVEMENT UN MÉDECIN avant de commencer tout programme d'entraînement ou de nutrition, surtout en cas d'antécédents médicaux.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              L'utilisateur reconnaît que la pratique sportive comporte des risques. 
              <strong>Body Titan</strong> et <strong>Grégory Mendez</strong> ne sauraient être tenus responsables des blessures, accidents ou problèmes de santé survenant lors de l'utilisation de l'application.
            </p>
            <p>
              Les conseils nutritionnels sont donnés à titre indicatif et ne remplacent pas un suivi médical ou diététique personnalisé auprès d'un professionnel de santé.
            </p>
          </div>
        </motion.section>

        {/* 4. Politique de Confidentialité */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700">

          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">4. Politique de Confidentialité (RGPD)</h2>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <p>
              Body Titan s'engage à protéger votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">Données collectées</h3>
            <p>
              Nous collectons uniquement les données nécessaires à l'exécution du service : Email, ID utilisateur, historique des achats (via Stripe).
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">Vos Droits</h3>
            <p>
              Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
              Pour exercer ces droits, contactez-nous à : <strong className="text-white">bodytitan64@yahoo.com</strong>
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">Finalité du traitement</h3>
            <p>
              Vos données sont collectées pour la gestion des abonnements, la communication client, l'envoi des codes d'accès et le suivi des paiements.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">Durée de conservation</h3>
            <p>
              Vos données sont conservées pendant la durée de votre abonnement et 3 ans après la dernière activité (obligations légales comptables et fiscales).
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">Destinataires des données</h3>
            <p>
              Vos données peuvent être transmises à nos prestataires de paiement (Stripe, PayPal) et à notre hébergeur (Lumi/Vercel). Aucune vente ou partage à des tiers à des fins commerciales.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">Cookies</h3>
            <p>
              Ce site utilise des cookies techniques nécessaires au fonctionnement de l'application (authentification, panier). Aucun cookie publicitaire ou de tracking n'est utilisé.
            </p>
          </div>
        </motion.section>

        {/* 5. Propriété Intellectuelle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700">

          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-8 h-8 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">5. Propriété Intellectuelle</h2>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <p>
              L'ensemble du contenu de l'application Body Titan (textes, images, vidéos, programmes, plans nutritionnels) est protégé par le droit d'auteur et appartient exclusivement à <strong className="text-white">Grégory Mendez (TitanGryx)</strong>.
            </p>
            <p>
              Toute reproduction, distribution, modification ou utilisation commerciale sans autorisation écrite préalable est strictement interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
            <p>
              Les vidéos intégrées sont hébergées sur YouTube et restent la propriété de leurs auteurs respectifs.
            </p>
          </div>
        </motion.section>

        {/* 6. Résolution des Litiges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700">

          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-white">6. Médiation et Litiges</h2>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h3 className="text-lg font-semibold text-white">Médiation de la Consommation</h3>
            <p>
              Conformément à l'article L.612-1 du Code de la consommation, le client a le droit de recourir gratuitement à un médiateur de la consommation en cas de litige.
            </p>
            <p>
              Vous pouvez soumettre votre réclamation sur la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">https://ec.europa.eu/consumers/odr</a>
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">Loi Applicable</h3>
            <p>
              Les présentes conditions sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </div>
        </motion.section>

      </div>
    </div>);

};

export default Legal;