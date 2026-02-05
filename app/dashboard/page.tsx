"use client";

import { useState } from "react";
import { 
  Coins, Zap, DollarSign, Send, Copy, CheckCircle2, 
  Shield, AlertCircle, Wallet 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

// Context & Components
import { useOcean } from "@/app/context/OceanContext";
import { RecentTransactions } from "@/components/recent-transactions"; // Ensure path is correct

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  
  // Consolidated destructuring to prevent "balance defined multiple times" error
  const { 
    wallet, 
    balance, 
    blockReward, 
    recipient, 
    setRecipient, 
    amount, 
    setAmount, 
    transferTokens, 
    updateBlockReward,
    connectWallet,
    isPending,
    gasEstimate
  } = useOcean();

  const copyAddress = () => {
    if (!wallet) return;
    navigator.clipboard.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    await transferTokens();
  };

  const handleUpdateReward = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBlockReward();
  };

  // Dynamic Stats based on Blockchain data
  const mainStats = [
    {
      icon: <Coins className="w-8 h-8" />,
      label: 'Token Balance',
      value: balance ? parseFloat(balance).toLocaleString() : "0.00",
      subtext: 'OCT',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      label: 'Block Reward',
      value: blockReward || "0.00",
      subtext: 'OCT per block',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: 'USD Value',
      value: balance ? `$${(parseFloat(balance) * 3.00).toLocaleString()}` : "$0.00",
      subtext: '@ $3.00 per OCT',
    },
  ];

  // If wallet isn't connected, show a CTA
  if (!wallet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <div className="relative">
          <Wallet className="w-20 h-20 text-muted-foreground opacity-20" />
          <div className="absolute inset-0 animate-pulse bg-primary/10 rounded-full blur-2xl" />
        </div>
        <h2 className="text-2xl font-bold">Wallet Disconnected</h2>
        <p className="text-muted-foreground text-center max-w-xs">
          Please connect your MetaMask wallet to access the Ocean Token dashboard.
        </p>
        <Button onClick={connectWallet} size="lg" className="mt-2">
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
              Ocean Dashboard
            </h1>
            <p className="text-muted-foreground">
              Live tracking and management for your OCT assets.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Wallet Address Card */}
        <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 p-6 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="z-10">
              <p className="text-sm font-medium text-muted-foreground mb-2">Connected Account</p>
              <div className="flex items-center gap-3">
                <code className="text-lg md:text-xl font-mono font-semibold text-foreground break-all bg-muted/50 px-2 py-1 rounded">
                  {wallet}
                </code>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-all active:scale-90"
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <Badge className="w-fit bg-green-500/10 text-green-500 border-green-500/20 px-4 py-1.5 h-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Sepolia Testnet
            </Badge>
          </div>
        </Card>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainStats.map((stat, i) => (
            <Card key={i} className="p-6 border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/5 rounded-2xl text-primary">{stat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className=" mt-0.5">
                    {/*text-2xl font-bold */}
                    {stat.value} <span className="text-sm font-normal text-muted-foreground ml-1">{stat.subtext}</span>
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transfer Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Transfer Tokens</h3>
                  <p className="text-sm text-muted-foreground">Send OCT to any ERC-20 compatible address.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider bg-primary/5 px-3 py-1 rounded-full">
                  <Shield className="w-3 h-3" /> Secure
                </div>
              </div>

              <form onSubmit={handleTransfer} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="0x..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="amount">Amount (OCT)</Label>
                    <button 
                      type="button" 
                      onClick={() => setAmount(balance)}
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      Use Max Balance
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                      OCT
                    </div>
                  </div>
                </div>

                {/* Gas Estimate Display */}
                <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Network Fee</span>
                    <span className="font-mono font-medium">
                      {gasEstimate !== "0" ? `~${parseFloat(gasEstimate).toFixed(6)} ETH` : "--"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border/50 pt-3">
                    <span className="text-foreground font-semibold">Total to be debited</span>
                    <span className="text-foreground font-bold">{amount || "0"} OCT + Gas</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending || !amount || !recipient}
                  className="w-full h-12 text-lg font-semibold"
                >
                  {isPending ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Broadcasting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send OCT
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* History Section */}
            <RecentTransactions />
          </div>

          {/* Reward Column */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-bold mb-6">Incentive Settings</h3>
              
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8 text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Active Block Reward</p>
                <p className=" font-black text-primary tracking-tighter">
                  {/*text-5xl*/}
                  {blockReward}</p>
                <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest">OCT per block</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-reward">Adjust Reward Rate</Label>
                  <Input
                    id="new-reward"
                    type="number"
                    placeholder="New value..."
                    onChange={(e) => setAmount(e.target.value)} // Note: You may want a separate state for this in context
                  />
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-600 dark:text-amber-200 leading-relaxed">
                    <strong>Admin Note:</strong> This change requires a signed transaction from the owner wallet and will persist on-chain.
                  </p>
                </div>

                <Button 
                  onClick={handleUpdateReward} 
                  variant="outline" 
                  className="w-full h-11 border-primary/20 hover:bg-primary/5"
                  disabled={isPending}
                >
                  Update Protocol Reward
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-muted/20 border-dashed">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href={`https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`} target="_blank" className="text-sm text-primary hover:underline flex items-center gap-2">
                    Contract on Etherscan <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://faucet.quicknode.com/ethereum/sepolia" target="_blank" className="text-sm text-primary hover:underline flex items-center gap-2">
                    Get Sepolia ETH <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

// Small helper for external links
function ExternalLink({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}