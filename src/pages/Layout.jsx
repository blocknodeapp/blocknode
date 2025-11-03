

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import {
  Home,
  BookOpen,
  LayoutDashboard,
  Key,
  BarChart3,
  DollarSign,
  Zap,
  Radio,
  LogOut,
  Menu,
  X,
  Brain,
  Sparkles // Added Sparkles import
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
    public: true
  },
  {
    title: "Documentation",
    url: createPageUrl("Documentation"),
    icon: BookOpen,
    public: true
  },
  {
    title: "AI Blocknode", // Changed title from "AI Assistant" to "AI Blocknode"
    url: createPageUrl("AIAgent"),
    icon: Sparkles,
    public: true  // Changed to true so guests can see it
  },
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    public: false
  },
  {
    title: "API Keys",
    url: createPageUrl("ApiKeys"),
    icon: Key,
    public: false
  },
  {
    title: "Usage",
    url: createPageUrl("Usage"),
    icon: BarChart3,
    public: false
  },
  {
    title: "Pricing",
    url: createPageUrl("Pricing"),
    icon: DollarSign,
    public: true
  },
  {
    title: "Webhooks",
    url: createPageUrl("Webhooks"),
    icon: Zap,
    public: false,
    badge: "Soon"
  },
  {
    title: "Real-time Data",
    url: createPageUrl("RealTimeData"),
    icon: Radio,
    public: false,
    badge: "Soon"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [xSocialLink, setXSocialLink] = useState("https://x.com");
  const [logoUrl, setLogoUrl] = useState(() => {
    // Load logo from localStorage immediately for instant display
    return localStorage.getItem('site_logo_url') || "";
  });

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await base44.auth.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        try {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const settings = await base44.entities.SiteSettings.list();
        if (settings && settings[0]) {
          if (settings[0].x_social_link) {
            setXSocialLink(settings[0].x_social_link);
          }
          if (settings[0].logo_url) {
            setLogoUrl(settings[0].logo_url);
            // Cache logo URL in localStorage for instant loading next time
            localStorage.setItem('site_logo_url', settings[0].logo_url);
          } else {
            // Clear cache if no logo is set
            localStorage.removeItem('site_logo_url');
          }
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSiteSettings();
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  const filteredNav = navigationItems.filter(
    item => item.public || isAuthenticated
  );

  // Main navigation items to show in desktop header (always visible)
  const mainNavItems = navigationItems.filter(item => 
    ["Home", "Documentation", "AI Blocknode", "Pricing"].includes(item.title) // Updated here too
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <style>{`
        :root {
          --primary: 0 0% 90%;
          --secondary: 0 0% 70%;
          --accent: 0 0% 50%;
          --background: 0 0% 0%;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(60px, 30px) rotate(180deg); }
          75% { transform: translate(-30px, 60px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(20px); }
          50% { transform: translateY(0px) translateX(40px); }
          75% { transform: translateY(20px) translateX(20px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .animate-drift {
          animation: drift 25s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 30s linear infinite;
        }
        
        .animate-wave {
          animation: wave 15s ease-in-out infinite;
        }
      `}</style>

      {/* Enhanced Atmospheric Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large glowing orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-white/20 via-gray-400/15 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-gray-300/15 via-white/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-gradient-to-br from-white/15 via-gray-500/20 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
        
        {/* Floating gradient spheres */}
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-gradient-to-br from-white/25 to-gray-400/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-br from-gray-300/20 to-white/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVybkVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCIvPjwvc3ZnPg==')] opacity-30" />
        
        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2">
          <div className="w-3 h-3 bg-white/40 rounded-full animate-orbit" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="w-2 h-2 bg-white/30 rounded-full animate-orbit" style={{ animationDelay: '5s', animationDuration: '20s' }} />
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="w-4 h-4 bg-white/35 rounded-full animate-orbit" style={{ animationDelay: '10s', animationDuration: '40s' }} />
        </div>
        
        {/* Drifting particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full animate-drift"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${20 + i * 2}s`
            }}
          />
        ))}
        
        {/* Waving lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-wave" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent animate-wave" style={{ animationDelay: '3s' }} />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-wave" style={{ animationDelay: '6s' }} />
        
        {/* Diagonal gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gray-500/10 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-gray-400/10 opacity-50" />
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 group">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="BlockNode.app"
                  className="h-10 w-auto transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border border-gray-700">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    BlockNode.app
                  </span>
                </>
              )}
            </Link>

            {/* Desktop Navigation - Main items only */}
            <div className="hidden md:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    location.pathname === item.url
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-gray-700 text-gray-300 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Buttons & Social */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={xSocialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => base44.auth.redirectToLogin()}
                    className="text-gray-400 hover:text-white"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => base44.auth.redirectToLogin()}
                    className="bg-white text-black hover:bg-gray-200 font-medium"
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to={createPageUrl("Dashboard")}>
                    <Button className="bg-white text-black hover:bg-gray-200 font-medium">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              {filteredNav.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.url
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-gray-700 text-gray-300 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              {!isAuthenticated ? (
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  className="w-full bg-white text-black hover:bg-gray-200 mt-4"
                >
                  Get Started
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full mt-4 border-gray-800 text-gray-400 hover:bg-gray-900"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-screen relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="BlockNode.app"
                    className="h-8 w-auto"
                  />
                ) : (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-white">
                      BlockNode.app
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">
                AI-powered blockchain data intelligence platform.
              </p>
              <a
                href={xSocialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-sm">Follow us on X</span>
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to={createPageUrl("Documentation")} className="hover:text-white">Documentation</Link></li>
                <li><Link to={createPageUrl("Pricing")} className="hover:text-white">Pricing</Link></li>
                <li><a href="#" className="hover:text-white">API Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to={createPageUrl("About")} className="hover:text-white">About</Link></li>
                <li><Link to={createPageUrl("Security")} className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to={createPageUrl("Privacy")} className="hover:text-white">Privacy</Link></li>
                <li><Link to={createPageUrl("Terms")} className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-600">
            © 2025 BlockNode.app. Powered by X402 Ecosystem. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

