'use client';

import { TrendingUp, Eye, Puzzle, Zap, Shield, Layers } from 'lucide-react';

const featuresGrid = [
  {
    title: 'Scalable Design',
    description: 'Architecture built to handle growing demand without compromising performance or decentralization.',
    icon: TrendingUp
  },
  {
    title: 'Full Transparency',
    description: 'Open-source code and on-chain verification. Every transaction is publicly auditable and traceable.',
    icon: Eye
  },
  {
    title: 'Easy Integration',
    description: 'Standard ERC-20 interface makes integration seamless with wallets, exchanges, and DeFi protocols.',
    icon: Puzzle
  },
  {
    title: 'Lightning Fast',
    description: 'Execute transactions in seconds with minimal gas fees. Built on Ethereum for maximum compatibility and speed.',
    icon: Zap
  },
  {
    title: 'Secure & Audited',
    description: 'Smart contracts audited by leading security firms. Your assets are protected with industry-best practices.',
    icon: Shield
  },
  {
    title: 'Reward Mechanics',
    description: 'Configurable incentive structures to reward network participation and encourage ecosystem growth.',
    icon: Layers
  }
];


export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Built for Performance
        </h2>
        {/* Fixed: Used text-muted-foreground instead of opacity text-foreground/70 */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          OceanToken combines speed, security, and flexibility to power the next generation of decentralized applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresGrid.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              /* Fixed: Changed bg-white to bg-card and added hover shadow */
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Icon container: bg-secondary works perfectly across themes */}
              <div className="bg-secondary rounded-lg w-14 h-14 flex items-center justify-center mb-6">
                <IconComponent className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
