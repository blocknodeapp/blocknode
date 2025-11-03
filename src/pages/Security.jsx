import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data transmission is encrypted using TLS 1.3 with 256-bit encryption"
    },
    {
      icon: Key,
      title: "Secure API Keys",
      description: "API keys are hashed and encrypted at rest using military-grade AES-256 encryption"
    },
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "24/7 security monitoring and automated threat detection systems"
    },
    {
      icon: Shield,
      title: "DDoS Protection",
      description: "Advanced DDoS mitigation protecting against attacks up to 100+ Gbps"
    },
    {
      icon: CheckCircle2,
      title: "Regular Audits",
      description: "Third-party security audits and penetration testing on a quarterly basis"
    },
    {
      icon: AlertTriangle,
      title: "Incident Response",
      description: "Dedicated security team with 24/7 incident response capabilities"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 border border-gray-800 rounded-lg mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Security at BlockNode.app
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your security is our top priority. We employ industry-leading security measures to protect your data and ensure the integrity of our platform.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compliance Section */}
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-6">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Compliance & Certifications</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                BlockNode.app maintains compliance with international security standards and regulations:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>SOC 2 Type II certified for security controls and data protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>GDPR compliant data handling and processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>ISO 27001 certified information security management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>PCI DSS compliant payment processing</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-6">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Security Best Practices</h2>
            <div className="space-y-4 text-gray-400">
              <p>To keep your account secure, we recommend:</p>
              <ul className="space-y-3 ml-6">
                <li>• Use strong, unique passwords and enable two-factor authentication</li>
                <li>• Never share your API keys or embed them in client-side code</li>
                <li>• Rotate API keys regularly and immediately revoke compromised keys</li>
                <li>• Monitor your API usage for unusual patterns or unauthorized access</li>
                <li>• Use environment variables to store API keys in your applications</li>
                <li>• Implement rate limiting and input validation in your applications</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Reporting */}
        <Card className="bg-gradient-to-br from-red-900/10 to-orange-900/10 border-red-900/30 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h2 className="text-3xl font-bold text-white">Report a Vulnerability</h2>
            </div>
            <p className="text-gray-400 mb-4">
              If you discover a security vulnerability, please report it to us immediately. We take all security reports seriously and will respond promptly.
            </p>
            <p className="text-gray-400">
              Contact our security team at: <span className="text-white font-mono">security@blocknode.app</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}