"use client";
import React from "react";

export default function CertificatesPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Earn a Certificate</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">
          Complete courses and assessments to earn certificates of achievement.
        </p>
        {/* Add your certificates content here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Course Certificates</h3>
            <p className="text-sm text-gray-600">
              Complete courses to earn certificates
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Achievement Badges</h3>
            <p className="text-sm text-gray-600">
              Unlock badges for milestones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
