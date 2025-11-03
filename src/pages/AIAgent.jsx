import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Loader2, Sparkles, Plus, MessageSquare, LogIn, User } from "lucide-react";
import MessageBubble from "../components/MessageBubble";

export default function AIAgent() {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const messagesEndRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await base44.auth.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        }
        setIsAuthChecked(true);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthChecked) return;
    
    if (isAuthenticated) {
      loadConversations();
    } else {
      setIsLoadingConversations(false);
    }
  }, [isAuthChecked, isAuthenticated]);

  const loadConversations = async () => {
    try {
      setIsLoadingConversations(true);
      const convos = await base44.agents.listConversations({
        agent_name: "blocknode_assistant"
      });
      setConversations(convos || []);
      
      if (convos && convos.length > 0) {
        loadConversation(convos[0]);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setIsLoadingConversations(false);
    }
  };

  const loadConversation = async (conversation) => {
    try {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }

      const fullConvo = await base44.agents.getConversation(conversation.id);
      setCurrentConversation(fullConvo);
      setMessages(fullConvo.messages || []);

      unsubscribeRef.current = base44.agents.subscribeToConversation(
        conversation.id,
        (data) => {
          setMessages(data.messages || []);
        }
      );
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCreateConversation = async () => {
    if (!isAuthenticated) {
      base44.auth.redirectToLogin(window.location.pathname);
      return;
    }

    try {
      const newConvo = await base44.agents.createConversation({
        agent_name: "blocknode_assistant",
        metadata: {
          name: `Chat ${new Date().toLocaleDateString()}`,
          description: "New conversation with AI Assistant"
        }
      });
      
      setConversations([newConvo, ...conversations]);
      loadConversation(newConvo);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    if (!isAuthenticated) {
      base44.auth.redirectToLogin(window.location.pathname);
      return;
    }

    if (!currentConversation) {
      await handleCreateConversation();
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsSending(true);

    try {
      await base44.agents.addMessage(currentConversation, {
        role: "user",
        content: userMessage
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">AI Assistant</h1>
            </div>
            {!isAuthenticated && (
              <Button
                onClick={() => base44.auth.redirectToLogin(window.location.pathname)}
                className="bg-white text-black hover:bg-gray-200"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In to Save Chats
              </Button>
            )}
          </div>
          <p className="text-gray-400 text-lg">
            Ask questions about the API, get help with integration, or manage your account
          </p>
          {!isAuthenticated && (
            <div className="mt-3 bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-400">
                You're using AI Assistant as a guest. <button onClick={() => base44.auth.redirectToLogin(window.location.pathname)} className="text-white underline hover:text-gray-300">Sign in</button> to save your conversations.
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Conversations Sidebar - Only show for authenticated users */}
          {isAuthenticated && (
            <div className="lg:col-span-1">
              <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-sm">Conversations</CardTitle>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleCreateConversation}
                      className="h-7 w-7 hover:bg-gray-900"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {isLoadingConversations ? (
                    <div className="text-center py-8">
                      <Loader2 className="w-6 h-6 text-gray-400 animate-spin mx-auto" />
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm mb-4">No conversations yet</p>
                      <Button
                        size="sm"
                        onClick={handleCreateConversation}
                        className="bg-white text-black hover:bg-gray-200"
                      >
                        Start Chat
                      </Button>
                    </div>
                  ) : (
                    conversations.map((convo) => (
                      <button
                        key={convo.id}
                        onClick={() => loadConversation(convo)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          currentConversation?.id === convo.id
                            ? "bg-gray-900 border border-gray-700"
                            : "bg-black/50 border border-gray-800 hover:bg-gray-900"
                        }`}
                      >
                        <p className="text-sm text-white font-medium truncate">
                          {convo.metadata?.name || "Conversation"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(convo.created_date).toLocaleDateString()}
                        </p>
                      </button>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Chat Area */}
          <div className={isAuthenticated ? "lg:col-span-3" : "lg:col-span-4"}>
            <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-xl h-[calc(100vh-200px)] flex flex-col">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {isAuthenticated 
                    ? (currentConversation?.metadata?.name || "BlockNode AI Assistant")
                    : "BlockNode AI Assistant (Guest Mode)"}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {!isAuthenticated || !currentConversation ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center max-w-2xl">
                      <div className="w-20 h-20 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Welcome to AI Assistant
                      </h3>
                      <p className="text-gray-400 mb-6">
                        {isAuthenticated 
                          ? "Start a conversation to get help with API integration, documentation, or account management"
                          : "Ask me anything about BlockNode.app! Sign in to save your conversations for later."}
                      </p>
                      {isAuthenticated ? (
                        <Button
                          onClick={handleCreateConversation}
                          className="bg-white text-black hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Start New Conversation
                        </Button>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "How do I get started with the API?",
                            "What are the pricing plans?",
                            "Show me API endpoints",
                            "Explain authentication"
                          ].map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => setInputMessage(suggestion)}
                              className="p-3 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-all text-left"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center max-w-2xl">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        How can I help you today?
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "How do I get started with the API?",
                          "Show me API key management",
                          "What are the pricing plans?",
                          "Explain authentication"
                        ].map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => setInputMessage(suggestion)}
                            className="p-3 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-all text-left"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, idx) => (
                      <MessageBubble key={idx} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </CardContent>

              <div className="p-4 border-t border-gray-800">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isAuthenticated ? "Ask me anything about BlockNode.app..." : "Ask me anything... (Sign in to save conversations)"}
                    disabled={isSending}
                    className="flex-1 bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                  />
                  <Button
                    type="submit"
                    disabled={!inputMessage.trim() || isSending}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    {isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
                <p className="text-xs text-gray-600 mt-2">
                  AI Assistant can make mistakes. Verify important information.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}