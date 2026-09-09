import { EducationalJourneyBanner } from "./components/EducationalJourneyBanner";
import { EnterpriseProductivityManual } from "./components/EnterpriseProductivityManual";
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
import { Footer } from './components/Footer';

export function App() {
  const getInitialView = (): ViewMode => {
    const hash = window.location.hash.replace("#", "") as ViewMode;
    const validViews: ViewMode[] = ["topology", "docs", "matrix", "config", "table", "tester", "architect", "disclaimer", "custom-mcp", "privacy", "assets", "sitemap", "key-issuer", "user-portal", "governance-liability"];
    return validViews.includes(hash) ? hash : "topology";
  };
  const [currentView, setCurrentView] = useState<ViewMode>(getInitialView);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<MCPModule | null>(null);

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
        {currentView === 'docs' && <DocumentationViewer initialModuleId={selectedModule?.id} />}
        {currentView === 'matrix' && <ArchitectureMatrix modules={filteredModules} onSelectModule={setSelectedModule} />}
        {currentView === 'architect' && <ArchitectProfile />}
        {currentView === 'config' && <ConfigGenerator modules={MCP_MODULES} />}
        {currentView === 'table' && <DirectoryTable modules={filteredModules} onSelectModule={setSelectedModule} />}
        {currentView === 'tester' && <EndpointTester modules={MCP_MODULES} />}
        {currentView === 'key-issuer' && <ApiKeyGenerator />}
        {/* {currentView === 'user-portal' && <UserPortal />}
        {currentView === 'productivity-manual' && <EnterpriseProductivityManual onBackToTopology={() => setCurrentView('topology')} onViewChange={setCurrentView} />}
 */}
        {['custom-mcp', 'disclaimer', 'privacy', 'assets', 'sitemap', 'governance-liability', 'productivity-manual'].includes(currentView) && (
          <OnsitePolicyPages view={currentView} onBackToTopology={() => setCurrentView('topology')} onViewChange={setCurrentView} />
        )}
      </main>

      {selectedModule && (
        <NodeInspectorModal
          module={selectedModule}
          node={null}
          onClose={() => setSelectedModule(null)}
        />
      )}
      <EducationalJourneyBanner onViewChange={setCurrentView} />
      <Footer onViewChange={(view) => {
          window.location.hash = view;
          setCurrentView(view);
        }} />
    </div>
  );
}

export default App;