import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Code2,
  CheckCircle2,
  Brain,
  Cpu,
  Network,
  Sparkles,
  Layers,
  Bot,
  Copy,
  Check
} from "lucide-react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [caAddress, setCaAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        setIsLoading(true);
        const settings = await base44.entities.SiteSettings.list();
        console.log("Fetched settings:", settings);
        if (settings && settings.length > 0 && settings[0].ca_address) {
          console.log("CA Address found:", settings[0].ca_address);
          setCaAddress(settings[0].ca_address);
        } else {
          console.log("No CA address found in settings");
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSiteSettings();
  }, []);

  const copyToClipboard = () => {
    if (caAddress) {
      navigator.clipboard.writeText(caAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Machine learning models predict market trends with 94% accuracy"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-50ms response times with X402 quantum-optimized infrastructure"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption with X402 blockchain verification"
    },
    {
      icon: Network,
      title: "X402 Network",
      description: "Integrated with X402 ecosystem for seamless cross-chain data"
    },
    {
      icon: Cpu,
      title: "Smart Contracts AI",
      description: "Automatically analyze smart contracts with AI risk detection"
    },
    {
      icon: Bot,
      title: "Trading Bots API",
      description: "Connect AI trading bots with X402 protocol integration"
    }
  ];

  const x402Features = [
    {
      icon: Layers,
      title: "Multi-Chain Support",
      description: "Access data from 50+ blockchains through X402 protocol"
    },
    {
      icon: Sparkles,
      title: "AI Market Predictions",
      description: "Neural networks trained on X402 ecosystem data"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Real-time data from 200+ exchanges via X402 nodes"
    }
  ];

  const stats = [
    { value: "50M+", label: "AI Predictions Daily" },
    { value: "8000+", label: "X402 Developers" },
    { value: "50+", label: "Blockchains" },
    { value: "99.99%", label: "AI Uptime" }
  ];

  return (
    <div className="relative">
      {/* Cursor Follow Effect */}
      <div
        className="fixed pointer-events-none z-0 opacity-20 blur-3xl transition-all duration-1000"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(128,128,128,0.1) 50%, transparent 70%)'
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/20" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gray-800 text-gray-400 text-sm mb-4 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Powered by X402 Ecosystem & AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-fade-in">
              The API Layer for
              <br />
              <span className="bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent">
                Web3 Innovators
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Access real-time blockchain data with AI predictions across 50+ chains.
              Built on X402 protocol for maximum reliability and speed.
            </p>

            {/* CA Address Display */}
            {!isLoading && caAddress && caAddress.trim() !== "" && (
              <div className="max-w-2xl mx-auto mt-6">
                <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-left">
                        <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Contract Address</p>
                        <code className="text-sm md:text-base text-white font-mono break-all">
                          {caAddress}
                        </code>
                      </div>
                      <Button
                        size="icon"
                        onClick={copyToClipboard}
                        className="bg-white/10 hover:bg-white/20 border border-gray-700 flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to={createPageUrl("Documentation")}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 group font-medium"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl("Documentation")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-900 text-lg px-8 py-6 backdrop-blur-xl"
                >
                  View AI Docs
                </Button>
              </Link>
            </div>

            {/* Code Preview */}
            <div className="mt-12 max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300">
              <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl overflow-hidden shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-sm text-gray-500 ml-2">AI-Powered API Request</span>
                  </div>
                  <pre className="text-left text-sm text-gray-300 overflow-x-auto">
                    <code>{`// Get AI market prediction with X402 verification
const prediction = await blocknode.ai.predict({
  symbol: "BTC/USD",
  timeframe: "24h",
  x402_verified: true,
  ai_model: "quantum-neural-v2"
});

// Response
{
  "price_prediction": 45280.50,
  "confidence": 0.94,
  "x402_consensus": "verified",
  "ai_sentiment": "bullish",
  "risk_score": 0.23
}`}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800 bg-black/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-gray-800/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* X402 Ecosystem Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gray-800 text-gray-400 text-sm mb-6">
              <Network className="w-4 h-4" />
              Powered by X402 Protocol
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              X402 Ecosystem Integration
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Leverage the power of X402's decentralized network for unparalleled data accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {x402Features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-800/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative z-10">
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
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gray-800 text-gray-400 text-sm mb-6">
              <Brain className="w-4 h-4" />
              AI-Powered Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for the AI Era
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced features powered by cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-800/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative z-10">
                  <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-gray-800/5 to-white/5" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="bg-gradient-to-br from-white/5 to-gray-800/10 border-gray-800 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl" />
            
            <CardContent className="p-12 md:p-16 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gray-800 text-gray-400 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Join the AI Revolution
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Start using BlockNode.app with X402 integration today. Free tier includes 1,000 AI predictions per hour.
              </p>
              <Link to={createPageUrl("Documentation")}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 font-medium"
                >
                  Start Building Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}