'use client';

import { Waves, Twitter, MessageCircle, Github, Send, Radio } from 'lucide-react';

export  function Footer() {
  const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Whitepaper', href: '#whitepaper' }
  ];

  const developerLinks = [
    { label: 'Documentation', href: '#docs' },
    { label: 'API Reference', href: '#api' },
    { label: 'GitHub', href: '#github' },
    { label: 'Smart Contract', href: '#contract' }
  ];

  const communityLinks = [
    { label: 'Twitter', href: '#twitter', icon: Twitter },
    { label: 'Discord', href: '#discord', icon: MessageCircle },
    { label: 'Telegram', href: '#telegram', icon: Send },
    { label: 'Medium', href: '#medium', icon: Radio }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">OceanToken</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Building the future of secure, scalable, and transparent on-chain value transfer.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Developers</h3>
            <ul className="space-y-3">
              {developerLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider  */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2026 OceanToken. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-white/60 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#terms" className="text-white/60 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#cookies" className="text-white/60 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
