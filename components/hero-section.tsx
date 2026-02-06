"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useOcean } from "@/app/context/OceanContext";

export function HeroSection() {
  const { wallet, connectWallet, balance } = useOcean();
  const handleWalletAction = () => {
    if (wallet) {
      // If connected, go to dashboard
      router.push("/dashboard");
    } else {
      // If not connected, trigger your "Get OCT" logic
      console.log("Redirecting to purchase or opening connect modal...");
    }
  };
  return (
    // Fixed: Added dark mode gradient colors
    <section className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-background py-20 lg:py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge - Fixed: Added dark mode variants */}
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              ERC-20 Utility Token
            </div>

            {/* Headline - Fixed: text-gray-900 -> text-foreground */}
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span>The Future of</span>
              <br />
              <span className="text-blue-600 dark:text-blue-400">On-Chain Value</span>
              <br />
              <span>Transfer</span>
            </h1>

            {/* Description - Fixed: text-gray-600 -> text-muted-foreground */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              OceanToken (OCT) is a capped ERC-20 utility token designed for
              secure value transfer and on-chain incentives. Fast, transparent,
              and built for scalability.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleWalletAction}  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                
                {wallet ? "Go to Dashboard" : "Connect Wallet"}
              </button>
              
              {/* Fixed: border-gray-300 -> border-border, text-gray-900 -> text-foreground */}
              <button className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-accent transition-colors">
                Read Whitepaper
              </button>
            </div>
          </div>

          {/* Right Content - Token Card */}
          <div className="h-full">
            {/* Fixed: bg-white -> bg-card, text colors updated */}
            <div className="bg-card border border-border rounded-2xl shadow-xl p-6 space-y-6">
              {/* Token Balance Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Token Balance</p>
                  <p className="text-4xl font-bold text-foreground">1,250.00</p>
                  <p className="text-muted-foreground mt-1">OCT</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 4V2M8 4V2" />
                  </svg>
                </div>
              </div>

              {/* Divider - Fixed: bg-gray-200 -> bg-border */}
              <div className="h-px bg-border" />

              {/* Transaction History */}
              <div className="space-y-4">
                {/* Received */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Received</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+500 OCT</p>
                    <p className="text-sm text-muted-foreground">$210.00</p>
                  </div>
                </div>

                {/* Sent */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Sent</p>
                      <p className="text-sm text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">-250 OCT</p>
                    <p className="text-sm text-muted-foreground">$105.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}