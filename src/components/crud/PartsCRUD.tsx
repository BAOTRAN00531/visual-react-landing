
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const PartsCRUD = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const parts = [
    { id: 1, title: 'Introduction to Greetings', type: 'video', moduleId: 1, moduleName: 'Basic Greetings', order: 1, duration: '5 min', status: 'active' },
    { id: 2, title: 'Common Phrases Practice', type: 'exercise', moduleId: 1, moduleName: 'Basic Greetings', order: 2, duration: '10 min', status: 'active' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Parts Management</h2>
            <p className="text-gray-600">Create individual learning parts</p>
          </div>
        </div>
        
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="w-5 h-5 mr-2" />
          Add Part
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search parts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:ring-green-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div
            key={part.id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                #{part.order}
              </span>
              <Badge className="text-xs bg-blue-100 text-blue-800">
                {part.type}
              </Badge>
            </div>
            <h3 className="text-lg font-black text-gray-800 mb-2">{part.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{part.moduleName}</p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{part.duration}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-blue-100">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-yellow-100">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-red-100 text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsCRUD;
