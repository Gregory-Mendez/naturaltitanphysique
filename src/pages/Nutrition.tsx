
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { Calculator, Apple, Utensils, Target, Clock, Info, Lock } from 'lucide-react';

const Nutrition: React.FC = () => {
  const { user } = useAuth();
  const { currentSubscription, fetchUserSubscription } = useSubscriptions();
  const [activeTab, setActiveTab] = useState('conseils');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('homme');
  const [activity, setActivity] = useState('modere');
  const [goal, setGoal] = useState('maintien');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      fetchUserSubscription(user.userId);
    }
  }, [user]);

  useEffect(() => {
    const localUnlock = localStorage.getItem('titan_nutrition_unlocked');
    const exercisesUnlock = localStorage.getItem('titan_exercises_unlocked');
    const masterUnlock = localStorage.getItem('titan_master_unlocked');

    if ((currentSubscription || localUnlock === 'true' || exercisesUnlock === 'true' || masterUnlock === 'true') && !isUnlocked) {
      setIsUnlocked(true);
      // Sync master key for other pages
      if (masterUnlock !== 'true') {
        localStorage.setItem('titan_master_unlocked', 'true');
      }

      // Petit toast discret pour confirmer l'accès auto (seulement si via abonnement)
      if (currentSubscription) {
        toast.success("Accès Premium validé : Nutrition débloquée !", {
          icon: '🔓',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #22c55e'
          }
        });
      }
    }
  }, [currentSubscription, isUnlocked]);

  const handleUnlock = async () => {
    setIsLoading(true);
    setPasswordError(false);
    setErrorMsg('');

    try {
      const { lumi } = await import('../lib/lumi');
      const response = await lumi.functions.invoke('verifyAccessCode', {
        body: { code: password }
      });

      if (response.valid) {
        setIsUnlocked(true);
        localStorage.setItem('titan_nutrition_unlocked', 'true');
        localStorage.setItem('titan_master_unlocked', 'true');

        // Sauvegarder le type d'accès
        if (response.type === 'client') {
          localStorage.setItem('titan_access_type', 'client');
          toast.success("Code client validé ! Nutrition débloquée.", { icon: '🔓' });
        } else {
          localStorage.setItem('titan_access_type', 'admin');
          toast.success("Accès Administrateur validé !", { icon: '👑' });
        }
      } else {
        setPasswordError(true);
        setErrorMsg('Code invalide');
        setTimeout(() => setPasswordError(false), 3000);
      }
    } catch (err) {
      console.error(err);
      setPasswordError(true);
      setErrorMsg('Erreur de vérification');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCalories = () => {
    if (!weight || !height || !age) return 0;

    let bmr = 0;
    if (gender === 'homme') {
      bmr = 88.362 + 13.397 * parseFloat(weight) + 4.799 * parseFloat(height) - 5.677 * parseFloat(age);
    } else {
      bmr = 447.593 + 9.247 * parseFloat(weight) + 3.098 * parseFloat(height) - 4.330 * parseFloat(age);
    }

    const activityMultipliers = {
      sedentaire: 1.2,
      leger: 1.375,
      modere: 1.55,
      intense: 1.725,
      extreme: 1.9
    };

    const goalMultipliers = {
      perte: 0.8,
      maintien: 1,
      prise: 1.2
    };

    return Math.round(bmr * activityMultipliers[activity as keyof typeof activityMultipliers] * goalMultipliers[goal as keyof typeof goalMultipliers]);
  };

  const nutritionTips = [
  {
    title: "Hydratation Optimale",
    description: "Buvez au minimum 35ml d'eau par kg de poids corporel par jour",
    icon: "💧",
    details: "L'eau représente 60% de notre poids corporel. Une hydratation optimale améliore les performances, la récupération et le métabolisme."
  },
  {
    title: "Protéines de Qualité",
    description: "1.6-2.2g de protéines par kg de poids corporel pour la musculation",
    icon: "🥩",
    details: "Les protéines sont essentielles pour la construction et la réparation musculaire. Variez les sources : viandes, poissons, œufs, légumineuses."
  },
  {
    title: "Timing des Repas",
    description: "Mangez toutes les 3-4 heures pour maintenir un métabolisme actif",
    icon: "⏰",
    details: "Répartir les apports nutritionnels sur la journée optimise l'absorption des nutriments et maintient l'énergie stable."
  },
  {
    title: "Glucides Stratégiques",
    description: "Consommez les glucides autour de vos entraînements",
    icon: "🍠",
    details: "Les glucides fournissent l'énergie nécessaire à l'entraînement et favorisent la récupération musculaire post-effort."
  },
  {
    title: "Lipides Essentiels",
    description: "25-30% de vos calories doivent provenir des bonnes graisses",
    icon: "🥑",
    details: "Les lipides sont cruciaux pour la production hormonale et l'absorption des vitamines liposolubles."
  },
  {
    title: "Micronutriments",
    description: "Privilégiez les aliments colorés et variés",
    icon: "🌈",
    details: "Vitamines et minéraux sont indispensables au bon fonctionnement de l'organisme et à la performance sportive."
  }];


  const mealPlans = [
  {
    title: "Plan Prise de Masse",
    calories: "3000-3500 kcal",
    macros: "P: 220g | G: 450g | L: 90g",
    description: "Pour développer la masse musculaire",
    meals: [
    {
      name: "Petit-déjeuner",
      foods: ["3 œufs entiers + 2 blancs", "100g flocons d'avoine", "1 banane", "30g amandes", "Café/thé"],
      calories: "750 kcal"
    },
    {
      name: "Collation matin",
      foods: ["Shaker protéines (30g)", "1 pomme", "20g noix"],
      calories: "350 kcal"
    },
    {
      name: "Déjeuner",
      foods: ["150g poulet", "100g riz basmati (cru)", "Légumes verts", "1 c.s huile olive"],
      calories: "800 kcal"
    },
    {
      name: "Collation pré-training",
      foods: ["1 banane", "30g amandes", "Café"],
      calories: "300 kcal"
    },
    {
      name: "Post-training",
      foods: ["Shaker protéines (40g)", "1 banane", "Créatine"],
      calories: "250 kcal"
    },
    {
      name: "Dîner",
      foods: ["150g saumon", "200g patate douce", "Salade verte", "Avocat"],
      calories: "750 kcal"
    },
    {
      name: "Collation soir",
      foods: ["Fromage blanc 0%", "30g noix", "1 c.s miel"],
      calories: "300 kcal"
    }]

  },
  {
    title: "Plan Sèche",
    calories: "1800-2200 kcal",
    macros: "P: 200g | G: 150g | L: 60g",
    description: "Pour perdre du gras tout en préservant le muscle",
    meals: [
    {
      name: "Petit-déjeuner",
      foods: ["3 blancs d'œufs + 1 jaune", "50g flocons d'avoine", "Fruits rouges", "Thé vert"],
      calories: "350 kcal"
    },
    {
      name: "Collation",
      foods: ["Shaker protéines (25g)", "1 pomme"],
      calories: "200 kcal"
    },
    {
      name: "Déjeuner",
      foods: ["120g blanc de poulet", "80g riz basmati (cru)", "Légumes verts à volonté"],
      calories: "450 kcal"
    },
    {
      name: "Pré-training",
      foods: ["1 banane", "Café noir", "BCAA"],
      calories: "100 kcal"
    },
    {
      name: "Post-training",
      foods: ["Shaker protéines (30g)", "Créatine"],
      calories: "120 kcal"
    },
    {
      name: "Dîner",
      foods: ["150g poisson blanc", "150g légumes verts", "1 c.s huile olive"],
      calories: "400 kcal"
    },
    {
      name: "Collation soir",
      foods: ["Caseine (20g)", "Quelques amandes"],
      calories: "180 kcal"
    }]

  },
  {
    title: "Plan Végétarien Athlétique",
    calories: "2200-2400 kcal",
    macros: "P: 160g | G: 280g | L: 70g",
    description: "Performance sans viande : Légumineuses, Oeufs & Produits Laitiers",
    meals: [
    {
      name: "Petit-déjeuner",
      foods: ["Fromage blanc 0% (300g)", "Muesli (80g)", "Fruits rouges", "Thé vert"],
      calories: "500 kcal"
    },
    {
      name: "Collation",
      foods: ["2 Oeufs durs", "1 Pomme", "Amandes (20g)"],
      calories: "300 kcal"
    },
    {
      name: "Déjeuner",
      foods: ["Lentilles corail (100g cru)", "Lait de coco", "Riz basmati (60g)", "Légumes variés"],
      calories: "700 kcal"
    },
    {
      name: "Collation",
      foods: ["Shaker Whey ou Protéine Végétale", "1 Banane"],
      calories: "250 kcal"
    },
    {
      name: "Dîner",
      foods: ["Chili sin carne (Haricots rouges)", "Avocat (1/2)", "Riz complet (60g)", "Maïs"],
      calories: "600 kcal"
    }]
  },
  {
    title: "Plan Budget Maîtrisé",
    calories: "2500 kcal",
    macros: "P: 170g | G: 300g | L: 80g",
    description: "Efficacité maximale à petit prix (Oeufs, Thon, Fromage Blanc)",
    meals: [
    {
      name: "Petit-déjeuner",
      foods: ["Omelette (3 oeufs)", "Pain complet (2 tranches)", "Fruit de saison"],
      calories: "500 kcal"
    },
    {
      name: "Collation",
      foods: ["Fromage blanc (250g)", "Flocons d'avoine (30g)"],
      calories: "300 kcal"
    },
    {
      name: "Déjeuner",
      foods: ["Pâtes complètes (100g)", "Thon en boîte (140g)", "Coulis tomate", "1 c.s Huile olive"],
      calories: "700 kcal"
    },
    {
      name: "Collation",
      foods: ["2 Oeufs durs", "1 Banane"],
      calories: "250 kcal"
    },
    {
      name: "Dîner",
      foods: ["Riz (80g)", "Maquereaux ou Sardines", "Haricots verts surgelés"],
      calories: "600 kcal"
    },
    {
      name: "Avant-coucher",
      foods: ["Fromage blanc (200g)"],
      calories: "150 kcal"
    }]
  },
  {
    title: "Idées Recettes Express",
    calories: "Variable",
    macros: "Macros variables selon portions",
    description: "Recettes rapides et hyper-protéinées pour varier les plaisirs",
    meals: [
    {
      name: "Pancakes Titan (Petit-déj)",
      foods: ["2 oeufs", "1 banane", "30g Whey", "50g Avoine", "Mixer & Cuire à la poêle"],
      calories: "~550 kcal"
    },
    {
      name: "Salade Composée (Déjeuner)",
      foods: ["Quinoa", "Thon", "Oeuf mollet", "Avocat", "Tomates", "Vinaigrette légère"],
      calories: "~600 kcal"
    },
    {
      name: "Bowl Tiramisu Fit (Collation)",
      foods: ["Fromage blanc", "Café fort", "Cacao non sucré", "Stevia", "1 Boudoir émietté"],
      calories: "~300 kcal"
    },
    {
      name: "Wrap Poulet (Dîner)",
      foods: ["Tortilla blé complet", "Blanc de poulet", "Crudités", "Sauce yaourt/herbes"],
      calories: "~450 kcal"
    },
    {
      name: "Mousse Choco Fit (Dessert)",
      foods: ["Blancs d'oeufs en neige", "Chocolat noir 85% fondu", "Mélanger délicatement"],
      calories: "~200 kcal"
    }]
  }];


  const supplements = [
  {
    name: "Whey Protéine",
    timing: "Post-training (30min après)",
    dosage: "25-40g par prise",
    benefits: "Récupération musculaire rapide et synthèse protéique",
    priority: "Essentiel",
    description: "Protéine à absorption rapide extraite du lactosérum. Riche en acides aminés essentiels et BCAA. Idéale pour la récupération post-entraînement. Favorise la croissance musculaire et la réparation des fibres.",
    usage: "Mélanger avec de l'eau ou du lait. Peut être prise au réveil ou entre les repas pour augmenter l'apport protéique quotidien."
  },
  {
    name: "Créatine Monohydrate",
    timing: "Quotidien (moment flexible)",
    dosage: "3-5g par jour",
    benefits: "Augmente la force, la puissance et le volume musculaire",
    priority: "Essentiel",
    description: "Supplément le plus étudié en musculation. Augmente les réserves de phosphocréatine dans les muscles, permettant une production d'énergie plus rapide. Améliore les performances en exercices de haute intensité et favorise la prise de masse.",
    usage: "Phase de charge optionnelle : 20g/jour pendant 5 jours, puis 3-5g/jour. Ou directement 3-5g/jour (méthode recommandée). À prendre avec des glucides pour une meilleure absorption."
  },
  {
    name: "BCAA (Acides Aminés Ramifiés)",
    timing: "Pendant ou autour de l'entraînement",
    dosage: "5-10g par prise",
    benefits: "Réduit la fatigue, préserve la masse musculaire, accélère la récupération",
    priority: "Recommandé",
    description: "Composés de leucine, isoleucine et valine. Acides aminés essentiels qui ne sont pas métabolisés par le foie mais directement par les muscles. Réduisent le catabolisme musculaire pendant l'effort intense et le jeûne.",
    usage: "10g pendant l'entraînement, ou 5g avant et 5g après. Particulièrement utile lors d'entraînements à jeun ou en période de sèche."
  },
  {
    name: "Oméga 3 (EPA/DHA)",
    timing: "Avec les repas",
    dosage: "2-3g par jour (dont 1-2g EPA+DHA)",
    benefits: "Anti-inflammatoire, santé cardiovasculaire, récupération optimale",
    priority: "Essentiel",
    description: "Acides gras essentiels provenant d'huile de poisson. Puissants anti-inflammatoires naturels. Améliorent la santé cardiovasculaire, la fonction cérébrale, la sensibilité à l'insuline et réduisent les douleurs articulaires.",
    usage: "Prendre avec un repas contenant des graisses pour une meilleure absorption. Choisir des produits purifiés (sans métaux lourds)."
  },
  {
    name: "Vitamine D3",
    timing: "Matin avec repas gras",
    dosage: "2000-5000 UI par jour",
    benefits: "Immunité, santé osseuse, production de testostérone",
    priority: "Essentiel",
    description: "Vitamine liposoluble souvent déficitaire, surtout en hiver. Essentielle pour l'absorption du calcium, la santé osseuse, le système immunitaire et la production hormonale. Impact direct sur les performances et la récupération.",
    usage: "À prendre avec un repas contenant des graisses. Faire contrôler son taux sanguin (objectif : 50-80 ng/ml)."
  },
  {
    name: "Magnésium",
    timing: "Soir avant le coucher",
    dosage: "300-500mg par jour",
    benefits: "Relaxation musculaire, sommeil, récupération, réduction des crampes",
    priority: "Recommandé",
    description: "Minéral impliqué dans plus de 300 réactions enzymatiques. Essentiel pour la contraction musculaire, la production d'énergie et la synthèse protéique. Améliore la qualité du sommeil et réduit le stress.",
    usage: "Privilégier les formes bisglycinate ou citrate (meilleure absorption). Éviter l'oxyde de magnésium (mal absorbé)."
  },
  {
    name: "Multivitamines",
    timing: "Matin avec le petit-déjeuner",
    dosage: "1-2 comprimés selon le produit",
    benefits: "Comble les carences micronutritionnelles",
    priority: "Utile",
    description: "Assurance nutritionnelle pour couvrir les besoins en vitamines et minéraux. Particulièrement utile en période de restriction calorique ou d'alimentation peu variée. Soutient les fonctions métaboliques et immunitaires.",
    usage: "Choisir un produit de qualité avec des dosages adaptés. Prendre avec un repas pour une meilleure absorption."
  },
  {
    name: "Glutamine",
    timing: "Post-training ou avant le coucher",
    dosage: "5-10g par prise",
    benefits: "Récupération, santé intestinale, système immunitaire",
    priority: "Optionnel",
    description: "Acide aminé le plus abondant dans le corps. Soutient la récupération musculaire, la santé de la paroi intestinale et le système immunitaire. Particulièrement utile en période de stress intense ou de surentraînement.",
    usage: "5-10g après l'entraînement ou avant le coucher. Effet plus marqué en période de volume d'entraînement élevé."
  },
  {
    name: "Vitargo (Glucides Rapides)",
    timing: "Pendant ou post-training",
    dosage: "30-50g par prise",
    benefits: "Recharge rapide du glycogène, énergie immédiate",
    priority: "Optionnel",
    description: "Glucides à haut poids moléculaire avec vidange gastrique très rapide. Recharge rapidement les réserves de glycogène musculaire sans inconfort digestif. Utile pour les entraînements longs ou les athlètes avec besoins caloriques élevés.",
    usage: "30-50g pendant les entraînements de plus d'1h30, ou immédiatement après l'entraînement avec des protéines."
  },
  {
    name: "ZMA (Zinc, Magnésium, Vitamine B6)",
    timing: "Soir, 30-60min avant le coucher",
    dosage: "Selon recommandations du produit",
    benefits: "Qualité du sommeil, récupération, production hormonale",
    priority: "Utile",
    description: "Combinaison de zinc, magnésium et vitamine B6. Le zinc soutient la production de testostérone et la fonction immunitaire. Améliore la qualité du sommeil profond, crucial pour la récupération et la croissance musculaire.",
    usage: "Prendre à jeun, 30-60 minutes avant le coucher. Ne pas combiner avec du calcium qui inhibe l'absorption."
  },
  {
    name: "Caféine",
    timing: "30-45min avant l'entraînement",
    dosage: "200-400mg (3-6mg/kg)",
    benefits: "Énergie, focus, performance, endurance",
    priority: "Recommandé",
    description: "Stimulant du système nerveux central. Améliore la vigilance, la concentration, réduit la perception de l'effort et augmente la mobilisation des graisses. Un des ergogènes les plus efficaces et étudiés.",
    usage: "Commencer par 200mg et ajuster. Éviter après 16h pour ne pas perturber le sommeil. Tolérance possible avec usage quotidien (faire des pauses)."
  },
  {
    name: "Bêta-Alanine",
    timing: "Quotidien (timing flexible)",
    dosage: "3-6g par jour",
    benefits: "Endurance musculaire, retarde la fatigue",
    priority: "Optionnel",
    description: "Acide aminé qui augmente les niveaux de carnosine musculaire. La carnosine tamponne l'acidité dans les muscles, retardant la fatigue lors d'efforts de 60-240 secondes. Effet cumulatif nécessitant plusieurs semaines.",
    usage: "3-6g par jour, répartis en plusieurs prises pour limiter les picotements (paresthésie). Effet après 2-4 semaines d'utilisation."
  }];


  // Écran de verrouillage
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 rounded-lg p-8 border-4 border-red-600">

          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-red-600 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Nutrition <span className="text-green-500">Professionnelle</span>
            </h2>
            <p className="text-gray-300 font-medium">Contenu réservé aux membres "Premium" : conseils, plan repas, suppléments, calcul IMC...

            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border-2 border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="Entrez le mot de passe" />

            </div>

            {passwordError &&
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-600 text-white px-4 py-3 rounded-lg text-center font-semibold">

                ❌ Mot de passe incorrect
              </motion.div>
            }

            <button
              onClick={handleUnlock}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

              {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {isLoading ? 'Vérification...' : 'Déverrouiller'}
            </button>
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Réservé aux Adhérents "Premium"</p>
            <p className="mt-2">📧 bodytitan64@yahoo.com</p>
          </div>
        </motion.div>
      </div>);

  }

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
            Nutrition <span className="text-green-500">Sportive</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">Conseils nutritionnels de ton conseillé pour optimiser vos résultats mangé toutes les 3/4heures pour maintenir un métabolisme optimal est actif !

          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-lg p-1 flex flex-wrap">
            {[
            { id: 'conseils', label: 'Conseils', icon: Info },
            { id: 'calculateur', label: 'Calculateur', icon: Calculator },
            { id: 'plans', label: 'Plans Repas', icon: Utensils },
            { id: 'supplements', label: 'Suppléments', icon: Apple }].
            map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center ${
              activeTab === tab.id ?
              'bg-red-600 text-white' :
              'text-gray-300 hover:text-white'}`
              }>

                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>

          {/* Conseils Tab */}
          {activeTab === 'conseils' &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nutritionTips.map((tip, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">

                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>
                  <p className="text-green-400 font-semibold mb-3">{tip.description}</p>
                  <p className="text-gray-300 text-sm">{tip.details}</p>
                </motion.div>
            )}
            </div>
          }

          {/* Calculateur Tab */}
          {activeTab === 'calculateur' &&
          <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Calculateur de Besoins Caloriques
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Poids (kg)</label>
                    <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    placeholder="70" />

                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Taille (cm)</label>
                    <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    placeholder="175" />

                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Âge</label>
                    <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    placeholder="25" />

                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Sexe</label>
                    <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none">

                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Activité</label>
                    <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none">

                      <option value="sedentaire">Sédentaire</option>
                      <option value="leger">Léger (1-3x/sem)</option>
                      <option value="modere">Modéré (3-5x/sem)</option>
                      <option value="intense">Intense (6-7x/sem)</option>
                      <option value="extreme">Extrême (2x/jour)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Objectif</label>
                    <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none">

                      <option value="perte">Perte de poids</option>
                      <option value="maintien">Maintien</option>
                      <option value="prise">Prise de masse</option>
                    </select>
                  </div>
                </div>

                {weight && height && age &&
              <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Vos besoins caloriques
                    </h3>
                    <p className="text-4xl font-bold text-white mb-2">
                      {calculateCalories()} kcal/jour
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                      <div className="bg-white bg-opacity-20 rounded p-3">
                        <p className="font-semibold">Protéines</p>
                        <p>{Math.round(calculateCalories() * 0.25 / 4)}g</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded p-3">
                        <p className="font-semibold">Glucides</p>
                        <p>{Math.round(calculateCalories() * 0.45 / 4)}g</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded p-3">
                        <p className="font-semibold">Lipides</p>
                        <p>{Math.round(calculateCalories() * 0.30 / 9)}g</p>
                      </div>
                    </div>
                  </div>
              }
              </div>
            </div>
          }

          {/* Plans Repas Tab */}
          {activeTab === 'plans' &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mealPlans.map((plan, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-800 rounded-lg p-6">

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                    <p className="text-green-400 font-semibold text-lg">{plan.calories}</p>
                    <p className="text-blue-400 font-medium text-sm mb-2">{plan.macros}</p>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>

                  <div className="space-y-4">
                    {plan.meals.map((meal, mealIndex) =>
                <div key={mealIndex} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-white">{meal.name}</h4>
                          <span className="text-red-400 font-semibold text-sm">{meal.calories}</span>
                        </div>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {meal.foods.map((food, foodIndex) =>
                    <li key={foodIndex} className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {food}
                            </li>
                    )}
                        </ul>
                      </div>
                )}
                  </div>
                </motion.div>
            )}
            </div>
          }

          {/* Suppléments Tab */}
          {activeTab === 'supplements' &&
          <div className="max-w-6xl mx-auto">
              {/* Avertissement Anti-Dopage */}
              <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 p-6 rounded-lg mb-8 border-4 border-white">

                <h3 className="text-2xl font-bold text-white mb-3 text-center">
                  🚫 AVERTISSEMENT ANTI-DOPAGE 🚫
                </h3>
                <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                  <p className="text-white font-semibold mb-2 text-center">
                    ⚠️ TOUS LES SUPPLÉMENTS PRÉSENTÉS ICI SONT 100% NATURELS ET LÉGAUX ⚠️
                  </p>
                  <ul className="text-white space-y-2 text-sm">
                    <li>✅ Aucun produit dopant (stéroïdes, hormones de croissance, EPO, etc.)</li>
                    <li>✅ Conformes aux normes AFNOR et réglementations européennes</li>
                    <li>✅ Testés et approuvés pour la santé et le sport</li>
                    <li>❌ Grégory condamne fermement l'usage de substances dopantes</li>
                    <li>💪 La vraie performance vient du travail, de la nutrition et de la récupération</li>
                  </ul>
                  <p className="text-yellow-300 font-bold mt-3 text-center">
                    Le dopage détruit la santé et les performances à long terme !
                  </p>
                </div>
              </motion.div>

              <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                  Guide Complet des <span className="text-green-500">Suppléments</span>
                </h2>
                <p className="text-center text-gray-300 mb-8">Conseils hydratez-vous ! entre 1.5L est 2.5L / Jour répartis dans une journée.

              </p>
                
                <div className="space-y-6">
                  {supplements.map((supplement, index) =>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-gray-700 rounded-lg p-6 border-l-4 border-green-500 hover:border-red-500 transition-colors">

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="mb-4 md:mb-0 flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-white">{supplement.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        supplement.priority === 'Essentiel' ? 'bg-red-600 text-white' :
                        supplement.priority === 'Recommandé' ? 'bg-green-600 text-white' :
                        'bg-gray-600 text-white'}`
                        }>
                              {supplement.priority}
                            </span>
                          </div>
                          <p className="text-green-400 font-semibold mb-3">{supplement.benefits}</p>
                        </div>
                      </div>

                      {/* Description détaillée */}
                      <div className="bg-gray-800 p-4 rounded-lg mb-4">
                        <h4 className="text-white font-bold mb-2">📋 Description</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{supplement.description}</p>
                      </div>

                      {/* Timing et Dosage */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Clock className="w-5 h-5 mr-2 text-blue-400" />
                            <span className="text-white font-semibold">Timing optimal</span>
                          </div>
                          <p className="text-gray-300 text-sm">{supplement.timing}</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Target className="w-5 h-5 mr-2 text-green-400" />
                            <span className="text-white font-semibold">Dosage recommandé</span>
                          </div>
                          <p className="text-gray-300 text-sm">{supplement.dosage}</p>
                        </div>
                      </div>

                      {/* Mode d'emploi */}
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-2">💡 Mode d'emploi</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{supplement.usage}</p>
                      </div>
                    </motion.div>
                )}
                </div>

                {/* Conseils finaux */}
                <div className="mt-8 space-y-4">
                  <div className="bg-gradient-to-r from-red-600 to-green-600 p-6 rounded-lg">
                    <h4 className="text-white font-bold mb-3 text-lg">⚠️ Conseils Importants de TitanGryx</h4>
                    <ul className="text-white space-y-2 text-sm">
                      <li>✅ Les suppléments ne remplacent JAMAIS une alimentation équilibrée</li>
                      <li>✅ Privilégiez toujours la qualité à la quantité</li>
                      <li>✅ Commencez par les essentiels (Whey, Créatine, Oméga 3, Vitamine D)</li>
                      <li>✅ Hydratation : 2-3L d'eau par jour </li>
                      <li>✅ Consultez un professionnel avant toute supplémentation</li>
                      <li>✅ Respectez les dosages recommandés</li>
                      <li>❌ Plus n'est pas toujours mieux - évitez le surdosage</li>
                    </ul>
                  </div>

                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h4 className="text-green-400 font-bold mb-3 text-lg">🎯 Ordre de Priorité selon TitanGryx</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-white"><span className="text-red-500 font-bold">Niveau 1 (Essentiels) :</span> Whey, Créatine, Oméga 3, Vitamine D</p>
                      <p className="text-white"><span className="text-green-500 font-bold">Niveau 2 (Recommandés) :</span> BCAA, Magnésium, Caféine</p>
                      <p className="text-white"><span className="text-gray-400 font-bold">Niveau 3 (Utiles) :</span> Multivitamines, ZMA, Glutamine</p>
                      <p className="text-white"><span className="text-blue-400 font-bold">Niveau 4 (Optionnels) :</span> Vitargo, Bêta-Alanine</p>
                    </div>
                  </div>

                  <div className="bg-yellow-600 bg-opacity-20 border-2 border-yellow-500 p-6 rounded-lg">
                    <h4 className="text-yellow-400 font-bold mb-2 text-lg">⚡ Budget Limité ? Voici le Minimum</h4>
                    <p className="text-white text-sm mb-3">
                      Si vous devez choisir seulement 3 suppléments pour commencer :
                    </p>
                    <ol className="text-white space-y-1 text-sm list-decimal list-inside">
                      <li><strong>Créatine</strong> - Meilleur rapport qualité/prix/efficacité</li>
                      <li><strong>Whey Protéine</strong> - Facilite l'atteinte des besoins protéiques</li>
                      <li><strong>Oméga 3</strong> - Santé globale et récupération</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          }
        </motion.div>
      </div>
    </div>);

};

export default Nutrition;