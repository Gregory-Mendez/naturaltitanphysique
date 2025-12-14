import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useSubscriptions } from '../hooks/useSubscriptions';
import {Calendar, Clock, Target, Users, ChevronDown, ChevronUp, Lock, Play} from 'lucide-react';

interface Program {
  id: number;
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
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

const Programs: React.FC = () => {
  const { user } = useAuth();
  const { currentSubscription, fetchUserSubscription } = useSubscriptions();
  const [selectedLevel, setSelectedLevel] = useState('Tous');
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.userId) {
      fetchUserSubscription(user.userId);
    }
  }, [user]);

  useEffect(() => {
    const masterUnlock = localStorage.getItem('titan_master_unlocked');
    if ((currentSubscription || masterUnlock === 'true') && !isUnlocked) {
      setIsUnlocked(true);
      if (currentSubscription) {
        toast.success("Abonnement Premium détecté : Programmes déverrouillés !", {
          icon: '🔓',
          duration: 4000
        });
      }
    }
  }, [currentSubscription, isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'TitanGryx2024') {
      setIsUnlocked(true);
      localStorage.setItem('titan_master_unlocked', 'true');
      setShowLockModal(false);
      setError('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const toggleProgram = (programId: number) => {
    // ID 1 is the Demo Program (Free)
    if (programId === 1 || isUnlocked) {
      setExpandedProgram(expandedProgram === programId ? null : programId);
    } else {
      setShowLockModal(true);
    }
  };

  const programs: Program[] = [
  {
    id: 1,
    name: "Programme Débutant - Initiation Musculation",
    level: "Débutant",
    duration: "4 semaines",
    frequency: "3x/semaine",
    goal: "Initiation et base",
    description: "Programme complet pour débuter la musculation en sécurité avec TitanGryx",
    warmup: [
    "5 min de marche rapide ou vélo",
    "Rotations articulaires complètes",
    "10 Jumping jacks",
    "10 Squats au poids du corps"],

    exercises: [
    { name: "Squat au poids du corps", sets: "3", reps: "12-15", rest: "60s", notes: "Technique parfaite", video: "https://www.youtube.com/watch?v=ultWZbUMPL8" },
    { name: "Pompes (genoux si besoin)", sets: "3", reps: "8-12", rest: "60s", video: "https://youtu.be/D-WibiqgKdg?si=smFXR_NSmHaX2RLz" },
    { name: "Tirage vertical assisté", sets: "3", reps: "10-12", rest: "60s", video: "https://youtube.com/shorts/pTRUVMsYMy8?si=wyvtrYC1ytjFYzXD" },
    { name: "Développé haltères assis", sets: "3", reps: "10-12", rest: "60s", video: "https://youtu.be/Ap7texwO3Nk?si=nnjF1EOOyRwtCqKW" },
    { name: "Planche", sets: "3", reps: "20-30s", rest: "45s", video: "https://youtube.com/shorts/6OFaz1JK2BE?si=oyDQmZyITsC47l9R" },
    { name: "Marche sur place", sets: "1", reps: "2 min", rest: "-", notes: "Retour au calme", video: "https://youtube.com/shorts/BTr-wQqb5Yk?si=yXEmAzgq8D-0Kz-T" }]

  },
  // ... keep existing code (all other programs data)
  {
    id: 2,
    name: "Programme Débutant - Perte de Poids",
    level: "Débutant",
    duration: "6 semaines",
    frequency: "4x/semaine",
    goal: "Perte de graisse",
    description: "Programme cardio-musculation pour débutants souhaitant perdre du poids",
    warmup: [
    "7 min cardio léger",
    "Étirements dynamiques",
    "Mobilisation articulaire",
    "Activation musculaire"],

    exercises: [
    { name: "Marche rapide", sets: "1", reps: "10 min", rest: "-", video: "https://youtube.com/shorts/BTr-wQqb5Yk?si=yXEmAzgq8D-0Kz-T" },
    { name: "Fentes dynamiques", sets: "3", reps: "12-15/jambe", rest: "45s", video: "https://youtube.com/shorts/k0ME_AUh8ac?si=j01fX-vvB10UwIsE" },
    { name: "Pompes murales", sets: "3", reps: "10-15", rest: "45s", video: "https://youtube.com/shorts/9O5upq-dK5k?si=FBwGFe4mfAUGiG_T" },
    { name: "Fentes alternées", sets: "3", reps: "12-16", rest: "45s", video: "https://youtube.com/shorts/k0ME_AUh8ac?si=j01fX-vvB10UwIsE" },
    { name: "Planche", sets: "3", reps: "20-30s", rest: "30s", video: "https://youtube.com/shorts/6OFaz1JK2BE?si=oyDQmZyITsC47l9R" },
    { name: "Mountain climbers", sets: "3", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/5hmOtXAofpk?si=tSQf_RQmsf0MygoJ" },
    { name: "Cardio final", sets: "1", reps: "5 min", rest: "-", video: "https://youtube.com/shorts/wyR_mrWg92M?si=_egmLAHWEYn9nBY0" }]

  },
  {
    id: 3,
    name: "Programme Débutant - Renforcement Général",
    level: "Débutant",
    duration: "5 semaines",
    frequency: "3x/semaine",
    goal: "Remise en forme",
    description: "Renforcement musculaire complet pour retrouver la forme",
    warmup: [
    "5 min vélo ou rameur",
    "Rotations articulaires",
    "Étirements actifs",
    "Activation progressive"],

    exercises: [
    { name: "Leg press", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/EotSw18oR9w?si=8aEkBZVDO12mrDmc" },
    { name: "Tirage horizontal machine", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/fePgoFVjjmA?si=D5EhX0pEUm9W7D2m" },
    { name: "Développé machine", sets: "3", reps: "10-12", rest: "60s", video: "https://youtube.com/shorts/EgmgnkVPW9s?si=C4zWfoumcSi3zax-" },
    { name: "Curl biceps haltères", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/bxyocI5XBoA?si=BHlj8-K_jHndHhrn" },
    { name: "Extension triceps poulie", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/jbC8Vb6bqIc?si=kbMGlWWmVe2zQvgT" },
    { name: "Crunch", sets: "3", reps: "15-20", rest: "30s", video: "https://youtube.com/shorts/xGbcIHSvSlo?si=Fv-imFHsAFCTRS_9" }]

  },
  {
    id: 4,
    name: "Programme Intermédiaire - Push/Pull/Legs (Jour 1: PUSH)",
    level: "Intermédiaire",
    duration: "6 semaines",
    frequency: "6x/semaine (2 cycles complets)",
    goal: "Développement musculaire",
    description: "Jour 1 PUSH : Pectoraux, Épaules, Triceps - Programme de spécialisation par TitanGryx",
    warmup: [
    "5-7 min cardio léger",
    "Échauffement épaules et pectoraux",
    "Rotations articulaires",
    "Séries d'activation musculaire"],

    exercises: [
    { name: "Développé couché", sets: "4", reps: "8-10", rest: "90s", notes: "Exercice de base", video: "https://youtube.com/shorts/5_O-pKzu5CQ?si=HUxiG4uB82GwV635" },
    { name: "Développé incliné haltères", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/ucRI2xM-pRA?si=dn-TkQ2__4b1p8Pr" },
    { name: "Écarté poulie vis-à-vis", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/rpx2Tf6OJoY?si=sDmUBgPplZ6tgosz" },
    { name: "Développé militaire", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc" },
    { name: "Élévations latérales", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/PPlovaP0q94?si=wvosKbRFTyVx7sNy" },
    { name: "Dips", sets: "3", reps: "10-15", rest: "75s", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd" },
    { name: "Extension poulie haute", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/jbC8Vb6bqIc?si=kbMGlWWmVe2zQvgT" }]

  },
  {
    id: 21,
    name: "Programme Intermédiaire - Push/Pull/Legs (Jour 2: PULL)",
    level: "Intermédiaire",
    duration: "6 semaines",
    frequency: "6x/semaine (2 cycles complets)",
    goal: "Développement musculaire",
    description: "Jour 2 PULL : Dos, Biceps, Trapèzes - Programme de spécialisation par TitanGryx",
    warmup: [
    "5-7 min cardio léger",
    "Échauffement dos et bras",
    "Mobilité scapulaire",
    "Activation grand dorsal"],

    exercises: [
    { name: "Tractions", sets: "4", reps: "8-12", rest: "90s", notes: "Assistées si nécessaire", video: "https://youtube.com/shorts/VqDByjY4V0o?si=6dH4j1SLQmbJjXbK" },
    { name: "Rowing barre", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS" },
    { name: "Tirage vertical", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/Kf3YOH6mgjw?si=t2qktIqk1IO8fjv5" },
    { name: "Rowing haltère", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/vu_YDt9nGv4?si=ZzJ_GNZ42sbOCSls" },
    { name: "Face pull", sets: "3", reps: "15-20", rest: "60s", video: "https://youtube.com/shorts/vU30xyp6IYM?si=UYtqmmhPu8Ln-CS2" },
    { name: "Curl barre", sets: "3", reps: "10-12", rest: "60s", video: "https://youtube.com/shorts/REopAb_EtZA?si=wqJ99JpILJeMopvZ" },
    { name: "Curl marteau", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/cozAA9HUPhE?si=w7Ucg8s1dJ0VkJWQ" },
    { name: "Shrugs haltères", sets: "3", reps: "15-20", rest: "60s", video: "https://youtube.com/shorts/m_GlpLN-8V8?si=185Rmj6OmiJZT6ZY" }]

  },
  {
    id: 22,
    name: "Programme Intermédiaire - Push/Pull/Legs (Jour 3: LEGS)",
    level: "Intermédiaire",
    duration: "6 semaines",
    frequency: "6x/semaine (2 cycles complets)",
    goal: "Développement musculaire",
    description: "Jour 3 LEGS : Quadriceps, Ischios, Fessiers, Mollets - Programme par TitanGryx",
    warmup: [
    "7-10 min cardio léger",
    "Mobilité hanches et chevilles",
    "Activation fessiers",
    "Squats au poids du corps"],

    exercises: [
    { name: "Squat barre", sets: "4", reps: "8-10", rest: "2 min", notes: "Exercice roi", video: "https://youtube.com/shorts/1D6OPkInYrU?si=k-s1Rt8Jc6DmZzFi" },
    { name: "Presse à cuisses", sets: "3", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/igWb6nY8Fyo?si=6WrKG21e_Wl0PwRJ" },
    { name: "Fentes bulgares", sets: "3", reps: "10-12/jambe", rest: "75s", video: "https://youtube.com/shorts/uBSoEWZu07k?si=gQelseeXo91UK8dl" },
    { name: "Leg curl allongé", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/Huq6i8E5bYk?si=dddrmqNOGgY1HJXm" },
    { name: "Romanian deadlift", sets: "3", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/I2JaOEgV_MU?si=m-eWSQXvKDfx4jUW" },
    { name: "Hip thrust", sets: "4", reps: "12-15", rest: "75s", video: "https://youtube.com/shorts/vhAWBwJpCa4?si=6Su-7jLlvpAsFCMi" },
    { name: "Mollets debout", sets: "4", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/8xXiPvWZE9o?si=jPj6DpkuyYhDKC3k" },
    { name: "Mollets assis", sets: "3", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/bg4XHXsFN-k?si=laku2bpETQljlMJT" }]

  },
  {
    id: 5,
    name: "Programme Intermédiaire - Force et Volume",
    level: "Intermédiaire",
    duration: "8 semaines",
    frequency: "4x/semaine",
    goal: "Force et masse",
    description: "Programme combinant force et volume musculaire",
    warmup: [
    "7 min cardio progressif",
    "Mobilité complète",
    "Échauffement spécifique",
    "Séries d'activation"],

    exercises: [
    { name: "Squat barre", sets: "4", reps: "8-10", rest: "2 min", video: "https://youtube.com/shorts/1D6OPkInYrU?si=k-s1Rt8Jc6DmZzFi" },
    { name: "Développé couché", sets: "4", reps: "8-10", rest: "2 min", video: "https://youtube.com/shorts/5_O-pKzu5CQ?si=HUxiG4uB82GwV635" },
    { name: "Rowing barre", sets: "4", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS" },
    { name: "Développé militaire", sets: "3", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc" },
    { name: "Curl barre", sets: "3", reps: "10-12", rest: "60s", video: "https://youtube.com/shorts/REopAb_EtZA?si=wqJ99JpILJeMopvZ" },
    { name: "Dips", sets: "3", reps: "10-15", rest: "75s", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd" }]

  },
  {
    id: 6,
    name: "Programme Avancé - Prise de Masse",
    level: "Avancé",
    duration: "8 semaines",
    frequency: "5x/semaine",
    goal: "Hypertrophie maximale",
    description: "Programme intensif pour pratiquants expérimentés avec TitanGryx",
    warmup: [
    "10 min cardio progressif",
    "Mobilité articulaire approfondie",
    "Activation neuromusculaire",
    "Séries d'échauffement spécifiques"],

    exercises: [
    { name: "Squat barre", sets: "5", reps: "5-8", rest: "3 min", notes: "Charge lourde", video: "https://youtube.com/shorts/1D6OPkInYrU?si=k-s1Rt8Jc6DmZzFi" },
    { name: "Soulevé de terre", sets: "4", reps: "6-8", rest: "3 min", video: "https://youtube.com/shorts/-aBjIfha12s?si=wSfG6k93g6EdxfHx" },
    { name: "Développé couché", sets: "4", reps: "6-8", rest: "2.5 min", video: "https://youtube.com/shorts/5_O-pKzu5CQ?si=HUxiG4uB82GwV635" },
    { name: "Tractions lestées", sets: "4", reps: "8-10", rest: "2 min", video: "https://youtube.com/shorts/TtE2JVIhMAA?si=Yge1cTW5-CZMSS1a" },
    { name: "Rowing barre", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS" },
    { name: "Développé militaire", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc" },
    { name: "Dips lestés", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd" }]

  },
  {
    id: 7,
    name: "Programme Avancé - Force Athlétique",
    level: "Avancé",
    duration: "10 semaines",
    frequency: "4x/semaine",
    goal: "Force maximale",
    description: "Programme powerlifting pour développer la force pure",
    warmup: [
    "10 min cardio léger",
    "Mobilité approfondie",
    "Activation neuromusculaire",
    "Séries d'échauffement progressives"],

    exercises: [
    { name: "Squat lourd", sets: "5", reps: "3-5", rest: "4 min", notes: "85-90% 1RM", video: "https://youtube.com/shorts/1D6OPkInYrU?si=k-s1Rt8Jc6DmZzFi" },
    { name: "Développé couché lourd", sets: "5", reps: "3-5", rest: "4 min", notes: "85-90% 1RM", video: "https://youtube.com/shorts/GoVJNOX-_b0?si=GGs7pDXuv7rCNaj_" },
    { name: "Soulevé de terre", sets: "5", reps: "3-5", rest: "4 min", notes: "85-90% 1RM", video: "https://youtube.com/shorts/-aBjIfha12s?si=wSfG6k93g6EdxfHx" },
    { name: "Squat frontal", sets: "3", reps: "6-8", rest: "3 min", video: "https://youtube.com/shorts/1T_mflfdBe8?si=5Abo1Ow1yVw-1KPR" },
    { name: "Développé incliné", sets: "3", reps: "6-8", rest: "2.5 min", video: "https://youtube.com/shorts/ucRI2xM-pRA?si=dn-TkQ2__4b1p8Pr" }]

  },
  {
    id: 8,
    name: "Programme Intermédiaire - Métabolique",
    level: "Intermédiaire",
    duration: "6 semaines",
    frequency: "4x/semaine",
    goal: "Perte de graisse",
    description: "Circuit training haute intensité pour brûler les graisses efficacement",
    warmup: [
    "5 min cardio modéré",
    "Étirements dynamiques",
    "Activation cardio-vasculaire",
    "Préparation aux mouvements"],

    exercises: [
    { name: "Burpees", sets: "4", reps: "10-15", rest: "30s", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" },
    { name: "Squat sautés", sets: "4", reps: "15-20", rest: "30s", video: "https://youtube.com/shorts/bhi4yXKuVek?si=l-wDp69L8z8U3ZEz" },
    { name: "Pompes explosives", sets: "4", reps: "8-12", rest: "30s", video: "https://youtube.com/shorts/_6vHKlzklH8?si=duWVgzFHJwO5I-ca" },
    { name: "Mountain climbers", sets: "4", reps: "20-30", rest: "30s", video: "https://youtube.com/shorts/5hmOtXAofpk?si=tSQf_RQmsf0MygoJ" },
    { name: "Fentes sautées", sets: "4", reps: "12-16", rest: "30s", video: "https://youtube.com/shorts/j33gGuxEmLM?si=zkBmcS7yesEU_izO" },
    { name: "Planche dynamique", sets: "4", reps: "30-45s", rest: "30s", video: "https://youtu.be/e9_Z81o0R9U?si=ByFH9gd3DPXyertV" },
    { name: "Cardio final", sets: "1", reps: "10 min", rest: "-", notes: "Intensité modérée", video: "https://youtube.com/shorts/wyR_mrWg92M?si=_egmLAHWEYn9nBY0" }]

  },

  {
    id: 10,
    name: "Programme Souplesse & Mobilité",
    level: "Débutant",
    duration: "Permanent",
    frequency: "Quotidien",
    goal: "Flexibilité",
    description: "Routine quotidienne pour améliorer la souplesse avec TitanGryx",
    warmup: [
    "Respiration profonde 2 min",
    "Rotations articulaires douces",
    "Mouvements lents et contrôlés"],

    exercises: [
    { name: "Étirement ischio-jambiers", sets: "3", reps: "30s", rest: "15s", video: "https://youtube.com/shorts/BBxzvFZaOaE?si=1wfKEFnz2Lh_hGh1" },
    { name: "Étirement quadriceps", sets: "3", reps: "30s", rest: "15s", video: "https://youtube.com/shorts/RTGvyZiGA98?si=mx2jmmUPh7H53Pkl" },
    { name: "Étirement épaules", sets: "3", reps: "30s", rest: "15s", video: "https://youtube.com/shorts/CjieGKws56E?si=VsjjcsEXgWTbztR0" },
    { name: "Torsion colonne", sets: "3", reps: "30s", rest: "15s", video: "https://youtu.be/AmjT0xu-HmA?si=FptMgvTa6i6ARAwx" },
    { name: "Chat-chameau", sets: "3", reps: "10", rest: "30s", video: "https://youtu.be/ohZk80Zioqs?si=hRPTgFSgrzZd8JgV" },
    { name: "Pigeon pose", sets: "2", reps: "45s", rest: "30s", video: "https://youtube.com/shorts/2HpHvNjY3lE?si=O8aKjzoc0HRJDVpm" },
    { name: "Relaxation finale", sets: "1", reps: "5 min", rest: "-", video: "https://youtu.be/B15vYeiJXWs?si=o7zDq1g38WLJDTrF" }]

  },
  {
    id: 11,
    name: "Programme Élastiques - Résistance",
    level: "Intermédiaire",
    duration: "4 semaines",
    frequency: "3x/semaine",
    goal: "Tonification",
    description: "Entraînement complet avec bandes élastiques par TitanGryx",
    warmup: [
    "Mouvements avec élastique léger",
    "Activation progressive",
    "Échauffement articulaire"],

    exercises: [
    { name: "Squat avec élastique", sets: "3", reps: "15-20", rest: "45s", video: "https://youtu.be/cqoYtVuOCng?si=FOrqBkMatvjqpuBq" },
    { name: "Tirage horizontal élastique", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/Je-oJZ7WhKw?si=P9qJgTzkxv05rxIH" },
    { name: "Développé élastique", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/zuTVEWtkSeU?si=MokgbiZNo-5keof_" },
    { name: "Élévations latérales élastique", sets: "3", reps: "15-20", rest: "30s", video: "https://youtube.com/shorts/Asjx-pGUQRc?si=q1g7QFJYyNUQy9in" },
    { name: "Curl biceps élastique", sets: "3", reps: "15-20", rest: "30s", video: "https://youtube.com/shorts/20xtfGZ37nw?si=-DlhtIMOCNZrr7jc" },
    { name: "Extension triceps élastique", sets: "3", reps: "15-20", rest: "30s", video: "https://youtube.com/shorts/iqL8HYeH-Rc?si=B8y2g66r-DiYoHrk" },
    { name: "Marche latérale élastique", sets: "3", reps: "20 pas", rest: "45s", video: "https://youtu.be/mGK4puFaSUA?si=flOUgsUbc13VnTob" }]

  },
  {
    id: 12,
    name: "Programme Femme - Tonification Complète",
    level: "Débutant",
    duration: "6 semaines",
    frequency: "4x/semaine",
    goal: "Tonification et silhouette",
    description: "Programme spécial femmes pour sculpter le corps avec TitanGryx",
    warmup: [
    "7 min cardio doux",
    "Étirements dynamiques",
    "Activation fessiers et abdos",
    "Mobilité articulaire"],

    exercises: [
    { name: "Hip thrust", sets: "4", reps: "12-15", rest: "60s", notes: "Focus fessiers", video: "https://youtube.com/shorts/vhAWBwJpCa4?si=6Su-7jLlvpAsFCMi" },
    { name: "Squat sumo", sets: "3", reps: "15-20", rest: "60s", video: "https://youtube.com/shorts/zfhYKwgnQIc?si=bZZBt5b9tXNFnp5v" },
    { name: "Fentes alternées", sets: "3", reps: "12-16", rest: "45s", video: "https://youtube.com/shorts/k0ME_AUh8ac?si=j01fX-vvB10UwIsE" },
    { name: "Abduction machine", sets: "3", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/_P1Vf8R10rM?si=CjU-qlx4eQVX1X0d" },
    { name: "Planche latérale", sets: "3", reps: "30-45s", rest: "30s", video: "https://youtube.com/shorts/w4O2b9AXjzk?si=LjstAaOwUNjDcU1N" },
    { name: "Russian twist", sets: "3", reps: "20-30", rest: "30s", video: "https://youtube.com/shorts/PFSU873ljaY?si=fyi922jBFnHo544y" },
    { name: "Pompes genoux", sets: "3", reps: "10-15", rest: "45s", video: "https://youtu.be/D-WibiqgKdg?si=smFXR_NSmHaX2RLz" }]

  },
  {
    id: 13,
    name: "Programme Femme - Fessiers Bombés",
    level: "Intermédiaire",
    duration: "8 semaines",
    frequency: "5x/semaine",
    goal: "Développement fessiers",
    description: "Programme intensif fessiers pour femmes par TitanGryx",
    warmup: [
    "10 min cardio modéré",
    "Activation fessiers (clam shell, fire hydrant)",
    "Étirements dynamiques jambes",
    "Monster walk avec élastique"],

    exercises: [
    { name: "Hip thrust lesté", sets: "4", reps: "10-12", rest: "90s", notes: "Charge progressive", video: "https://youtube.com/shorts/lgcXdYCbRTY?si=Sw2AsgiqEORdRbSE" },
    { name: "Squat bulgare", sets: "4", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/uBSoEWZu07k?si=gQelseeXo91UK8dl" },
    { name: "Romanian deadlift", sets: "4", reps: "12-15", rest: "75s", video: "https://youtube.com/shorts/I2JaOEgV_MU?si=m-eWSQXvKDfx4jUW" },
    { name: "Kickback poulie", sets: "3", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/bOY7GJLVR_E?si=0v9F_2ZrOnBUN4ZX" },
    { name: "Abduction machine", sets: "4", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/_P1Vf8R10rM?si=CjU-qlx4eQVX1X0d" },
    { name: "Frog pump", sets: "3", reps: "20-25", rest: "45s", video: "https://youtube.com/shorts/i3no5u7N_4A?si=zO1QprCiFNlxWvXk" },
    { name: "Step-up", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/0-BNcqHZ_2w?si=sF4dMJz9kR_m7M83" }]

  },
  {
    id: 14,
    name: "Programme Homme - Bras Massifs",
    level: "Intermédiaire",
    duration: "6 semaines",
    frequency: "4x/semaine",
    goal: "Volume des bras",
    description: "Programme spécialisation bras pour hommes avec TitanGryx",
    warmup: [
    "5 min cardio léger",
    "Rotations épaules et coudes",
    "Étirements bras",
    "Séries d'activation légères"],

    exercises: [
    { name: "Curl barre", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/REopAb_EtZA?si=wqJ99JpILJeMopvZ" },
    { name: "Curl incliné", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/iwyO2nJuG5Y?si=RVJIqTYrSoMDmUkY" },
    { name: "Curl marteau", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/cozAA9HUPhE?si=w7Ucg8s1dJ0VkJWQ" },
    { name: "Dips lestés", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd" },
    { name: "Extension nuque", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/7AvQ62POIMc?si=EPRrO2RB6o5bRJhz" },
    { name: "Extension poulie", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/jbC8Vb6bqIc?si=kbMGlWWmVe2zQvgT" },
    { name: "Curl 21s", sets: "2", reps: "21", rest: "90s", notes: "Finition", video: "https://youtube.com/shorts/h4NW5iaKBSc?si=Go_YtkhGdld6I_dh" }]

  },
  {
    id: 15,
    name: "Programme Diète Sèche - Homme",
    level: "Avancé",
    duration: "12 semaines",
    frequency: "6x/semaine",
    goal: "Définition musculaire",
    description: "Programme sèche intense pour définition maximale par TitanGryx",
    warmup: [
    "10 min cardio HIIT",
    "Mobilité complète",
    "Activation métabolique",
    "Préparation intensive"],

    exercises: [
    { name: "Squat", sets: "5", reps: "12-15", rest: "60s", notes: "Tempo contrôlé", video: "https://youtube.com/shorts/1D6OPkInYrU?si=k-s1Rt8Jc6DmZzFi" },
    { name: "Développé couché", sets: "5", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/5_O-pKzu5CQ?si=HUxiG4uB82GwV635" },
    { name: "Rowing barre", sets: "4", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS" },
    { name: "Développé militaire", sets: "4", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc" },
    { name: "Superset: Curl + Extension", sets: "4", reps: "15-20", rest: "45s", video: "https://youtu.be/QfW3mlTokm0?si=cL-sa1IdSzcaAGYT" },
    { name: "Circuit abdos", sets: "4", reps: "30s", rest: "30s", notes: "4 exercices", video: "https://youtube.com/shorts/Qq8BWn0wg8E?si=mnW_dwHCBjEdZbp5" },
    { name: "Cardio HIIT final", sets: "1", reps: "15 min", rest: "-", video: "https://youtube.com/shorts/HNyK-QXZqOw?si=pX_BAw5f4NCk4h6Z" }]

  },
  {
    id: 16,
    name: "Programme Diète Sèche - Femme",
    level: "Intermédiaire",
    duration: "10 semaines",
    frequency: "5x/semaine",
    goal: "Perte de graisse et tonicité",
    description: "Programme sèche femme pour silhouette dessinée par TitanGryx",
    warmup: [
    "10 min cardio progressif",
    "Étirements dynamiques",
    "Activation musculaire",
    "Préparation métabolique"],

    exercises: [
    { name: "Squat sumo", sets: "4", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/zfhYKwgnQIc?si=bZZBt5b9tXNFnp5v" },
    { name: "Hip thrust", sets: "4", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/vhAWBwJpCa4?si=6Su-7jLlvpAsFCMi" },
    { name: "Fentes sautées", sets: "3", reps: "12-16", rest: "45s", video: "https://youtube.com/shorts/j33gGuxEmLM?si=zkBmcS7yesEU_izO" },
    { name: "Pompes", sets: "3", reps: "10-15", rest: "45s", video: "https://youtube.com/shorts/JCAt8U_koUc?si=IhL4JYY20sansqV7" },
    { name: "Rowing haltère", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/vu_YDt9nGv4?si=ZzJ_GNZ42sbOCSls" },
    { name: "Planche dynamique", sets: "4", reps: "45s", rest: "30s", video: "https://youtu.be/e9_Z81o0R9U?si=ByFH9gd3DPXyertV" },
    { name: "Burpees", sets: "3", reps: "10-15", rest: "60s", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" },
    { name: "Cardio final", sets: "1", reps: "10 min", rest: "-", notes: "Intensité élevée", video: "https://youtube.com/shorts/jE6IsJseZ7I?si=US9-au702cgic_7C" }]

  },

  {
    id: 18,
    name: "Programme Homme - Torse Épais",
    level: "Avancé",
    duration: "8 semaines",
    frequency: "5x/semaine",
    goal: "Épaisseur pectoraux et dos",
    description: "Programme spécialisation torse pour hommes par TitanGryx",
    warmup: [
    "10 min cardio",
    "Rotations épaules complètes",
    "Activation scapulaire",
    "Séries pyramidales"],

    exercises: [
    { name: "Développé couché", sets: "5", reps: "5-8", rest: "3 min", notes: "Charge maximale", video: "https://youtube.com/shorts/5_O-pKzu5CQ?si=HUxiG4uB82GwV635" },
    { name: "Développé incliné", sets: "4", reps: "8-10", rest: "2 min", video: "https://youtube.com/shorts/ucRI2xM-pRA?si=dn-TkQ2__4b1p8Pr" },
    { name: "Écarté haltères", sets: "4", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/rpx2Tf6OJoY?si=sDmUBgPplZ6tgosz" },
    { name: "Tractions lestées", sets: "5", reps: "6-8", rest: "2.5 min", video: "https://youtube.com/shorts/TtE2JVIhMAA?si=Yge1cTW5-CZMSS1a" },
    { name: "Rowing barre", sets: "4", reps: "8-10", rest: "2 min", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS" },
    { name: "Rowing T-bar", sets: "4", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/Qw8lVFp8RqE?si=Hq09df8BtbO-et1c" },
    { name: "Pull-over", sets: "3", reps: "12-15", rest: "75s", video: "https://youtube.com/shorts/Vf_zUuI4QNQ?si=erfAAh6bhU3o2Jx_" }]

  },
  {
    id: 30,
    name: "Programme Débutant - Full Body Maison",
    level: "Débutant",
    duration: "4 semaines",
    frequency: "3x/semaine",
    goal: "Conditionnement général",
    description: "Entraînement complet sans matériel, idéal à la maison",
    warmup: [
    "5 min marche sur place",
    "Rotations articulaires",
    "Jumping jacks",
    "Échauffement poignets/chevilles"],

    exercises: [
    { name: "Step-up (sur chaise)", sets: "3", reps: "12/jambe", rest: "45s", video: "https://youtube.com/shorts/0-BNcqHZ_2w?si=sF4dMJz9kR_m7M83" },
    { name: "Pompes (ou genoux)", sets: "3", reps: "10-12", rest: "60s", video: "https://youtu.be/D-WibiqgKdg?si=smFXR_NSmHaX2RLz" },
    { name: "Fentes alternées", sets: "3", reps: "12/jambe", rest: "45s", video: "https://youtube.com/shorts/k0ME_AUh8ac?si=j01fX-vvB10UwIsE" },
    { name: "Mountain climbers", sets: "3", reps: "20-30", rest: "45s", video: "https://youtube.com/shorts/5hmOtXAofpk?si=tSQf_RQmsf0MygoJ" },
    { name: "Planche", sets: "3", reps: "30-45s", rest: "45s", video: "https://youtube.com/shorts/6OFaz1JK2BE?si=oyDQmZyITsC47l9R" },
    { name: "Burpees (rythme lent)", sets: "3", reps: "8-10", rest: "60s", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" }]

  },
  {
    id: 31,
    name: "Programme Débutant - Haut du Corps Machine",
    level: "Débutant",
    duration: "6 semaines",
    frequency: "2-3x/semaine",
    goal: "Force haut du corps",
    description: "Initiation aux machines et haltères pour le haut du corps",
    warmup: [
    "5 min rameur",
    "Rotations épaules",
    "Tirage léger",
    "Pompes murales"],

    exercises: [
    { name: "Tirage vertical", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/pTRUVMsYMy8?si=wyvtrYC1ytjFYzXD" },
    { name: "Développé machine", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/EgmgnkVPW9s?si=C4zWfoumcSi3zax-" },
    { name: "Tirage horizontal", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/fePgoFVjjmA?si=D5EhX0pEUm9W7D2m" },
    { name: "Curl biceps machine", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/a0rErf7aGJY?si=x8hMtzMugN6hliwl" },
    { name: "Extension triceps poulie", sets: "3", reps: "12-15", rest: "45s", video: "https://youtube.com/shorts/jbC8Vb6bqIc?si=kbMGlWWmVe2zQvgT" }]

  },
  {
    id: 32,
    name: "Programme Intermédiaire - Upper Body Focus",
    level: "Intermédiaire",
    duration: "8 semaines",
    frequency: "2x/semaine (dans un split)",
    goal: "Hypertrophie haut",
    description: "Séance complète pour le volume du haut du corps",
    warmup: [
    "5 min cardio",
    "Échauffement coiffe rotateurs",
    "Pompes légères",
    "Dislocations bâton"],

    exercises: [
    { name: "Développé couché", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/5_O-pKzu5CQ?si=HUxiG4uB82GwV635" },
    { name: "Tractions (ou assistées)", sets: "4", reps: "8-10", rest: "90s", video: "https://youtube.com/shorts/VqDByjY4V0o?si=6dH4j1SLQmbJjXbK" },
    { name: "Développé militaire", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc" },
    { name: "Rowing barre", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS" },
    { name: "Dips", sets: "3", reps: "Max", rest: "60s", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd" },
    { name: "Curl barre", sets: "3", reps: "10-12", rest: "60s", video: "https://youtube.com/shorts/REopAb_EtZA?si=wqJ99JpILJeMopvZ" }]

  },
  {
    id: 33,
    name: "Programme Intermédiaire - Lower Body Focus",
    level: "Intermédiaire",
    duration: "8 semaines",
    frequency: "2x/semaine (dans un split)",
    goal: "Volume jambes",
    description: "Séance intense pour le bas du corps",
    warmup: [
    "10 min vélo",
    "Mobilité hanches",
    "Squats poids du corps",
    "Fentes dynamiques"],

    exercises: [
    { name: "Squat barre", sets: "4", reps: "8-10", rest: "2 min", video: "https://youtube.com/shorts/1D6OPkInYrU?si=k-s1Rt8Jc6DmZzFi" },
    { name: "Presse à cuisses", sets: "3", reps: "12-15", rest: "90s", video: "https://youtube.com/shorts/igWb6nY8Fyo?si=6WrKG21e_Wl0PwRJ" },
    { name: "Fentes bulgares", sets: "3", reps: "10/jambe", rest: "75s", video: "https://youtube.com/shorts/uBSoEWZu07k?si=gQelseeXo91UK8dl" },
    { name: "Leg curl allongé", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/Huq6i8E5bYk?si=dddrmqNOGgY1HJXm" },
    { name: "Hip Thrust", sets: "3", reps: "12-15", rest: "90s", video: "https://youtube.com/shorts/vhAWBwJpCa4?si=6Su-7jLlvpAsFCMi" },
    { name: "Mollets debout", sets: "4", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/8xXiPvWZE9o?si=jPj6DpkuyYhDKC3k" }]

  },
  {
    id: 34,
    name: "Programme Intermédiaire - Cardio & Core",
    level: "Intermédiaire",
    duration: "6 semaines",
    frequency: "2-3x/semaine",
    goal: "Endurance et Gainage",
    description: "Circuit haute intensité pour le cœur et les abdominaux",
    warmup: [
    "5 min corde à sauter",
    "Rotations tronc",
    "Planche 30s",
    "Montées de genoux"],

    exercises: [
    { name: "Burpees", sets: "4", reps: "12-15", rest: "45s", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" },
    { name: "Russian twist", sets: "4", reps: "20-30", rest: "45s", video: "https://youtube.com/shorts/PFSU873ljaY?si=fyi922jBFnHo544y" },
    { name: "Squat sautés", sets: "4", reps: "15-20", rest: "45s", video: "https://youtube.com/shorts/bhi4yXKuVek?si=l-wDp69L8z8U3ZEz" },
    { name: "Planche dynamique", sets: "3", reps: "45s", rest: "45s", video: "https://youtu.be/e9_Z81o0R9U?si=ByFH9gd3DPXyertV" },
    { name: "Mountain climbers", sets: "4", reps: "30-40", rest: "45s", video: "https://youtube.com/shorts/5hmOtXAofpk?si=tSQf_RQmsf0MygoJ" },
    { name: "Crunch", sets: "3", reps: "20-25", rest: "45s", video: "https://youtube.com/shorts/xGbcIHSvSlo?si=Fv-imFHsAFCTRS_9" }]

  },
  {
    id: 40,
    name: "Challenge Commando - Sèche Express (1 Semaine)",
    level: "Avancé",
    duration: "1 semaine",
    frequency: "5x/semaine",
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
    name: "Semaine Bras de Titan (Focus)",
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
    { name: "Barre au front", sets: "4", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/7AvQ62POIMc?si=EPRrO2RB6o5bRJhz" },
    { name: "Curl Marteau", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/cozAA9HUPhE?si=w7Ucg8s1dJ0VkJWQ" },
    { name: "Extension Poulie", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/jbC8Vb6bqIc?si=kbMGlWWmVe2zQvgT" },
    { name: "Curl Incliné", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/iwyO2nJuG5Y?si=RVJIqTYrSoMDmUkY" },
    { name: "Dips", sets: "3", reps: "Max", rest: "90s", video: "https://youtube.com/shorts/1UGPXksj2k4?si=rzWWBqvq1o8UjWcd" }]

  },
  {
    id: 42,
    name: "Semaine Guerrier Pressé (30 min)",
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
    { name: "Superset: Squat + Pompes", sets: "4", reps: "15+15", rest: "45s", video: "https://www.youtube.com/watch?v=ultWZbUMPL8" },
    { name: "Superset: Fentes + Rowing", sets: "4", reps: "12+12", rest: "45s", video: "https://youtube.com/shorts/k0ME_AUh8ac?si=j01fX-vvB10UwIsE" },
    { name: "Superset: Press + Crunch", sets: "3", reps: "12+20", rest: "30s", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc" },
    { name: "Burpees (Finisher)", sets: "1", reps: "Max en 3 min", rest: "-", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" }]

  },
  {
    id: 43,
    name: "Semaine Débutant - Full Body Hebdo",
    level: "Débutant",
    duration: "1 semaine",
    frequency: "3x/semaine",
    goal: "Initiation Complète",
    description: "Programme hebdomadaire idéal pour démarrer. Travail de tout le corps à chaque séance.",
    warmup: [
    "5 min Marche rapide",
    "Mobilisation articulaire",
    "10 Squats à vide",
    "10 Pompes murales"],

    exercises: [
    { name: "Squat Poids du corps", sets: "3", reps: "12-15", rest: "60s", video: "https://www.youtube.com/watch?v=ultWZbUMPL8" },
    { name: "Pompes (ou genoux)", sets: "3", reps: "8-12", rest: "60s", video: "https://youtu.be/D-WibiqgKdg?si=smFXR_NSmHaX2RLz" },
    { name: "Tirage Vertical (ou élastique)", sets: "3", reps: "12-15", rest: "60s", video: "https://youtube.com/shorts/pTRUVMsYMy8?si=wyvtrYC1ytjFYzXD" },
    { name: "Développé Militaire (haltères/bouteilles)", sets: "3", reps: "10-12", rest: "60s", video: "https://youtube.com/shorts/Ap7texwO3Nk?si=nnjF1EOOyRwtCqKW" },
    { name: "Gainage Planche", sets: "3", reps: "20-30s", rest: "45s", video: "https://youtube.com/shorts/6OFaz1JK2BE?si=oyDQmZyITsC47l9R" }]

  },
  {
    id: 44,
    name: "Semaine Intermédiaire - Full Body Intensif",
    level: "Intermédiaire",
    duration: "1 semaine",
    frequency: "3x/semaine",
    goal: "Renforcement Global",
    description: "Semaine type Full Body avec charges modérées pour entretien et volume.",
    warmup: [
    "5 min Vélo",
    "Échauffement complet",
    "Séries légères de reconnaissance"],

    exercises: [
    { name: "Soulevé de Terre", sets: "4", reps: "8-10", rest: "2 min", video: "https://youtube.com/shorts/-aBjIfha12s?si=wSfG6k93g6EdxfHx" },
    { name: "Développé Couché", sets: "4", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/5_O-pKzu5CQ?si=HUxiG4uB82GwV635" },
    { name: "Rowing Barre", sets: "4", reps: "10-12", rest: "90s", video: "https://youtube.com/shorts/RNoHN2I0t1w?si=NxTdabBETg34s4ZS" },
    { name: "Développé Militaire", sets: "3", reps: "10-12", rest: "75s", video: "https://youtube.com/shorts/pUNRMouMaBU?si=3A_DijvvMd1rR6Cc" },
    { name: "Fentes Marchées", sets: "3", reps: "20 pas", rest: "60s", video: "https://youtube.com/shorts/k0ME_AUh8ac?si=j01fX-vvB10UwIsE" },
    { name: "Superset Bras (Biceps/Triceps)", sets: "3", reps: "12+12", rest: "60s", video: "https://youtube.com/shorts/REopAb_EtZA?si=wqJ99JpILJeMopvZ" }]

  }];



  const filteredPrograms = selectedLevel === 'Tous' ?
  programs :
  programs.filter((program) => program.level === selectedLevel);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':return 'bg-green-600';
      case 'Intermédiaire':return 'bg-yellow-600';
      case 'Avancé':return 'bg-red-600';
      default:return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 relative">
      {/* Lock Modal */}
      {showLockModal &&
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-700 relative">
            
            <button
            onClick={() => setShowLockModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <ChevronUp className="w-6 h-6 rotate-45" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-red-600 to-green-600 p-4 rounded-full">
                <Lock className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Programmes <span className="text-green-500">Verrouillés</span>
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Entrez le mot de passe pour accéder à tous les programmes (sauf Démo)
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>

              {error &&
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
                  {error}
                </motion.div>
            }

              <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
                Déverrouiller
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button
              onClick={() => setShowLockModal(false)}
              className="text-gray-500 hover:text-gray-300 text-sm underline">
                Annuler
              </button>
            </div>
          </motion.div>
        </div>
      }

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Programmes d'<span className="text-green-500">Entraînement</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center">Programmes personnalisés  pour tous les niveaux

          </p>
          
          {/* Level Filter */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg flex text-xs pt-[4px] pl-[4px] pr-[4px] pb-[4px]">
              {['Tous', 'Débutant', 'Intermédiaire', 'Avancé'].map((level) =>
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedLevel === level ?
                'bg-red-600 text-white' :
                'text-gray-300 hover:text-white'}`
                }>

                  {level}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Programs Grid */}
        <div className="space-y-8">
          {filteredPrograms.map((program, index) =>
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg overflow-hidden">

              {/* Program Header */}
              <button
                onClick={() => toggleProgram(program.id)}
                className="w-full p-6 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(program.level)} text-white`}>
                        {program.level}
                      </span>
                      {program.id === 1 && <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-600 text-white">DÉMO GRATUITE</span>}
                      {program.id !== 1 && !isUnlocked && <Lock className="w-5 h-5 text-red-500" />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{program.name}</h3>
                    <p className="text-gray-300 mb-4">{program.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{program.frequency}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Target className="w-4 h-4" />
                        <span>{program.goal}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{program.exercises.length} exercices</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedProgram === program.id ? <ChevronUp className="w-8 h-8 text-white" /> : <ChevronDown className="w-8 h-8 text-white" />}
                  </div>
                </div>
              </button>

              {/* Expanded Program Details */}
              {expandedProgram === program.id &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 bg-gray-700">

                  {/* Warmup Section */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      Échauffement (10-15 min)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {program.warmup.map((warmupItem, idx) =>
                  <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                          <span className="text-gray-300">{warmupItem}</span>
                        </div>
                  )}
                    </div>
                  </div>

                  {/* Exercises Section */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      Exercices Principal
                    </h4>
                    <div className="space-y-4">
                      {program.exercises.map((exercise, idx) =>
                  <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-2 md:mb-0">
                              <h5 className="text-lg font-semibold text-white flex items-center gap-2">
                                {exercise.name}
                                {exercise.video &&
                          <a href={exercise.video} target="_blank" rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-400 p-1 bg-red-500/10 rounded-full"
                          title="Voir la vidéo">
                                    <Play className="w-4 h-4" />
                                  </a>
                          }
                              </h5>
                              {exercise.notes &&
                        <p className="text-sm text-yellow-400">{exercise.notes}</p>
                        }
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="bg-red-600 text-white px-2 py-1 rounded">
                                {exercise.sets} séries
                              </span>
                              <span className="bg-green-600 text-white px-2 py-1 rounded">
                                {exercise.reps} reps
                              </span>
                              <span className="bg-blue-600 text-white px-2 py-1 rounded">
                                {exercise.rest} repos
                              </span>
                            </div>
                          </div>
                        </div>
                  )}
                    </div>
                  </div>

                  {/* Coach Tips */}
                  <div className="mt-8 bg-gradient-to-r from-red-600 to-green-600 p-4 rounded-lg">
                    <h5 className="text-white font-bold mb-2">💡 Conseils de TitanGryx</h5>
                    <p className="text-white text-sm">
                      Respectez les temps de repos, hydratez-vous régulièrement et n'hésitez pas à ajuster les charges selon votre progression. 
                      La technique prime toujours sur la charge !
                    </p>
                  </div>
                </motion.div>
            }
            </motion.div>
          )}
        </div>
      </div>
    </div>);

};

export default Programs;