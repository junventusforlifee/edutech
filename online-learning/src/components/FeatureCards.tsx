"use client";

import { Trophy, Users, Bot, Gift } from "lucide-react";

const features = [
  {
    title: "Gamified Social Learning",
    description:
      "Badges, streaks, leaderboards, confetti animations, and shareable achievements turn study into a shared game.",
    icon: Trophy,
  },
  {
    title: "Personalized Micro-Learning",
    description:
      "AI-driven learning paths, 2–5 min videos, adaptive quizzes, and an endless flashcard feed serve the next best micro-lesson.",
    icon: Bot,
  },
  {
    title: "Community & Collaboration",
    description:
      "Built-in classroom groups, peer discussions, group challenges, and real-time notifications create belonging and accountability.",
    icon: Users,
  },
  {
    title: "Habit & Reward Engine",
    description:
      "Daily challenges, streak tracking, instant feedback, and redeemable points build habits and motivation.",
    icon: Gift,
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Innovative solutions for total learning engagement
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Creative. Social. Personalized. Habit-forming — learning that actually
          sticks.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4 mx-auto">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="#get-started"
          className="inline-block px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
