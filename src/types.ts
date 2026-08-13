export type ModuleCategory = 
  | 'hub'
  | 'aeo-geo'
  | 'content-schema'
  | 'dns-sec'
  | 'keyword-rag'
  | 'search-governance'
  | 'tech-vitals'
  | 'backlink-graph'
  | 'merchant-schema'
  | 'localseo'
  | 'i18n'
  | 'multimodal'
  | 'media-schema'
  | 'crawler-log'
  | 'ai-agent'
  | 'content-brief'
  | 'upcoming';

export type NodeType = 
  | 'hub' 
  | 'server' 
  | 'guide' 
  | 'pypi' 
  | 'gateway' 
  | 'tool'
  | 'placeholder';

export interface MCPModule {
  id: string;
  title: string;
  shortName: string;
  category: ModuleCategory;
  description: string;
  guideUrl: string;
  pypiPackage: string;
  pypiCommand: string;
  edgeGateway: string;
  edgeUrl: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  iconName: string;
  tools: {
    name: string;
    description: string;
    sampleInput: string;
  }[];
  envVars?: string[];
  version: string;
  status: 'Operational' | 'Active Edge' | 'Stable' | 'Q4 Upcoming';
  isUpcoming?: boolean;
  releaseQuarter?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  category: ModuleCategory;
  url?: string;
  subtext?: string;
  color: string;
  val: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  moduleRef?: MCPModule;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label?: string;
  type?: 'primary' | 'pypi' | 'edge' | 'guide' | 'planned';
}

export type ViewMode = 'topology' | 'docs' | 'matrix' | 'config' | 'table' | 'tester' | 'architect' | 'disclaimer' | 'custom-mcp' | 'privacy' | 'assets' | 'sitemap' | 'key-issuer';