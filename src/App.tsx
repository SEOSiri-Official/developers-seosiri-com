import { EnterpriseProductivityManual } from "./components/EnterpriseProductivityManual";
import { ApiPricingMatrix } from "./components/ApiPricingMatrix";
import { AgentQuickstartGrid } from "./components/AgentQuickstartGrid";
import { CommercialGatewayBanner } from "./components/CommercialGatewayBanner";
import React, { useState } from 'react';
import { ViewMode, MCPModule } from './types';
import { MCP_MODULES } from './data/mcpData';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { TopologyGraph } from './components/TopologyGraph';
import { ArchitectureMatrix } from './components/ArchitectureMatrix';
import { ConfigGenerator } from './components/ConfigGenerator';
import { DirectoryTable } from './components/DirectoryTable';
import { EndpointTester } from './components/EndpointTester';
import { ArchitectProfile } from './components/ArchitectProfile';
import { DocumentationViewer } from './components/DocumentationViewer';
import { NodeInspectorModal } from './components/NodeInspectorModal';
import { OnsitePolicyPages } from './components/OnsitePolicyPages';
import { ApiKeyGenerator } from './components/ApiKeyGenerator';
import { UserPortal } from './components/UserPortal';
import { EducationalJourneyBanner } from "./components/EducationalJourneyBanner";
import { Footer } from './components/Footer';

// Every ViewMode this app can route to via URL hash on initial load.
const VALID_VIEWS: ViewMode[] = [
  "topology",
  "docs",
  "matrix",
  "config",
  "table",
  "tester",
  "architect",
  "disclaimer",
  "custom-mcp",
  "privacy",
  "assets",
  "sitemap",
  "key-issuer",
  "user-portal",
  "governance-liability",
  "manual",
  "governance",
  "security",
];

// Every ViewMode that OnsitePolicyPages is responsible for rendering.
// Keep this in sync with the `view === '...'` blocks inside OnsitePolicyPages.tsx.
const ONSITE_POLICY_VIEWS: ViewMode[] = [
  'custom-mcp',
  'disclaimer',
  'privacy',
  'assets',
  'sitemap',
  'governance-liability',
  'manual',
  'governance',
  'security',
];

export function App() {
  const getInitialView = (): ViewMode => {
    const hash = window.location.hash.replace("#", "") as ViewMode;
    return VALID_VIEWS.includes(hash) ? hash : "topology";
  };
  const [currentView, setCurrentView] = useState<ViewMode>(getInitialView);

  // Keep currentView in sync with the URL hash for the whole lifetime of the
  // app, not just at first mount. Without this, a hash-only address-bar edit
  // (e.g. typing #manual while already on the page) can fire a same-document
  // navigation that never re-runs getInitialView(), leaving currentView
  // stale and rendering nothing — the intermittent "blank page" bug.
  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<MCPModule | null>(null);

  // Synchronize window.location.hash with React currentView state
  React.useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace("#", "").trim();
      if (!hash) return;
      if (hash === "manual" || hash === "productivity-manual") {
        setCurrentView("productivity-manual" as ViewMode);
        setCurrentView("productivity-manual" as ViewMode);
        setCurrentView("productivity-manual" as ViewMode);
        setCurrentView("productivity-manual" as ViewMode);
      } else if (hash === "pricing") {
        setCurrentView("pricing" as ViewMode);
      } else if (hash === "governance-liability" || hash === "governance") {
        setCurrentView("governance-liability" as ViewMode);
      } else if (hash === "key-issuer") {
        setCurrentView("key-issuer" as ViewMode);
      } else if (hash === "user-portal") {
        setCurrentView("user-portal" as ViewMode);
      } else if (hash === "sitemap") {
        setCurrentView("sitemap" as ViewMode);
      } else if (hash === "docs") {
        setCurrentView("docs" as ViewMode);
      } else if (hash === "matrix") {
        setCurrentView("matrix" as ViewMode);
      } else if (hash === "topology") {
        setCurrentView("topology" as ViewMode);
      }
    };
    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);


  const filteredModules = MCP_MODULES.filter((mod) => {
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !searchQuery ||
      (mod.title && mod.title.toLowerCase().includes(q)) ||
      (mod.description && mod.description.toLowerCase().includes(q)) ||
      (mod.pypiPackage && mod.pypiPackage.toLowerCase().includes(q)) ||
      (mod.edgeGateway && mod.edgeGateway.toLowerCase().includes(q)) ||
      (mod.tools && mod.tools.some((t) => (t.name && t.name.toLowerCase().includes(q)) || (t.description && t.description.toLowerCase().includes(q))));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      <Header />
      <Navbar
        currentView={currentView}
        onViewChange={(view) => {
          window.location.hash = view;
          setCurrentView(view);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <StatsBanner onViewChange={(view) => {
          window.location.hash = view;
          setCurrentView(view);
        }} />

      <main className="flex-1">
        {currentView === 'topology' && (
          <TopologyGraph
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSelectModule={setSelectedModule}
            onSelectNode={(node) => {
              if (node.moduleRef) {
                setSelectedModule(node.moduleRef);
              }
            }}
          />
        )}
        {currentView === 'docs' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <CommercialGatewayBanner />
            <AgentQuickstartGrid />
            <DocumentationViewer initialModuleId={selectedModule?.id} />
          </div>
        )}
        {currentView === 'matrix' && <ArchitectureMatrix modules={filteredModules} onSelectModule={setSelectedModule} />}
        {currentView === 'architect' && <ArchitectProfile />}
        {currentView === 'config' && <ConfigGenerator modules={MCP_MODULES} />}
        {currentView === 'table' && <DirectoryTable modules={filteredModules} onSelectModule={setSelectedModule} />}
        {currentView === 'tester' && <EndpointTester modules={MCP_MODULES} />}
        {currentView === 'key-issuer' && <ApiKeyGenerator />}
        {currentView === 'user-portal' && <UserPortal />}
        {ONSITE_POLICY_VIEWS.includes(currentView) && (
          <OnsitePolicyPages view={currentView} onBackToTopology={() => setCurrentView('topology')} onViewChange={(view) => {
            window.location.hash = view;
            setCurrentView(view);
          }} />
        )}
      </main>

      {selectedModule && (
        <NodeInspectorModal
          module={selectedModule}
          node={null}
          onClose={() => setSelectedModule(null)}
        />
      )}
      <EducationalJourneyBanner onViewChange={(view) => {
        window.location.hash = view;
        setCurrentView(view);
      }} />
      <Footer onViewChange={(view) => {
          window.location.hash = view;
          setCurrentView(view);
        }} />
    </div>
  );
}

export default App;