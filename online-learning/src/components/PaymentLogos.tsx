"use client";
import React from "react";
import Image from "next/image";

export default function PaymentLogos() {
  return (
    <div className="flex items-center gap-4 mt-4">
      <Image src="/visa.svg" alt="Visa" width={48} height={32} priority />
      <Image
        src="/mastercard.svg"
        alt="Mastercard"
        width={48}
        height={32}
        priority
      />
    </div>
  );
}
