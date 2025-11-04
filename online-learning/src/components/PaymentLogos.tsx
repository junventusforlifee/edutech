"use client";
import React from "react";

export default function PaymentLogos() {
  return (
    <div className="flex items-center gap-4 mt-4">
      <img src="/visa.svg" alt="Visa" className="h-8" />
      <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
    </div>
  );
}
