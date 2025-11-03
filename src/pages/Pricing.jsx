import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for testing and small projects",
      features: [
        "1,000 API calls per hour",
        "Basic endpoints access",
        "Community support",
        "99.9% uptime SLA",
        "Email support"
      ],
      highlighted: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      description: "For growing businesses and startups",
      features: [
        "10,000 API calls per hour",
        "All endpoints access",
        "Priority support",
        "99.95% uptime SLA",
        "WebSocket support",
        "Advanced analytics",
        "Custom rate limits"
      ],
      highlighted: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large-scale applications",
      features: [
        "Unlimited API calls",
        "Dedicated infrastructure",
        "24/7 premium support",
        "99.99% uptime SLA",
        "Custom integrations",
        "White-label options",
        "SLA guarantees",
        "Dedicated account manager"
      ],
      highlighted: false,
      cta: "Contact Sales"
    }
  ];

  const handleGetStarted = async () => {
    const isAuth = await base44.auth.isAuthenticated();
    if (isAuth) {
      window.location.href = "/Dashboard";
    } else {
      base44.auth.redirectToLogin();
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-slate-900/50 backdrop-blur-xl transition-all duration-300 ${
                plan.highlighted
                  ? "border-purple-500 border-2 transform scale-105"
                  : "border-purple-500/20 hover:border-purple-500/40"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period !== "contact us" && (
                    <span className="text-gray-400 ml-2">/ {plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handleGetStarted}
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "What happens if I exceed my rate limit?",
                a: "You'll receive a 429 error response. You can upgrade your plan for higher limits or wait for the next hour."
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee for all paid plans, no questions asked."
              },
              {
                q: "Is there a free trial for Pro plan?",
                a: "Yes, you get a 14-day free trial when you sign up for the Pro plan. No credit card required."
              }
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}