"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Heart } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    date: "31 Oktober, 2023",
    title: "First Meet",
    description:
      "The day our story began. A chance encounter that changed everything.",
    icon: Heart,
  },
  {
    date: "15 Desember, 2023",
    title: "First Date",
    description: "Coffee, laughter, and endless conversations under the stars.",
    icon: MapPin,
  },
  {
    date: "10 Agustus, 2023",
    title: "Official",
    description: "The moment we decided to write our chapter together.",
    icon: Calendar,
  },
  {
    date: "25 Desember, 2023",
    title: "First Christmas",
    description:
      "Our first holiday season together, filled with warmth and joy.",
    icon: Heart,
  },
  {
    date: "14 Februari, 2024",
    title: "First Valentine",
    description: "Celebrating love in the most romantic way possible.",
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
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

    const container = containerRef.current;
    const timeline = timelineRef.current;

    // Calculate total width to scroll
    const cardWidth = 380; // 350px card + 30px gap
    const totalWidth = cardWidth * milestones.length;

    // Create scroll-triggered horizontal animation
    const scrollTween = gsap.to(timeline, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth * 2}`, // Adjust scroll distance
        scrub: 1, // Smooth scrubbing
        pin: true, // Pin the section while scrolling
        anticipatePin: 1,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative overflow-hidden bg-gradient-to-b from-soft-blue to-ocean-blue/20"
    >
      <div className="h-screen flex flex-col justify-center py-4">
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-deep-navy"
          >
            Our Journey Together
          </motion.h2>
        </div>

        {/* Horizontal scroll container */}
        <div className="relative flex-1 overflow-hidden">
          <div
            ref={timelineRef}
            className="absolute top-1/2 -translate-y-1/2 flex items-center gap-8 pl-[10%]"
          >
            {/* Horizontal timeline line */}
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-ocean-blue via-romantic-pink to-ocean-blue transform -translate-y-1/2 z-0"
              style={{ width: `${380 * milestones.length + 500}px` }}
            />

            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isTop = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative inline-flex flex-shrink-0"
                  style={{
                    width: "350px",
                    marginRight: "30px",
                    height: "450px",
                  }}
                >
                  {/* Timeline Dot - positioned on the horizontal line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
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
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                      className="absolute inset-0 bg-romantic-pink rounded-full blur-md"
                    />
                    {/* Main dot */}
                    <div className="relative w-5 h-5 bg-gradient-to-br from-ocean-blue to-romantic-pink rounded-full border-4 border-white shadow-lg" />
                  </motion.div>

                  {/* Vertical connector line from dot to card */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-ocean-blue to-romantic-pink/50 ${
                      isTop
                        ? "top-1/2 -translate-y-full h-[140px]"
                        : "top-1/2 h-[140px]"
                    }`}
                  />

                  {/* Content Card */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute w-full ${
                      isTop ? "bottom-[55%]" : "top-[55%]"
                    }`}
                  >
                    <div className="glass p-6 rounded-3xl shadow-xl relative">
                      {/* Date Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2, type: "spring" }}
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
                        <Icon
                          size={60}
                          fill="currentColor"
                          className="text-deep-navy"
                        />
                      </div>
                    </div>
                  </motion.div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
