import Layout from "./Layout.jsx";

import Home from "./Home";

import Documentation from "./Documentation";

import Dashboard from "./Dashboard";

import ApiKeys from "./ApiKeys";

import Usage from "./Usage";

import Pricing from "./Pricing";

import Webhooks from "./Webhooks";

import RealTimeData from "./RealTimeData";

import About from "./About";

import Privacy from "./Privacy";

import Terms from "./Terms";

import Security from "./Security";

import AIAgent from "./AIAgent";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Documentation: Documentation,
    
    Dashboard: Dashboard,
    
    ApiKeys: ApiKeys,
    
    Usage: Usage,
    
    Pricing: Pricing,
    
    Webhooks: Webhooks,
    
    RealTimeData: RealTimeData,
    
    About: About,
    
    Privacy: Privacy,
    
    Terms: Terms,
    
    Security: Security,
    
    AIAgent: AIAgent,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Documentation" element={<Documentation />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/ApiKeys" element={<ApiKeys />} />
                
                <Route path="/Usage" element={<Usage />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/Webhooks" element={<Webhooks />} />
                
                <Route path="/RealTimeData" element={<RealTimeData />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/Terms" element={<Terms />} />
                
                <Route path="/Security" element={<Security />} />
                
                <Route path="/AIAgent" element={<AIAgent />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}