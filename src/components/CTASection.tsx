
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
          Learn a language<br />with Infinity
        </h2>
        <Button className="bg-cyan-300 hover:bg-cyan-400 text-gray-900 font-semibold py-4 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-200">
          GET STARTED
        </Button>
        <div className="flex justify-center pt-8">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center shadow-xl">
            <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            <div className="absolute w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center transform -translate-x-4 -translate-y-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
            <div className="absolute w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center transform translate-x-4 -translate-y-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
