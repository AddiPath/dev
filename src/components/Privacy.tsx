import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Last updated: March 15, 2024
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
              </div>
              <p className="text-gray-600">
                AddiPath ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Name and contact information</li>
                  <li>Date of birth</li>
                  <li>Medical information related to Addison's Disease</li>
                  <li>Emergency contact details</li>
                  <li>Healthcare provider information</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800">Usage Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Send medication reminders and important updates</li>
                <li>Process and manage your emergency ID information</li>
                <li>Improve and personalize your experience</li>
                <li>Communicate with you about our services</li>
                <li>Ensure the security of your account</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Data Protection</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  We implement appropriate technical and organizational measures to maintain the security of your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Regular staff training on data protection</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <div className="space-y-4 text-gray-600">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-gray-600">
                <p>Email: privacy@addipath.com</p>
                <p>Address: 123 AddiPath Street, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}