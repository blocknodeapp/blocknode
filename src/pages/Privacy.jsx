import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: January 2025</p>
        </div>

        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-6">
          <CardContent className="p-8 prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mt-0">Introduction</h2>
            <p className="text-gray-400">
              At BlockNode.app, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our API platform and services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Information We Collect</h2>
            <p className="text-gray-400">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>Account information (name, email address)</li>
              <li>API usage data and statistics</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Technical data (IP address, browser type, device information)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">How We Use Your Information</h2>
            <p className="text-gray-400">
              We use the information we collect to:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">Data Security</h2>
            <p className="text-gray-400">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. All API keys are encrypted using military-grade encryption.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Data Retention</h2>
            <p className="text-gray-400">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Your Rights</h2>
            <p className="text-gray-400">
              You have the right to:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">Third-Party Services</h2>
            <p className="text-gray-400">
              Our services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Changes to This Policy</h2>
            <p className="text-gray-400">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">Contact Us</h2>
            <p className="text-gray-400">
              If you have any questions about this Privacy Policy, please contact us through our support channels.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}