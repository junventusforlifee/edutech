"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// 🔹 Define 5 cards now
const heroCards = [
  {
    id: 1,
    title: "Human + AI Co-teaching:The future of live learning",
    description: "Live interactive classes with human teachers and AI Co-teachers",
    image: "/learnwithaibeta.png",
    gradient: "bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300",
  },
  {
    id: 2,
    title: "Smart learning.Low data.Offline ready",
    description:
      "Learn anyehere,anytime-no heavy download,no connectivity limit",
    image: "/lowdatabeta.png",
    gradient: "bg-gradient-to-r from-green-400 via-green-300 to-lime-300",
  },
  {
    id: 3,
    title: "Recorded by teachers,Refined by AI",
    description:
      "Pre-recoreded,Post-learning.AI turns Video-lessons into true understanding",
    image: "/betaprerecorded.png",
    gradient: "bg-gradient-to-r from-purple-400 via-purple-300 to-pink-300",
  },
];

export default function Hero() {
  const [currentCard, setCurrentCard] = useState(0);

  // 🔹 Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % heroCards.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToCard = (index: number) => {
    setCurrentCard(index);
  };

  return (
    <div className="pt-8">
      {/* Main Hero Section */}
      <section className="pt-8 pb-4 bg-gradient-to-r from-blue-50 via-indigo-100 to-indigo-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8">
            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left pt-4 sm:pt-6 md:pt-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
                Human-led.AI-powered.Social learning for real-world skill
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">
                A learning platform that feels like social media - where students build essential career and life skills
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center pt-6 sm:pt-8 md:pt-10">
              <div className="relative w-full max-w-md h-56 sm:h-72 md:h-96 overflow-hidden">
                <Image
                  src="/socialmedialearn.png"
                  alt="Learning platform illustration"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Carousel Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-auto min-h-[500px] sm:min-h-[550px] md:min-h-[450px] w-full max-w-5xl mx-auto mb-8">
            {heroCards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch ${
                  index === currentCard
                    ? "opacity-100 translate-x-0 z-10"
                    : index < currentCard
                    ? "opacity-0 -translate-x-full z-0"
                    : "opacity-0 translate-x-full z-0"
                } ${card.gradient}`}
              >
                {/* Text Section */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center text-center md:text-left text-black">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4">
                    {card.title}
                  </h2>
                  <p className="mb-6 text-sm sm:text-base">{card.description}</p>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-48 sm:h-64 md:h-auto">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center space-x-3">
            {heroCards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCard ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
