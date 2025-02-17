import React from 'react';
import { Scale, ShoppingCart, Shield, AlertTriangle, FileText, Mail } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Terms and Conditions
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
                <Scale className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
              </div>
              <p className="text-gray-600">
                By accessing or using AddiPath's website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            {/* E-commerce Terms */}
            <section>
              <div className="flex items-center mb-4">
                <ShoppingCart className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">E-commerce Terms</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-lg font-semibold text-gray-800">Orders and Payments</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All orders are subject to product availability</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Payment must be received in full before order fulfillment</li>
                  <li>We accept major credit cards and secure online payment methods</li>
                  <li>All transactions are processed in USD</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800">Shipping and Delivery</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Shipping costs are calculated at checkout</li>
                  <li>International orders may be subject to customs duties</li>
                  <li>Risk of loss transfers upon delivery to carrier</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800">Returns and Refunds</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>30-day return policy for unused items in original packaging</li>
                  <li>Refunds will be processed within 14 business days</li>
                  <li>Shipping costs for returns are the customer's responsibility</li>
                  <li>Digital products are non-refundable once accessed</li>
                </ul>
              </div>
            </section>

            {/* Account Terms */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Account Terms</h2>
              </div>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>You must be 18 years or older to create an account</li>
                <li>You are responsible for maintaining account security</li>
                <li>Account sharing is prohibited</li>
                <li>We reserve the right to terminate accounts for violations</li>
                <li>You must provide accurate and complete information</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  All content, features, and functionality are owned by AddiPath and protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Content may not be copied or reproduced without permission</li>
                  <li>Our trademarks may not be used without written consent</li>
                  <li>User-generated content remains your property but grants us license to use</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  AddiPath is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>
                <p>
                  Medical information provided is for general purposes only and should not replace professional medical advice.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>
              <p className="text-gray-600">
                For questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 text-gray-600">
                <p>Email: legal@addipath.com</p>
                <p>Address: 123 AddiPath Street, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}