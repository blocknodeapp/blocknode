
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, BarChart3, ArrowRight, Activity, Brain, Upload, X as XIcon, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [caAddress, setCaAddress] = useState("");
  const [xSocialLink, setXSocialLink] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [siteSettingsId, setSiteSettingsId] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        setIsAuthChecked(true);
      } catch (error) {
        base44.auth.redirectToLogin();
      }
    };
    fetchUser();
  }, []);

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ["apiKeys"],
    queryFn: () => base44.entities.ApiKey.list("-created_date"),
    initialData: [],
    enabled: isAuthChecked && !!user
  });

  const { data: siteSettings, refetch: refetchSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      const settings = await base44.entities.SiteSettings.list();
      return settings[0] || null;
    },
    enabled: isAuthChecked && !!user && user?.role === 'admin'
  });

  useEffect(() => {
    if (siteSettings) {
      setCaAddress(siteSettings.ca_address || "");
      setXSocialLink(siteSettings.x_social_link || "https://x.com");
      setLogoUrl(siteSettings.logo_url || "");
      setSiteSettingsId(siteSettings.id);
    }
  }, [siteSettings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (data) => {
      if (siteSettingsId) {
        return await base44.entities.SiteSettings.update(siteSettingsId, data);
      } else {
        return await base44.entities.SiteSettings.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
      refetchSettings();
      setIsEditing(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      // Force page reload to update header
      setTimeout(() => window.location.reload(), 1000);
    }
  });

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file (PNG, JPG, SVG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size must be less than 5MB");
      return;
    }

    setIsUploadingLogo(true);
    try {
      console.log("Uploading logo file:", file.name);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      console.log("Logo uploaded successfully:", file_url);
      setLogoUrl(file_url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo. Please try again.");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl("");
  };

  const handleSaveSettings = async () => {
    await updateSettingsMutation.mutateAsync({
      ca_address: caAddress,
      x_social_link: xSocialLink,
      logo_url: logoUrl
    });
  };

  const totalCalls = apiKeys.reduce((sum, key) => sum + (key.calls_count || 0), 0);
  const activeKeys = apiKeys.filter(key => key.status === "active").length;

  const quickStats = [
    {
      title: "Total API Keys",
      value: apiKeys.length,
      icon: Key,
      color: "from-gray-800 to-gray-900",
      link: createPageUrl("ApiKeys")
    },
    {
      title: "Active Keys",
      value: activeKeys,
      icon: Activity,
      color: "from-gray-700 to-gray-800"
    },
    {
      title: "Total API Calls",
      value: totalCalls.toLocaleString(),
      icon: BarChart3,
      color: "from-gray-600 to-gray-700",
      link: createPageUrl("Usage")
    },
    {
      title: "AI Predictions",
      value: Math.floor(totalCalls * 0.15).toLocaleString(),
      icon: Brain,
      color: "from-gray-800 to-black"
    }
  ];

  if (!user || !isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen py-12 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user.full_name || user.email}
          </h1>
          <p className="text-gray-500 text-lg">
            Here's an overview of your BlockNode.app API usage
          </p>
        </div>

        {/* Global Website Settings Card - Only for Admins */}
        {isAdmin && (
          <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-8 hover:border-gray-600 transition-all">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-white">Global Website Settings</CardTitle>
                <span className="px-2 py-1 text-xs bg-orange-900/50 text-orange-300 border border-orange-700 rounded-full">
                  Admin Only
                </span>
                {uploadSuccess && (
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Saved!</span>
                  </div>
                )}
              </div>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-white"
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setCaAddress(siteSettings?.ca_address || "");
                      setXSocialLink(siteSettings?.x_social_link || "https://x.com");
                      setLogoUrl(siteSettings?.logo_url || "");
                    }}
                    className="border-gray-700 text-gray-400 hover:bg-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveSettings}
                    disabled={updateSettingsMutation.isPending}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    {updateSettingsMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Upload Section */}
              <div className="bg-black/30 border border-gray-800 rounded-lg p-6">
                <label className="text-base font-semibold text-white block mb-3 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Header Logo (Browse & Upload Image)
                </label>
                <p className="text-sm text-gray-400 mb-4">
                  Upload a custom logo to display in the header for all visitors. Supports PNG, JPG, SVG.
                </p>
                
                {isEditing ? (
                  <div className="space-y-4">
                    {/* Current Logo Preview */}
                    {logoUrl && (
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-3">Current Logo Preview:</p>
                        <div className="relative inline-block">
                          <img
                            src={logoUrl}
                            alt="Logo preview"
                            className="h-16 w-auto rounded-lg border-2 border-gray-700 bg-black p-2 max-w-xs"
                          />
                          <button
                            onClick={handleRemoveLogo}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                            title="Remove logo"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Upload Button */}
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="logo-upload"
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-lg text-white font-medium cursor-pointer hover:from-gray-700 hover:to-gray-600 transition-all ${
                          isUploadingLogo ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <Upload className="w-5 h-5" />
                        {isUploadingLogo ? "Uploading..." : logoUrl ? "Change Logo Image" : "Browse & Upload Logo"}
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/gif,image/webp"
                        onChange={handleLogoUpload}
                        disabled={isUploadingLogo}
                        className="hidden"
                      />
                      {isUploadingLogo && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-400">
                        <strong>💡 Tips:</strong>
                      </p>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1 ml-4">
                        <li>• PNG or SVG with transparent background works best</li>
                        <li>• Recommended height: 40-50px for best results</li>
                        <li>• Maximum file size: 5MB</li>
                        <li>• Click "Save Changes" after uploading to apply the logo</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    {logoUrl ? (
                      <div>
                        <p className="text-xs text-gray-400 mb-3">Current Logo:</p>
                        <img
                          src={logoUrl}
                          alt="Current logo"
                          className="h-16 w-auto rounded-lg border-2 border-gray-700 bg-black p-2 max-w-xs"
                        />
                      </div>
                    ) : (
                      <p className="text-white text-sm flex items-center gap-2">
                        <span className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                          <Brain className="w-5 h-5 text-gray-400" />
                        </span>
                        No custom logo (using default Brain icon)
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Contract Address */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Contract Address (Displays on Homepage for all visitors)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={caAddress}
                    onChange={(e) => setCaAddress(e.target.value)}
                    placeholder="Enter contract address"
                    className="w-full bg-black/50 border border-gray-800 rounded-lg p-3 text-white text-sm focus:border-gray-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-white font-mono text-sm bg-black/50 border border-gray-800 rounded-lg p-3">
                    {caAddress || "Not set"}
                  </p>
                )}
              </div>

              {/* X Social Link */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  X (Twitter) Social Link (Displays in Header & Footer)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={xSocialLink}
                    onChange={(e) => setXSocialLink(e.target.value)}
                    placeholder="https://x.com/yourusername"
                    className="w-full bg-black/50 border border-gray-800 rounded-lg p-3 text-white text-sm focus:border-gray-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-white text-sm bg-black/50 border border-gray-800 rounded-lg p-3">
                    {xSocialLink || "Not set"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 group cursor-pointer hover:scale-105"
              onClick={() => stat.link && (window.location.href = stat.link)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} border border-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.link && (
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent API Keys */}
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl mb-8 hover:border-gray-600 transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent API Keys</CardTitle>
            <Link to={createPageUrl("ApiKeys")}>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-white">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full bg-gray-900/50" />
                ))}
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-12">
                <Key className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No API keys yet</p>
                <Link to={createPageUrl("ApiKeys")}>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Create Your First API Key
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {apiKeys.slice(0, 3).map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-all group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-white">{key.name}</p>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            key.status === "active"
                              ? "bg-green-900 text-green-300"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {key.status}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800 text-gray-400">
                          {key.environment}
                        </span>
                      </div>
                      <code className="text-sm text-gray-500">
                        {key.key.substring(0, 20)}...
                      </code>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">API Calls</p>
                      <p className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">
                        {(key.calls_count || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link to={createPageUrl("ApiKeys")}>
            <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 group cursor-pointer h-full hover:scale-105">
              <CardContent className="p-6">
                <Key className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">Manage API Keys</h3>
                <p className="text-gray-500 text-sm">
                  Create, view, and manage your API keys
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to={createPageUrl("Usage")}>
            <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 group cursor-pointer h-full hover:scale-105">
              <CardContent className="p-6">
                <BarChart3 className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">View Usage</h3>
                <p className="text-gray-500 text-sm">
                  Track your API usage and AI analytics
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to={createPageUrl("Documentation")}>
            <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 group cursor-pointer h-full hover:scale-105">
              <CardContent className="p-6">
                <Brain className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">AI Documentation</h3>
                <p className="text-gray-500 text-sm">
                  Learn how to use AI-powered features
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
