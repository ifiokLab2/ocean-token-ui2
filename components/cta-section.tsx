'use client';

import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    // Fixed: Adjusted gradient for dark mode to be slightly deeper
    <section className="w-full bg-gradient-to-b from-primary to-primary/90 dark:from-primary/20 dark:to-background py-20 px-4 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Fixed: text-white is okay, but text-foreground ensures it follows theme if you prefer */}
        <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-foreground mb-6 transition-colors">
          Ready to Join the Ocean?
        </h2>
        
        {/* Fixed: white/90 -> muted-foreground in dark mode for better legibility */}
        <p className="text-lg md:text-xl text-white/90 dark:text-muted-foreground mb-10 max-w-2xl mx-auto">
          Get started with OceanToken today and experience the future of decentralized value transfer
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 font-semibold px-8 transition-all"
          >
            Buy OCT Now
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 dark:border-border dark:text-foreground dark:hover:bg-accent font-semibold px-8 bg-transparent transition-all"
          >
            View on Etherscan
          </Button>
        </div>
      </div>
    </section>
  );
}