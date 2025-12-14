"use client";
import React from "react";

export default function GetAppPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Get Our App</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-6">
          Download our mobile app for learning on the go!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* iOS App */}
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">iOS App</h3>
            <p className="text-sm text-gray-600 mb-4">
              Available on the App Store
            </p>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
              Download for iOS
            </button>
          </div>

          {/* Android App */}
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.523 15.341c-.737 0-1.332-.609-1.332-1.354 0-.745.595-1.348 1.332-1.348.736 0 1.331.603 1.331 1.348 0 .745-.595 1.354-1.331 1.354zm-11.046 0c-.737 0-1.332-.609-1.332-1.354 0-.745.595-1.348 1.332-1.348.737 0 1.332.603 1.332 1.348 0 .745-.595 1.354-1.332 1.354zm11.371-13.671l1.091-2.002a.305.305 0 00-.107-.42.3.3 0 00-.414.107l-1.1 2.012c-1.01-.456-2.144-.713-3.318-.713-1.174 0-2.309.257-3.318.713l-1.1-2.012a.3.3 0 00-.414-.107.305.305 0 00-.107.42l1.091 2.002C7.644 3.184 6 5.835 6 8.944h12c0-3.109-1.644-5.76-4.152-7.274z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Android App</h3>
            <p className="text-sm text-gray-600 mb-4">
              Available on Google Play
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Download for Android
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">App Features:</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Access all courses offline</li>
            <li>Push notifications for live classes</li>
            <li>Track your progress on the go</li>
            <li>Download videos for offline viewing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
