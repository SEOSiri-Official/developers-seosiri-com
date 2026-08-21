import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Layers, 
  Settings2, 
  Table2, 
  TerminalSquare, 
  Search, 
  BookOpen,
  UserCheck,
  Server,
  Monitor,
  Smartphone,
  Menu,
  X,
  Zap,
  Key
} from 'lucide-react';
import { ViewMode } from '../types';
import { LEAD_ARCHITECT, TOTAL_MCP_TOOLS_COUNT } from '../data/mcpData';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'Mobile' | 'Tablet' | 'Desktop'>('Desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('Mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('Tablet');
      } else {
        setScreenSize('Desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems: { id: ViewMode; label: string; shortLabel: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'topology',
      label: 'Topology Graph',
      shortLabel: 'Topology',
      icon: <Network className="w-4 h-4 mr-1.5" />,
      badge: 'Graph'
    },
    {
      id: 'docs',
      label: 'Docs',
      shortLabel: 'Docs',
      icon: <BookOpen className="w-4 h-4 mr-1.5" />,
      badge: `${TOTAL_MCP_TOOLS_COUNT} Tools`
    },
    {
      id: 'matrix',
      label: 'Architecture',
      shortLabel: 'Matrix',
      icon: <Layers className="w-4 h-4 mr-1.5" />
    },
    {
      id: 'architect',
      label: 'Lead Architect',
      shortLabel: 'Architect',
      icon: <UserCheck className="w-4 h-4 mr-1.5" />,
      badge: 'Momenul'
    },
    {
      id: 'config',
      label: 'Config Generator',
      shortLabel: 'Config',
      icon: <Settings2 className="w-4 h-4 mr-1.5" />,
      badge: 'JSON'
    },
    {
      id: 'table',
      label: 'Directory',
      shortLabel: 'Directory',
      icon: <Table2 className="w-4 h-4 mr-1.5" />
    },
    {
      id: 'tester',
      label: 'Endpoint Tester',
      shortLabel: 'Tester',
      icon: <TerminalSquare className="w-4 h-4 mr-1.5" />,
      badge: 'Live'
    },
    {
      id: 'key-issuer',
      label: 'API Key Issuer',
      shortLabel: 'Key Issuer',
      icon: <Key className="w-4 h-4 mr-1.5 text-amber-400" />,
      badge: 'B2B'
    }
  ];

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Brand Identity & Device Screen Indicator */}
        <div className="flex items-center space-x-3 shrink-0">
          <button 
            onClick={() => onViewChange('topology')}
            className="flex items-center space-x-2 text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 p-1 flex items-center justify-center shrink-0 shadow-md border border-blue-400/30">
              <svg className="w-full h-full text-white" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="512" height="512" rx="128" fill="#0f172a" />
                <circle cx="256" cy="256" r="190" fill="none" stroke="#0284c7" strokeWidth="28" strokeDasharray="800" strokeDashoffset="100" />
                <circle cx="256" cy="256" r="130" fill="none" stroke="#38bdf8" strokeWidth="20" />
                <path d="M 256 120 L 256 256 L 350 256" fill="none" stroke="#34d399" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="256" cy="256" r="32" fill="#38bdf8" />
              </svg>
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-extrabold tracking-tight text-white block text-xs">SEOSiri MCP Suite</span>
              <span className="text-[10px] font-mono text-emerald-400">Enterprise AI Control Plane</span>
            </div>
          </button>

          {/* Screen / Device Adaptive Indicator */}
          <div className="hidden xl:flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400">
            {screenSize === 'Mobile' ? <Smartphone className="w-3 h-3 text-amber-400" /> : <Monitor className="w-3 h-3 text-blue-400" />}
            <span>Adaptive: <strong className="text-slate-200">{screenSize} View</strong></span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex flex-wrap items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 max-w-full overflow-x-auto">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.2 text-[9px] rounded-full uppercase tracking-wider font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-2 flex-1 lg:flex-none justify-end">
          <div className="relative flex-1 sm:w-56 max-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 181 tools..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                ×
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
