"use client";

import { Button } from "@/components/ui/button";
import { Waves, Menu, X, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useOcean } from "@/app/context/OceanContext";
//import { useOcean } from "@/context/OceanContext"; // Import the hook

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Docs", href: "#docs" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Pull what we need from Context
  const { wallet, connectWallet, balance } = useOcean();

  // Helper to make the address look pretty
  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Waves className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">OceanToken</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          
          {/* WALLET LOGIC */}
          {wallet ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end mr-2">
                <span className="text-[10px] uppercase text-muted-foreground font-bold leading-none">Balance</span>
                <span className="text-sm font-medium">{parseFloat(balance).toFixed(2)} OCT</span>
              </div>
              <Button variant="outline" className="text-sm font-medium border-primary/50 gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                {formatAddress(wallet)}
              </Button>
            </div>
          ) : (
            <Button 
              onClick={connectWallet} 
              variant="ghost" 
              className="text-sm font-medium"
            >
              Connect Wallet
            </Button>
          )}

          <Button className="text-sm font-medium">
            Get OCT
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex flex-col gap-2 pt-4">
              {wallet ? (
                <div className="rounded-md bg-muted p-3 mb-2">
                  <p className="text-xs text-muted-foreground">Connected Wallet</p>
                  <p className="text-sm font-mono font-medium">{formatAddress(wallet)}</p>
                  <p className="text-sm font-bold mt-1 text-primary">{balance} OCT</p>
                </div>
              ) : (
                <Button onClick={connectWallet} variant="outline" className="w-full">
                  Connect Wallet
                </Button>
              )}
              <Button className="w-full">
                Get OCT
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}