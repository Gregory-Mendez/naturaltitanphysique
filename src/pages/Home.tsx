
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { Dumbbell, Target, Users, Award, ArrowRight, Star, Flame, Zap, Timer, X, Play, Calendar, Clock } from 'lucide-react';

interface Program {
  id: number;
  name: string;
  level: string;
  duration: string;
  frequency: string;
  goal: string;
  description: string;
  warmup: string[];
  exercises: {
    name: string;
    sets: string;
    reps: string;
    rest: string;
    notes?: string;
    video?: string;
  }[];
}

const Home: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = React.useState<Program | null>(null);
  const { user } = useAuth();
  const { currentSubscription, fetchUserSubscription } = useSubscriptions();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      fetchUserSubscription(user.userId);
    }
  }, [user]);

  const handleChallengeClick = (challenge: Program) => {
    if (currentSubscription?.planId !== 'premium_app_yearly') {
      toast.error("Accès réservé exclusivement aux membres Annuels", {
        duration: 4000,
        icon: '🔒',
        position: 'top-center'
      });
      return;
    }
    setSelectedChallenge(challenge);
  };

  const challenges: Program[] = [
  {
    id: 40,
    name: "Challenge Commando - Sèche Express",
    level: "Avancé",
    duration: "1 semaine",
    frequency: "Aléatoire 3x/semaine (Combiné)",
    goal: "Choc Métabolique",
    description: "5 jours ultra-intensifs pour booster le métabolisme. Mélange cardio/muscu brutal.",
    warmup: [
    "5 min Corde à sauter",
    "Shadow Boxing 2 min",
    "Burpees échauffement",
    "Mobilité dynamique"],

    exercises: [
    { name: "Burpees complets", sets: "4", reps: "15-20", rest: "45s", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" },
    { name: "Thrusters (Squat+Press)", sets: "4", reps: "12-15", rest: "60s", video: "https://youtu.be/sLIswEpOHng?si=MLuXgB15HtmPFVnz" },
    { name: "Mountain Climbers", sets: "4", reps: "40", rest: "30s", video: "https://youtube.com/shorts/5hmOtXAofpk?si=tSQf_RQmsf0MygoJ" },
    { name: "Pompes explosives", sets: "4", reps: "10-15", rest: "45s", video: "https://youtube.com/shorts/_6vHKlzklH8?si=duWVgzFHJwO5I-ca" },
    { name: "Fentes sautées", sets: "4", reps: "20", rest: "45s", video: "https://youtube.com/shorts/j33gGuxEmLM?si=zkBmcS7yesEU_izO" },
    { name: "Planche commando", sets: "3", reps: "45s", rest: "45s", video: "https://youtu.be/e9_Z81o0R9U?si=ByFH9gd3DPXyertV" }]

  },
  {
    id: 41,
    name: "Semaine Bras de Titan",
    level: "Intermédiaire",
    duration: "1 semaine",
    frequency: "3x/semaine",
    goal: "Volume Bras",
    description: "Semaine de spécialisation Biceps/Triceps. 3 séances ciblées pour faire exploser les manches.",
    warmup: [
    "5 min Rameur",
    "Rotations poignets/coudes",
    "Pompes serrées légères",
    "Curl léger"],

    exercises: [
    { name: "Curl Barre", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/REopAb_EtZA?si=wqJ99JpILJeMopvZ" },
    { name: "Barre au front", sets: "4", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/K3mFeNz4e3w?si=bCpmxytlABagZ4lp" },
    { name: "Curl Marteau", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/cozAA9HUPhE?si=w7Ucg8s1dJ0VkJWQ" },
    { name: "Extension Poulie", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/jbC8Vb6bqIc?si=kbMGlWWmVe2zQvgT" },
    { name: "Curl Incliné", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/iwyO2nJuG5Y?si=RVJIqTYrSoMDmUkY" },
    { name: "Dips", sets: "3", reps: "Max", rest: "90s", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd" }]

  },
  {
    id: 42,
    name: "Semaine Guerrier Pressé",
    level: "Tous",
    duration: "1 semaine",
    frequency: "4x/semaine",
    goal: "Efficacité Max",
    description: "Pas de temps ? 4 séances de 30 minutes chrono. Intensité maximale, repos minimum.",
    warmup: [
    "3 min Jumping Jacks",
    "Rotations articulaires rapides",
    "1 série pompe/squat"],

    exercises: [
    { name: "Superset: Squat + Pompes", sets: "4", reps: "15+15", rest: "45s", video: "https://youtube.com/shorts/podaa57B8zM?si=uMuAmexZr5L0KfU-" },
    { name: "Superset: Fentes + Rowing", sets: "4", reps: "12+12", rest: "45s", video: "https://youtube.com/shorts/ZM9XpyG5HeU?si=R9EMDoIe2cnc7jC5" },
    { name: "Superset: Press + Crunch", sets: "3", reps: "12+20", rest: "30s", video: "https://youtu.be/GcY6TZxfS0k?si=lwnFO7HUsQkA9JKX" },
    { name: "Burpees (Finisher)", sets: "1", reps: "Max en 3 min", rest: "-", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" }]

  }];

  const features = [
  {
    icon: <Dumbbell className="w-8 h-8" />,
    title: "350+ Exercices",
    description: "Base de données complète avec vidéos démo de 5-10 secondes et voix off TitanGryx"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Programmes Personnalisés",
    description: "Plans d'entraînement adaptés à vos objectifs et votre niveau"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Suivi Personnalisé",
    description: "Conseillé en musculation avec suivi mensuel personnalisé"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "10 Ans d'Expérience",
    description: "Expertise professionnelle en bodybuilding et musculation"
  }];


  const pricing = [

  {
    name: "Suivi Mensuel",
    price: "35€",
    duration: "/mois",
    features: ["Programmes évolutifs", "Suivi personnalisé", "Support WhatsApp", "Ajustements illimités"],
    popular: true
  },
  {
    name: "Formule Illimitée",
    price: "40€",
    duration: "/mois",
    features: ["Tout inclus", "Suivi nutrition", "Séances présentielles illimitées", "Support prioritaire"]
  }];


  return (
    <div className="min-h-screen">
      {/* Challenge Modal */}
      {selectedChallenge &&
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-sm overflow-y-auto py-8">
          <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 relative mt-auto mb-auto">
            
            <button
            onClick={() => setSelectedChallenge(null)}
            className="absolute top-4 right-4 p-2 bg-gray-700 rounded-full text-gray-400 hover:text-white hover:bg-gray-600 transition-colors z-10">
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedChallenge.name}</h3>
                <p className="text-gray-300">{selectedChallenge.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center text-red-500 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs font-bold uppercase">Durée</span>
                  </div>
                  <span className="text-white font-semibold">{selectedChallenge.duration}</span>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center text-green-500 mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-xs font-bold uppercase">Fréquence</span>
                  </div>
                  <span className="text-white font-semibold">{selectedChallenge.frequency}</span>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <Target className="w-4 h-4 mr-2" />
                    <span className="text-xs font-bold uppercase">Objectif</span>
                  </div>
                  <span className="text-white font-semibold">{selectedChallenge.goal}</span>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center text-blue-500 mb-1">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-xs font-bold uppercase">Niveau</span>
                  </div>
                  <span className="text-white font-semibold">{selectedChallenge.level}</span>
                </div>
              </div>

              {/* Warmup */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Échauffement
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedChallenge.warmup.map((item, idx) =>
                <div key={idx} className="bg-gray-700/30 p-3 rounded-lg text-gray-300 text-sm">
                      {item}
                    </div>
                )}
                </div>
              </div>

              {/* Exercises */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Exercices
                </h4>
                <div className="space-y-3">
                  {selectedChallenge.exercises.map((exercise, idx) =>
                <div key={idx} className="bg-gray-700/50 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-white font-semibold flex items-center gap-2">
                          {exercise.name}
                          {exercise.video &&
                      <a href={exercise.video} target="_blank" rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 p-1 bg-red-500/10 rounded-full transition-colors">
                              <Play className="w-4 h-4" />
                            </a>
                      }
                        </h5>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded">{exercise.sets} séries</span>
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded">{exercise.reps} reps</span>
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded">{exercise.rest} repos</span>
                      </div>
                    </div>
                )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                <button
                onClick={() => setSelectedChallenge(null)}
                className="text-gray-400 hover:text-white text-sm underline">
                  Fermer le programme
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      }

      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat mt-[58px]"
          style={{
            backgroundImage: 'url(https://static.lumi.new/1e/1ecc140aedc8223004686d783fac93ef.webp)'
          }}>

        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center">

            {/* Titre Body Titan repositionné plus haut */}
            






            <div className="flex flex-col gap-6 justify-center items-center mt-[2px] mb-[149px]">
              
              {/* Premium Price Badge - Highly Visible */}
              <Link to="/abonnement" className="block">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 rounded-2xl shadow-2xl border-4 border-yellow-600 transform hover:scale-105 transition-all duration-300 pt-[0px] pl-[0px] pr-[0px] -pb-[16px] -mt-[74px] ml-[3px] mr-[0px] mb-[80px]">
                  <div className="text-center">
                    <div className="font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-sm mb-2">
                      <Star className="w-5 h-5 fill-current" />
                      Premium
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-4xl font-extrabold -mt-[19px]">6,99€</div>
                    <div className="text-lg font-medium -mt-[11px]">/mois</div>
                    <div className="font-bold text-gray-800 text-lg -mt-[13px] -mb-[7px]">ou 49€ /an</div>
                    <div className="font-bold bg-gray-900 text-yellow-400 rounded-full inline-block text-sm -pt-[2px] pl-[16px] pr-[16px] pb-[1px] -mt-[6px] -mb-[12px]">Essai 7 jours gratuit</div>
                  </div>
                </div>
              </Link>

              







            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 text-center -mt-[35px] -mb-[26px] pt-[74px] pb-[82px]">
        <div className="max-w-7xl sm:px-6 lg:px-8 pr-[16px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">

            <h2 className="text-4xl font-bold text-white mb-[16px]">
              Pourquoi choisir <span className="text-red-500">MyGorx Fitness</span> ?
            </h2>
            <p className="text-gray-300 pt-[25px] text-center text-xl">Application complète avec votre conseiller en musculation.     
   
          10 années d'expériences, Musculation , Programmes , Suppléments , Nutritions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {}












            )}
          </div>
        </div>
      </section>

      {/* New Challenges Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden pt-[35px] pb-[80px]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <span className="text-green-500 font-bold tracking-wider uppercase text-sm">Nouveauté 2025/2026</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-6">
              Challenges <span className="text-red-600">Hebdomadaires</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cassez la routine avec nos nouveaux programmes courts sur 1 semaine. 
              Intensité maximale, résultats rapides.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Commando */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-600 transition-all group relative cursor-pointer"
              onClick={() => handleChallengeClick(challenges[0])}>
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                EXTRÊME
              </div>
              <div className="p-8">
                <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <Flame className="w-8 h-8 text-red-500 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Challenge Commando</h3>
                <p className="text-gray-400 mb-6">3 jours de choc métabolique. Mélange cardio/muscu brutal pour sécher en un temps record.</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Timer className="w-4 h-4 mr-2" />
                  <span className="text-center"> • 3 Séances / combiné programmes au choix</span>
                </div>
                <button className="block w-full py-3 rounded-lg bg-gray-700 text-white text-center font-semibold group-hover:bg-red-600 transition-colors">
                  Relever le défi
                </button>
              </div>
            </motion.div>

            {/* Card 2: Bras de Titan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all group relative cursor-pointer"
              onClick={() => handleChallengeClick(challenges[1])}>
              <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                FOCUS
              </div>
              <div className="p-8">
                <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                  <Dumbbell className="w-8 h-8 text-yellow-500 group-hover:text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Bras de Titan</h3>
                <p className="text-gray-400 mb-6">Spécialisation Biceps & Triceps. 3 séances ciblées pour faire exploser vos bras.</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Timer className="w-4 h-4 mr-2" />
                  <span className="text-center">• 3 Séances / combiné programmes au choix</span>
                </div>
                <button className="block w-full py-3 rounded-lg bg-gray-700 text-white text-center font-semibold group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  Voir le programme
                </button>
              </div>
            </motion.div>

            {/* Card 3: Guerrier Pressé */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all group relative cursor-pointer"
              onClick={() => handleChallengeClick(challenges[2])}>
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RAPIDE
              </div>
              <div className="p-8">
                <div className="w-14 h-14 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                  <Zap className="w-8 h-8 text-green-500 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Guerrier Pressé</h3>
                <p className="text-gray-400 mb-6">Pas de temps ? 4 séances de 30 minutes chrono. Intensité max, repos min.</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Timer className="w-4 h-4 mr-2" />
                  <span>1 Semaine • 30 min/séance</span>
                </div>
                <button className="block w-full py-3 rounded-lg bg-gray-700 text-white text-center font-semibold group-hover:bg-green-500 transition-colors">
                  Go !
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-900 pt-[75px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">

            <h2 className="text-4xl font-bold text-white mb-4">
              Tarifs <span className="text-green-500">Attractifs</span>
            </h2>
            <p className="text-xl text-gray-300 mt-[50px] text-center pt-[10px] pb-[10px]">Un prix accessible dès 6,99 €/mois ou 49 €/an Application tout inclus , un accès totalement libre ! Votre application dispose de plus de 350 exercices entre 5/10 secondes ,divers programmes débutant, intermédiaire ,diète, conseils, suppléments . Entrez dans mon univers, commençons votre transformation ! 🫵​💪

            </p>
            <p className="text-lg text-red-400 font-semibold mt-4">

            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => {}




































            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>

            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à commencer votre transformation ?
            </h2>
            <p className="text-xl text-white mb-4 max-w-2xl mx-auto">La discipline et la constance sont les deux mots clés pour atteindre ton objectif.

            </p>
            
            {/* Vidéo de Présentation TitanGryx */}
            <div className="flex justify-center mb-8">
              <a
                href="https://www.instagram.com/reel/DSC3fwfjItU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group border-2 border-white">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Découvrir ma transformation</span>
              </a>
            </div>
            <Link
              to="/contact"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center">

              Contactez TitanGryx <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>);

};

export default Home;