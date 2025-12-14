import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { lumi } from "../lib/lumi";
import { CreditCard, Calendar, CheckCircle, XCircle, Lock, Unlock, Mail, DollarSign, Download, Smartphone } from 'lucide-react';
import { useAuth } from "../hooks/useAuth";
import { useSubscriptions } from "../hooks/useSubscriptions";
import toast from "react-hot-toast";

const Subscription: React.FC = () => {
  const { user, isAuthenticated, signIn } = useAuth();
  const { currentSubscription, loading, fetchUserSubscription, cancelSubscription, createSubscription } = useSubscriptions();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      toast("Pour installer l'application : \nSur iOS : Partager -> Sur l'écran d'accueil\nSur Android : Menu -> Installer l'application", {
        duration: 5000,
        icon: '📱'
      });
    }
  };

  useEffect(() => {
    // Check for plan selection via URL
    const params = new URLSearchParams(window.location.search);
    const selectedPlanParam = params.get('select');
    if (selectedPlanParam) {
      const planExists = plans.find((p) => p.id === selectedPlanParam);
      if (planExists) {
        setSelectedPlan(selectedPlanParam);
        setShowPaymentModal(true);
        // Clean URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }

    if (isAuthenticated && user) {
      fetchUserSubscription(user.userId);
    }

    // Handle Stripe Success Return
    const success = params.get('success');
    const planId = params.get('plan_id');

    if (success === 'true' && planId && user && !currentSubscription) {
      const activateSubscription = async () => {
        const toastId = toast.loading("Activation de votre abonnement...");
        try {
          const plan = plans.find((p) => p.id === planId);
          if (plan) {
            await createSubscription({
              userId: user.userId,
              plan: planId,
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              amount: plan.price,
              status: 'active'
            });
            toast.success("Abonnement activé avec succès !", { id: toastId });
            fetchUserSubscription(user.userId);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } catch (error) {
          console.error(error);
          toast.error("Erreur lors de l'activation", { id: toastId });
        }
      };
      activateSubscription();
    }
  }, [isAuthenticated, user]);

  const plans = [
  {
    id: "premium_app_monthly",
    name: "Premium Mensuel",
    price: 6.99,
    duration: "/mois",
    features: [
    "Essai 7 jours gratuit",
    "Accès tout exercices",
    "Vidéos démo",
    "Programmes",
    "Sans engagement"],

    popular: true
  },
  {
    id: "premium_app_yearly",
    name: "Premium Annuel",
    price: 49,
    duration: "/an",
    features: [
    "Essai 7 jours gratuit",
    "Économisez 40%",
    "Accès tout exercices",
    "Vidéos démo",
    "Programmes"],

    popular: true
  }];


  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      try {
        await signIn();
        // Après connexion réussie, définir le plan sélectionné
        setSelectedPlan(planId);
        setAcceptedTerms(false);
        setShowPaymentModal(true);
      } catch (error) {
        // L'utilisateur a fermé la fenêtre d'authentification
        console.log("Authentification annulée par l'utilisateur");
        // Ne pas afficher d'erreur car c'est un choix volontaire
      }
      return;
    }

    setSelectedPlan(planId);
    setAcceptedTerms(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSelection = async (method: 'stripe' | 'paypal') => {
    if (!acceptedTerms) {
      toast.error("Veuillez accepter les conditions générales et l'avertissement santé pour continuer");
      return;
    }

    // Direct Stripe Payment Links for Subscriptions
    if (method === 'stripe') {
      let paymentUrl = '';

      if (selectedPlan === 'premium_app_monthly') {
        paymentUrl = 'https://buy.stripe.com/9B6eVddg6aHe9WS0DGbwk00';
      } else if (selectedPlan === 'premium_app_yearly') {
        paymentUrl = 'https://buy.stripe.com/aFa8wP0tk5mU5GCbikbwk01';
      }

      if (paymentUrl) {
        // Add user metadata for tracking
        const finalUrl = new URL(paymentUrl);
        if (user) {
          finalUrl.searchParams.append('client_reference_id', user.userId);
          if (user.email) {
            finalUrl.searchParams.append('prefilled_email', user.email);
          }
        }

        // Open in new tab to prevent blank page issues
        window.open(finalUrl.toString(), '_blank');
        toast.success("Page de paiement ouverte dans un nouvel onglet !");
        setShowPaymentModal(false);
        return;
      }
    }

    setShowPaymentModal(false);
    const toastId = toast.loading("Redirection vers le paiement sécurisé...");

    try {
      const { url } = await lumi.functions.invoke('createCheckoutSession', {
        method: 'POST',
        body: {
          planId: selectedPlan,
          userId: user?.userId,
          returnUrl: window.location.origin + '/abonnement',
          provider: method
        }
      });

      if (url) {
        window.location.href = url;
      } else {
        toast.error("Erreur lors de l'initialisation", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error(`Erreur: ${error.message || "Échec de connexion au service de paiement"}`, { id: toastId });
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;

    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir annuler votre abonnement ?"
    );

    if (confirm) {
      try {
        await cancelSubscription(currentSubscription._id);
        toast.success("Abonnement annulé avec succès");
        if (user) {
          fetchUserSubscription(user.userId);
        }
      } catch (error) {
        toast.error("Erreur lors de l'annulation");
      }
    }
  };

  // Login prompt for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Gérez vos <span className="text-green-500">Abonnements</span>
          </h2>
          <p className="text-gray-300 mb-6">
            Connectez-vous pour accéder à vos abonnements et gérer vos paiements
          </p>
          <button
            onClick={signIn}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-green-700 transition-colors">
            Se connecter
          </button>
        </motion.div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 relative">
      {/* Payment Selection Modal */}
      {showPaymentModal &&
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-700 relative">

            <button
            onClick={() => setShowPaymentModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white">

              <XCircle className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Choisissez votre mode de paiement
            </h2>

            <div className="mb-6 bg-gray-700/30 p-4 rounded-lg border border-gray-600/50">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-red-600 rounded border-gray-600 bg-gray-700 focus:ring-red-500 flex-shrink-0" />

                <span className="text-sm text-gray-300">
                  Je reconnais avoir lu et accepté les <Link to="/mentions-legales" target="_blank" className="text-red-500 hover:underline font-medium">CGV</Link> et <Link to="/mentions-legales" target="_blank" className="text-red-500 hover:underline font-medium">l'avertissement santé</Link>. Je certifie être apte à la pratique sportive.
                </span>
              </label>
            </div>

            <div className="space-y-4">
              <button
              onClick={() => handlePaymentSelection('stripe')}
              disabled={!acceptedTerms}
              className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-all ${
              acceptedTerms ?
              'bg-white text-gray-900 hover:bg-gray-100 cursor-pointer' :
              'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'}`
              }>

                <CreditCard className={`w-6 h-6 ${acceptedTerms ? 'text-blue-600' : 'text-gray-400'}`} />
                Payer par Carte Bancaire
              </button>

              <button
              onClick={() => handlePaymentSelection('paypal')}
              disabled={!acceptedTerms}
              className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-all ${
              acceptedTerms ?
              'bg-[#0070BA] text-white hover:bg-[#005ea6] cursor-pointer' :
              'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'}`
              }>

                <span className={`italic font-serif text-2xl font-bold ${!acceptedTerms && 'opacity-50'}`}>Pay</span><span className={`italic font-serif text-2xl font-bold ${acceptedTerms ? 'text-blue-200' : 'text-gray-400 opacity-50'}`}>Pal</span>
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              Paiement 100% sécurisé. Accès immédiat après validation.
            </p>
          </motion.div>
        </div>
      }

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes <span className="text-green-500">Abonnements</span>
          </h1>
          <p className="text-xl text-gray-300">Gérez vos abonnements  MyGorx Fitness

          </p>
        </motion.div>

        {/* Current Subscription Status */}
        {currentSubscription &&
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Abonnement Actuel</h2>
              <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentSubscription.status === "active" ?
              "bg-green-600 text-white" :
              "bg-red-600 text-white"}`
              }>
                {currentSubscription.status === "active" ?
              <CheckCircle className="w-5 h-5 inline mr-1" /> :

              <XCircle className="w-5 h-5 inline mr-1" />
              }
                {currentSubscription.status === "active" ? "Actif" : "Inactif"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center text-red-500 mb-2">
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Plan</span>
                </div>
                <p className="text-white text-lg">
                  {plans.find((p) => p.id === currentSubscription.plan)?.name || "N/A"}
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center text-green-500 mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Date de fin</span>
                </div>
                <p className="text-white text-lg">
                  {new Date(currentSubscription.endDate).toLocaleDateString("fr-FR")}
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center text-blue-500 mb-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Montant</span>
                </div>
                <p className="text-white text-lg">{currentSubscription.amount}€ / mois</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center text-yellow-500">
                <Unlock className="w-5 h-5 mr-2" />
                <span className="font-semibold">Mot de passe d'accès</span>
              </div>
              <p className="text-white text-lg font-mono bg-gray-800 px-4 py-2 rounded">
                {currentSubscription.accessPassword}
              </p>
            </div>

            {currentSubscription.status === "active" &&
          <button
            onClick={handleCancelSubscription}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Annuler l'abonnement
              </button>
          }
          </motion.div>
        }

        {/* Available Plans */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {currentSubscription ? "Changer de Plan" : "Choisir un Plan"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) =>
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-800 rounded-xl overflow-hidden border-2 ${
              plan.popular ? 'border-red-500 transform md:scale-105 z-10' : 'border-gray-700'} flex flex-col`
              }>

                {plan.popular &&
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAIRE
                  </div>
              }

                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-3xl font-bold text-white">{plan.price}€</span>
                    <span className="text-gray-400 ml-1 mb-1">{plan.duration}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) =>
                  <li key={idx} className="flex items-start text-gray-300 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                  )}
                  </ul>
                </div>

                <div className="p-6 bg-gray-700/50 mt-auto">
                  <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                  plan.popular ?
                  'bg-gradient-to-r from-red-600 to-green-600 text-white hover:from-red-700 hover:to-green-700 shadow-lg hover:shadow-red-500/25' :
                  'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'}`
                  }>

                    {plan.id.includes('premium') ? 'Essai Gratuit 7 jours' : 'Choisir ce plan'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-green-600 rounded-lg p-8 text-center mb-12">
          <Mail className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">
            Paiement Sécurisé
          </h3>
          <p className="text-white mb-4">
            Après votre paiement, vous recevrez automatiquement par email le mot de passe
            pour accéder aux contenus exclusifs (Exercices, Programmes, Nutrition).
          </p>
          <p className="text-white text-sm opacity-90">
            Paiement sécurisé via Stripe et PayPal • Annulation possible à tout moment
          </p>
        </motion.div>

        {/* App Installation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
          <Smartphone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">
            Installez l'Application
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Pour une meilleure expérience, installez Body Titan directement sur votre téléphone. 
            Accédez à vos programmes plus rapidement.

          </p>
          <button
            onClick={handleInstallClick}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/25">
            <Download className="w-5 h-5 mr-2" />
            Installer l'Application
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Compatible iOS et Android • Sans passage par les stores
          </p>
        </motion.div>
      </div>
    </div>);

};

export default Subscription;