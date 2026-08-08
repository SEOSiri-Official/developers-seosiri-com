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
import { Footer } from './components/Footer';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('topology');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<MCPModule | null>(null);

  // Filter modules based on search query and category
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
      {/* Global Corporate Header */}
      <Header />

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Metrics & Quick Status Bar */}
      <StatsBanner onViewChange={setCurrentView} />

      {/* Main Content Area */}
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
          <DocumentationViewer initialModuleId={selectedModule?.id} />
        )}

        {currentView === 'matrix' && (
          <ArchitectureMatrix
            modules={filteredModules}
            onSelectModule={setSelectedModule}
          />
        )}

        {currentView === 'architect' && (
          <ArchitectProfile />
        )}

        {currentView === 'config' && (
          <ConfigGenerator modules={MCP_MODULES} />
        )}

        {currentView === 'table' && (
          <DirectoryTable
            modules={filteredModules}
            onSelectModule={setSelectedModule}
          />
        )}

        {currentView === 'tester' && (
          <EndpointTester modules={MCP_MODULES} />
        )}

        import { OnsitePolicyPages } from './components/OnsitePolicyPages';

// Inside your main App component view switcher:
{['custom-mcp', 'disclaimer', 'privacy', 'assets'].includes(currentView) && (
  <OnsitePolicyPages 
    view={currentView} 
    onBackToTopology={() => setCurrentView('topology')} 
  />
)} 
      </main>

      {/* Modal Inspector */}
      {selectedModule && (
        <NodeInspectorModal
          module={selectedModule}
          node={null}
          onClose={() => setSelectedModule(null)}
        />
      )}

      {/* Global Corporate Footer */}
      <Footer onViewChange={setCurrentView} />
    </div>
  );
}

export default App;
