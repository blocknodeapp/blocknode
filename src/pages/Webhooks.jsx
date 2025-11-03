import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Webhooks() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl">
          <CardContent className="py-20 px-8">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                <Construction className="w-12 h-12 text-purple-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Webhooks Coming Soon
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto">
              We're building an advanced webhook system to deliver real-time events
              directly to your application. Stay tuned!
            </p>
            
            <div className="bg-slate-950/50 border border-purple-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                What to expect:
              </h3>
              <ul className="text-left text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Real-time price alerts and market updates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Customizable event triggers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Automatic retry mechanism
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Delivery logs and monitoring
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Dashboard")}>
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
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