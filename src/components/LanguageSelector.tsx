
import React from 'react';

const LanguageSelector = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-8">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl">🇺🇸</span>
            <span className="font-medium">English (U.S)</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl">🇻🇳</span>
            <span className="font-medium">Tiếng Việt</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LanguageSelector;
