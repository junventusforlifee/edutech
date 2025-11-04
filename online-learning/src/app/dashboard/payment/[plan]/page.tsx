import React from "react";
import PaymentCard from "@/components/PaymentCard";
import PaymentLogos from "@/components/PaymentLogos";

type Props = {
  params: {
    plan: string;
  };
};

export default function PaymentPage({ params }: Props) {
  const { plan } = params;
  const humanLabel = plan.replace(/-/g, " ");

  const plans = [
    {
      title: `${humanLabel} — Basic`,
      price: "₦2,000",
      features: ["Access To Course Materials","Access To Recorded Classes","Community Support"],
    },
    {
      title: `${humanLabel} — Pro`,
      price: "₦5,000",
      features: ["Everything In Basic", "Recorded Classes","Access To Gamified Lectures","Quizzes & Answers"],
    },
    {
      title: `${humanLabel} — Premium`,
      price: "₦15,000",
      features: ["1:1 Mentoring With Human Teacher + AI Co-Teacher", "Live Classes + AI Co-Teachers","Access To Gamified Lectures","Summarized Video Classes To Student's Learning Curve By AI","All Materials"],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Purchase: {humanLabel}</h1>
      <p className="text-sm text-gray-600 mt-1">
        Choose a plan below. This page contains a placeholder payment flow —
        integrate your payment provider (Stripe/Paystack) later.
      </p>

      <PaymentLogos />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {plans.map((p) => (
          <PaymentCard
            key={p.title}
            title={p.title}
            price={p.price}
            features={p.features}
          />
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <strong>Note:</strong> The "Pay" button is a placeholder. To accept
        payments you must create a backend endpoint to create a checkout/session
        with your provider and redirect the user to the provider's checkout
        page. Recommended env vars:{" "}
        <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>,{" "}
        <code>STRIPE_SECRET_KEY</code> (server).
      </div>
    </div>
  );
}
