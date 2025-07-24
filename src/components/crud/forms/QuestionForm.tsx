
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Upload, Play, Volume2, Eye, X, Image as ImageIcon } from 'lucide-react';
import WordSuggestion from '../WordSuggestion';
import { LexiconUnit, LexiconPhrase } from '../LexiconCRUD';

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

interface QuestionFormProps {
  initialData?: Question;
  onSubmit: (data: Omit<Question, 'id'>) => void;
}

const QuestionForm = ({ initialData, onSubmit }: QuestionFormProps) => {
  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    type: initialData?.type || 'multiple-choice' as QuestionType,
    partId: initialData?.partId || 1,
    partName: initialData?.partName || 'Common Phrases Practice',
    difficulty: initialData?.difficulty || 'easy' as const,
    points: initialData?.points || 10,
    pronunciation: initialData?.pronunciation || '',
    audio: initialData?.audio || '',
    questionImage: initialData?.questionImage || '',
    options: initialData?.options || [
      { id: '1', text: '', isCorrect: true },
      { id: '2', text: '', isCorrect: false },
      { id: '3', text: '', isCorrect: false },
      { id: '4', text: '', isCorrect: false }
    ],
    hint: initialData?.hint || '',
    explanation: initialData?.explanation || ''
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addOption = () => {
    const newOption = {
      id: Date.now().toString(),
      text: '',
      isCorrect: false
    };
    setFormData({
      ...formData,
      options: [...formData.options, newOption]
    });
  };

  const removeOption = (optionId: string) => {
    setFormData({
      ...formData,
      options: formData.options.filter(opt => opt.id !== optionId)
    });
  };

  const updateOption = (optionId: string, field: keyof QuestionOption, value: any) => {
    setFormData({
      ...formData,
      options: formData.options.map(opt => 
        opt.id === optionId ? { ...opt, [field]: value } : opt
      )
    });
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(formData.question);
      speechSynthesis.speak(utterance);
    }
  };

  const handleWordSuggestion = (item: LexiconUnit | LexiconPhrase, optionIndex?: number) => {
    if (optionIndex !== undefined) {
      // For specific option
      const updatedOptions = [...formData.options];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        text: item.text,
        image: item.image || ''
      };
      setFormData({ ...formData, options: updatedOptions });
    } else {
      // For fill-in-blank correct answer
      const updatedOptions = [...formData.options];
      updatedOptions[0] = {
        ...updatedOptions[0],
        text: item.text
      };
      setFormData({ ...formData, options: updatedOptions });
    }
    
    // Auto-fill pronunciation if question doesn't have it
    if (!formData.pronunciation && item.ipa) {
      setFormData(prev => ({ ...prev, pronunciation: item.ipa }));
    }
    
    // Auto-fill audio if question doesn't have it
    if (!formData.audio && item.audio) {
      setFormData(prev => ({ ...prev, audio: item.audio }));
    }
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    const labels = {
      'multiple-choice': 'Multiple Choice (1 correct)',
      'multiple-choice-multi': 'Multiple Choice (multiple correct)',
      'fill-in-blank': 'Fill in the Blank',
      'image-selection': 'Image Selection',
      'word-matching': 'Word Matching',
      'reorder-sentence': 'Reorder Sentence'
    };
    return labels[type];
  };

  const renderOptionsSection = () => {
    if (formData.type === 'fill-in-blank') {
      return (
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Correct Answer</Label>
          <div className="flex gap-2">
            <Input
              value={formData.options[0]?.text || ''}
              onChange={(e) => updateOption('1', 'text', e.target.value)}
              className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 flex-1"
              placeholder="Enter the correct answer..."
            />
            <WordSuggestion 
              onSelect={(item) => handleWordSuggestion(item)}
              placeholder="Suggest Answer"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-bold text-gray-700">Answer Options</Label>
          <Button
            type="button"
            onClick={addOption}
            variant="outline"
            size="sm"
            className="rounded-xl border-2 border-blue-200 hover:border-blue-400"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>

        <div className="space-y-3">
          {formData.options.map((option, index) => (
            <div key={option.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={option.isCorrect}
                  onCheckedChange={(checked) => updateOption(option.id, 'isCorrect', checked)}
                />
                <span className="text-sm font-medium text-gray-600">Correct</span>
              </div>
              
              <div className="flex-1 flex gap-2">
                <Input
                  value={option.text}
                  onChange={(e) => updateOption(option.id, 'text', e.target.value)}
                  placeholder={`Option ${index + 1}...`}
                  className="flex-1 rounded-xl border border-gray-200"
                />
                <WordSuggestion 
                  onSelect={(item) => handleWordSuggestion(item, index)}
                  placeholder="Suggest"
                />
              </div>

              {formData.type === 'image-selection' && (
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                  >
                    <ImageIcon className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                  {option.image && (
                    <img src={option.image} alt="Option" className="w-8 h-8 rounded object-cover" />
                  )}
                </div>
              )}

              {formData.options.length > 2 && (
                <Button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Type */}
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Question Type</Label>
          <Select value={formData.type} onValueChange={(value: QuestionType) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="rounded-2xl border-2 border-gray-200 focus:border-blue-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="multiple-choice">Multiple Choice (1 correct)</SelectItem>
              <SelectItem value="multiple-choice-multi">Multiple Choice (multiple correct)</SelectItem>
              <SelectItem value="fill-in-blank">Fill in the Blank</SelectItem>
              <SelectItem value="image-selection">Image Selection</SelectItem>
              <SelectItem value="word-matching">Word Matching</SelectItem>
              <SelectItem value="reorder-sentence">Reorder Sentence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question Content */}
        <div className="space-y-4">
          <Label className="text-sm font-bold text-gray-700">Question Content</Label>
          
          <Textarea
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
            placeholder="Enter your question here... (Markdown supported: **bold**, *italic*, [link](url))"
            rows={3}
            required
          />

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-2 border-gray-200"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-2 border-gray-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Audio
            </Button>
            <Button
              type="button"
              onClick={handleTextToSpeech}
              variant="outline"
              size="sm"
              className="rounded-xl border-2 border-gray-200"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Test TTS
            </Button>
          </div>
        </div>

        {/* IPA Pronunciation */}
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">IPA Pronunciation (Optional)</Label>
          <Input
            value={formData.pronunciation}
            onChange={(e) => setFormData({ ...formData, pronunciation: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
            placeholder="e.g., /həˈnɔɪ/"
          />
        </div>

        {/* Module/Lesson Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Module/Lesson</Label>
            <Select value={formData.partName} onValueChange={(value) => setFormData({ ...formData, partName: value })}>
              <SelectTrigger className="rounded-2xl border-2 border-gray-200 focus:border-blue-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="Introduction to Greetings">Introduction to Greetings</SelectItem>
                <SelectItem value="Common Phrases Practice">Common Phrases Practice</SelectItem>
                <SelectItem value="Basic Vocabulary">Basic Vocabulary</SelectItem>
                <SelectItem value="Grammar Fundamentals">Grammar Fundamentals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Difficulty</Label>
            <Select value={formData.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setFormData({ ...formData, difficulty: value })}>
              <SelectTrigger className="rounded-2xl border-2 border-gray-200 focus:border-blue-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Points */}
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Points</Label>
          <Input
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
            className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 max-w-xs"
            min="1"
            max="100"
            required
          />
        </div>

        {/* Options Section */}
        {renderOptionsSection()}

        {/* Hint & Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Hint (Optional)</Label>
            <Textarea
              value={formData.hint}
              onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
              className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
              placeholder="Provide a helpful hint..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Explanation (Optional)</Label>
            <Textarea
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
              placeholder="Explain why this is the correct answer..."
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-blue-50 text-blue-600 border-2 border-blue-200 hover:bg-blue-100 font-bold px-6 py-3 rounded-2xl"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Question Preview
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 p-6">
                {/* Question Display */}
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">{formData.question}</h3>
                  {formData.pronunciation && (
                    <p className="text-blue-600 font-mono text-sm">{formData.pronunciation}</p>
                  )}
                  <div className="flex justify-center space-x-2">
                    <Button size="sm" variant="outline" className="rounded-full">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Options Display */}
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div
                      key={option.id}
                      className="p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-400 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-700">{option.text || `Option ${index + 1}`}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.hint && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                    <p className="text-sm text-yellow-800">💡 Hint: {formData.hint}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {initialData ? 'Update Question' : 'Create Question'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
