'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const hearts = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 20 + 15,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 10,
}));

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-romantic-pink/20"
          style={{
            left: `${heart.left}%`,
            top: '100%',
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
