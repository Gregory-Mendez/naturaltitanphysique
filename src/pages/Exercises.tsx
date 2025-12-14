import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useSubscriptions } from "../hooks/useSubscriptions";
import {Dumbbell, Play, Lock, Key} from 'lucide-react';

export default function Exercises() {
  const { user } = useAuth();
  const { currentSubscription, fetchUserSubscription } = useSubscriptions();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      fetchUserSubscription(user.userId);
    }
  }, [user]);

  // Auto-déverrouillage pour les abonnés ou mémoire locale
  useEffect(() => {
    const localUnlock = localStorage.getItem('titan_exercises_unlocked');
    const nutritionUnlock = localStorage.getItem('titan_nutrition_unlocked');
    const masterUnlock = localStorage.getItem('titan_master_unlocked');
    
    if ((currentSubscription || localUnlock === 'true' || nutritionUnlock === 'true' || masterUnlock === 'true') && !isUnlocked) {
      setIsUnlocked(true);
      // Sync master key for other pages
      if (masterUnlock !== 'true') {
        localStorage.setItem('titan_master_unlocked', 'true');
      }
      
      if (currentSubscription) {
        toast.success("Abonnement Premium détecté : Accès déverrouillé !", {
          icon: '🔓',
          duration: 4000
        });
      }
    }
  }, [currentSubscription, isUnlocked]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        // Appel à la fonction de vérification
        const { lumi } = await import('../lib/lumi');
        const response = await lumi.functions.invoke('verifyAccessCode', {
            body: { code: password }
        });

        if (response.valid) {
            setIsUnlocked(true);
            localStorage.setItem('titan_exercises_unlocked', 'true');
            localStorage.setItem('titan_master_unlocked', 'true');
            
            // Sauvegarder le type d'accès pour référence
            if (response.type === 'client') {
                localStorage.setItem('titan_access_type', 'client');
                toast.success("Code client validé ! Bienvenue.", { icon: '🔓' });
            } else {
                localStorage.setItem('titan_access_type', 'admin');
                toast.success("Accès Administrateur validé !", { icon: '👑' });
            }
        } else {
            setError('Code d\'accès incorrect');
        }
    } catch (err) {
        console.error(err);
        setError('Erreur de vérification. Veuillez réessayer.');
    } finally {
        setIsLoading(false);
    }
  };

  const exercises = [
  // CHALLENGES EXCLUSIFS
  {
    category: "Challenges Exclusifs (Premium Annuel)",
    list: [
    { name: "Superset: Squat + Pompes", video: "https://youtube.com/shorts/podaa57B8zM?si=uMuAmexZr5L0KfU-", description: "Challenge Guerrier Pressé" },
    { name: "Superset: Fentes + Rowing", video: "https://youtube.com/shorts/ZM9XpyG5HeU?si=R9EMDoIe2cnc7jC5", description: "Challenge Guerrier Pressé" },
    { name: "Superset: Press + Crunch", video: "https://youtu.be/GcY6TZxfS0k?si=lwnFO7HUsQkA9JKX", description: "Challenge Guerrier Pressé" }]
  },
  // PECTORAUX
  {
    category: "Pectoraux",
    list: [
    { name: "Développé couché barre", video: "https://youtube.com/shorts/GoVJNOX-_b0?si=GGs7pDXuv7rCNaj_", description: "Mouvement de base pour les pectoraux" },
    { name: "Développé incliné haltères", video: "https://youtube.com/shorts/ucRI2xM-pRA?si=dn-TkQ2__4b1p8Pr", description: "Cible le haut des pectoraux" },
    { name: "Écarté couché", video: "https://youtube.com/shorts/OmMnAhfm5jA?si=r9jgyshSsMQtBcpx", description: "Étirement et congestion des pectoraux" },
    { name: "Pompes", video: "https://youtube.com/shorts/JCAt8U_koUc?si=IhL4JYY20sansqV7", description: "Pectoraux triceps" },
    { name: "Dips pectoraux", video: "https://youtube.com/shorts/3oOxGEly8Bo?si=8yC7ix-l9KQbtt-m", description: "Travail du bas des pectoraux" },
    { name: "Pull-over", video: "https://youtube.com/shorts/ghuiJ6F1-9k?si=EtORc8GSFthW8v2z", description: "Ouverture de la cage thoracique" },
    { name: "Développé décliné", video: "https://youtube.com/shorts/CEN4Jo1x3_I?si=VEu057xoxNB7rzmM", description: "Bas des pectoraux" },
    { name: "Écarté incliné poulie", video: "https://youtube.com/shorts/rpx2Tf6OJoY?si=sDmUBgPplZ6tgosz", description: "Haut des pectoraux en isolation" },
    { name: "Pec deck", video: "https://youtube.com/shorts/xYExAgLt_4I?si=IR2wnTwLbAX6C-_w", description: "Machine pour pectoraux" },
    { name: "Pompes diamant", video: "https://youtu.be/Np0XbTjZ668?si=bYBWJXchiosBIbqp", description: "Variante triceps et pectoraux" },
    { name: "Développé serré", video: "https://youtube.com/shorts/o2oAnEnPCZM?si=t52c4O6yMpIFYBX4", description: "Intérieur des pectoraux" },
    { name: "Crossover poulie haute", video: "https://youtube.com/shorts/rTxzMwaeFWY?si=zEG8uzQl-mFGb_J6", description: "Finition pectoraux" },
    { name: "Pompes surélevées", video: "https://youtube.com/shorts/C66PshKA1s0?si=TQNZwqqJdERrorfL", description: "Haut des pectoraux au poids du corps" },
    { name: "Développé guidé", video: "https://youtu.be/ao5xOGxH4as?si=rXObCizkNhqJqSnh", description: "Machine convergente" },
    { name: "Écarté décliné", video: "https://youtube.com/shorts/xwqFRasRlE0?si=ixKLheeSf21JD6Gu", description: "Bas des pectoraux en isolation" }]

  },
  // BICEPS
  {
    category: "Biceps",
    list: [
    { name: "Curl barre", video: "https://youtube.com/shorts/REopAb_EtZA?si=wqJ99JpILJeMopvZ", description: "Exercice de base pour les biceps" },
    { name: "Curl haltères", video: "https://youtube.com/shorts/bxyocI5XBoA?si=BHlj8-K_jHndHhrn", description: "Travail alterné des biceps" },
    { name: "Curl marteau", video: "https://youtube.com/shorts/cozAA9HUPhE?si=w7Ucg8s1dJ0VkJWQ", description: "Cible le brachial" },
    { name: "Curl pupitre", video: "https://youtube.com/shorts/Gxdd7EfbK7g?si=-vjbp3RhKj1Jzfw5", description: "Isolation stricte des biceps" },
    { name: "Curl incliné", video: "https://youtube.com/shorts/iwyO2nJuG5Y?si=RVJIqTYrSoMDmUkY", description: "Étirement maximal des biceps" },
    { name: "Curl concentration", video: "https://youtube.com/shorts/ffOsFZvQnnI?si=EIAne-mx__10qbyI", description: "Pic du biceps" },
    { name: "Curl poulie basse", video: "https://www.youtube.com/watch?v=2yBGHNF2DQM", description: "Tension continue" },
    { name: "Curl barre EZ", video: "https://youtube.com/shorts/pT-wvBPSMZU?si=R28czuCv9h8xDrET", description: "Confort des poignets" },
    { name: "Curl araignée", video: "https://youtube.com/shorts/AbteIrEx5fQ?si=-SJ6oMn4gU-UQ0Vz", description: "Isolation complète" },
    { name: "Curl 21s", video: "https://youtube.com/shorts/h4NW5iaKBSc?si=Go_YtkhGdld6I_dh", description: "Technique d'intensification" },
    { name: "Curl Zottman", video: "https://youtu.be/QikAl_pgVI0?si=l3I91DmOybTIVvA5", description: "Biceps et avant-bras" },
    { name: "Curl poulie haute", video: "https://youtu.be/ABNWDv3O-0U?si=NjFRwYhuQKxDbGYF", description: "Angle différent" },
    { name: "Curl inversé", video: "https://youtu.be/zylB-f4E_kQ?si=C7lvG3LH1rIf9lD0", description: "Avant-bras et brachial" },
    { name: "Curl Scott", video: "https://youtube.com/shorts/iwyO2nJuG5Y?si=swy36B3_NsnEmsjJ", description: "Isolation sur banc" },
    { name: "Curl travers", video: "https://youtube.com/shorts/qmQkt1Y-FX8?si=QVYrO5TaVBjOG1ZS", description: "Travail du pic" }]

  },
  // TRICEPS
  {
    category: "Triceps",
    list: [
    { name: "Dips", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd", description: "Triceps pectoraux" },
    { name: "Extension nuque", video: "https://youtube.com/shorts/7AvQ62POIMc?si=EPRrO2RB6o5bRJhz", description: "Longue portion du triceps" },
    { name: "Barre au front", video: "https://youtube.com/shorts/tveoFplRZeE?si=RfVWTtEQ35875Fkd", description: "Isolation des triceps" },
    { name: "Extension poulie haute", video: "https://youtube.com/shorts/jbC8Vb6bqIc?si=kbMGlWWmVe2zQvgT", description: "Finition triceps" },
    { name: "Kickback", video: "https://youtube.com/shorts/mottZjKdJ3k?si=zxcZdE9lJzeykyp9", description: "Isolation stricte" },
    { name: "Développé serré", video: "https://youtube.com/shorts/QtcU2CzhOKM?si=8NJ_HYDSE68Nn27Q", description: "Polyarticulaire triceps" },
    { name: "Extension corde", video: "https://youtube.com/shorts/bqqBD4f0Vn0?si=Lg2tjRUoVQ9q6oIJ", description: "Séparation des chefs" },
    { name: "Extension un bras", video: "https://youtu.be/r6ziRqwjG9E?si=YJgxQTn1NAuvVI7u", description: "Unilatéral pour équilibre" },
    { name: "Pompes serrées", video: "https://www.youtube.com/watch?v=J0DnG1_S92I", description: "Poids du corps" },
    { name: "Extension haltère", video: "https://youtube.com/shorts/OGfQ02g_uwA?si=tYWzRRQW8W2tsbf8", description: "Longue portion" },
    { name: "Extension allongé", video: "https://youtube.com/shorts/RexJbn7l_Ko?si=32xDbaRMKpLEs38U", description: "Stretch maximal" },
    { name: "Dips banc", video: "https://youtube.com/shorts/4ua3MzaU0QU?si=sFMyp8tj2hV0NT9B", description: "Accessible débutants" },
    { name: "Extension inversée", video: "https://youtube.com/shorts/K3mFeNz4e3w?si=H3-7FKXhgEwpGmlz", description: "Angle différent" },
    { name: "Tate press", video: "https://youtube.com/shorts/1YmJgZAnIIQ?si=LPnCRKILM4lrgl6j", description: "Variation haltères" },
    { name: "Extension barre basse", video: "https://youtube.com/shorts/Zsa_2D7DtwE?si=BwwrItD8B1slmHxA", description: "Poulie basse derrière" }]

  },
  // ÉPAULES
  {
    category: "Épaules",
    list: [
    { name: "Développé militaire", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc", description: "Base pour les épaules" },
    { name: "Élévations latérales", video: "https://youtube.com/shorts/PPlovaP0q94?si=wvosKbRFTyVx7sNy", description: "Deltoïde moyen" },
    { name: "Élévations frontales", video: "https://youtube.com/shorts/ZXNZphO1kXI?si=5HZZSU4qH-CzZExg", description: "Deltoïde antérieur" },
    { name: "Oiseau", video: "https://youtu.be/WdRIW9NT2RM?si=h-vctxLLCTPS6a0W", description: "Deltoïde postérieur" },
    { name: "Développé Arnold", video: "https://www.youtube.com/watch?v=6Z15_WdXmVw", description: "Rotation complète" },
    { name: "Rowing menton", video: "https://youtube.com/shorts/eVSxnh9V86U?si=pFe_jYe3xSNd20ZN", description: "Épaules et trapèzes" },
    { name: "Développé haltères", video: "https://www.youtube.com/watch?v=qEwKCR5JCog", description: "Amplitude maximale" },
    { name: "Face pull", video: "https://youtube.com/shorts/vU30xyp6IYM?si=UYtqmmhPu8Ln-CS2", description: "Arrière d'épaules" },
    { name: "Élévations penchées", video: "https://youtube.com/shorts/9s98GghTeI0?si=HYnMHuOkMQ-DGSCJ", description: "Postérieur strict" },
    { name: "Développé nuque", video: "https://youtube.com/shorts/DK5sYrm9oRE?si=x1Q6xaWcacEGveVg", description: "Masse épaules" },
    { name: "Élévations câble", video: "https://youtube.com/shorts/80nUVDpy2I4?si=3Ij1EJ0S-waEAuFf", description: "Tension continue" },
    { name: "Oiseau machine", video: "https://youtube.com/shorts/IhKIQxGP6KQ?si=9QD9sg7e_wKaY77F", description: "Isolation postérieur" },
    { name: "Pike push-up", video: "https://youtube.com/shorts/CFcB3w67dqs?si=-5OomtGK71VdaWq3", description: "Poids du corps" },
    { name: "Élévations Y", video: "https://youtube.com/shorts/yV_eGv9qqsQ?si=lenEECRQORMCRlpO", description: "Stabilisateurs" },
    { name: "Rotation externe", video: "https://youtube.com/shorts/p5deeQlApXs?si=XxS_HEE2io4W0Bue", description: "Coiffe des rotateurs" }]

  },
  // ... keep existing code for other categories
  // DOS
  {
    category: "Dos",
    list: [
    { name: "Tractions", video: "https://youtube.com/shorts/VqDByjY4V0o?si=6dH4j1SLQmbJjXbK", description: "Dos biceps" },
    { name: "Rowing barre", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS", description: "Épaisseur du dos" },
    { name: "Tirage vertical", video: "https://youtube.com/shorts/Kf3YOH6mgjw?si=t2qktIqk1IO8fjv5", description: "Largeur du dos" },
    { name: "Rowing haltère", video: "https://youtube.com/shorts/vu_YDt9nGv4?si=ZzJ_GNZ42sbOCSls", description: "Unilatéral" },
    { name: "Rowing T-bar", video: "https://youtube.com/shorts/Qw8lVFp8RqE?si=Hq09df8BtbO-et1c", description: "Milieu du dos" },
    { name: "Tirage horizontal", video: "https://youtube.com/shorts/t3MxDntkWdI?si=dkwGzE_QwwAx599I", description: "Épaisseur dorsale" },
    { name: "Pull-over", video: "https://youtube.com/shorts/Vf_zUuI4QNQ?si=erfAAh6bhU3o2Jx_", description: "Grand dorsal" },
    { name: "Rowing Pendlay", video: "https://youtube.com/shorts/3g8CCbIa2kk?si=t-WX9OzzFjna6tmX", description: "Explosivité" },
    { name: "Tirage prise neutre", video: "https://youtube.com/shorts/5x-rzW9ZHgc?si=vbrH-pCaFDcFuL6_", description: "Variation de prise" },
    { name: "Shrugs", video: "https://youtube.com/shorts/HUdr-1wd4ms?si=LdXA8wJ7mjhYet8d", description: "Trapèzes supérieurs" },
    { name: "Face pull", video: "https://youtube.com/shorts/bhskVxUB2OM?si=p1Esk7i8pZYdADSe", description: "Trapèzes moyens" },
    { name: "Rowing Yates", video: "https://youtube.com/shorts/_zF_Bd7FPqw?si=cWHPm4dlvStNsiKB", description: "Prise supination" },
    { name: "Tirage bras tendus", video: "https://youtube.com/shorts/lnec6DdscJU?si=tq8hLqN6A3z4mzsY", description: "Grand dorsal strict" },
    { name: "Rowing machine", video: "https://youtube.com/shorts/l6GDgs23TYk?si=gbcxoIOtiZUqlSwf", description: "Sécurité du dos" },
    { name: "Good morning", video: "https://youtube.com/shorts/7cpldMZjLOs?si=80MBw4cibU7r-M7D", description: "Lombaires et ischios" }]

  },
  // TRAPÈZES
  {
    category: "Trapèzes",
    list: [
    { name: "Shrugs barre", video: "https://youtube.com/shorts/acdGG6_B70I?si=v54cJLbK_9hgxwnI", description: "Trapèzes supérieurs" },
    { name: "Shrugs haltères", video: "https://youtube.com/shorts/m_GlpLN-8V8?si=185Rmj6OmiJZT6ZY", description: "Amplitude complète" },
    { name: "Rowing menton", video: "https://youtube.com/shorts/g9DwLsqvxAk?si=6jipO1ZPS9EMSdAl", description: "Trapèzes et épaules" },
    { name: "Farmer walk", video: "https://youtube.com/shorts/0UwBpALwFPs?si=ZFsROv9ZLPEvA3-5", description: "Force fonctionnelle" },
    { name: "Shrugs poulie", video: "https://youtube.com/shorts/zagXjxlK-Cw?si=lkEpCnIc9Onhkfll", description: "Tension continue" },
    { name: "Face pull", video: "https://youtube.com/shorts/U4EA-SwVr04?si=j7LqHkxh0kSYS2Lh", description: "Trapèzes moyens" },
    { name: "Shrugs Smith", video: "https://youtube.com/shorts/AifaHPrZ1ss?si=J_oyYoHtwDpZF4OS", description: "Guidage sécurisé" },
    { name: "Rowing bûcheron", video: "https://youtube.com/shorts/6Yvnx2xrBw0?si=MvescoOW9Qyj9W9S", description: "Unilatéral trapèzes" },
    { name: "Shrugs derrière", video: "https://youtube.com/shorts/s287261LUvg?si=_AZJvP7MAInQR6YK", description: "Variation d'angle" },
    { name: "Y raise", video: "https://youtube.com/shorts/BQay3kmFgXY?si=UAafigk0ebau_dLo", description: "Trapèzes inférieurs" }]

  },
  // QUADRICEPS
  {
    category: "Quadriceps",
    list: [
    { name: "Squat barre", video: "https://youtube.com/shorts/1D6OPkInYrU?si=k-s1Rt8Jc6DmZzFi", description: "Roi des exercices jambes" },
    { name: "Presse à cuisses", video: "https://youtube.com/shorts/igWb6nY8Fyo?si=6WrKG21e_Wl0PwRJ", description: "Charge lourde sécurisée" },
    { name: "Fentes", video: "https://youtube.com/shorts/dOQ_Ihs-ZDw?si=LsZ8humAlF785Z9A", description: "Jambes unilatéral" },
    { name: "Leg extension", video: "https://youtube.com/shorts/3bQoT5ytRPE?si=0pTx_oGRVUAfuZAO", description: "Isolation quadriceps" },
    { name: "Squat bulgare", video: "https://youtube.com/shorts/uBSoEWZu07k?si=gQelseeXo91UK8dl", description: "Unilatéral intense" },
    { name: "Hack squat", video: "https://youtube.com/shorts/6XCKhDAtxSk?si=jACZ85EVIhWkCwyV", description: "Machine guidée" },
    { name: "Sissy squat", video: "https://youtube.com/shorts/AYN-U5nZieY?si=MOXnOrKVR5um2qtF", description: "Droit fémoral" },
    { name: "Front squat", video: "https://youtube.com/shorts/1T_mflfdBe8?si=5Abo1Ow1yVw-1KPR", description: "Barre devant" },
    { name: "Goblet squat", video: "https://youtube.com/shorts/hi_fonO6UZY?si=Q5MUYiShhEIlpi0H", description: "Apprentissage technique" },
    { name: "Pistol squat", video: "https://youtube.com/shorts/4Oca5S-6QlM?si=QCiMJsyewZvqz-8L", description: "Une jambe avancé" },
    { name: "Wall sit", video: "https://youtube.com/shorts/X5BqpoNzee0?si=8c1W3v7bnv3zCzvA", description: "Isométrique" },
    { name: "Step-up", video: "https://youtube.com/shorts/bUGtmV1RXes?si=JSWcSqP2e2-xeYSP", description: "Fonctionnel" },
    { name: "Squat sumo", video: "https://youtube.com/shorts/zfhYKwgnQIc?si=o-x3lO16tHETwMmk", description: "Écartement large" },
    { name: "Fentes marchées", video: "https://youtube.com/shorts/pm-42aJQ03o?si=7bqXuzq3OThS4YEw", description: "Dynamique" },
    { name: "Box squat", video: "https://youtube.com/shorts/jq9YxrTGvhg?si=KsxvdVsaVHqHMOB8", description: "Contrôle de profondeur" }]

  },
  // ISCHIO-JAMBIERS
  {
    category: "Ischio-jambiers",
    list: [
    { name: "Leg curl allongé", video: "https://youtube.com/shorts/Huq6i8E5bYk?si=dddrmqNOGgY1HJXm", description: "Isolation ischios" },
    { name: "Soulevé de terre", video: "https://youtube.com/shorts/RSgaj2NKjfk?si=jEsRtivVcyucyJmT", description: "Chaîne postérieure complète" },
    { name: "Romanian deadlift", video: "https://youtube.com/shorts/I2JaOEgV_MU?si=m-eWSQXvKDfx4jUW", description: "Étirement ischios" },
    { name: "Leg curl assis", video: "https://youtube.com/shorts/nIj321YZWbo?si=Tu79mKMaCIROYo2G", description: "Variation machine" },
    { name: "Good morning", video: "https://youtube.com/shorts/7cpldMZjLOs?si=ddg7nO6PaNHy7OKg", description: "Ischios et lombaires" },
    { name: "Nordic curl", video: "https://youtube.com/shorts/o40Zd3WRbxg?si=MnaAESm9nBPK2rp9", description: "Excentrique intense" },
    { name: "Glute ham raise", video: "https://youtube.com/shorts/nhTxryN_Loc?si=zqZj4uL2ZIar4DZk", description: "Ischios complet" },
    { name: "Stiff leg deadlift", video: "https://youtube.com/shorts/bxKs8xNPL50?si=UxA1ZYYfUD-HJnHi", description: "Jambes tendues" },
    { name: "Kettlebell swing", video: "https://youtube.com/shorts/n1df4ASFeZU?si=eRmxbDGhz8ODHEWA", description: "Explosif chaîne post" },
    { name: "Leg curl debout", video: "https://youtube.com/shorts/Cpfvx9UjrUg?si=Hg7CU0Mp5_tBDgsF", description: "Unilatéral" },
    { name: "Hyperextension", video: "https://youtube.com/shorts/2oXW1ls3h2w?si=Dz3aHDZkLPfPGTpW", description: "Lombaires et ischios" },
    { name: "Single leg RDL", video: "https://youtube.com/shorts/Oh29VJpgW54?si=xTR14miVxMT7j-yG", description: "Équilibre unilatéral" },
    { name: "Banded leg curl", video: "https://youtube.com/shorts/on-kFp0tH5w?si=AOH3O7mIoRZi5t2i", description: "Élastique" },
    { name: "Sliding leg curl", video: "https://youtu.be/e17hjjvQLQQ?si=_OhJzPpDtuijvXBR", description: "Au sol dynamique" },
    { name: "Cable pull-through", video: "https://youtube.com/shorts/yjhaGcU5Bfc?si=ofie90dVYU7t-P_M", description: "Poulie basse" }]

  },
  // MOLLETS
  {
    category: "Mollets",
    list: [
    { name: "Mollets debout", video: "https://youtube.com/shorts/8xXiPvWZE9o?si=jPj6DpkuyYhDKC3k", description: "Gastrocnémiens" },
    { name: "Mollets assis", video: "https://youtube.com/shorts/bg4XHXsFN-k?si=laku2bpETQljlMJT", description: "Soléaires" },
    { name: "Mollets presse", video: "https://youtube.com/shorts/S_GIFVf1_To?si=So9LTeIdc4LrUcpE", description: "Sur machine presse" },
    { name: "Mollets une jambe", video: "https://youtube.com/shorts/HbA-x4Ch8qw?si=G5ZK7DbwqDssKJhf", description: "Unilatéral" },
    { name: "Mollets Smith", video: "https://youtube.com/shorts/Hj3IPcpNXBY?si=YFVq96vwFKbJfQBJ", description: "Guidé sécurisé" },
    { name: "Sauts mollets", video: "https://youtube.com/shorts/edaNZ7NNktk?si=Mx4urwc7HNmm2IYt", description: "Pliométrique" },
    { name: "Mollets escaliers", video: "https://youtube.com/shorts/fCOI8Ugh7pM?si=27WWdJ-1xPmXCRcp", description: "Fonctionnel" },
    { name: "Donkey calf raise", video: "https://youtube.com/shorts/RJrgF9EKdVM?si=CZup41CqAkCNPPFj", description: "Étirement maximal" },
    { name: "Mollets hack squat", video: "https://youtube.com/shorts/2Ybm_zYsexo?si=4ojWXEKftnZ2DgwW", description: "Machine hack" },
    { name: "Tibialis raise", video: "https://youtube.com/shorts/ulUWpGWB9Lw?si=88XzILX5446QGfDr", description: "Avant tibias" }]

  },
  // FESSIERS
  {
    category: "Fessiers",
    list: [
    { name: "Hip thrust", video: "https://youtube.com/shorts/lgcXdYCbRTY?si=pINzIZSchwqlNvGl", description: "Roi des fessiers" },
    { name: "Squat sumo", video: "https://youtube.com/shorts/zfhYKwgnQIc?si=bZZBt5b9tXNFnp5v", description: "Activation fessiers" },
    { name: "Fentes bulgares", video: "https://youtube.com/shorts/i8vv9slUTBg?si=PtNn-sda4BILh2-j", description: "Unilatéral intense" },
    { name: "Kickback poulie", video: "https://youtube.com/shorts/bOY7GJLVR_E?si=0v9F_2ZrOnBUN4ZX", description: "Isolation fessiers" },
    { name: "Abduction machine", video: "https://youtube.com/shorts/_P1Vf8R10rM?si=CjU-qlx4eQVX1X0d", description: "Moyen fessier" },
    { name: "Pont fessier", video: "https://youtube.com/shorts/9ixU8JbN4Wg?si=5CEvYfe6C-yr4ura", description: "Poids du corps" },
    { name: "Romanian deadlift", video: "https://youtube.com/shorts/dHGhSaMy-js?si=NR-BOaXMv7ZtJeiH", description: "Grand fessier" },
    { name: "Step-up", video: "https://youtube.com/shorts/0-BNcqHZ_2w?si=sF4dMJz9kR_m7M83", description: "Fonctionnel" },
    { name: "Clam shell", video: "https://youtube.com/shorts/XoxHNiqtVPM?si=B2RkkNSEQCzbwCpx", description: "Activation" },
    { name: "Fire hydrant", video: "https://youtube.com/shorts/Y0G0DqWsSuM?si=omk3xb8_iH-kgHae", description: "Stabilisation" },
    { name: "Frog pump", video: "https://youtube.com/shorts/i3no5u7N_4A?si=zO1QprCiFNlxWvXk", description: "Activation intense" },
    { name: "Cable kickback", video: "https://youtube.com/shorts/SCPzldzbsRE?si=NCfD4pxdChBBv2yp", description: "Poulie basse" },
    { name: "Sumo deadlift", video: "https://youtube.com/shorts/qMBLBL4PUXw?si=sjh3nNF-TYCBrd9O", description: "Écartement large" },
    { name: "B-stance hip thrust", video: "https://youtube.com/shorts/b3SOY5ljRsM?si=34k7Y23AFcYu6wUs", description: "Unilatéral assisté" },
    { name: "Curtsy lunge", video: "https://youtube.com/shorts/9mBfXqIMqjw?si=bivSuyZQv2uaqnaX", description: "Variation fentes" }]

  },
  // ABDOMINAUX
  {
    category: "Abdominaux",
    list: [
    { name: "Crunch", video: "https://youtube.com/shorts/xGbcIHSvSlo?si=Fv-imFHsAFCTRS_9", description: "Base abdominaux" },
    { name: "Planche", video: "https://youtu.be/3yVcnovU80s?si=C3JnCjLAlsm-GDY3", description: "Gainage statique" },
    { name: "Relevé de jambes", video: "https://www.youtube.com/watch?v=JB2oyawG9KI", description: "Bas des abdos" },
    { name: "Russian twist", video: "https://youtube.com/shorts/PFSU873ljaY?si=fyi922jBFnHo544y", description: "Obliques rotation" },
    { name: "Mountain climbers", video: "https://youtube.com/shorts/5hmOtXAofpk?si=tSQf_RQmsf0MygoJ", description: "Dynamique cardio" },
    { name: "Bicycle crunch", video: "https://www.youtube.com/watch?v=1we3bh9uhqY", description: "Obliques croisés" },
    { name: "Ab wheel", video: "https://youtube.com/shorts/-IFA68YCki0?si=ixb6ensImf4QmmMZ", description: "Roulette abdos" },
    { name: "Hollow hold", video: "https://youtube.com/shorts/pN_YFk4Lx8Q?si=53PaboPWA6nfwRHe", description: "Gainage avancé" },
    { name: "Dragon flag", video: "https://youtube.com/shorts/LB0XM5Cc8Tw?si=MuQk1FSZOrUAZYlW", description: "Expert niveau" },
    { name: "Cable crunch", video: "https://youtube.com/shorts/6lFnJteoQvQ?si=P5dPEriim5C21VTK", description: "Poulie haute" },
    { name: "Sit-up", video: "https://youtube.com/shorts/moczjLoNxZU?si=ck83WlsGTkTn6hEg", description: "Complet abdos" },
    { name: "V-up", video: "https://youtube.com/shorts/uQFgVjFrI8k?si=Vt5pZZAN6CzliTVF", description: "Haut et bas" },
    { name: "Pallof press", video: "https://youtube.com/shorts/6qVEQVfLuQM?si=1hzFgI7axrcUqpCL", description: "Anti-rotation" },
    { name: "Dead bug", video: "https://youtube.com/shorts/HrxOWhPdsOY?si=08aEni0AI-g-5tSa", description: "Coordination" },
    { name: "Toes to bar", video: "https://youtube.com/shorts/B-B4I_LEQ58?si=7on2Erjn7C6BTKql", description: "Barre fixe" }]

  },
  // AVANT-BRAS
  {
    category: "Avant-bras",
    list: [
    { name: "Curl poignets", video: "https://youtube.com/shorts/Lwl7vcMwk9I?si=k1Rp2t9v6O9X031d", description: "Fléchisseurs" },
    { name: "Curl inversé", video: "https://youtube.com/shorts/omcvaqvazyk?si=afSl8icVEXM8D0_U", description: "Extenseurs" },
    { name: "Farmer walk", video: "https://www.youtube.com/watch?v=rt17lmnaLSM", description: "Force de préhension" },
    { name: "Wrist roller", video: "https://youtube.com/shorts/FIm60VJoLgE?si=GaL30rGdxMBUC-ft", description: "Enrouleur poignet" },
    { name: "Gripper", video: "https://youtube.com/shorts/4c3TTlGTTOk?si=3c5S7DDEowapsEwe", description: "Pince main" },
    { name: "Reverse curl", video: "https://youtube.com/shorts/2UFQEyY8Uwk?si=DINEBF1rAPm2QMzF", description: "Brachioradial" },
    { name: "Hammer curl", video: "https://youtube.com/shorts/QkpUnI4O4t8?si=LgAQ3aY4icMxN5yR", description: "Préhension neutre" },
    { name: "Plate pinch", video: "https://youtube.com/shorts/gpY-bitZgks?si=mjcTESwYtxexQ9mz", description: "Force doigts" },
    { name: "Towel pull-up", video: "https://youtube.com/shorts/iBXMy5X9XDQ?si=AJKQwopXAjqbHAE0", description: "Préhension serviette" },
    { name: "Finger curls", video: "https://youtube.com/shorts/m5n8QOtswXc?si=Qm-Kn1mByvSQyiEG", description: "Doigts isolés" }]

  },
  // POIDS DU CORPS
  {
    category: "Poids du corps",
    list: [
    { name: "Pompes", video: "https://www.youtube.com/watch?v=IODxDxX7oi4", description: "Pectoraux triceps" },
    { name: "Tractions", video: "https://www.youtube.com/watch?v=eGo4IYlbE5g", description: "Dos biceps" },
    { name: "Dips", video: "https://www.youtube.com/watch?v=2z8JmcrW-As", description: "Triceps pectoraux" },
    { name: "Squats", video: "https://www.youtube.com/watch?v=ultWZbUMPL8", description: "Jambes complet" },
    { name: "Fentes", video: "https://youtube.com/shorts/k0ME_AUh8ac?si=j01fX-vvB10UwIsE", description: "Jambes unilatéral" },
    { name: "Planche", video: "https://youtube.com/shorts/6OFaz1JK2BE?si=oyDQmZyITsC47l9R", description: "Gainage core" },
    { name: "Burpees", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU", description: "Full body cardio" },
    { name: "Mountain climbers", video: "https://www.youtube.com/watch?v=nmwgirgXLYM", description: "Cardio abdos" },
    { name: "Jump squats", video: "https://youtube.com/shorts/bhi4yXKuVek?si=l-wDp69L8z8U3ZEz", description: "Pliométrique" },
    { name: "Pike push-up", video: "https://youtube.com/shorts/wwlwaSAr3_w?si=7GD5G9LtvQqKz-Ic", description: "Épaules" },
    { name: "Pistol squat", video: "https://youtube.com/shorts/D5Iib9ZEkk8?si=38XN34XkNbP66x0_", description: "Une jambe" },
    { name: "L-sit", video: "https://youtube.com/shorts/a4qGW79QtrE?si=g8ogkxu2dQxsRcCr", description: "Core avancé" },
    { name: "Handstand push-up", video: "https://youtube.com/shorts/EdIcbOeGrFA?si=Y6ERAHSX9I6u2PVC", description: "Épaules expert" },
    { name: "Muscle-up", video: "https://youtube.com/shorts/mvt_2HAksjU?si=iFkIm8fe97UCYH81", description: "Expert complet" },
    { name: "Front lever", video: "https://youtube.com/shorts/Iuau9zhTM-Q?si=b8NCqSrbKtLAUwTf", description: "Statique avancé" }]

  },
  // ÉLASTIQUES
  {
    category: "Élastiques",
    list: [
    { name: "Chest press élastique", video: "https://youtu.be/p6oLDontwlc?si=MzijhyRGo_Q4NruE", description: "Pectoraux" },
    { name: "Rowing élastique", video: "https://youtube.com/shorts/Je-oJZ7WhKw?si=P9qJgTzkxv05rxIH", description: "Dos" },
    { name: "Squat élastique", video: "https://youtu.be/cqoYtVuOCng?si=h_Yu0NcTJz3d77Sj", description: "Jambes" },
    { name: "Biceps curl élastique", video: "https://youtube.com/shorts/20xtfGZ37nw?si=-DlhtIMOCNZrr7jc", description: "Biceps" },
    { name: "Triceps extension élastique", video: "https://youtube.com/shorts/iqL8HYeH-Rc?si=B8y2g66r-DiYoHrk", description: "Triceps" },
    { name: "Lateral raise élastique", video: "https://youtube.com/shorts/Asjx-pGUQRc?si=q1g7QFJYyNUQy9in", description: "Épaules" },
    { name: "Face pull élastique", video: "https://youtube.com/shorts/1s-0WtJMsu8?si=DRukv3T-JTeHinkU", description: "Arrière épaules" },
    { name: "Leg curl élastique", video: "https://youtube.com/shorts/D0PXGUfC83A?si=q0MoUWv-7pJrEovD", description: "Ischios" },
    { name: "Glute kickback élastique", video: "https://youtube.com/shorts/nVHAdtkvaPo?si=0FKR--cOwqa0aDqI", description: "Fessiers" },
    { name: "Pallof press élastique", video: "https://youtube.com/shorts/XJkm_PU_ztQ?si=aikTJwGizZNEJyMQ", description: "Core rotation" },
    { name: "Banded pull-apart", video: "https://youtube.com/shorts/Jcn93rBhUps?si=Yio8ZLBBPTEkahRW", description: "Dos postérieur" },
    { name: "Monster walk", video: "https://youtu.be/JLe-xAP3ALM?si=j8pb6DPsBoHZId4k", description: "Abducteurs" },
    { name: "Overhead press élastique", video: "https://youtu.be/SsuurG0Y6cE?si=1sXwfc99Qwf0TRmB", description: "Épaules" },
    { name: "Wood chop élastique", video: "https://youtube.com/shorts/tL8-ScataUo?si=0xJgNFmpzGa4s2un", description: "Obliques" },
    { name: "Banded deadlift", video: "https://youtube.com/shorts/zTSKROuBMNY?si=dxWzP84RuTkO6xxE", description: "Chaîne postérieure" }]

  },
  // SOUPLESSE / MOBILITÉ
  {
    category: "Souplesse / Mobilité",
    list: [
    { name: "Étirement ischio", video: "https://youtube.com/shorts/BBxzvFZaOaE?si=1wfKEFnz2Lh_hGh1", description: "Flexibilité arrière cuisse" },
    { name: "Étirement quadriceps", video: "https://youtube.com/shorts/RTGvyZiGA98?si=mx2jmmUPh7H53Pkl", description: "Avant cuisse" },
    { name: "Étirement psoas", video: "https://youtube.com/shorts/wq6lNl-aWWY?si=TbDXTWrGPh8whk-V", description: "Fléchisseur hanche" },
    { name: "Cat-cow", video: "https://youtu.be/P4R7qvSoOQU?si=Ni4pwmRqHQ-mDJfG", description: "Mobilité colonne" },
    { name: "Pigeon pose", video: "https://youtube.com/shorts/2HpHvNjY3lE?si=O8aKjzoc0HRJDVpm", description: "Hanche externe" },
    { name: "Cobra stretch", video: "https://youtube.com/shorts/vJwnOpkQzYk?si=n8FuY2yApCq_LOIE", description: "Extension thoracique" },
    { name: "Child pose", video: "https://youtube.com/shorts/AgwjXQJqfYo?si=xuhRgUjNwDkQ2oO9", description: "Repos actif" },
    { name: "Shoulder dislocations", video: "https://youtube.com/shorts/gXE-gVzYD9w?si=hkth98OHNycJm4yJ", description: "Mobilité épaules" },
    { name: "Hip circles", video: "https://youtube.com/shorts/fhosmniT48I?si=RsLrJpZGvy-RSPu0", description: "Rotation hanches" },
    { name: "Thoracic rotation", video: "https://youtube.com/shorts/GIYp0KzS0io?si=lGbL_TTcGV3QWWsg", description: "Rotation thoracique" },
    { name: "Ankle mobility", video: "https://youtube.com/shorts/k0xU-Ux7C-o?si=ByVal2WL_ISRrkN1", description: "Chevilles" },
    { name: "Wrist circles", video: "https://youtube.com/shorts/NXFcfXIvKI8?si=s1fMnPgIKsysst_r", description: "Poignets" },
    { name: "Neck rolls", video: "https://youtube.com/shorts/6iLO70aJjuI?si=wcRC36ju0-PLmMsz", description: "Nuque" },
    { name: "Spinal twist", video: "https://youtube.com/shorts/-N1cLW3HJD8?si=zwuP5MJMUHZV37rA", description: "Torsion colonne" },
    { name: "Butterfly stretch", video: "https://youtube.com/shorts/tB_RQG2p8Qo?si=bwciCxt2laY5pzuf", description: "Adducteurs" }]

  },
  // ÉCHAUFFEMENT
  {
    category: "Échauffement",
    list: [
    { name: "Jumping jacks", video: "https://youtube.com/shorts/yg3KQQn3QWg?si=Fc3TER9rH1bGeYqx", description: "Cardio léger" },
    { name: "Arm circles", video: "https://youtube.com/shorts/tOZUwmJNwx0?si=G-tCa3Nk5Tuko6Dw", description: "Épaules" },
    { name: "Leg swings", video: "https://youtube.com/shorts/TAHk1yccDmM?si=o588RQJJIsgmEA1k", description: "Hanches dynamiques" },
    { name: "High knees", video: "https://youtube.com/shorts/mTIvJgQK7Ec?si=ln_y2UdNDtUtVenA", description: "Cardio jambes" },
    { name: "Butt kicks", video: "https://youtu.be/lVZi-AwxLPo?si=aCLduhyOO4wEov5t", description: "Activation ischios" },
    { name: "Inchworm", video: "https://youtube.com/shorts/-q1XGQ2VMUU?si=TndRHpLwl8COPcRA", description: "Chaîne postérieure" },
    { name: "World's greatest stretch", video: "https://youtube.com/shorts/OCXMbIzYJTQ?si=q4NxYSUsxrufVzAQ", description: "Mobilité complète" },
    { name: "Bear crawl", video: "https://youtube.com/shorts/iuR17xUXLeA?si=EvO4El8SKen8nBkD", description: "Activation core" },
    { name: "Crab walk", video: "https://youtube.com/shorts/4tzq8I7xE_w?si=RfiVVLM6tvpTphUQ", description: "Postérieur corps" },
    { name: "Lunge with twist", video: "https://youtube.com/shorts/Fhl__AcQ9BI?si=L8BRxH04-MhCEhNK", description: "Rotation hanches" },
    { name: "Squat to stand", video: "https://youtube.com/shorts/K9VHNerwQJw?si=R6HJ89FGLDUaRmgK", description: "Mobilité complète" },
    { name: "Walkout push-up", video: "https://youtube.com/shorts/9Y3SZ7_GWBE?si=CZAxvOYMC0otM-Uq", description: "Full body" },
    { name: "Lateral lunge", video: "https://youtube.com/shorts/8ANwlFziwtk?si=Hr71vCGgcw4kz4Ou", description: "Adducteurs" },
    { name: "Toy soldiers", video: "https://youtu.be/6NVowqZQiYQ?si=45YBDv6YchV8482a", description: "Ischios dynamiques" },
    { name: "Spiderman stretch", video: "https://youtube.com/shorts/zZtGw0CuIvY?si=b0isyYeQFWsJa6Zv", description: "Hanches mobilité" }]

  },
  // EXERCICES PROGRAMMES
  {
    category: "Exercices Programmes",
    list: [
    { name: "Tirage vertical assisté", video: "https://youtube.com/shorts/pTRUVMsYMy8?si=wyvtrYC1ytjFYzXD", description: "Dos avec assistance" },
    { name: "Développé haltères assis", video: "https://youtu.be/Ap7texwO3Nk?si=nnjF1EOOyRwtCqKW", description: "Épaules assis" },
    { name: "Marche rapide", video: "https://youtube.com/shorts/BTr-wQqb5Yk?si=yXEmAzgq8D-0Kz-T", description: "Cardio léger" },
    { name: "Pompes murales", video: "https://youtube.com/shorts/9O5upq-dK5k?si=FBwGFe4mfAUGiG_T", description: "Pectoraux débutants" },
    { name: "Leg press", video: "https://youtube.com/shorts/EotSw18oR9w?si=8aEkBZVDO12mrDmc", description: "Machine cuisses" },
    { name: "Tirage horizontal machine", video: "https://youtube.com/shorts/fePgoFVjjmA?si=D5EhX0pEUm9W7D2m", description: "Dos machine" },
    { name: "Développé machine", video: "https://youtube.com/shorts/EgmgnkVPW9s?si=C4zWfoumcSi3zax-", description: "Pectoraux machine" },
    { name: "Écarté poulie vis-à-vis", video: "https://youtube.com/shorts/DfaA3Ga2ou0?si=cgqU9IUnQXDPtJCT", description: "Pectoraux poulie" },
    { name: "Squat sautés", video: "https://youtube.com/shorts/ITIRheLx9aI?si=ewfkTP6eDzT93VQh", description: "Jambes explosif" },
    { name: "Pompes explosives", video: "https://youtube.com/shorts/_6vHKlzklH8?si=duWVgzFHJwO5I-ca", description: "Pectoraux pliométrique" },
    { name: "Fentes sautées", video: "https://youtube.com/shorts/j33gGuxEmLM?si=zkBmcS7yesEU_izO", description: "Jambes dynamiques" },
    { name: "Planche dynamique", video: "https://youtu.be/e9_Z81o0R9U?si=ByFH9gd3DPXyertV", description: "Gainage actif" },
    { name: "Écarté poulie", video: "https://youtube.com/shorts/MUUpkioORH0?si=crHJNHp7_GfMtgd3", description: "Pectoraux isolation" },
    { name: "Pompes lestées", video: "https://youtu.be/mA7TJ4qk8ZE?si=s8NAyOoJQF5Pk9nz", description: "Pectoraux avec charge" },
    { name: "Étirement épaules", video: "https://youtube.com/shorts/CjieGKws56E?si=VsjjcsEXgWTbztR0", description: "Mobilité épaules" },
    { name: "Torsion colonne", video: "https://youtu.be/AmjT0xu-HmA?si=FptMgvTa6i6ARAwx", description: "Rotation dos" },
    { name: "Chat-chameau", video: "https://youtu.be/ohZk80Zioqs?si=hRPTgFSgrzZd8JgV", description: "Mobilité colonne" },
    { name: "Relaxation finale", video: "https://youtu.be/B15vYeiJXWs?si=o7zDq1g38WLJDTrF", description: "Retour au calme" },
    { name: "Squat avec élastique", video: "https://youtu.be/cqoYtVuOCng?si=FOrqBkMatvjqpuBq", description: "Jambes élastique" },
    { name: "Développé élastique", video: "https://youtube.com/shorts/zuTVEWtkSeU?si=MokgbiZNo-5keof_", description: "Pectoraux élastique" },
    { name: "Marche latérale élastique", video: "https://youtube.com/shorts/JJvl9CdkxxU?si=9XPG4ABcHXHQ4SRn", description: "Fessiers élastique" },
    { name: "Planche latérale", video: "https://youtube.com/shorts/w4O2b9AXjzk?si=LjstAaOwUNjDcU1N", description: "Obliques statique" },
    { name: "Pompes genoux", video: "https://youtu.be/D-WibiqgKdg?si=smFXR_NSmHaX2RLz", description: "Pectoraux facilité" },
    { name: "Hip thrust lesté", video: "https://youtube.com/shorts/lgcXdYCbRTY?si=Sw2AsgiqEORdRbSE", description: "Fessiers avec charge" },
    { name: "Presse cuisses", video: "https://youtube.com/shorts/YaSledfTYSQ?si=1gQuLPRaJCgwU9d1", description: "Machine jambes" },
    { name: "Développé haltères", video: "https://youtube.com/shorts/W_-cHeB1ccc?si=j1RmgET8JvzR4TBJ", description: "Épaules haltères" },
    { name: "Squat assisté", video: "https://youtube.com/shorts/UOhEq8-6iNk?si=7RJ9PpaFDtI-2nwJ", description: "Jambes avec support" },
    { name: "Élévations bras légers", video: "https://youtube.com/shorts/RlA6MT7LIMQ?si=IKU3XtuJ2OjAnV_Z", description: "Épaules léger" },
    { name: "Tirage élastique assis", video: "https://youtu.be/iNYCzQQfMzU?si=h7CsNMsBszF8zjnY", description: "Dos élastique" },
    { name: "Équilibre une jambe", video: "https://youtube.com/shorts/HQYdAncYoAA?si=PyH53J59CQKMiUpD", description: "Stabilité" },
    { name: "Étirements complets", video: "https://youtu.be/nMgxn1JkUkU?si=CEnQ8e-mzDOuSyJ8", description: "Souplesse globale" },
    { name: "Clean and jerk", video: "https://youtube.com/shorts/J2YH8S6-Pss?si=rwrp9dfNjF7tJqfs", description: "Haltérophilie" },
    { name: "Box jump", video: "https://youtube.com/shorts/yBs6-xMnDb4?si=YfsuUfu9MfvhnkWI", description: "Pliométrique jambes" },
    { name: "Muscle-up", video: "https://youtube.com/shorts/a_9zDE8qg0o?si=s-8HGkqRDo8Chi4v", description: "Traction + dips" },
    { name: "Wall ball", video: "https://youtube.com/shorts/WGM7FjbDJUA?si=pBsV411DPbRPf7yy", description: "Médecine ball" },
    { name: "WOD final", video: "https://youtube.com/shorts/oOSLjJYYecM?si=0YRxnqF9KvkQbgqC", description: "Circuit CrossFit" }]

  }];


  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30 max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            <Lock className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Accès Restreint</h2>
            <p className="text-gray-400 text-center">Les Exercices sont réservés aux Membres "PREMIUM" Exercices à faire à la maison/en extérieur ou en salle.</p>
          </div>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500" />

              {error &&
              <p className="mt-2 text-sm text-red-400">{error}</p>
              }
            </div>
            
              <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">

              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Key className="w-5 h-5" />
              )}
              {isLoading ? 'Vérification...' : 'Déverrouiller'}
            </button>
          </form>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-green-500 to-white bg-clip-text text-transparent">
            Bibliothèque d'Exercices
          </h1>
          <p className="text-xl text-gray-300">Plus de 350 exercices avec démonstrations vidéo Courte  avec correction posture,et le mouvements des exercices.

          </p>
        </div>

        <div className="space-y-8">
          {exercises.map((category, idx) =>
          <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                <Dumbbell className="w-8 h-8 text-red-500" />
                {category.category}
                <span className="text-lg text-gray-400">({category.list.length} exercices)</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.list.map((exercise, exerciseIdx) =>
              <div
                key={exerciseIdx}
                className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-red-500 transition-all group">

                    <h3 className="font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {exercise.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{exercise.description}</p>
                    <div className="bg-gradient-to-r from-red-600/20 to-green-600/20 rounded-lg p-2 mb-3 border border-red-500/30">
                      <p className="text-xs font-bold text-center text-white">
                        💪 Respire – Contrôle – Contracte – Expire 💪
                      </p>
                    </div>
                    
                    {category.category === "Challenges Exclusifs (Premium Annuel)" && (currentSubscription && currentSubscription.planId !== 'premium_app_yearly') ? (
                      <button
                        onClick={() => toast.error("Accès réservé aux membres Premium Annuel", { icon: '🔒' })}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-400 transition-colors text-sm font-medium cursor-pointer w-full justify-start">
                        <Lock className="w-4 h-4" />
                        Verrouillé (Premium Annuel)
                      </button>
                    ) : (
                    <a
                  href={exercise.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-sm font-medium">

                      <Play className="w-4 h-4" />
                      Voir démo (5-10s voix off)
                    </a>
                    )}
                  </div>
              )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 text-center">
          <h3 className="font-bold text-white mb-4 text-xl">Toutes les vidéos ne sont pas de moi pour l'instant tout dépendras de l'évolution de l'application  

          </h3>
          <p className="text-gray-300 mb-4">Chaque exercice est accompagné d'une vidéo courte  montrant uniquement l'exécution du mouvement.

          </p>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <Play className="w-6 h-6" />
            <span className="font-semibold text-center">l'application contient +350 vidéos </span>
          </div>
        </div>
      </div>
    </div>);

}