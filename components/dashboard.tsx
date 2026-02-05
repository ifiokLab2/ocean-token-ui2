'use client';

//import { WalletHeader } from '@/components/wallet-header';
import { StatsCards } from '@/components/stats-cards';
import { TransferForm } from '@/components/transfer-form';
import { BlockRewardSettings } from '@/components/block-reward-settings';
import { RecentTransactions } from '@/components/recent-transactions';
import { QuickStats } from '@/components/quick-stats';
import { ThemeToggle } from '@/components/theme-toggle';
import {Shield, Send, Coins,AlertCircle, Zap, DollarSign,Copy, CheckCircle2  } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [newReward, setNewReward] = useState('');
  const currentReward = '250.00';
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7';
   const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Transfer submitted:', formData);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const mainStats = [
    {
      icon: <Coins className="w-8 h-8" />,
      label: 'Token Balance',
      value: '15,420.50',
      subtext: 'OCT',
      change: '+12.5%',
      changeType: 'positive' as const,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      label: 'Block Reward',
      value: '250.00',
      subtext: 'OCT per block',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: 'USD Value',
      value: '$46,261.50',
      subtext: '@ $3.00 per OCT',
      change: '+8.2%',
      changeType: 'positive' as const,
    },
  ];

  const quickStats = [
    { label: 'Total Supply', value: '1,000,000 OCT' },
    { label: 'Circulating Supply', value: '750,000 OCT' },
    { label: 'Market Cap', value: '$2,250,000' },
    { label: '24h Volume', value: '$125,430' },
  ];

  const transactions = [
    {
      id: '1',
      type: 'received' as const,
      amount: '+500.00 OCT',
      address: 'From: 0x8a2b...3c4d',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'sent' as const,
      amount: '-250.00 OCT',
      address: 'To: 0x5e7f...9a1b',
      time: '5 hours ago',
    },
    {
      id: '3',
      type: 'reward' as const,
      amount: '+250.00 OCT',
      blockNumber: 'Block #45,892',
      time: '1 day ago',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Crypto Wallet
            </h1>
            <p className="text-muted-foreground">
              Manage your tokens, transfers, and block rewards
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Wallet Header */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
              <div className="flex items-center gap-2">
                <code className="text-xl font-mono font-semibold text-foreground">
                  {walletAddress}
                </code>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label="Copy address"
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 inline-block" />
              Connected
            </Badge>
          </div>
        </Card>

        {/* Main Stats Cards */}
        <StatsCards stats={mainStats} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Transfer */}
          <div className="lg:col-span-2">
               <Card className="p-6 bg-card border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Transfer Tokens</h3>
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <Shield className="w-4 h-4" />
                      Secure Transfer
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="recipient" className="text-sm text-foreground mb-2 block">
                        Recipient Address
                      </Label>
                      <div className="relative">
                        <Input
                          id="recipient"
                          type="text"
                          placeholder="Enter wallet address (0x...)"
                          value={formData.recipient}
                          onChange={(e) =>
                            setFormData({ ...formData, recipient: e.target.value })
                          }
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Paste address"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Double-check the address before transferring
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="amount" className="text-sm text-foreground mb-2 block">
                        Amount
                      </Label>
                      <div className="relative">
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <button
                            type="button"
                            className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors"
                          >
                            MAX
                          </button>
                          <span className="text-muted-foreground text-sm">OCT</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Available: 15,420.50 OCT ≈ $0.00 USD
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border/30">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Network Fee</span>
                        <span className="text-foreground">0.5 OCT</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Transaction Speed</span>
                        <span className="text-foreground">~30 seconds</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border/30">
                        <span className="text-foreground">Total Amount</span>
                        <span className="text-foreground">0.00 OCT</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Transfer Tokens
                    </Button>
                  </form>
                </Card>
          </div>

          {/* Right Column - Block Rewards */}
          <div>
            <Card className="p-6 bg-card border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Block Reward Settings
              </h3>

              <div className="bg-muted/30 border border-muted/50 rounded-lg p-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Reward</p>
                  <p className="text-4xl font-bold text-foreground">{currentReward}</p>
                  <p className="text-sm text-muted-foreground mt-2">OCT per block</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="new-reward" className="text-sm text-foreground mb-2 block">
                    New Block Reward
                  </Label>
                  <Input
                    id="new-reward"
                    type="number"
                    placeholder="Enter new reward"
                    value={newReward}
                    onChange={(e) => setNewReward(e.target.value)}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-200">
                    Updating block reward requires admin privileges and will affect future
                    blocks only.
                  </p>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                  Update Block Reward
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <QuickStats stats={quickStats} />
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </main>
  );
}
