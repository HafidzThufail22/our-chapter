'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

// TODO: Update this date to your actual relationship start date (format: YYYY-MM-DD)
const START_DATE = new Date('2023-10-31');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = now.getTime() - START_DATE.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-20 px-4 bg-gradient-to-b from-ocean-blue/20 to-soft-blue">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="text-romantic-pink" size={32} fill="currentColor" />
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy">
              Together For
            </h2>
            <Heart className="text-romantic-pink" size={32} fill="currentColor" />
          </div>
          <p className="text-deep-navy/70 text-lg">
            Every moment with you is a treasure
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-12 rounded-3xl shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-ocean-blue to-romantic-pink p-6 rounded-2xl mb-3 shadow-lg"
                >
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </motion.div>
                <span className="text-deep-navy font-semibold text-sm md:text-base">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-deep-navy/60">
              <Calendar size={20} />
              <span className="text-sm">
                Since {START_DATE.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8 text-deep-navy/70 italic"
        >
          "Every second with you is a moment I cherish forever"
        </motion.p>
      </div>
    </section>
  );
}
