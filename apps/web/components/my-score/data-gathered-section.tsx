import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMetricsStore } from "@/store/metrics-store";
import { BarChart3 } from "lucide-react";

const METRIC_HOVER_COLORS: Record<string, string> = {
  "Tx Activity": "hover:bg-mega-coral/5",
  "Weeks Active": "hover:bg-mega-blue/5",
  "Contract Diversity": "hover:bg-mega-green/5",
  "Dev Activity": "hover:bg-mega-pink/5",
  Tenure: "hover:bg-mega-purple/5",
  "Sustained Engagement": "hover:bg-mega-yellow/5",
};

const TOP_METRICS = ["Transaction Activity", "Weeks Active", "Contract Diversity", "Developer Activity"];
const BOTTOM_METRICS = ["Tenure", "Sustained Engagement"];

// Function to highlight numbers in text
function highlightNumbers(text: string) {
  const parts = text.split(/(\d+)/);
  return parts.map((part, idx) => {
    if (/^\d+$/.test(part)) {
      return (
        <span key={idx} className="font-bold text-foreground">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function DataGatheredSection() {
  const { currentMetrics: metrics } = useMetricsStore();

  if (!metrics || metrics.length === 0) {
    return null;
  }

  const topMetrics = metrics.filter(m => TOP_METRICS.includes(m.name));
  const bottomMetrics = metrics.filter(m => BOTTOM_METRICS.includes(m.name));

  const renderMetric = (metric: { name: string; value: number; description: string }) => {
    const hoverClass = METRIC_HOVER_COLORS[metric.name] || "";
    return (
      <div
        key={metric.name}
        className={`bg-foreground/2 rounded-lg border border-foreground/20 p-4 transition-all hover:border-foreground/30 ${hoverClass}`}
        title={metric.description}
      >
        <div className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/60">{metric.name}</div>
        <div className="text-sm leading-relaxed text-foreground/80">{highlightNumbers(metric.description)}</div>
      </div>
    );
  };

  const renderBottomMetric = (metric: { name: string; value: number; description: string }) => {
    return (
      <div
        key={metric.name}
        className="hover:bg-foreground/8 rounded-lg bg-foreground/5 p-4 transition-all"
        title={metric.description}
      >
        <div className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/60">{metric.name}</div>
        <div className="text-sm leading-relaxed text-foreground/80">{highlightNumbers(metric.description)}</div>
      </div>
    );
  };

  return (
    <Card className="border border-foreground/15 bg-background shadow-md">
      <CardHeader className="border-b border-foreground/10 px-6 py-4">
        <CardTitle className="flex items-center gap-3 text-base font-bold uppercase tracking-wider">
          <BarChart3 className="h-5 w-5 text-mega-coral" />
          Data Gathered
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        {/* Top Metrics */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{topMetrics.map(renderMetric)}</div>

        {/* Bottom Metrics */}
        {bottomMetrics.length > 0 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{bottomMetrics.map(renderBottomMetric)}</div>
        )}
      </CardContent>
    </Card>
  );
}
