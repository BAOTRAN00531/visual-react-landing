
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import QuestionForm from './forms/QuestionForm';
import QuestionDetails from './details/QuestionDetails';
import DeleteConfirmation from '../admin/DeleteConfirmation';

type QuestionType = 'multiple-choice' | 'multiple-choice-multi' | 'fill-in-blank' | 'image-selection' | 'word-matching' | 'reorder-sentence';

interface QuestionOption {
  id: string;
  text: string;
  image?: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  type: QuestionType;
  partId: number;
  partName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  pronunciation?: string;
  audio?: string;
  questionImage?: string;
  options: QuestionOption[];
  hint?: string;
  explanation?: string;
}

const QuestionsCRUD = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { 
      id: 1, 
      question: 'How do you say "Hello" in Spanish?', 
      type: 'multiple-choice', 
      partId: 2, 
      partName: 'Common Phrases Practice', 
      difficulty: 'easy', 
      points: 10,
      options: [
        { id: '1', text: 'Hola', isCorrect: true },
        { id: '2', text: 'Adiós', isCorrect: false },
        { id: '3', text: 'Gracias', isCorrect: false },
        { id: '4', text: 'Por favor', isCorrect: false }
      ]
    },
    { 
      id: 2, 
      question: 'Translate: "¿Cómo estás?"', 
      type: 'fill-in-blank', 
      partId: 2, 
      partName: 'Common Phrases Practice', 
      difficulty: 'medium', 
      points: 15,
      options: [
        { id: '1', text: 'How are you?', isCorrect: true }
      ]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filteredQuestions = questions.filter(question =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.partName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (questionData: Omit<Question, 'id'>) => {
    const newQuestion = {
      ...questionData,
      id: Math.max(...questions.map(q => q.id)) + 1,
    };
    setQuestions([...questions, newQuestion]);
    setIsCreateOpen(false);
  };

  const handleUpdate = (questionData: Omit<Question, 'id'>) => {
    if (selectedQuestion) {
      setQuestions(questions.map(question => 
        question.id === selectedQuestion.id 
          ? { ...questionData, id: selectedQuestion.id }
          : question
      ));
      setIsEditOpen(false);
      setSelectedQuestion(null);
    }
  };

  const handleDelete = () => {
    if (selectedQuestion) {
      setQuestions(questions.filter(question => question.id !== selectedQuestion.id));
      setIsDeleteOpen(false);
      setSelectedQuestion(null);
    }
  };

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
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-gray-800">Create New Question</DialogTitle>
            </DialogHeader>
            <QuestionForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
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
        {filteredQuestions.map((question) => (
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
            
            <h3 className="text-lg font-black text-gray-800 mb-2 line-clamp-2">{question.question}</h3>
            <p className="text-xs text-gray-500 mb-4">{question.partName}</p>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-xl hover:bg-blue-100"
                onClick={() => {
                  setSelectedQuestion(question);
                  setIsViewOpen(true);
                }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-xl hover:bg-yellow-100"
                onClick={() => {
                  setSelectedQuestion(question);
                  setIsEditOpen(true);
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-xl hover:bg-red-100 text-red-500"
                onClick={() => {
                  setSelectedQuestion(question);
                  setIsDeleteOpen(true);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialogs */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Edit Question</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <QuestionForm
              initialData={selectedQuestion}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Question Details</DialogTitle>
          </DialogHeader>
          {selectedQuestion && <QuestionDetails question={selectedQuestion} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Delete Question</DialogTitle>
          </DialogHeader>
          {selectedQuestion && (
            <DeleteConfirmation
              userName={selectedQuestion.question}
              onConfirm={handleDelete}
              onCancel={() => setIsDeleteOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionsCRUD;
