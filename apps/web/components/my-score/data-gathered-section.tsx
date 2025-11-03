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

// Function to highlight numbers in text with enhancement for updated values
function highlightNumbers(text: string, isImproved: boolean = false) {
  const parts = text.split(/(\d+)/);
  return parts.map((part, idx) => {
    if (/^\d+$/.test(part)) {
      return (
        <span key={idx} className={`font-bold ${isImproved ? "text-[#10b981]" : "text-foreground"}`}>
          {part}
        </span>
      );
    }
    return part;
  });
}

// Function to compare metrics and detect improvements
function getMetricImprovement(
  currentMetric: { name: string; value: number; description: string } | undefined,
  updatedMetric: { name: string; value: number; description: string } | undefined,
): { hasImprovement: boolean; increase: number; previousDescription?: string; updatedDescription?: string } {
  if (!currentMetric || !updatedMetric) {
    return { hasImprovement: false, increase: 0 };
  }
  const increase = updatedMetric.value - currentMetric.value;
  return {
    hasImprovement: increase > 0,
    increase,
    previousDescription: currentMetric.description,
    updatedDescription: updatedMetric.description,
  };
}

export function DataGatheredSection() {
  const { currentMetrics: metrics, updatedMetrics } = useMetricsStore();

  if (!metrics || metrics.length === 0) {
    return null;
  }

  const topMetrics = metrics.filter(m => TOP_METRICS.includes(m.name));
  const bottomMetrics = metrics.filter(m => BOTTOM_METRICS.includes(m.name));

  const renderMetric = (metric: { name: string; value: number; description: string }) => {
    const hoverClass = METRIC_HOVER_COLORS[metric.name] || "";
    const updatedMetric = updatedMetrics?.find(m => m.name === metric.name);
    const { hasImprovement, increase, updatedDescription } = getMetricImprovement(metric, updatedMetric);
    const displayDescription = hasImprovement && updatedDescription ? updatedDescription : metric.description;

    return (
      <div
        key={metric.name}
        className={`rounded-lg border p-4 transition-all ${
          hasImprovement
            ? "border-mega-green/80 bg-gradient-to-br from-mega-green/20 to-mega-green/10 shadow-md hover:border-mega-green/90 hover:shadow-lg"
            : `bg-foreground/2 border-foreground/20 hover:border-foreground/30 ${hoverClass}`
        }`}
        title={metric.description}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-xs font-medium uppercase tracking-widest text-foreground/60">{metric.name}</div>
          {hasImprovement && (
            <div className="bg-[#10b981]/12 flex items-center gap-1 rounded-md px-2.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-bold text-[#10b981]">+{increase}</span>
            </div>
          )}
        </div>
        <div
          className={`text-sm leading-relaxed ${hasImprovement ? "font-medium text-foreground" : "text-foreground/80"}`}
        >
          {highlightNumbers(displayDescription, hasImprovement)}
        </div>
      </div>
    );
  };

  const renderBottomMetric = (metric: { name: string; value: number; description: string }) => {
    const updatedMetric = updatedMetrics?.find(m => m.name === metric.name);
    const { hasImprovement, increase, updatedDescription } = getMetricImprovement(metric, updatedMetric);
    const displayDescription = hasImprovement && updatedDescription ? updatedDescription : metric.description;

    return (
      <div
        key={metric.name}
        className={`rounded-lg p-4 transition-all ${
          hasImprovement
            ? "border border-mega-green/80 bg-gradient-to-br from-mega-green/20 to-mega-green/10 shadow-md hover:border-mega-green/90 hover:shadow-lg"
            : "hover:bg-foreground/8 border-0 bg-foreground/5"
        }`}
        title={metric.description}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-xs font-medium uppercase tracking-widest text-foreground/60">{metric.name}</div>
          {hasImprovement && (
            <div className="bg-[#10b981]/12 flex items-center gap-1 rounded-md px-2.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-bold text-[#10b981]">+{increase}</span>
            </div>
          )}
        </div>
        <div
          className={`text-sm leading-relaxed ${hasImprovement ? "font-medium text-foreground" : "text-foreground/80"}`}
        >
          {highlightNumbers(displayDescription, hasImprovement)}
        </div>
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
