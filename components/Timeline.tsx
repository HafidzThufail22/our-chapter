'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { useRef } from 'react';

const milestones = [
  {
    date: '31 Oktober, 2023',
    title: 'First Meet',
    description: 'The day our story began. A chance encounter that changed everything.',
    icon: Heart,
  },
  {
    date: '15 Desember, 2023',
    title: 'First Date',
    description: 'Coffee, laughter, and endless conversations under the stars.',
    icon: MapPin,
  },
  {
    date: '10 Agustus, 2023',
    title: 'Official',
    description: 'The moment we decided to write our chapter together.',
    icon: Calendar,
  },
  {
    date: '25 Desember, 2023',
    title: 'First Christmas',
    description: 'Our first holiday season together, filled with warmth and joy.',
    icon: Heart,
  },
  {
    date: '14 Februari, 2024',
    title: 'First Valentine',
    description: 'Celebrating love in the most romantic way possible.',
    icon: Heart,
  },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Convert vertical scroll to horizontal movement
  // Calculate total width needed to scroll
  const cardWidth = 380; // 350px card + 30px gap
  const totalWidth = cardWidth * milestones.length;
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalWidth]);

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="relative"
      style={{ height: '300vh' }} // Extra height for scroll hijacking
    >
      {/* Sticky container that holds the horizontal scroll */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-soft-blue to-ocean-blue/20">
        <div className="h-full flex flex-col justify-center py-20">
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center text-deep-navy mb-4"
            >
              Our Journey Together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-deep-navy/70 text-lg flex items-center justify-center gap-2"
            >
              <span>Scroll down to explore our timeline</span>
              <span className="text-2xl">↓</span>
            </motion.p>
          </div>

          {/* Horizontal scroll container */}
          <div className="relative h-[500px] overflow-hidden">
            <motion.div
              style={{ x }}
              className="absolute top-1/2 -translate-y-1/2 flex items-center gap-8 pl-[10%]"
            >
              {/* Horizontal timeline line */}
              <div className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-ocean-blue via-romantic-pink to-ocean-blue transform -translate-y-1/2 z-0"
                style={{ width: `${totalWidth + 500}px` }}
              />

              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isTop = index % 2 === 0;

                return (
                  <div 
                    key={index} 
                    className="relative inline-flex flex-col items-center flex-shrink-0"
                    style={{ width: '350px', marginRight: '30px' }}
                  >
                    {/* Card positioned above or below the line */}
                    <div
                      className={`flex flex-col items-center w-full ${
                        isTop ? 'flex-col' : 'flex-col-reverse'
                      }`}
                    >
                      {/* Content Card */}
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: '-50px' }}
                        whileHover={{ scale: 1.05, y: isTop ? -10 : 10 }}
                        transition={{ duration: 0.3 }}
                        className={`w-full ${isTop ? 'mb-8' : 'mt-8'}`}
                      >
                        <div className="glass p-6 rounded-3xl shadow-xl relative">
                          {/* Date Badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-ocean-blue to-romantic-pink text-white font-semibold text-sm shadow-lg"
                          >
                            {milestone.date}
                          </motion.div>

                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-romantic-pink/20 rounded-xl">
                              <Icon className="text-romantic-pink" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-deep-navy">
                              {milestone.title}
                            </h3>
                          </div>

                          <p className="text-deep-navy/70 leading-relaxed text-sm">
                            {milestone.description}
                          </p>

                          {/* Decorative watermark */}
                          <div className="absolute bottom-4 right-4 opacity-5">
                            <Icon size={60} fill="currentColor" className="text-deep-navy" />
                          </div>

                          {/* Arrow pointing to timeline */}
                          <div
                            className={`absolute left-1/2 transform -translate-x-1/2 ${
                              isTop ? 'bottom-0 translate-y-full' : 'top-0 -translate-y-full'
                            }`}
                          >
                            <div className="w-0.5 h-6 bg-ocean-blue/50" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Timeline Dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="relative z-10"
                      >
                        {/* Outer glow ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.2, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.2,
                          }}
                          className="absolute inset-0 bg-romantic-pink rounded-full blur-md"
                        />

                        {/* Main dot */}
                        <div className="relative w-6 h-6 bg-gradient-to-br from-ocean-blue to-romantic-pink rounded-full border-4 border-soft-blue shadow-lg" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}

              {/* End decoration */}
              <div className="flex-shrink-0 ml-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  className="p-4 bg-gradient-to-br from-ocean-blue to-romantic-pink rounded-full shadow-xl"
                >
                  <Heart className="text-white" size={32} fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 px-4"
          >
            <div className="max-w-md mx-auto">
              <div className="h-1 bg-deep-navy/20 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="h-full bg-gradient-to-r from-ocean-blue to-romantic-pink origin-left"
                />
              </div>
              <p className="text-deep-navy/60 text-sm mt-2">
                Keep scrolling to see all moments 💕
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
