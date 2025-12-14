import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardList, Utensils, Trophy, Video, CheckCircle, Star, Users, Clock, Zap, Target } from 'lucide-react';

const Products: React.FC = () => {
  const features = [
  {
    icon: <ClipboardList className="w-12 h-12 text-red-500" />,
    title: "Programmes Personnalisés",
    description: "Des plans d'entraînement évolutifs pour chaque objectif : Prise de masse, Sèche, Force, ou Remise en forme.",
    details: ["+15 Programmes structurés", "Mise à jour régulière", "Adapté Salle & Maison"]
  },
  {
    icon: <Utensils className="w-12 h-12 text-green-500" />,
    title: "Nutrition & Diète",
    description: "Ne gâchez pas vos efforts à la salle. Adoptez une alimentation performante et saine sans frustration.",
    details: ["5 Plans alimentaires", "Calculateur Macros", "Guide Suppléments"]
  },
  {
    icon: <Trophy className="w-12 h-12 text-yellow-500" />,
    title: "Challenges Exclusifs",
    description: "Sortez de votre zone de confort avec nos défis 'Transformation'. Des programmes chocs pour des résultats rapides.",
    details: ["Challenges Hebdomadaires", "Commando & Guerrier", "Motivation Booster"]
  },
  {
    icon: <Video className="w-12 h-12 text-blue-500" />,
    title: "Vidéothèque HD",
    description: "La technique avant la charge. Accédez à la plus grande bibliothèque d'exercices francophone.",
    details: ["+380 Exercices filmés", "Démos courtes (5-15s)", "Consignes sécurité"]
  }];


  const targets = [
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Débutants",
    text: "Vous ne savez pas par où commencer ? Suivez le guide pas à pas."
  },
  {
    icon: <Target className="w-8 h-8 text-red-500" />,
    title: "Intermédiaires",
    text: "Vous stagnez ? Cassez vos plateaux avec des méthodes d'intensification."
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-400" />,
    title: "Gens Pressés",
    text: "Pas le temps ? Des séances optimisées de 30 à 45 minutes."
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Passionnés",
    text: "Une structure pro pour optimiser chaque rep et chaque repas."
  }];


  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        






        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-3xl mx-auto">

          Tout ce dont vous avez besoin pour transformer votre physique, réuni dans une seule application.
          <span className="block mt-2 text-green-500 font-semibold">Clair. Précis. Efficace.</span>
        </motion.p>
      </div>

      {/* Pour Qui ? Section */}
      <div className="max-w-7xl mx-auto mb-20">
        



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targets.map((target, index) => {}













          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white -mt-[99px] mb-[16px]">Ce que vous obtenez exactement</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-red-600 transition-all group">

              <div className="flex items-start space-x-6">
                <div className="bg-gray-900 p-4 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4 text-lg leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) =>
                  <li key={idx} className="flex items-center text-gray-300 font-medium">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        {detail}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Témoignages */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Ils ont transformé leur physique</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative">

            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) =>
              <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-gray-300 mb-6 italic">"J'étais perdu en salle, je faisais n'importe quoi. Le programme 'Prise de Masse' a tout changé. +3kg en 2 mois, propre. Les vidéos de 10 secondes sont parfaites pour comprendre le mouvement direct."</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                AL
              </div>
              <div className="ml-4">
                <h4 className="text-white font-bold">Aurélien L.</h4>
                <p className="text-sm text-gray-400">Abonné </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative">

            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) =>
              <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-gray-300 mb-6 italic">"Maman de 2 enfants, peu de temps. Le programme '30 min Guerrier' est incroyable. J'ai retrouvé mes abdos en suivant  ce plan . Merci Titan !"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                SB
              </div>
              <div className="ml-4">
                <h4 className="text-white font-bold">Sarah B.</h4>
                <p className="text-sm text-gray-400">Abonnée </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative">

            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) =>
              <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-gray-300 mb-6 italic">"L'appli va droit au but. Pas de blabla inutile. Juste les exos, les séries, la diète. Le challenge Commando top ! Rapport qualité/prix imbattable."</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                TM
              </div>
              <div className="ml-4">
                <h4 className="text-white font-bold">Thomas M.</h4>
                <p className="text-sm text-gray-400">Abonné </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tarifs Simples & Transparents</h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Pas de frais cachés. Accès complet à tout le contenu. Annulable à tout moment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Monthly Plan */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 flex flex-col relative overflow-hidden">

            <h3 className="text-2xl font-bold text-white mb-2">Mensuel</h3>
            <div className="text-4xl font-bold text-white mb-1">6.99€ <span className="text-lg text-gray-400 font-normal">/mois</span></div>
            <div className="text-green-400 text-sm font-bold mb-6">7 Jours d'Essai Gratuit</div>
            
            <ul className="space-y-4 mb-8 text-left flex-1">
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Accès illimité à l'application
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Tous les programmes & challenges
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Sans engagement
              </li>
            </ul>

            <Link
              to="/abonnement?select=premium_app_monthly"
              className="w-full py-4 rounded-xl font-bold text-white bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600">

              Choisir le Mensuel
            </Link>
            <p className="text-xs text-gray-500 mt-4">TVA non applicable, art. 293 B du CGI</p>
          </motion.div>

          {/* Yearly Plan */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-2xl p-8 border-2 border-red-600 flex flex-col relative overflow-hidden shadow-2xl shadow-red-900/20">

            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              MEILLEURE OFFRE
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Annuel</h3>
            <div className="text-4xl font-bold text-white mb-1">49€ <span className="text-lg text-gray-400 font-normal">/an</span></div>
            <div className="text-green-400 text-sm font-bold mb-6">7 Jours d'Essai Gratuit</div>
            <div className="bg-red-900/30 text-red-400 text-sm font-bold py-1 px-3 rounded-full inline-block mb-6 self-center">
              Économisez 40% (soit 4.08€/mois)
            </div>
            
            <ul className="space-y-4 mb-8 text-left flex-1">
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Accès illimité à l'application
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Tous les programmes & challenges
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Paiement en une fois
              </li>
            </ul>

            <Link
              to="/abonnement?select=premium_app_yearly"
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg">

              <Star className="w-5 h-5 inline mr-2 fill-current" />
              Choisir l'Annuel
            </Link>
            <p className="text-xs text-gray-500 mt-4">TVA non applicable, art. 293 B du CGI</p>
          </motion.div>
        </div>
      </div>
    </div>);

};

export default Products;