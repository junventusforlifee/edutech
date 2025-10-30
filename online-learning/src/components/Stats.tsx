"use client";
import { useEffect, useState } from "react";
import { Users, School, Video, HelpCircle } from "lucide-react";
import { motion } from "framer-motion"; // Framer Motion

// Hook for animated counting
function useCountUp(target: number, duration: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function Stats() {
  // Counts
  const students = useCountUp(10000, 1500); // 1.5 seconds
  const schools = useCountUp(200, 1500);
  const videos = useCountUp(500, 1500);
  const questions = useCountUp(100000, 1500);

  // Animation variants
  const iconVariant = {
    hidden: { opacity: 0, scale: 0.5, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const numberVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={numberVariant}
          >
            Our Success
          </motion.h2>
          <motion.p
            className="mt-2 text-blue-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={numberVariant}
          >
            We’re transforming education with measurable impact.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Students */}
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              variants={iconVariant}
            >
              <Users size={48} className="text-white" />
            </motion.div>
            <motion.h3
              className="text-5xl font-bold mb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={numberVariant}
            >
              {students.toLocaleString()}+
            </motion.h3>
            <p className="text-xl">Students Subscribed</p>
          </div>

          {/* Schools */}
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              variants={iconVariant}
            >
              <School size={48} className="text-white" />
            </motion.div>
            <motion.h3
              className="text-5xl font-bold mb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={numberVariant}
            >
              {schools.toLocaleString()}+
            </motion.h3>
            <p className="text-xl">Schools Subscribed</p>
          </div>

          {/* Videos */}
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              variants={iconVariant}
            >
              <Video size={48} className="text-white" />
            </motion.div>
            <motion.h3
              className="text-5xl font-bold mb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={numberVariant}
            >
              {videos.toLocaleString()}+
            </motion.h3>
            <p className="text-xl">Videos Available</p>
          </div>

          {/* Questions */}
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              variants={iconVariant}
            >
              <HelpCircle size={48} className="text-white" />
            </motion.div>
            <motion.h3
              className="text-5xl font-bold mb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={numberVariant}
            >
              {questions.toLocaleString()}+
            </motion.h3>
            <p className="text-xl">Questions Solved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
