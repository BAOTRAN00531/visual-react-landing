
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Chances are{' '}
                <span className="text-cyan-400">INFINITE</span>{' '}
                with languages.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                To <span className="font-semibold">INFINITY</span> and{' '}
                <span className="font-semibold">BEYOND</span><br />
                Today, get started.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full sm:w-auto bg-cyan-300 hover:bg-cyan-400 text-gray-900 font-semibold py-4 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Get started
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-2 border-cyan-200 text-gray-700 font-medium py-4 px-8 rounded-lg text-lg hover:bg-cyan-50 transition-all duration-200">
                Let's go, I already have an account
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gray-800 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                </div>
                <div className="absolute top-20 left-16 w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                </div>
                <div className="absolute top-20 right-16 w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
