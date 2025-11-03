
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Key, Copy, Check, Trash2, Plus, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function ApiKeys() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyEnvironment, setNewKeyEnvironment] = useState("development");
  const [copiedKey, setCopiedKey] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        setIsAuthChecked(true);
      } catch (error) {
        console.error("Auth error:", error);
        base44.auth.redirectToLogin();
      }
    };
    checkAuth();
  }, []);

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ["apiKeys"],
    queryFn: () => base44.entities.ApiKey.list("-created_date"),
    initialData: [],
    enabled: isAuthChecked && !!user
  });

  const createKeyMutation = useMutation({
    mutationFn: async (keyData) => {
      if (!user || !user.email) {
        throw new Error("You must be logged in to create an API key");
      }

      setError(null);
      
      // Generate a more secure random key
      const randomKey = `sk_${keyData.environment.substring(0, 4)}_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 15)}`;
      
      console.log("Creating API key with data:", {
        name: keyData.name,
        environment: keyData.environment,
        key: randomKey,
        status: "active",
        calls_count: 0
      });
      
      try {
        const result = await base44.entities.ApiKey.create({
          name: keyData.name,
          environment: keyData.environment,
          key: randomKey,
          status: "active",
          calls_count: 0
        });
        
        console.log("API key created successfully:", result);
        return result;
      } catch (err) {
        console.error("Error in create call:", err);
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log("Create mutation succeeded:", data);
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
      setShowCreateDialog(false);
      setNewKeyName("");
      setNewKeyEnvironment("development");
      setError(null);
    },
    onError: (error) => {
      console.error("Create mutation error:", error);
      let errorMessage = "Failed to create API key. Please try again.";
      
      if (error.response) {
        // Server responded with an error
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    }
  });

  const deleteKeyMutation = useMutation({
    mutationFn: (keyId) => base44.entities.ApiKey.delete(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
    onError: (error) => {
      console.error("Error deleting API key:", error);
      let errorMessage = "Failed to delete API key. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    }
  });

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      setError("Please enter a name for your API key");
      return;
    }

    if (!user || !user.email) {
      setError("You must be logged in to create an API key");
      return;
    }
    
    console.log("Attempting to create key with name:", newKeyName, "environment:", newKeyEnvironment);
    
    try {
      await createKeyMutation.mutateAsync({
        name: newKeyName.trim(),
        environment: newKeyEnvironment
      });
    } catch (err) {
      console.error("Error in handleCreateKey:", err);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  if (!isAuthChecked || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">API Keys</h1>
            <p className="text-gray-400 text-lg">
              Create and manage your API keys for authentication
            </p>
            {user && (
              <p className="text-sm text-gray-500 mt-2">
                Logged in as: {user.email}
              </p>
            )}
          </div>
          <Dialog open={showCreateDialog} onOpenChange={(open) => {
            setShowCreateDialog(open);
            if (!open) {
              setError(null);
              setNewKeyName("");
              setNewKeyEnvironment("development");
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-gray-200">
                <Plus className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {error && (
                  <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}
                <div>
                  <Label htmlFor="keyName">Key Name</Label>
                  <Input
                    id="keyName"
                    value={newKeyName}
                    onChange={(e) => {
                      setNewKeyName(e.target.value);
                      setError(null);
                    }}
                    placeholder="e.g., Production API Key"
                    className="bg-black/50 border-gray-800 text-white mt-2"
                    disabled={createKeyMutation.isPending}
                  />
                </div>
                <div>
                  <Label htmlFor="environment">Environment</Label>
                  <Select 
                    value={newKeyEnvironment} 
                    onValueChange={setNewKeyEnvironment}
                    disabled={createKeyMutation.isPending}
                  >
                    <SelectTrigger className="bg-black/50 border-gray-800 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-950 border-gray-800">
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCreateKey}
                  disabled={!newKeyName.trim() || createKeyMutation.isPending}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  {createKeyMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create API Key"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Global Error Display */}
        {error && !showCreateDialog && (
          <div className="mb-6 bg-red-900/20 border border-red-900/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-400">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        {/* API Keys List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
          </div>
        ) : apiKeys.length === 0 ? (
          <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl">
            <CardContent className="text-center py-20">
              <Key className="w-20 h-20 text-gray-700 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">No API Keys Yet</h3>
              <p className="text-gray-500 mb-6">
                Create your first API key to start making requests
              </p>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Key
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <Card
                key={key.id}
                className="bg-gray-950/50 border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-3">
                        {key.name}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            key.status === "active"
                              ? "bg-green-900 text-green-300"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {key.status}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                          {key.environment}
                        </span>
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Created on {format(new Date(key.created_date), "MMM d, yyyy")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteKeyMutation.mutate(key.id)}
                      className="text-gray-500 hover:text-red-400"
                      disabled={deleteKeyMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* API Key Display */}
                  <div>
                    <Label className="text-gray-500 text-sm">API Key</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-black/50 border border-gray-800 rounded-lg p-3">
                        <code className="text-gray-300 text-sm break-all">
                          {visibleKeys.has(key.id)
                            ? key.key
                            : `${key.key.substring(0, 12)}${"•".repeat(20)}`}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="border-gray-800 hover:bg-gray-900"
                      >
                        {visibleKeys.has(key.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="border-gray-800 hover:bg-gray-900"
                      >
                        {copiedKey === key.id ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-black/50 p-3 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-500 mb-1">Total Calls</p>
                      <p className="text-xl font-semibold text-white">
                        {(key.calls_count || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-500 mb-1">Rate Limit</p>
                      <p className="text-xl font-semibold text-white">
                        {(key.rate_limit || 1000).toLocaleString()}/hr
                      </p>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-gray-800">
                      <p className="text-xs text-gray-500 mb-1">Last Used</p>
                      <p className="text-sm font-semibold text-white">
                        {key.last_used
                          ? format(new Date(key.last_used), "MMM d")
                          : "Never"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
