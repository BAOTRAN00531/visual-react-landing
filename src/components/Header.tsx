
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900">INFINITY</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">site language: English</span>
            <button className="text-sm text-gray-500 hover:text-gray-700">▼</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
