'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const photos = [
  { id: 1, src: '/photos/photo1.jpg', alt: 'Memory 1' },
  { id: 2, src: '/photos/photo2.jpg', alt: 'Memory 2' },
  { id: 3, src: '/photos/photo3.jpg', alt: 'Memory 3' },
  { id: 4, src: '/photos/photo4.jpg', alt: 'Memory 4' },
  { id: 5, src: '/photos/photo5.jpg', alt: 'Memory 5' },
  { id: 6, src: '/photos/photo6.jpg', alt: 'Memory 6' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

export default function PhotoGallery() {
  return (
    <section id="gallery" className="py-20 px-4 bg-soft-blue">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-deep-navy mb-16"
        >
          Our Precious Memories
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateZ: 2,
                transition: { duration: 0.3 },
              }}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
            >
              <div className="glass absolute inset-0 p-4">
                <div className="relative w-full h-full bg-gradient-to-br from-ocean-blue/20 to-romantic-pink/20 rounded-xl flex items-center justify-center">
                  {/* Placeholder for photos */}
                  <div className="text-center">
                    <div className="text-6xl mb-2">📷</div>
                    <p className="text-deep-navy/60 text-sm">
                      Add your photo here
                    </p>
                    <p className="text-deep-navy/40 text-xs mt-1">
                      {photo.src}
                    </p>
                  </div>
                  
                  {/* Uncomment when you add real photos */}
                  {/* <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover rounded-xl"
                  /> */}
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-ocean-blue/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <span className="text-white font-semibold text-lg">
                  {photo.alt}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
