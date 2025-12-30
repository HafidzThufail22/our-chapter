"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onAuthenticated: () => void;
}

const CORRECT_PASSWORD = "ourchapter"; // Ganti password sesuai keinginan

export default function LoadingScreen({ onAuthenticated }: LoadingScreenProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.toLowerCase() === CORRECT_PASSWORD) {
      setError("");
      setIsUnlocked(true);
      setIsLoading(true);
    } else {
      setError("Password salah, coba lagi sayang 💕");
      setPassword("");
    }
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onAuthenticated();
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isLoading, onAuthenticated]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-soft-blue via-ocean-blue/20 to-romantic-pink/20 overflow-hidden"
      >
        {/* Animated Background Hearts */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: -100,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              <Heart
                className="text-romantic-pink/30"
                size={Math.random() * 30 + 15}
                fill="currentColor"
              />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          {!isUnlocked ? (
            /* Password Form */
            <motion.div
              key="password-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50"
            >
              {/* Lock Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-romantic-pink to-ocean-blue rounded-full flex items-center justify-center shadow-lg">
                    <Lock className="text-white" size={36} />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                  >
                    <Heart
                      className="text-romantic-pink"
                      size={20}
                      fill="currentColor"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-center text-deep-navy mb-2">
                OurChapter 💕
              </h1>
              <p className="text-center text-deep-navy/60 mb-6">
                Masukkan password untuk membuka cerita kita
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password..."
                    className="w-full px-5 py-4 rounded-xl bg-soft-blue/50 border-2 border-transparent focus:border-romantic-pink focus:outline-none transition-all duration-300 text-deep-navy placeholder:text-deep-navy/40 text-center text-lg"
                    autoFocus
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <Sparkles className="text-romantic-pink" size={20} />
                  </motion.div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-romantic-pink text-center text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-romantic-pink to-ocean-blue text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Heart size={20} fill="currentColor" />
                  <span>Buka Cerita Kita</span>
                </motion.button>
              </form>

              {/* Hint */}
              <p className="text-center text-deep-navy/40 text-xs mt-4">
                Hint: Nama website kita (lowercase) 😉
              </p>
            </motion.div>
          ) : (
            /* Loading Animation */
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 text-center"
            >
              {/* Unlocked Icon */}
              <motion.div
                initial={{ rotate: -20 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-ocean-blue rounded-full flex items-center justify-center shadow-lg">
                  <Unlock className="text-white" size={36} />
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold text-deep-navy mb-2">
                Password Benar! 🎉
              </h2>
              <p className="text-deep-navy/60 mb-6">
                Mempersiapkan cerita indah kita...
              </p>

              {/* Progress Bar */}
              <div className="relative h-3 bg-soft-blue rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-romantic-pink to-ocean-blue rounded-full"
                />
              </div>

              <p className="text-deep-navy/60 text-sm">
                {loadingProgress}% - Loading kenangan...
              </p>

              {/* Floating Hearts */}
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  >
                    <Heart
                      className="text-romantic-pink"
                      size={20}
                      fill="currentColor"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
