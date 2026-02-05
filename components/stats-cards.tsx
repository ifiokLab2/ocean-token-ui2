import React from "react"
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

interface StatsCardsProps {
  stats: StatCard[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <Card key={idx} className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-2">{stat.subtext}</p>
            </div>
            <div className="text-primary/60">{stat.icon}</div>
          </div>
          {stat.change && (
            <div className="flex items-center gap-1 text-xs font-semibold">
              {stat.changeType === 'positive' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={
                  stat.changeType === 'positive'
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {stat.change}
              </span>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
