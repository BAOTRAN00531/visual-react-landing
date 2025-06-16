
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const QuestionsCRUD = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const questions = [
    { id: 1, question: 'How do you say "Hello" in Spanish?', type: 'multiple-choice', partId: 2, partName: 'Common Phrases Practice', difficulty: 'easy', points: 10 },
    { id: 2, question: 'Translate: "¿Cómo estás?"', type: 'text-input', partId: 2, partName: 'Common Phrases Practice', difficulty: 'medium', points: 15 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Questions Management</h2>
            <p className="text-gray-600">Create and manage quiz questions</p>
          </div>
        </div>
        
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="w-5 h-5 mr-2" />
          Add Question
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge className="text-xs bg-purple-100 text-purple-800">
                {question.type}
              </Badge>
              <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </Badge>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full ml-auto">
                {question.points} pts
              </span>
            </div>
            
            <h3 className="text-lg font-black text-gray-800 mb-2">{question.question}</h3>
            <p className="text-xs text-gray-500 mb-4">{question.partName}</p>
            
            <div className="flex justify-end gap-2">
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
        ))}
      </div>
    </div>
  );
};

export default QuestionsCRUD;
