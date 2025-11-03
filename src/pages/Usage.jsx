import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Activity, Clock, Zap } from "lucide-react";

export default function Usage() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await base44.auth.me();
        setIsAuthChecked(true);
      } catch (error) {
        base44.auth.redirectToLogin();
      }
    };
    checkAuth();
  }, []);

  const { data: apiKeys } = useQuery({
    queryKey: ["apiKeys"],
    queryFn: () => base44.entities.ApiKey.list(),
    initialData: [],
    enabled: isAuthChecked
  });

  // Mock data for charts
  const dailyUsageData = [
    { date: "Jan 9", calls: 850 },
    { date: "Jan 10", calls: 920 },
    { date: "Jan 11", calls: 1100 },
    { date: "Jan 12", calls: 780 },
    { date: "Jan 13", calls: 1350 },
    { date: "Jan 14", calls: 990 },
    { date: "Jan 15", calls: 1200 }
  ];

  const endpointUsageData = [
    { endpoint: "/v1/ticker", calls: 3450 },
    { endpoint: "/v1/orderbook", calls: 2100 },
    { endpoint: "/v1/trades", calls: 1800 },
    { endpoint: "/v1/historical", calls: 950 }
  ];

  const totalCalls = apiKeys.reduce((sum, key) => sum + (key.calls_count || 0), 0);
  const avgCallsPerDay = Math.round(totalCalls / 7);

  const stats = [
    {
      title: "Total API Calls",
      value: totalCalls.toLocaleString(),
      icon: Activity,
      color: "from-gray-800 to-gray-900",
      change: "+12.3%"
    },
    {
      title: "Avg. Calls/Day",
      value: avgCallsPerDay.toLocaleString(),
      icon: TrendingUp,
      color: "from-gray-700 to-gray-800",
      change: "+8.1%"
    },
    {
      title: "Avg. Response Time",
      value: "87ms",
      icon: Clock,
      color: "from-gray-600 to-gray-700",
      change: "-5.2%"
    },
    {
      title: "Success Rate",
      value: "99.8%",
      icon: Zap,
      color: "from-gray-800 to-black",
      change: "+0.3%"
    }
  ];

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Usage Analytics</h1>
          <p className="text-gray-400 text-lg">
            Monitor your API usage and performance metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gray-950/50 border-gray-800 backdrop-blur-xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} border border-gray-800 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Usage Chart */}
          <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Daily API Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="#fff"
                    strokeWidth={3}
                    dot={{ fill: "#fff", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Endpoint Usage Chart */}
          <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Endpoint Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={endpointUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="endpoint" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                  />
                  <Bar dataKey="calls" fill="#fff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* API Key Usage Breakdown */}
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">API Key Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {apiKeys.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No API keys created yet
              </p>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">{key.name}</p>
                      <code className="text-sm text-gray-500">
                        {key.key.substring(0, 20)}...
                      </code>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white mb-1">
                        {(key.calls_count || 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">API calls</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}