import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Brain, Sparkles, Network, Zap } from "lucide-react";

export default function Documentation() {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      id: "ai-predict",
      method: "POST",
      path: "/v1/ai/predict",
      title: "AI Market Prediction",
      description: "Get AI-powered price predictions using quantum neural networks",
      badge: "AI",
      badgeColor: "bg-gray-800 text-white border-gray-700",
      params: [
        { name: "symbol", type: "string", required: true, description: "Trading pair (e.g., BTC/USD)" },
        { name: "timeframe", type: "string", required: true, description: "Prediction timeframe (1h, 24h, 7d)" },
        { name: "ai_model", type: "string", required: false, description: "AI model (quantum-neural-v2, deep-learning-v1)" },
        { name: "x402_verified", type: "boolean", required: false, description: "Verify through X402 consensus" }
      ],
      example: `curl -X POST "https://api.blocknode.app/v1/ai/predict" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "BTC/USD",
    "timeframe": "24h",
    "ai_model": "quantum-neural-v2",
    "x402_verified": true
  }'`,
      response: `{
  "symbol": "BTC/USD",
  "current_price": 43250.50,
  "predicted_price": 45280.50,
  "confidence": 0.94,
  "timeframe": "24h",
  "ai_model": "quantum-neural-v2",
  "x402_consensus": "verified",
  "sentiment": "bullish",
  "risk_score": 0.23,
  "factors": [
    "whale_accumulation",
    "positive_news_sentiment",
    "technical_breakout"
  ]
}`
    },
    {
      id: "x402-consensus",
      method: "GET",
      path: "/v1/x402/consensus",
      title: "X402 Network Consensus",
      description: "Get decentralized consensus data from X402 nodes",
      badge: "X402",
      badgeColor: "bg-gray-800 text-white border-gray-700",
      params: [
        { name: "symbol", type: "string", required: true, description: "Trading pair" },
        { name: "nodes", type: "integer", required: false, description: "Number of X402 nodes to query (default: 50)" }
      ],
      example: `curl -X GET "https://api.blocknode.app/v1/x402/consensus?symbol=ETH/USD&nodes=100" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "symbol": "ETH/USD",
  "consensus_price": 2251.75,
  "node_count": 100,
  "agreement_rate": 0.98,
  "x402_network_health": "excellent",
  "verification_time_ms": 42,
  "outliers_filtered": 2
}`
    },
    {
      id: "ticker",
      method: "GET",
      path: "/v1/ticker",
      title: "Get Ticker Data",
      description: "Retrieve real-time price and market data for a cryptocurrency pair",
      params: [
        { name: "symbol", type: "string", required: true, description: "Trading pair (e.g., BTC/USD)" }
      ],
      example: `curl -X GET "https://api.blocknode.app/v1/ticker?symbol=BTC/USD" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "symbol": "BTC/USD",
  "price": 43250.50,
  "change_24h": 2.3,
  "high_24h": 43800.00,
  "low_24h": 42100.00,
  "volume": 28453920000,
  "x402_verified": true,
  "timestamp": "2025-01-15T10:30:00Z"
}`
    },
    {
      id: "ai-sentiment",
      method: "GET",
      path: "/v1/ai/sentiment",
      title: "AI Market Sentiment",
      description: "Analyze market sentiment using NLP and social media AI",
      badge: "AI",
      badgeColor: "bg-gray-800 text-white border-gray-700",
      params: [
        { name: "symbol", type: "string", required: true, description: "Trading pair" },
        { name: "sources", type: "array", required: false, description: "Data sources (twitter, reddit, news)" }
      ],
      example: `curl -X GET "https://api.blocknode.app/v1/ai/sentiment?symbol=BTC/USD" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "symbol": "BTC/USD",
  "overall_sentiment": "bullish",
  "sentiment_score": 0.78,
  "social_volume": 125000,
  "news_sentiment": 0.82,
  "twitter_sentiment": 0.75,
  "reddit_sentiment": 0.76,
  "fear_greed_index": 72,
  "ai_confidence": 0.91
}`
    },
    {
      id: "smart-contract",
      method: "POST",
      path: "/v1/ai/analyze-contract",
      title: "AI Smart Contract Analysis",
      description: "Analyze smart contracts for vulnerabilities using AI",
      badge: "AI",
      badgeColor: "bg-gray-800 text-white border-gray-700",
      params: [
        { name: "contract_address", type: "string", required: true, description: "Smart contract address" },
        { name: "chain", type: "string", required: true, description: "Blockchain network" },
        { name: "deep_scan", type: "boolean", required: false, description: "Enable deep AI analysis" }
      ],
      example: `curl -X POST "https://api.blocknode.app/v1/ai/analyze-contract" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contract_address": "0x...",
    "chain": "ethereum",
    "deep_scan": true
  }'`,
      response: `{
  "contract_address": "0x...",
  "chain": "ethereum",
  "risk_score": 0.12,
  "security_grade": "A",
  "vulnerabilities": [],
  "gas_optimization": "high",
  "code_quality": 0.95,
  "ai_recommendations": [
    "Contract follows best practices",
    "No critical vulnerabilities detected"
  ]
}`
    },
    {
      id: "orderbook",
      method: "GET",
      path: "/v1/orderbook",
      title: "Get Order Book",
      description: "Fetch the current order book with X402 aggregation",
      badge: "X402",
      badgeColor: "bg-gray-800 text-white border-gray-700",
      params: [
        { name: "symbol", type: "string", required: true, description: "Trading pair" },
        { name: "depth", type: "integer", required: false, description: "Number of levels (default: 20)" },
        { name: "x402_aggregate", type: "boolean", required: false, description: "Aggregate across X402 nodes" }
      ],
      example: `curl -X GET "https://api.blocknode.app/v1/orderbook?symbol=ETH/USD&depth=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "symbol": "ETH/USD",
  "bids": [
    [2250.50, 10.5],
    [2250.00, 8.2]
  ],
  "asks": [
    [2251.00, 5.8],
    [2251.50, 12.3]
  ],
  "x402_verified": true,
  "timestamp": "2025-01-15T10:30:00Z"
}`
    },
    {
      id: "ai-portfolio",
      method: "POST",
      path: "/v1/ai/optimize-portfolio",
      title: "AI Portfolio Optimization",
      description: "Get AI-optimized portfolio allocation recommendations",
      badge: "AI",
      badgeColor: "bg-gray-800 text-white border-gray-700",
      params: [
        { name: "assets", type: "array", required: true, description: "List of assets to optimize" },
        { name: "risk_tolerance", type: "string", required: true, description: "Risk level (low, medium, high)" },
        { name: "timeframe", type: "string", required: false, description: "Investment timeframe" }
      ],
      example: `curl -X POST "https://api.blocknode.app/v1/ai/optimize-portfolio" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assets": ["BTC", "ETH", "SOL", "ADA"],
    "risk_tolerance": "medium",
    "timeframe": "long_term"
  }'`,
      response: `{
  "optimized_allocation": {
    "BTC": 40,
    "ETH": 35,
    "SOL": 15,
    "ADA": 10
  },
  "expected_return": 0.45,
  "risk_score": 0.38,
  "sharpe_ratio": 1.82,
  "ai_confidence": 0.89,
  "rebalance_recommendation": "monthly"
}`
    },
    {
      id: "historical",
      method: "GET",
      path: "/v1/historical",
      title: "Get Historical Data",
      description: "Access historical OHLCV data with AI-enhanced accuracy",
      params: [
        { name: "symbol", type: "string", required: true, description: "Trading pair" },
        { name: "interval", type: "string", required: true, description: "Time interval (1m, 5m, 1h, 1d)" },
        { name: "from", type: "timestamp", required: false, description: "Start time" },
        { name: "to", type: "timestamp", required: false, description: "End time" }
      ],
      example: `curl -X GET "https://api.blocknode.app/v1/historical?symbol=BTC/USD&interval=1h" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "symbol": "BTC/USD",
  "interval": "1h",
  "data": [
    {
      "timestamp": "2025-01-15T10:00:00Z",
      "open": 43100.00,
      "high": 43300.00,
      "low": 43050.00,
      "close": 43250.50,
      "volume": 1234567890
    }
  ]
}`
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gray-800 text-gray-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              AI & X402 Powered API
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Complete reference for integrating with BlockNode.app. Harness AI predictions 
              and X402 consensus for your applications.
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-8 hover:border-gray-600 transition-all">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-white" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Get Your API Key
              </h3>
              <p className="text-gray-500 ml-8">
                Sign up for a free account and generate your API key from the dashboard.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Authentication
              </h3>
              <p className="text-gray-500 mb-2 ml-8">
                Include your API key in the Authorization header:
              </p>
              <div className="bg-black/50 p-4 rounded-lg border border-gray-800 ml-8">
                <code className="text-gray-300 text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Base URL
              </h3>
              <div className="bg-black/50 p-4 rounded-lg border border-gray-800 ml-8">
                <code className="text-white text-sm">
                  https://api.blocknode.app
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Rate Limits & Features
              </h3>
              <div className="ml-8 space-y-2">
                <p className="text-gray-500">
                  <strong className="text-white">Free tier:</strong> 1,000 requests/hour + 100 AI predictions
                </p>
                <p className="text-gray-500">
                  <strong className="text-white">Pro:</strong> 10,000 requests/hour + 1,000 AI predictions
                </p>
                <p className="text-gray-500">
                  <strong className="text-white">Enterprise:</strong> Unlimited + Advanced AI models + X402 Priority
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Badge className="bg-gray-800 text-white border-gray-700 border px-4 py-2">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered
          </Badge>
          <Badge className="bg-gray-800 text-white border-gray-700 border px-4 py-2">
            <Network className="w-4 h-4 mr-2" />
            X402 Network
          </Badge>
          <Badge className="bg-gray-800 text-white border-gray-700 border px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Real-time
          </Badge>
        </div>

        {/* Endpoints */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">API Endpoints</h2>
          
          {endpoints.map((endpoint) => (
            <Card
              key={endpoint.id}
              className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all group"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <Badge
                        className={`${
                          endpoint.method === "GET"
                            ? "bg-green-900 text-green-300 border-green-800"
                            : "bg-blue-900 text-blue-300 border-blue-800"
                        } border`}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-gray-300 text-sm font-mono">
                        {endpoint.path}
                      </code>
                      {endpoint.badge && (
                        <Badge className={`${endpoint.badgeColor} border`}>
                          {endpoint.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-white group-hover:text-gray-300 transition-colors">
                      {endpoint.title}
                    </CardTitle>
                    <p className="text-gray-500 mt-2">{endpoint.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parameters */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Parameters</h4>
                  <div className="space-y-2">
                    {endpoint.params.map((param, idx) => (
                      <div
                        key={idx}
                        className="bg-black/50 p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <code className="text-white text-sm">{param.name}</code>
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-700 text-gray-400"
                          >
                            {param.type}
                          </Badge>
                          {param.required && (
                            <Badge className="text-xs bg-red-900 text-red-300 border-red-800 border">
                              required
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example */}
                <Tabs defaultValue="request" className="w-full">
                  <TabsList className="bg-black/50 border border-gray-800">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="request">
                    <div className="relative">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 text-gray-500 hover:text-white z-10"
                        onClick={() => copyToClipboard(endpoint.example, `${endpoint.id}-request`)}
                      >
                        {copiedEndpoint === `${endpoint.id}-request` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <pre className="bg-black/50 p-4 rounded-lg border border-gray-800 overflow-x-auto">
                        <code className="text-gray-300 text-sm">{endpoint.example}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="response">
                    <div className="relative">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 text-gray-500 hover:text-white z-10"
                        onClick={() => copyToClipboard(endpoint.response, `${endpoint.id}-response`)}
                      >
                        {copiedEndpoint === `${endpoint.id}-response` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <pre className="bg-black/50 p-4 rounded-lg border border-gray-800 overflow-x-auto">
                        <code className="text-gray-300 text-sm">{endpoint.response}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Error Codes */}
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mt-8">
          <CardHeader>
            <CardTitle className="text-white">Error Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { code: "400", message: "Bad Request - Invalid parameters" },
                { code: "401", message: "Unauthorized - Invalid API key" },
                { code: "403", message: "Forbidden - Rate limit exceeded or insufficient permissions" },
                { code: "404", message: "Not Found - Endpoint doesn't exist" },
                { code: "429", message: "Too Many Requests - Slow down or upgrade plan" },
                { code: "500", message: "Internal Server Error - We're working on it" },
                { code: "503", message: "Service Unavailable - X402 network temporarily down" }
              ].map((error) => (
                <div
                  key={error.code}
                  className="flex items-center gap-4 bg-black/50 p-3 rounded-lg border border-gray-800 hover:border-red-900/40 transition-all"
                >
                  <code className="text-red-400 font-semibold">{error.code}</code>
                  <span className="text-gray-500">{error.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}