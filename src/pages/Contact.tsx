
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, User, MessageSquare, Send, Star, Award, Target, Play } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation d'envoi
    toast.success('Message envoyé avec succès ! TitanGryx vous répondra rapidement.');

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const achievements = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "10 Ans d'Expérience",
    description: "Une décennie dédiée à la musculation et au bodybuilding professionnel"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Résultats Prouvés",
    description: "Des centaines de clients transformés avec des méthodes éprouvées"
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Expertise Reconnue",
    description: "Spécialiste en programmes personnalisés et nutrition sportive"
  }];


  const services = [
  "Conseils personnalisés en présentiel",
  "Suivi distanciel avec programmes évolutifs",
  "Plans nutrition adaptés à vos objectifs",
  "Conseils en supplémentation sportive",
  "Préparation physique spécialisée",
  "Correction technique des mouvements"];


  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contactez <span className="text-green-500">TitanGryx</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">Votre conseillé en musculation avec 10 ans d'expérience,passionnée. (2026 competition bodybulding)

          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact et présentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8">

            {/* Présentation TitanGryx */}
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-green-600 rounded-full p-1 mx-auto mb-4">
                  <img
                    src="https://cdn-static-lumi.artvibe.ai/a1/a14bda6cdd0bb9e7cc4247028aec0b71.webp"
                    alt="TitanGryx"
                    className="w-full h-full rounded-full object-cover" />

                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Mendez Grégory</h2>
                <p className="text-green-400 font-semibold">Conseillé en Musculation - passionnée  - 10 ans d'expérience</p>
              </div>

              <div className="space-y-4 text-gray-300">
                <p className="text-center">
                  <em>"Reprends tout ce que la vie t'a pris, deviens la meilleure version de toi-même"</em>
                </p>
                
                {/* Bouton Vidéo Présentation */}
                <div className="flex justify-center mb-4">
                  <a
                    href="https://www.instagram.com/reel/DSC3fwfjItU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">

                    <Play className="w-5 h-5" />
                    Voir ma vidéo de présentation
                  </a>
                </div>

                <p>" Gregory MENDEZ, 38 ans. "
Passionné depuis plus de 10 années en musculation. Je suis un ancien obèse (131 kg), aujourd'hui poids régulé à 69 kg. J'ai un parcours de vie vraiment pas commun ! Très grave accident de la route à 20 ans, 1 mois 1/2 de coma ! plus de 2 années d'hospitalisation… et j'en passe… J'ai dû réapprendre tout ! notamment sur moi ! 

Expérience en musculation, 10 ans  

Mon objectif est simple : aider les naturels à progresser, à prendre soin d'eux, les aider à se surpasser. Nous n'avons qu'un seul corps, cela devient inévitable d'en prendre soin ! Je vous propose des programmes structurés avec des mouvements de base simples incroyablement efficaces, des diètes testées (par moi-même) et approuvées par la science. 

La

Discipline,

La rigueur n’est pas une option.

Elle est au cœur de chaque entraînement, chaque repas, chaque décision.

Je cultive la discipline que j’enseigne.

Un physique puissant peut être construit sans dopage.

Je suis la preuve qu’un travail intelligent et constant dépasse tous les raccourcis.

Esthétique

Pas seulement du muscle.

Une silhouette sculptée : épaules 3D, V-taper, proportions maîtrisées.

L’objectif : un physique qui impose le respect.

Transparence

Pas de secrets, pas de marketing mensonger.

Tu sais ce que je fais, pourquoi je le fais, et comment l’appliquer toi-même.

Excellence humaine

Un conseiller où l’humain passe avant tout !

Chaque détail fait la différence.

Progression continue

Chaque semaine, on avance,

Chaque phase a un objectif.

deviens la meilleure version naturelle de toi-même.

Avec mes 10 années d'expérience dans le domaine de la musculation, 

                  Je vous accompagne dans votre transformation physique avec des méthodes approuvées. 

                  et un suivi personnalisé adapté à vos objectifs.

" Vous pouvez consulter mon compte Instagram : Gregory Mendez (gregouuz_e), évolution personnelle.
                </p>

                










              </div>
            </div>

            {/* Signification du Nom MyGorx Fitness */}
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-green-500/30">
              <h2 className="text-2xl font-bold text-center mb-6">
                <span className="text-white">Pourquoi </span>
                <span className="text-gradient bg-gradient-to-r from-red-500 via-green-500 to-white bg-clip-text text-transparent">
                  MyGorx Fitness
                </span>
                <span className="text-white"> ?</span>
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/20 rounded-full p-2 mt-1">
                    <User className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      <span className="text-green-400">"My"</span> - Un espace à soi
                    </p>
                    <p className="text-sm">Ton parcours personnel, tes objectifs, ta transformation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-red-500/20 rounded-full p-2 mt-1">
                    <Target className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      <span className="text-red-400">"Gor"</span> - De <em>Gorputz</em> (corps en basque)
                    </p>
                    <p className="text-sm">Un hommage aux racines basques, à l'authenticité et à la force du corps.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 rounded-full p-2 mt-1">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      Le <span className="text-blue-400">"X"</span> - L'identité forte
                    </p>
                    <p className="text-sm">Un symbole de puissance, de détermination et de caractère unique.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/20 rounded-full p-2 mt-1">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      <span className="text-purple-400">"Fitness"</span> - Le domaine clarifié
                    </p>
                    <p className="text-sm">Musculation, transformation physique, performance - l'excellence au cœur de l'action.</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                  <p className="text-white font-bold text-lg italic">
                    "Court, percutant, authentique et chargé de sens"
                  </p>
                  <p className="text-gray-400 mt-2 text-sm">
                    MyGorx Fitness incarne la fusion entre tradition basque et excellence sportive moderne.
                  </p>
                </div>
              </div>
            </div>

            {/* Galerie Transformation */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-xl font-bold text-white mb-6 text-center">Ma Transformation Personnelle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://static.lumi.new/9c/9c80d538694ba4eec1ba2b3d5c1ed80c.webp"
                    alt="Avant transformation"
                    className="w-full h-auto object-cover" />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-semibold text-center">Avant</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://static.lumi.new/a5/a53931f406775b7ced12af89577cd554.webp"
                    alt="Après transformation"
                    className="w-full h-auto object-cover" />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-semibold text-center">Aujourd'hui</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-center mt-4 italic">
                "De 131 kg à 69 kg - La preuve vivante qu'avec discipline et rigueur, tout est possible"
              </p>
            </div>

            {/* Réalisations */}
            <div className="grid grid-cols-1 gap-6">
              {achievements.map((achievement, index) => {}







              )}
            </div>

            {/* Informations de contact */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-xl font-bold text-white mb-6">Informations de contact</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  
                  <div>
                    
                    


                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-red-500" />
                  <div>
                    
                    <a href="mailto:bodytitan64@yahoo.com" className="text-gray-300 hover:text-white transition-colors">bodytitan64@yahoo.com

                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <p className="text-white font-semibold">Localisation</p>
                    <p className="text-gray-300">Saint-Jean-de-Luz, France</p>
                    <p className="text-gray-400 text-sm"></p>
                  </div>
                </div>

                <div className="flex items-center">
                  
                  <div>
                    
                    
                    
                    
                  </div>
                </div>
                
                {/* QR Code Download Section */}
                








              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyez un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required />

                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required />

                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-semibold mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />

                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">

                    <option value="">Sélectionnez un sujet</option>
                    <option value="info">Demande d'information</option>
                    <option value="coaching">Coaching personnalisé</option>
                    <option value="nutrition">Conseils nutrition</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    required />

                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center">

                  <Send className="w-5 h-5 mr-2" />
                  Envoyer le message
                </button>
              </form>
            </div>























































































            {/* Call-to-action */}
            <div className="mt-8 bg-gradient-to-r from-red-600 to-green-600 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Prêt à commencer votre transformation ?
              </h3>
              <p className="text-white mb-4">Contactez-moi dès maintenant pour une consultation et découvrez comment 
                atteindre vos objectifs avec un accompagnement.

              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                






                <a href="mailto:bodytitan64@yahoo.com" className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center">

                  <Mail className="w-5 h-5 mr-2" />
                  Envoyer un email
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section témoignages */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-16 text-center">

          


          
          <div className="bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">10+</div>
                <p className="text-gray-300">Années d'expérience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">350+</div>
                <p className="text-gray-300">Exercices disponibles</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">24h</div>
                <p className="text-gray-300">Délai de réponse</p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-300 italic text-lg">
                "Mon objectif est simple : vous aider à reprendre le contrôle de votre corps et 
                devenir la meilleure version de vous-même, quel que soit votre point de départ."
              </p>
              <p className="text-white font-semibold mt-4">- Conseillé passionné en Musculation  - 10 ans d'expérience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>);};export default Contact;