import React, { useState, Suspense, lazy } from 'react';
import { ViewMode, MCPModule } from './types';
import { MCP_MODULES } from './data/mcpData';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { TopologyGraph } from './components/TopologyGraph';
import { NodeInspectorModal } from './components/NodeInspectorModal';
import { Footer } from './components/Footer';

// Code-split secondary views so they load on-demand when clicked
const DocumentationViewer = lazy(() => import('./components/DocumentationViewer').then(m => ({ default: m.DocumentationViewer })));
const ArchitectureMatrix = lazy(() => import('./components/ArchitectureMatrix').then(m => ({ default: m.ArchitectureMatrix })));
const ConfigGenerator = lazy(() => import('./components/ConfigGenerator').then(m => ({ default: m.ConfigGenerator })));
const DirectoryTable = lazy(() => import('./components/DirectoryTable').then(m => ({ default: m.DirectoryTable })));
const EndpointTester = lazy(() => import('./components/EndpointTester').then(m => ({ default: m.EndpointTester })));
const ArchitectProfile = lazy(() => import('./components/ArchitectProfile').then(m => ({ default: m.ArchitectProfile })));
const OnsitePolicyPages = lazy(() => import('./components/OnsitePolicyPages').then(m => ({ default: m.OnsitePolicyPages })));
const ApiKeyGenerator = lazy(() => import('./components/ApiKeyGenerator').then(m => ({ default: m.ApiKeyGenerator })));

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('topology');
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
        onViewChange={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <StatsBanner onViewChange={setCurrentView} />

      <main className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center py-24 text-slate-400 font-mono text-xs">
            <span className="animate-pulse">Loading component...</span>
          </div>
        }>
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
            <DocumentationViewer initialModuleId={selectedModule?.id} />
          )}

          {currentView === 'matrix' && (
            <ArchitectureMatrix />
          )}

          {currentView === 'architect' && (
            <ArchitectProfile />
          )}

          {currentView === 'config' && (
            <ConfigGenerator />
          )}

          {currentView === 'table' && (
            <DirectoryTable onSelectModule={setSelectedModule} />
          )}

          {currentView === 'tester' && (
            <EndpointTester />
          )}

          {currentView === 'key-issuer' && (
            <ApiKeyGenerator />
          )}

          {['custom-mcp', 'disclaimer', 'privacy', 'assets', 'sitemap'].includes(currentView) && (
            <OnsitePolicyPages 
              view={currentView} 
              onBackToTopology={() => setCurrentView('topology')} 
            />
          )}
        </Suspense>
      </main>

      {selectedModule && (
        <NodeInspectorModal
          module={selectedModule}
          node={null}
          onClose={() => setSelectedModule(null)}
        />
      )}

      <Footer onViewChange={setCurrentView} />
    </div>
  );
}

export default App;
