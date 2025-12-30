"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingHearts from "@/components/FloatingHearts";
import Timeline from "@/components/Timeline";
import PhotoGallery from "@/components/PhotoGallery";
import Countdown from "@/components/Countdown";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* Loading Screen with Password */}
      <AnimatePresence>
        {!isAuthenticated && (
          <LoadingScreen onAuthenticated={() => setIsAuthenticated(true)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isAuthenticated ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-soft-blue overflow-x-hidden"
      >
        <Navbar />

        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <FloatingHearts />

          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-6"
              >
                <Heart
                  className="text-romantic-pink mx-auto"
                  size={64}
                  fill="currentColor"
                />
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-deep-navy mb-6">
                OurChapter
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-deep-navy/80 mb-8 max-w-2xl mx-auto"
              >
                A love story written in the stars, lived in every moment
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center gap-2"
              >
                <Sparkles className="text-ocean-blue" size={24} />
                <span className="text-ocean-blue font-semibold text-lg">
                  Scroll to explore our journey
                </span>
                <Sparkles className="text-ocean-blue" size={24} />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-ocean-blue rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-ocean-blue rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section
          id="story"
          className="py-20 px-4 bg-gradient-to-b from-soft-blue to-ocean-blue/10"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center text-deep-navy mb-12"
            >
              Our Love Story
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 md:p-12 rounded-3xl shadow-xl"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-deep-navy/80 leading-relaxed mb-6">
                  In a world full of billions of people, somehow our paths
                  crossed at just the right moment. What started as a simple
                  hello has blossomed into the most beautiful chapter of our
                  lives.
                </p>

                <p className="text-deep-navy/80 leading-relaxed mb-6">
                  Every day with you feels like a dream I never want to wake up
                  from. You've shown me what it means to truly love and be
                  loved. Through laughter and tears, adventures and quiet
                  moments, we've built something extraordinary together.
                </p>

                <p className="text-deep-navy/80 leading-relaxed">
                  This is our story—a tale of two hearts that found their home
                  in each other. And this is just the beginning of our forever.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex items-center justify-center gap-3"
              >
                <Heart
                  className="text-romantic-pink"
                  size={24}
                  fill="currentColor"
                />
                <span className="text-ocean-blue font-semibold italic">
                  Forever and always
                </span>
                <Heart
                  className="text-romantic-pink"
                  size={24}
                  fill="currentColor"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <Timeline />

        {/* Photo Gallery Section */}
        <PhotoGallery />

        {/* Countdown Section */}
        <Countdown />

        {/* Footer */}
        <footer className="py-12 px-4 bg-deep-navy text-soft-blue">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <span className="text-lg">Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <Heart
                  className="text-romantic-pink"
                  size={24}
                  fill="currentColor"
                />
              </motion.div>
              <span className="text-lg">for us</span>
            </motion.div>

            <p className="text-soft-blue/60 text-sm">
              © {new Date().getFullYear()} OurChapter. Every moment, every
              memory, forever cherished.
            </p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
