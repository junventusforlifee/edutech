'use client'
import React from 'react'

export default function PaystackButton({
  amount = 2000,
  description = 'Payment',
}: {
  amount?: number
  description?: string
}) {
  async function handlePay() {
    // 👇 Import Paystack only when button is clicked (in the browser)
    const { default: PaystackPop } = await import('@paystack/inline-js')

    const paystack = new PaystackPop()
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PK || 'pk_test_YOUR_KEY',
      amount: amount * 100,
      email: 'student@example.com', // replace with the real student email
      onSuccess: (res: any) => {
        alert('Payment success: ' + res.reference)
        // You can also call your backend here to verify the payment
      },
      onCancel: () => {
        alert('Payment cancelled')
      },
    })
  }

  return (
    <button
      onClick={handlePay}
      className="bg-green-600 text-white px-3 py-2 rounded"
    >
      Pay {amount} NGN
    </button>
  )
}
