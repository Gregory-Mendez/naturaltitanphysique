
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Video, Phone, Mail, User, MessageSquare, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Booking: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    experience: '',
    goals: ''
  });

  const services = [
  {
    id: 'decouverte',
    name: 'Séance Découverte',
    price: '30€',
    duration: '1h',
    type: 'Présentiel',
    location: 'Saint-Jean-de-Luz et alentours',
    description: 'Première séance pour se connaître et établir vos objectifs avec votre conseillé',
    includes: [
    'Évaluation physique complète',
    'Analyse de votre historique sportif',
    'Définition d\'objectifs personnalisés',
    'Programme d\'entraînement initial',
    'Conseils nutrition de base']

  },


  {
    id: 'seance-ponctuelle',
    name: 'Séance Ponctuelle',
    price: '30€',
    duration: '1h',
    type: 'Présentiel',
    location: 'Saint-Jean-de-Luz et alentours',
    description: 'Séance individuelle pour un besoin spécifique avec votre conseillé',
    includes: [
    'Entraînement personnalisé 1h',
    'Correction technique',
    'Conseils spécialisés',
    'Programme à emporter']

  },
  {
    id: 'premium_app_monthly',
    name: 'Premium App Mensuel',
    price: '6.99€',
    duration: '/mois',
    type: 'Application',
    location: 'Partout',
    description: 'Accès complet à l\'application Body Titan (Exercices, Programmes, Nutrition)',
    includes: [
    'Accès illimité aux exercices',
    'Vidéos démo',
    'Programmes d\'entraînement',
    'Conseils nutrition',
    'Essai gratuit 7 jours']
  },
  {
    id: 'premium_app_yearly',
    name: 'Premium App Annuel',
    price: '49€',
    duration: '/an',
    type: 'Application',
    location: 'Partout',
    description: 'Accès complet à l\'application Body Titan (Économisez 40%)',
    includes: [
    'Tout du plan mensuel',
    'Prix avantageux',
    'Paiement unique',
    'Accès 12 mois',
    'Essai gratuit 7 jours']
  }];


  const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !formData.name || !formData.email || !formData.phone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation d'envoi
    toast.success('Demande de réservation envoyée ! TitanGryx vous contactera dans les 24h.');

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      experience: '',
      goals: ''
    });
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const getServiceTypeColor = (type: string) => {
    if (type.includes('Présentiel')) return 'bg-red-600';
    if (type.includes('Distanciel')) return 'bg-green-600';
    return 'bg-blue-600';
  };

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
            Réserver votre <span className="text-red-500">Conseillé</span>
          </h1>
          <p className="text-gray-300 mb-8 text-lg">Tarifs attractifs pour commencer votre transformation - Conseillé en musculation 10 ans d'expérience

          </p>
          
          {/* Contact Info */}
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center text-gray-300">
                
                
              </div>
              <div className="flex items-center justify-center text-gray-300">
                <Mail className="w-5 h-5 mr-2 text-red-500" />
                <span>bodytitan64@yahoo.com</span>
              </div>
              <div className="flex items-center justify-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                <span>Saint-Jean-de-Luz, France</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choisissez votre service optionnelle </h2>
            <div className="space-y-6">
              {services.map((service, index) => {}








































              )}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>

            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Séance découverte 1h </h2>
              
              {/* Formulaire ou Redirection selon le service */}
              {selectedService && ['premium_app_monthly', 'premium_app_yearly'].includes(selectedService) ?
              <div className="text-center py-8">
                  <div className="bg-gradient-to-r from-red-600/20 to-green-600/20 p-6 rounded-lg border border-gray-600 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {services.find((s) => s.id === selectedService)?.name}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Pour cet abonnement digital, le paiement et l'activation sont immédiats via notre plateforme sécurisée.
                      Profitez de 7 jours d'essai gratuit !
                    </p>
                    <a
                    href={`/abonnement?select=${selectedService}`}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg">
                      <Check className="w-6 h-6 mr-2" />
                      Souscrire maintenant (Essai Gratuit)
                    </a>
                  </div>
                  <p className="text-sm text-gray-400">
                    Redirection vers la page d'abonnement sécurisée
                  </p>
                </div> :

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service sélectionné */}
                {selectedService &&
                <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-2">Service sélectionné:</h3>
                    <p className="text-green-400">
                      {services.find((s) => s.id === selectedService)?.name} - {services.find((s) => s.id === selectedService)?.price}
                    </p>
                  </div>
                }

                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                      placeholder="Votre nom"
                      required />

                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                      placeholder="votre@email.com"
                      required />

                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    placeholder="06.XX.XX.XX.XX"
                    required />

                </div>

                {/* Date et heure pour les services présentiels */}
                {selectedService && ['decouverte', 'seance-ponctuelle', 'conseille-complet'].includes(selectedService) &&
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Date souhaitée
                        </label>
                        <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                        min={new Date().toISOString().split('T')[0]} />

                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Heure souhaitée
                        </label>
                        <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none">

                          <option value="">Sélectionner une heure</option>
                          {timeSlots.map((time) =>
                        <option key={time} value={time}>{time}</option>
                        )}
                        </select>
                      </div>
                    </div>
                  </>
                }

                {/* Expérience */}
                <div>
                  <label className="block text-gray-300 mb-2">Niveau d'expérience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none">

                    <option value="">Sélectionner votre niveau</option>
                    <option value="debutant">Débutant (0-6 mois)</option>
                    <option value="intermediaire">Intermédiaire (6 mois - 2 ans)</option>
                    <option value="avance">Avancé (2+ ans)</option>
                    <option value="expert">Expert (5+ ans)</option>
                  </select>
                </div>

                {/* Objectifs */}
                <div>
                  <label className="block text-gray-300 mb-2">Vos objectifs principaux</label>
                  <select
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none">

                    <option value="">Sélectionner un objectif</option>
                    <option value="prise-masse">Prise de masse musculaire</option>
                    <option value="perte-poids">Perte de poids</option>
                    <option value="remise-forme">Remise en forme</option>
                    <option value="force">Gain de force</option>
                    <option value="endurance">Amélioration endurance</option>
                    <option value="competition">Préparation compétition</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message (optionnel)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    placeholder="Décrivez vos besoins, questions ou contraintes particulières...">
                  </textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-green-700 transition-colors">

                  Envoyer la demande de réservation
                </button>
              </form>
              }

              {/* Contact alternatif */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Contact direct</h3>
                <p className="text-gray-300 text-sm mb-4 text-center">Vous préférez me contacter directement ?  Ecrivez à TitanGryx :

                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-300">
                    
                    
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2 text-red-500" />
                    <a href="mailto:bodytitan64@yahoo.com" className="hover:text-white">bodytitan64@yahoo.com</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Zone de couverture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gray-800 rounded-lg p-8 text-center">

          <h3 className="text-2xl font-bold text-white mb-4">Zone de couverture</h3>
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 mr-2 text-red-500" />
            <span className="text-xl text-gray-300">Saint-Jean-de-Luz </span>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">Les séances présentielles se déroulent à Saint-Jean-de-Luz et pourront s'élargir par la suite.



          </p>
        </motion.div>
      </div>
    </div>);

};

export default Booking;