import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Network, Zap, Shield, Users, Target } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Brain,
      title: "AI-First Innovation",
      description: "We leverage cutting-edge artificial intelligence to provide the most accurate and reliable blockchain data insights."
    },
    {
      icon: Network,
      title: "Decentralized Trust",
      description: "Built on the X402 protocol, ensuring data integrity through decentralized consensus and verification."
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with military-level encryption protecting your data and API keys at all times."
    },
    {
      icon: Users,
      title: "Developer Community",
      description: "Supporting over 8,000 developers building the future of Web3 with our powerful API infrastructure."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About BlockNode.app
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're building the infrastructure layer that powers the next generation of Web3 applications with AI-driven intelligence and decentralized reliability.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed mb-4">
              BlockNode.app was founded with a singular vision: to democratize access to high-quality blockchain data and make it accessible to developers worldwide. We believe that the future of finance and technology lies in decentralized systems, and we're committed to providing the tools that make building on blockchain effortless.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              By combining artificial intelligence with the reliability of the X402 decentralized network, we're creating an API platform that doesn't just deliver data—it delivers insights, predictions, and intelligence that help developers build smarter applications.
            </p>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <Card className="bg-gradient-to-br from-white/5 to-gray-800/10 border-gray-800 backdrop-blur-xl">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white text-center mb-12">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "50M+", label: "API Calls Daily" },
                { value: "8000+", label: "Active Developers" },
                { value: "50+", label: "Blockchains Supported" },
                { value: "99.99%", label: "Uptime Guarantee" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}