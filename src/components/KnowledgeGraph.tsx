import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import knowledgeGraphBg from "@/assets/knowledge-graph-bg.jpg";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Edge {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: "lendora", label: "Lendora", x: 50, y: 50, size: 24, color: "primary" },
  { id: "risk", label: "Risk Assessment", x: 25, y: 25, size: 16, color: "accent" },
  { id: "ml", label: "Machine Learning", x: 75, y: 20, size: 14, color: "accent" },
  { id: "fraud", label: "Fraud Detection", x: 15, y: 55, size: 14, color: "primary" },
  { id: "credit", label: "Credit Scoring", x: 85, y: 45, size: 16, color: "accent" },
  { id: "kyc", label: "KYC/AML", x: 30, y: 75, size: 12, color: "primary" },
  { id: "analytics", label: "Analytics", x: 70, y: 80, size: 14, color: "accent" },
  { id: "api", label: "REST APIs", x: 55, y: 85, size: 12, color: "primary" },
  { id: "bank", label: "Banking", x: 10, y: 35, size: 10, color: "accent" },
  { id: "fintech", label: "Fintech", x: 90, y: 65, size: 10, color: "primary" },
];

const edges: Edge[] = [
  { from: "lendora", to: "risk" },
  { from: "lendora", to: "ml" },
  { from: "lendora", to: "fraud" },
  { from: "lendora", to: "credit" },
  { from: "lendora", to: "analytics" },
  { from: "lendora", to: "api" },
  { from: "risk", to: "fraud" },
  { from: "risk", to: "credit" },
  { from: "ml", to: "credit" },
  { from: "fraud", to: "kyc" },
  { from: "analytics", to: "api" },
  { from: "kyc", to: "bank" },
  { from: "credit", to: "fintech" },
  { from: "api", to: "fintech" },
  { from: "risk", to: "bank" },
];

const KnowledgeGraph = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodePosition = (node: Node) => ({
    x: `${node.x}%`,
    y: `${node.y}%`,
  });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={knowledgeGraphBg} 
          alt="Knowledge Graph Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Knowledge Graph
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Connected{" "}
            <span className="italic gradient-text">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered knowledge graph connects all aspects of lending - 
            from risk assessment to compliance, creating intelligent insights.
          </p>
        </div>

        {/* Interactive Knowledge Graph */}
        <div className={`relative max-w-4xl mx-auto aspect-[16/10] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="absolute inset-0 glass rounded-3xl overflow-hidden border border-border/50 glow">
            <svg
              ref={svgRef}
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Edges */}
              {edges.map((edge, index) => {
                const fromNode = nodes.find((n) => n.id === edge.from);
                const toNode = nodes.find((n) => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isHighlighted ? "hsl(var(--accent))" : "hsl(var(--border))"}
                    strokeWidth={isHighlighted ? 0.5 : 0.2}
                    className={`transition-all duration-300 ${isVisible ? 'animate-line-draw' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node, index) => {
                const isHovered = hoveredNode === node.id;
                const isConnected = edges.some(
                  (e) =>
                    (e.from === hoveredNode && e.to === node.id) ||
                    (e.to === hoveredNode && e.from === node.id)
                );

                return (
                  <g
                    key={node.id}
                    className={`cursor-pointer transition-all duration-300 ${isVisible ? 'animate-node-pulse' : ''}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Glow effect */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size / 6 + 2}
                      fill={`hsl(var(--${node.color}) / ${isHovered ? 0.5 : 0.2})`}
                      className="blur-sm"
                    />
                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size / 6}
                      fill={`hsl(var(--${node.color}) / ${isHovered || isConnected ? 1 : 0.7})`}
                      className="transition-all duration-300"
                      style={{
                        transform: isHovered ? "scale(1.3)" : "scale(1)",
                        transformOrigin: `${node.x}px ${node.y}px`,
                      }}
                    />
                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + node.size / 6 + 4}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize={node.id === "lendora" ? 3 : 2}
                      fontFamily="Inter Tight, sans-serif"
                      fontWeight={node.id === "lendora" ? 600 : 400}
                      className={`transition-opacity duration-300 ${isHovered || isConnected || node.id === "lendora" ? "opacity-100" : "opacity-60"}`}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Bottom Info */}
        <div className={`grid md:grid-cols-3 gap-8 mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center glass rounded-2xl p-6 border border-border/50 card-hover">
            <div className="text-3xl font-serif gradient-text mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Data Sources Connected</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 border border-border/50 card-hover">
            <div className="text-3xl font-serif gradient-text mb-2">500K+</div>
            <div className="text-sm text-muted-foreground">Data Points Analyzed</div>
          </div>
          <div className="text-center glass rounded-2xl p-6 border border-border/50 card-hover">
            <div className="text-3xl font-serif gradient-text mb-2">Real-time</div>
            <div className="text-sm text-muted-foreground">Graph Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeGraph;