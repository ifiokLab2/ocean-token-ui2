export default function TransactionHistory() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          The Future of<br />
          {/* Fixed: Lighter blue for dark mode visibility */}
          <span className="text-blue-700 dark:text-blue-400">On-Chain Value</span>
          <br />
          Transfer
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: 'ERC-20 Utility Token',
            description: 'Built on Ethereum for maximum compatibility and security'
          },
          {
            label: 'Lightning Fast',
            description: 'Execute transactions in seconds with minimal gas fees'
          },
          {
            label: 'Fully Transparent',
            description: 'Open-source and on-chain verified for complete auditability'
          }
        ].map((item, index) => (
          <div 
            key={index} 
            /* Fixed: Use secondary or card backgrounds that adapt automatically */
            className="bg-secondary/50 dark:bg-card rounded-lg p-6 border border-border transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}