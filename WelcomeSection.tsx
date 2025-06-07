import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, Sparkles, Search, ChevronRight, Users, Zap, Database } from 'lucide-react';

interface WelcomeSectionProps {
  user?: {
    givenname?: string;
  };
  onViewAPIs?: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user, onViewAPIs }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  // Function to get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-primary-800 pt-8 pb-36 px-6 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={floatingAnimation}
          className="absolute -right-10 -top-10 w-72 h-72 bg-primary-500 opacity-20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 1
            }
          }}
          className="absolute left-1/4 bottom-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 2
            }
          }}
          className="absolute right-1/3 top-1/4 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl"
        />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-amber-300 font-medium text-sm">Plateforme d'Innovation</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">{user?.givenname || 'sur votre Portail'}</span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
              Let's deliver better projects together! Une plateforme pensée pour les équipes de SGABS : 
              <span className="font-medium text-white"> APIS</span>, 
              <span className="font-medium text-white"> Documentation</span>, 
              <span className="font-medium text-white"> Génération de projets</span>, 
              tout en un seul endroit.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary-600/20 transition-all duration-300"
              >
                <FileText size={18} />
                Explorer les documents
                <ChevronRight size={16} className="ml-1" />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onViewAPIs}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 border border-white/20 transition-all duration-300"
              >
                <Code size={18} />
                Voir les APIs
              </motion.button>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-indigo-700 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-semibold text-white">+120 utilisateurs</span> actifs aujourd'hui
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full md:w-auto">
            {/* Search component placeholder */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Recherche rapide
              </h3>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des APIs, documents..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 p-1.5 rounded-lg hover:bg-white/30 transition-colors">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg p-2 text-white/70 text-sm transition-colors">
                  <Database className="w-4 h-4" />
                  APIs

                </button>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg p-2 text-white/70 text-sm transition-colors">
                  <FileText className="w-4 h-4" />
                  Documents
                </button>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg p-2 text-white/70 text-sm transition-colors">
                  <Users className="w-4 h-4" />
                  Équipes
                </button>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg p-2 text-white/70 text-sm transition-colors">
                  <Zap className="w-4 h-4" />
                  Projets
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default WelcomeSection;
