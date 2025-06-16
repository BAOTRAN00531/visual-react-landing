
import React from 'react';
import { Button } from '@/components/ui/button';

interface FeatureProps {
  title: string;
  description: string;
  buttonText?: string;
  reverse?: boolean;
}

const FeatureCard: React.FC<FeatureProps> = ({ title, description, buttonText, reverse = false }) => {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
      <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
        {buttonText && (
          <Button className="bg-cyan-300 hover:bg-cyan-400 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
            {buttonText}
          </Button>
        )}
      </div>
      <div className={`${reverse ? 'lg:col-start-1' : ''}`}>
        <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center shadow-lg">
          <span className="text-xl font-semibold text-gray-600">Media</span>
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-32">
        <FeatureCard
          title="free > fun > depends on you"
          description="Learning with Infinity is fun, and research shows that it works! With quick, bite-sized lessons, you'll earn points and unlock new levels all while gaining real-world communication skills."
        />
        
        <FeatureCard
          title="Backed by Researches"
          description="We use a lot combination of research-backed teaching methods and delightful content to create courses that effectively teach reading, writing, listening and speaking skills!"
          reverse={true}
        />
        
        <FeatureCard
          title="Stay motivated"
          description="We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our 'friendly' mascot, Infie the cat."
        />
        
        <FeatureCard
          title="Trusted by the Pros"
          description="We offer a real world needs based teaching program to create courses that effectively improves reading, writing, listening and speaking skills for aviation pros"
          reverse={true}
        />
      </div>
    </section>
  );
};

export default FeatureSection;
