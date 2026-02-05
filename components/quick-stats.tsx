import { Card } from '@/components/ui/card';

interface QuickStat {
  label: string;
  value: string;
}

interface QuickStatsProps {
  stats: QuickStat[];
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <Card className="p-6 bg-card border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Stats</h3>
      <div className="space-y-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="font-semibold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
