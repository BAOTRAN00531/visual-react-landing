
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <div className="bg-gray-300 rounded-xl h-32 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-600">Footer</span>
          </div>
          <div className="bg-gray-100 rounded-xl py-8">
            <p className="text-lg font-medium text-gray-700">
              Contacts và hoặc ngôn ngữ khác
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
