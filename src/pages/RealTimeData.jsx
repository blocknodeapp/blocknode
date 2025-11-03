import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, Radio, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function RealTimeData() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl">
          <CardContent className="py-20 px-8">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <Construction className="w-12 h-12 text-cyan-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Radio className="w-4 h-4 text-white animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Real-time Streaming Coming Soon
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto">
              Get instant access to live market data through WebSocket connections.
              Ultra-low latency updates for professional trading applications.
            </p>
            
            <div className="bg-slate-950/50 border border-purple-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                Planned features:
              </h3>
              <ul className="text-left text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  Live price feeds with sub-millisecond latency
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  Order book depth streaming
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  Trade execution notifications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  Multi-exchange aggregation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  Historical data replay
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4 mb-8">
              <p className="text-cyan-300 text-sm">
                💡 <strong>Early Access:</strong> Sign up to be notified when WebSocket streaming goes live
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Dashboard")}>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Back to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to={createPageUrl("Documentation")}>
                <Button variant="outline" className="border-purple-500/30 text-white hover:bg-white/5">
                  View Documentation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}