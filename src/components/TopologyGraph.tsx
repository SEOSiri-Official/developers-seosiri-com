import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  GraphNode, 
  GraphLink, 
  MCPModule 
} from '../types';
import { generateGraphData, CENTRAL_HUB_URL } from '../data/mcpData';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Sparkles, 
  Globe, 
  Terminal, 
  Zap, 
  BookOpen, 
  Info,
  ExternalLink,
  ShieldAlert,
  Server
} from 'lucide-react';

interface TopologyGraphProps {
  searchQuery?: string;
  selectedCategory: string;
  onSelectNode?: (node: GraphNode) => void;
  onSelectModule: (module: MCPModule) => void;
}

export const TopologyGraph: React.FC<TopologyGraphProps> = ({
  searchQuery = '',
  selectedCategory,
  onSelectNode,
  onSelectModule
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeLegendFilter, setActiveLegendFilter] = useState<string>('all');

  // Load static data structure
  const rawGraphData = useMemo(() => generateGraphData(), []);

  // Filter graph data based on search and category
  const filteredData = useMemo(() => {
    let nodes = [...rawGraphData.nodes];
    let links = [...rawGraphData.links];

    if (selectedCategory !== 'all') {
      nodes = nodes.filter(
        (n) => n.category === 'hub' || n.category === selectedCategory
      );
      const validNodeIds = new Set(nodes.map((n) => n.id));
      links = links.filter((l) => {
        const sourceId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
        const targetId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;
        return validNodeIds.has(sourceId as string) && validNodeIds.has(targetId as string);
      });
    }

    if (activeLegendFilter !== 'all') {
      if (activeLegendFilter === 'server') {
        nodes = nodes.filter((n) => n.type === 'hub' || n.type === 'server');
      } else if (activeLegendFilter === 'gateway') {
        nodes = nodes.filter((n) => n.type === 'hub' || n.type === 'gateway' || n.type === 'server');
      } else if (activeLegendFilter === 'pypi') {
        nodes = nodes.filter((n) => n.type === 'hub' || n.type === 'pypi' || n.type === 'server');
      } else if (activeLegendFilter === 'guide') {
        nodes = nodes.filter((n) => n.type === 'hub' || n.type === 'guide' || n.type === 'server');
      }
      const validNodeIds = new Set(nodes.map((n) => n.id));
      links = links.filter((l) => {
        const sourceId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
        const targetId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;
        return validNodeIds.has(sourceId as string) && validNodeIds.has(targetId as string);
      });
    }

    return { nodes, links };
  }, [rawGraphData, selectedCategory, activeLegendFilter]);

  // Main D3 Force Simulation Setup
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = containerRef.current.clientHeight || 650;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Prepare node copy for simulation
    const nodes: GraphNode[] = filteredData.nodes.map((d) => ({ ...d }));
    const links: GraphLink[] = filteredData.links.map((d) => ({ ...d }));

    // Container Group with Zoom
    const g = svg.append('g').attr('class', 'main-group');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Initial Zoom Center
    svg.call(
      zoom.transform as any,
      d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85)
    );

    // Forces Setup
    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance((d: any) => {
            if (d.type === 'primary') return 160;
            if (d.type === 'edge') return 110;
            if (d.type === 'pypi') return 110;
            return 120;
          })
      )
      .force('charge', d3.forceManyBody().strength(-480))
      .force('center', d3.forceCenter(0, 0))
      .force('collide', d3.forceCollide().radius((d: any) => d.val + 25));

    // Render Links
    const linkGroup = g.append('g').attr('class', 'links');
    const linkElements = linkGroup
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d: any) => {
        if (d.type === 'edge') return '#f97316';
        if (d.type === 'pypi') return '#38bdf8';
        if (d.type === 'guide') return '#a855f7';
        return '#3b82f6';
      })
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', (d: any) => (d.type === 'primary' ? 2.5 : 1.5))
      .attr('stroke-dasharray', (d: any) => (d.type === 'guide' ? '4,4' : 'none'));

    // Render Nodes Group
    const nodeGroup = g.append('g').attr('class', 'nodes');

    const nodeElements = nodeGroup
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-item')
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any
      );

    // Glowing Halo Background for Nodes
    nodeElements
      .append('circle')
      .attr('r', (d) => d.val + 6)
      .attr('fill', (d) => d.color)
      .attr('fill-opacity', 0.15)
      .attr('stroke', (d) => d.color)
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5);

    // Core Node Circle
    nodeElements
      .append('circle')
      .attr('r', (d) => d.val)
      .attr('fill', (d) => {
        if (d.type === 'hub') return '#1e293b';
        return '#0f172a';
      })
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', (d) => (d.type === 'hub' ? 3 : 2));

    // Type Specifier Icon Badges inside Node
    nodeElements.each(function (d) {
      const el = d3.select(this);
      
      // Node Title Label
      el.append('text')
        .text((node: GraphNode) => node.label)
        .attr('text-anchor', 'middle')
        .attr('dy', (node: GraphNode) => node.val + 16)
        .attr('fill', '#f1f5f9')
        .attr('font-size', (node: GraphNode) => (node.type === 'hub' ? '13px' : '11px'))
        .attr('font-weight', (node: GraphNode) => (node.type === 'hub' || node.type === 'server' ? '700' : '500'))
        .attr('class', 'pointer-events-none');

      // Subtext Label
      if (d.subtext) {
        el.append('text')
          .text(d.subtext)
          .attr('text-anchor', 'middle')
          .attr('dy', d.val + 28)
          .attr('fill', '#94a3b8')
          .attr('font-size', '9px')
          .attr('font-family', 'monospace')
          .attr('class', 'pointer-events-none');
      }

      // Icon / Center Graphic
      if (d.type === 'hub') {
        el.append('text')
          .text('🌐')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '20px');
      } else if (d.type === 'server') {
        el.append('text')
          .text('⚡')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '16px');
      } else if (d.type === 'pypi') {
        el.append('text')
          .text('📦')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '12px');
      } else if (d.type === 'gateway') {
        el.append('text')
          .text('☁️')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '12px');
      } else if (d.type === 'guide') {
        el.append('text')
          .text('📖')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '12px');
      }
    });

    // Event Handlers
    nodeElements
      .on('mouseover', (_event, d) => {
        setHoveredNode(d);
        // Highlight connected links
        linkElements.attr('stroke-opacity', (l: any) => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;
          return sourceId === d.id || targetId === d.id ? 0.9 : 0.1;
        });
      })
      .on('mouseout', () => {
        setHoveredNode(null);
        linkElements.attr('stroke-opacity', 0.4);
      })
      .on('click', (_event, d) => {
        setSelectedNodeId(d.id);
        if (typeof onSelectNode === 'function') {
          onSelectNode(d);
        }
        if (d.moduleRef && typeof onSelectModule === 'function') {
          onSelectModule(d.moduleRef);
        }
      });

    // Simulation Tick Event
    simulation.on('tick', () => {
      linkElements
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeElements.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Save simulation instance and zoom instance to refs for controls
    (svgRef.current as any).__simulation = simulation;
    zoomRef.current = zoom;

    return () => {
      simulation.stop();
    };
  }, [filteredData, onSelectNode, onSelectModule]);

  // Apply search filtering visuals
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const nodes = svg.selectAll('.node-item');

    if (!searchQuery) {
      nodes.style('opacity', 1);
      return;
    }

    const q = searchQuery.toLowerCase();
    nodes.style('opacity', (d: any) => {
      const matchLabel = d.label?.toLowerCase().includes(q);
      const matchSubtext = d.subtext?.toLowerCase().includes(q);
      const matchModule = d.moduleRef?.pypiPackage?.toLowerCase().includes(q) ||
                          d.moduleRef?.edgeGateway?.toLowerCase().includes(q);
      return matchLabel || matchSubtext || matchModule ? 1 : 0.15;
    });
  }, [searchQuery]);

  // Canvas Particle Data Stream Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !svgRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let particles: { x: number; y: number; progress: number; speed: number; color: string; link: any }[] = [];

    const initParticles = () => {
      particles = [];
      const sim = (svgRef.current as any)?.__simulation;
      if (!sim) return;

      const links = sim.force('link')?.links() || [];
      links.forEach((l: any) => {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: 0,
            y: 0,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.005,
            color: l.type === 'edge' ? '#f97316' : l.type === 'pypi' ? '#38bdf8' : '#3b82f6',
            link: l
          });
        }
      });
    };

    setTimeout(initParticles, 500);

    const renderParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const svg = svgRef.current;
      if (!svg) return;

      const transformAttr = d3.select(svg).select('.main-group').attr('transform');
      let transform = d3.zoomIdentity;
      if (transformAttr) {
        // Parse current zoom/pan matrix transform
        const match = /translate\(([^,]+),([^)]+)\)\s*scale\(([^)]+)\)/.exec(transformAttr);
        if (match) {
          transform = d3.zoomIdentity.translate(+match[1], +match[2]).scale(+match[3]);
        }
      }

      particles.forEach((p) => {
        if (!p.link.source || !p.link.target || typeof p.link.source.x !== 'number') return;

        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const rawX = p.link.source.x + (p.link.target.x - p.link.source.x) * p.progress;
        const rawY = p.link.source.y + (p.link.target.y - p.link.source.y) * p.progress;

        // Apply SVG Zoom transform to Canvas screen coordinates
        const screenX = transform.applyX(rawX);
        const screenY = transform.applyY(rawY);

        ctx.beginPath();
        ctx.arc(screenX, screenY, 2.5 * transform.k, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6 * transform.k;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animFrameId = requestAnimationFrame(renderParticles);
    };

    renderParticles();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [filteredData]);

  // Zoom Controls
  const handleZoomIn = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomRef.current.scaleBy, 1.3);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomRef.current.scaleBy, 0.7);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !containerRef.current || !zoomRef.current) return;
    const width = containerRef.current.clientWidth || 900;
    const height = containerRef.current.clientHeight || 650;
    const svg = d3.select(svgRef.current);
    svg
      .transition()
      .duration(500)
      .call(
        zoomRef.current.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85)
      );
  };

  const handleReheatSimulation = () => {
    const sim = (svgRef.current as any)?.__simulation;
    if (sim) {
      sim.alpha(1).restart();
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[580px] bg-slate-950 overflow-hidden flex flex-col">
      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 max-w-full">
        {/* Legend Filters */}
        <div className="flex items-center space-x-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveLegendFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeLegendFilter === 'all'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Nodes
          </button>
          <button
            onClick={() => setActiveLegendFilter('server')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center ${
              activeLegendFilter === 'server'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3 h-3 mr-1" />
            Servers
          </button>
          <button
            onClick={() => setActiveLegendFilter('gateway')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center ${
              activeLegendFilter === 'gateway'
                ? 'bg-orange-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3 h-3 mr-1" />
            Cloudflare Edge
          </button>
          <button
            onClick={() => setActiveLegendFilter('pypi')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center ${
              activeLegendFilter === 'pypi'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3 h-3 mr-1" />
            PyPI Packages
          </button>
          <button
            onClick={() => setActiveLegendFilter('guide')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center ${
              activeLegendFilter === 'guide'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3 h-3 mr-1" />
            Guides
          </button>
        </div>
      </div>

      {/* Right Controls: Zoom & Fit */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          title="Reset Zoom & Center"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleReheatSimulation}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          title="Rearrange Node Layout"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Info Bar Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300 flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span>Click any node to open technical inspector, copy PyPI commands, or test edge endpoints. Drag nodes to customize topology view.</span>
        </div>

        {/* Hovered Node Preview Pill */}
        {hoveredNode && (
          <div className="pointer-events-auto bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-200 flex items-center space-x-2 shadow-2xl animate-fade-in">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <span className="font-semibold text-white">{hoveredNode.label}</span>
            {hoveredNode.subtext && (
              <span className="text-slate-400 font-mono text-[11px] truncate max-w-xs">
                ({hoveredNode.subtext})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Graph Area */}
      <div ref={containerRef} className="relative w-full h-full flex-1">
        {/* Canvas for Particle Stream Effect */}
        <canvas
          ref={canvasRef}
          width={containerRef.current?.clientWidth || 1000}
          height={containerRef.current?.clientHeight || 650}
          className="absolute inset-0 pointer-events-none z-0"
        />

        {/* SVG for Nodes and Edges */}
        <svg
          ref={svgRef}
          className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        />
      </div>
    </div>
  );
};
