"use client";
import React, { useState } from "react";

type PaymentCardProps = {
  title: string;
  price: string;
  features?: string[];
};

function luhnCheck(cardNumber: string) {
  // Luhn algorithm implementation for basic card number validation
  const digits = cardNumber.replace(/\s+/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return digits.length >= 12 && sum % 10 === 0;
}

export default function PaymentCard({
  title,
  price,
  features = [],
}: PaymentCardProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 19); // allow up to 19 (some cards)
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const onCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);
    setCardNumber(formatCardNumber(e.target.value));
  };

  const onExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // simple MM/YY formatting
    const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    if (v.length >= 3) setExpiry(v.slice(0, 2) + "/" + v.slice(2));
    else setExpiry(v);
  };

  const onCvvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
  };

  const handlePay = () => {
    setError(null);
    setSuccess(null);
    const raw = cardNumber.replace(/\s+/g, "");
    if (!luhnCheck(raw)) {
      setError("Invalid card number");
      return;
    }

    if (expiry && !/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry must be in MM/YY format");
      return;
    }

    if (cvv && (cvv.length < 3 || cvv.length > 4)) {
      setError("CVV must be 3 or 4 digits");
      return;
    }

    // Placeholder success path — do NOT process real payments here.
    setSuccess(
      "Card validated (placeholder). Integrate real payment provider to complete purchase."
    );
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white text-gray-900">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-lg font-bold">{price}</div>
      </div>

      <ul className="text-sm mb-4 space-y-1">
        {features.map((f, idx) => (
          <li key={idx}>• {f}</li>
        ))}
      </ul>

      <div className="space-y-2">
        <label className="block text-sm text-gray-700">Card number</label>
        <input
          value={cardNumber}
          onChange={onCardInput}
          placeholder="4242 4242 4242 4242"
          className="w-full border rounded-md px-3 py-2"
          inputMode="numeric"
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm text-gray-700">
              Expiry (MM/YY)
            </label>
            <input
              value={expiry}
              onChange={onExpiryInput}
              placeholder="MM/YY"
              className="w-full border rounded-md px-3 py-2"
              inputMode="numeric"
            />
          </div>

          <div style={{ width: 120 }}>
            <label className="block text-sm text-gray-700">CVV</label>
            <input
              value={cvv}
              onChange={onCvvInput}
              placeholder="123"
              className="w-full border rounded-md px-3 py-2"
              inputMode="numeric"
            />
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && <div className="text-sm text-green-700">{success}</div>}

        <button
          onClick={handlePay}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Pay (validate card)
        </button>
      </div>
    </div>
  );
}
