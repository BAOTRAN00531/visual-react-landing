
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Layers, FileText, HelpCircle, Globe } from 'lucide-react';
import CoursesCRUD from '@/components/crud/CoursesCRUD';
import ModulesCRUD from '@/components/crud/ModulesCRUD';
import PartsCRUD from '@/components/crud/PartsCRUD';
import QuestionsCRUD from '@/components/crud/QuestionsCRUD';
import LanguagesCRUD from '@/components/crud/LanguagesCRUD';

const CRUDDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const tabs = [
    { id: 'courses', label: 'Courses', icon: BookOpen, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 'modules', label: 'Modules', icon: Layers, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 'parts', label: 'Parts', icon: FileText, color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
    { id: 'questions', label: 'Questions', icon: HelpCircle, color: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { id: 'languages', label: 'Languages', icon: Globe, color: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 mb-2">
              Content Management
            </h1>
            <p className="text-lg text-gray-600 font-medium">Manage your learning platform content</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Custom Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`
                    relative overflow-hidden rounded-2xl p-6 h-24 flex flex-col items-center justify-center gap-2
                    transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                    border-2 border-white/50 bg-white/60 backdrop-blur-sm
                    data-[state=active]:scale-105 data-[state=active]:shadow-2xl
                    data-[state=active]:border-white/80 data-[state=active]:bg-white/80
                  `}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className={`absolute inset-0 opacity-10 ${tab.color}`} />
                  <Icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-gray-800' : 'text-gray-600'}`} />
                  <span className={`text-sm font-bold ${activeTab === tab.id ? 'text-gray-800' : 'text-gray-600'}`}>
                    {tab.label}
                  </span>
                </TabsTrigger>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            <TabsContent value="courses" className="m-0">
              <CoursesCRUD />
            </TabsContent>
            <TabsContent value="modules" className="m-0">
              <ModulesCRUD />
            </TabsContent>
            <TabsContent value="parts" className="m-0">
              <PartsCRUD />
            </TabsContent>
            <TabsContent value="questions" className="m-0">
              <QuestionsCRUD />
            </TabsContent>
            <TabsContent value="languages" className="m-0">
              <LanguagesCRUD />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CRUDDashboard;
