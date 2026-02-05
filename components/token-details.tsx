'use client';

import { Info } from 'lucide-react';

const distributionData = [
  { label: 'Community Rewards', percentage: 40, color: 'bg-primary' },
  { label: 'Public Sale', percentage: 25, color: 'bg-blue-500 dark:bg-blue-400' },
  { label: 'Development Fund', percentage: 20, color: 'bg-blue-400 dark:bg-blue-500' },
  { label: 'Team & Advisors', percentage: 10, color: 'bg-blue-300 dark:bg-blue-600' },
  { label: 'Liquidity Pool', percentage: 5, color: 'bg-blue-200 dark:bg-blue-700' }
];

export default function TokenDetails() {
  return (
    <section id="tokenomics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column - Token Details */}
        <div>
          {/* Fixed: bg-white -> bg-card */}
          <div className="bg-card rounded-xl p-8 border border-border mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-8">Token Details</h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Token Name</span>
                <span className="font-semibold text-foreground">OceanToken</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Token Symbol</span>
                <span className="font-semibold text-foreground">OCT</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Total Supply</span>
                <span className="font-semibold text-foreground">10,000,000 OCT</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Blockchain</span>
                <span className="font-semibold text-foreground">Ethereum (ERC-20)</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xl font-bold text-foreground">Decimals</h3>
            </div>
            <div className="text-3xl font-bold text-primary">18</div>
          </div>
        </div>

        {/* Right Column - Distribution */}
        <div>
          <div className="bg-card rounded-xl p-8 border border-border h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-foreground">Distribution Breakdown</h3>
              <button className="bg-secondary rounded-full w-8 h-8 flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <Info className="w-4 h-4 text-primary" />
              </button>
            </div>

            <div className="space-y-5">
              {distributionData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-sm font-semibold text-primary">{item.percentage}%</span>
                  </div>
                  {/* Fixed: bg-gray-100 -> bg-secondary (adapts to dark mode) */}
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Supply Cap Guarantee - bg-primary usually handles its own text via primary-foreground */}
      <div className="mt-12 bg-primary text-primary-foreground rounded-xl p-8 border border-primary/20 shadow-lg dark:shadow-primary/10">
        <h3 className="text-2xl font-bold mb-4">Supply Cap Guarantee</h3>
        <p className="text-base opacity-90 leading-relaxed">
          The total supply is permanently capped at 10 million tokens. No additional tokens can ever be minted, ensuring scarcity and value preservation.
        </p>
      </div>
    </section>
  );
}