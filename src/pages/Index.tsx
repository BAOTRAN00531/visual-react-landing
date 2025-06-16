
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LanguageSelector from '@/components/LanguageSelector';
import FeatureSection from '@/components/FeatureSection';
import TestSection from '@/components/TestSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <LanguageSelector />
      <FeatureSection />
      <TestSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
