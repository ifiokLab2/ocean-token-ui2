'use client';

import { CheckCircle2 } from 'lucide-react';

const roadmapItems = [
  {
    phase: 'Q1 2024 - Completed',
    title: 'Foundation & Launch',
    items: [
      'Smart contract development',
      'Security audit completion',
      'Token deployment on Ethereum'
    ]
  },
  {
    phase: 'Q2 2024 - In Progress',
    title: 'Ecosystem Growth',
    items: [
      'Exchange listings',
      'Community building initiatives',
      'DeFi protocol integrations'
    ]
  },
  {
    phase: 'Q3 2024 - Upcoming',
    title: 'Ecosystem Expansion',
    items: [
      'DeFi protocol integrations',
      'Staking rewards launch',
      'Mobile wallet support'
    ]
  },
  {
    phase: 'Q4 2024 - Planned',
    title: 'Governance & Beyond',
    items: [
      'DAO governance launch',
      'Cross-chain bridge development',
      'Enterprise partnerships'
    ]
  }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Roadmap
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our journey to building the future of decentralized value transfer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roadmapItems.map((item, index) => (
          <div key={index} className="relative">
            {/* Fixed: Replaced bg-white with bg-card for theme consistency */}
            <div className={`h-full rounded-2xl p-8 border-2 transition-colors duration-300 ${
              index === 0 
                ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                : 'border-border bg-card'
            }`}>
              
              {/* Phase Badge - Fixed: Added dark mode variants */}
              <div className={`inline-block rounded-full px-3 py-1 text-xs font-medium mb-4 ${
                index === 0
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                  : 'bg-secondary text-muted-foreground'
              }`}>
                {item.phase}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-6">
                {item.title}
              </h3>

              {/* Items */}
              <ul className="space-y-3">
                {item.items.map((listItem, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      index === 0 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground/40'
                    }`} />
                    <span className={`text-sm ${
                      index === 0 ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {listItem}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline Connector */}
            {index < roadmapItems.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border transform -translate-y-1/2"></div>
            )}

            {/* Timeline Dot */}
            <div className={`hidden lg:block absolute top-1/2 -right-6 w-3 h-3 rounded-full transform -translate-y-1/2 transition-colors ${
              index === 0 ? 'bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-border'
            }`}></div>
          </div>
        ))}
      </div>
    </section>
  );
}