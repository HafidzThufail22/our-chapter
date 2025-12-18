'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart } from 'lucide-react';

const milestones = [
  {
    date: 'May 20, 2023',
    title: 'First Meet',
    description: 'The day our story began. A chance encounter that changed everything.',
    icon: Heart,
  },
  {
    date: 'June 15, 2023',
    title: 'First Date',
    description: 'Coffee, laughter, and endless conversations under the stars.',
    icon: MapPin,
  },
  {
    date: 'August 10, 2023',
    title: 'Official',
    description: 'The moment we decided to write our chapter together.',
    icon: Calendar,
  },
  {
    date: 'December 25, 2023',
    title: 'First Christmas',
    description: 'Our first holiday season together, filled with warmth and joy.',
    icon: Heart,
  },
  {
    date: 'February 14, 2024',
    title: 'First Valentine',
    description: 'Celebrating love in the most romantic way possible.',
    icon: Heart,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4 bg-gradient-to-b from-soft-blue to-ocean-blue/20">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-deep-navy mb-16"
        >
          Our Journey Together
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-ocean-blue/30" />

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-ocean-blue rounded-full border-4 border-soft-blue transform -translate-x-1/2 z-10" />

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div className="glass p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-romantic-pink/20 rounded-lg">
                        <Icon className="text-romantic-pink" size={24} />
                      </div>
                      <span className="text-sm text-ocean-blue font-semibold">
                        {milestone.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-deep-navy mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-deep-navy/70">{milestone.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
