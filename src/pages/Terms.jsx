import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-500">Last updated: January 2025</p>
        </div>

        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-6">
          <CardContent className="p-8 prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mt-0">Agreement to Terms</h2>
            <p className="text-gray-400">
              By accessing or using BlockNode.app services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">API Usage</h2>
            <p className="text-gray-400">
              When using our API services, you agree to:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>Use the API only for lawful purposes</li>
              <li>Not exceed rate limits specified in your plan</li>
              <li>Keep your API keys secure and confidential</li>
              <li>Not attempt to circumvent usage limitations</li>
              <li>Not use the API to harm our infrastructure or other users</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">Account Responsibilities</h2>
            <p className="text-gray-400">
              You are responsible for:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your use complies with all applicable laws</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">Service Availability</h2>
            <p className="text-gray-400">
              While we strive for 99.99% uptime, we do not guarantee uninterrupted access to our services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Intellectual Property</h2>
            <p className="text-gray-400">
              All content, features, and functionality of BlockNode.app are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Payment Terms</h2>
            <p className="text-gray-400">
              For paid plans:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>Fees are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
              <li>You authorize us to charge your payment method for all fees</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">Limitation of Liability</h2>
            <p className="text-gray-400">
              To the maximum extent permitted by law, BlockNode.app shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Termination</h2>
            <p className="text-gray-400">
              We may terminate or suspend your account and access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Governing Law</h2>
            <p className="text-gray-400">
              These Terms shall be governed by and construed in accordance with applicable international laws, without regard to conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Changes to Terms</h2>
            <p className="text-gray-400">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through our platform.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Contact Information</h2>
            <p className="text-gray-400">
              For questions about these Terms, please contact us through our support channels.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}