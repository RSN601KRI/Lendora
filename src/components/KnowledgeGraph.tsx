import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import knowledgeGraphBg from "@/assets/knowledge-graph-bg.jpg";

interface Node {
  id: string;
  label: string;
  angle: number; // Starting angle in degrees
  orbit: number; // Orbit radius (1 = innermost, 3 = outermost)
  size: number;
  color: string;
  speed: number; // Rotation speed multiplier
}

interface Edge {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: "lendora", label: "Lendora", angle: 0, orbit: 0, size: 28, color: "primary", speed: 0 },
  { id: "risk", label: "Risk Assessment", angle: 0, orbit: 1, size: 16, color: "accent", speed: 0.8 },
  { id: "ml", label: "Machine Learning", angle: 72, orbit: 1, size: 14, color: "accent", speed: 0.8 },
  { id: "fraud", label: "Fraud Detection", angle: 144, orbit: 1, size: 14, color: "primary", speed: 0.8 },
  { id: "credit", label: "Credit Scoring", angle: 216, orbit: 1, size: 16, color: "accent", speed: 0.8 },
  { id: "kyc", label: "KYC/AML", angle: 288, orbit: 1, size: 12, color: "primary", speed: 0.8 },
  { id: "analytics", label: "Analytics", angle: 30, orbit: 2, size: 14, color: "accent", speed: 0.5 },
  { id: "api", label: "REST APIs", angle: 90, orbit: 2, size: 12, color: "primary", speed: 0.5 },
  { id: "bank", label: "Banking", angle: 150, orbit: 2, size: 10, color: "accent", speed: 0.5 },
  { id: "fintech", label: "Fintech", angle: 210, orbit: 2, size: 10, color: "primary", speed: 0.5 },
  { id: "data", label: "Data Lake", angle: 270, orbit: 2, size: 12, color: "accent", speed: 0.5 },
  { id: "compliance", label: "Compliance", angle: 330, orbit: 2, size: 11, color: "primary", speed: 0.5 },
];

const edges: Edge[] = [
  { from: "lendora", to: "risk" },
  { from: "lendora", to: "ml" },
  { from: "lendora", to: "fraud" },
  { from: "lendora", to: "credit" },
  { from: "lendora", to: "kyc" },
  { from: "risk", to: "analytics" },
  { from: "ml", to: "api" },
  { from: "fraud", to: "bank" },
  { from: "credit", to: "fintech" },
  { from: "kyc", to: "data" },
  { from: "analytics", to: "compliance" },
];

const KnowledgeGraph = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  const centerX = 50;
  const centerY = 50;
  const orbitRadii = [0, 15, 28]; // Orbit 0 = center, 1 = inner, 2 = outer

  useEffect(() => {
    const animate = () => {
      setRotation((prev) => (prev + 0.3) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const getNodePosition = (node: Node) => {
    if (node.orbit === 0) return { x: centerX, y: centerY };
    const angleRad = ((node.angle + rotation * node.speed) * Math.PI) / 180;
    const radius = orbitRadii[node.orbit];
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  };

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
        <div className={`relative max-w-4xl mx-auto aspect-square md:aspect-[16/10] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="absolute inset-0 glass rounded-3xl overflow-hidden border border-border/50 glow">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Orbit Rings */}
              {orbitRadii.slice(1).map((radius, index) => (
                <circle
                  key={`orbit-${index}`}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="hsl(var(--border) / 0.3)"
                  strokeWidth="0.15"
                  strokeDasharray="1 1"
                  className="animate-pulse"
                />
              ))}

              {/* Edges */}
              {edges.map((edge, index) => {
                const fromNode = nodes.find((n) => n.id === edge.from);
                const toNode = nodes.find((n) => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const fromPos = getNodePosition(fromNode);
                const toPos = getNodePosition(toNode);
                const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={isHighlighted ? "hsl(var(--accent))" : "hsl(var(--border))"}
                    strokeWidth={isHighlighted ? 0.4 : 0.15}
                    className="transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node, index) => {
                const pos = getNodePosition(node);
                const isHovered = hoveredNode === node.id;
                const isConnected = edges.some(
                  (e) =>
                    (e.from === hoveredNode && e.to === node.id) ||
                    (e.to === hoveredNode && e.from === node.id)
                );

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Glow effect */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={node.size / 6 + 2}
                      fill={`hsl(var(--${node.color}) / ${isHovered ? 0.6 : 0.25})`}
                      className="blur-sm transition-all duration-300"
                    />
                    {/* Node circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isHovered ? node.size / 5 : node.size / 6}
                      fill={`hsl(var(--${node.color}) / ${isHovered || isConnected ? 1 : 0.8})`}
                      className="transition-all duration-300"
                    />
                    {/* Inner glow */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={node.size / 10}
                      fill="hsl(var(--foreground) / 0.3)"
                    />
                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y + node.size / 6 + 4}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize={node.id === "lendora" ? 3.5 : 2}
                      fontFamily="Inter Tight, sans-serif"
                      fontWeight={node.id === "lendora" ? 700 : 500}
                      className={`transition-opacity duration-300 ${isHovered || isConnected || node.id === "lendora" ? "opacity-100" : "opacity-70"}`}
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