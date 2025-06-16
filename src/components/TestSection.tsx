
import React from 'react';
import { Button } from '@/components/ui/button';

const TestSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Infie's english test
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our convenient, fast, and affordable English test will accurately test their English where and when they're at their best.
            </p>
            <Button className="bg-cyan-300 hover:bg-cyan-400 text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Let's go!
            </Button>
          </div>
          <div>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center shadow-lg">
              <span className="text-xl font-semibold text-gray-600">Media</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center shadow-lg">
              <span className="text-xl font-semibold text-gray-600">Media</span>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Infie's spells
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From language to literacy! With fun phonics lessons and delightful stories, Infie's spells helps kids ages 3-8 learn to read and write — 100% free.
            </p>
            <Button className="bg-cyan-300 hover:bg-cyan-400 text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestSection;
