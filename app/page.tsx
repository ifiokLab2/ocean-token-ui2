import Image from "next/image";
import TransactionHistory from '@/components/transaction-history';
import Features from '@/components/features';
import TokenDetails from '@/components/token-details';
import Roadmap from '@/components/roadmap';
import CTASection from '@/components/cta-section';
import { HeroSection } from '@/components/hero-section';

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <TransactionHistory />
      <Features />
      <TokenDetails />
      <Roadmap />
      <CTASection />
    </div>
  );
}
