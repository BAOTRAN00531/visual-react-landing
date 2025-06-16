
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Language {
  id: number;
  name: string;
  code: string;
  flag: string;
  coursesCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  popularity: 'High' | 'Medium' | 'Low';
}

interface LanguageFormProps {
  initialData?: Language;
  onSubmit: (data: Omit<Language, 'id'>) => void;
}

const LanguageForm = ({ initialData, onSubmit }: LanguageFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    flag: initialData?.flag || '',
    coursesCount: initialData?.coursesCount || 0,
    difficulty: initialData?.difficulty || 'Easy' as const,
    popularity: initialData?.popularity || 'Medium' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Language Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-indigo-400"
            placeholder="e.g., Spanish"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Language Code</Label>
          <Input
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-indigo-400"
            placeholder="e.g., es"
            maxLength={2}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Flag Emoji</Label>
          <Input
            value={formData.flag}
            onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-indigo-400"
            placeholder="e.g., 🇪🇸"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Courses Count</Label>
          <Input
            type="number"
            value={formData.coursesCount}
            onChange={(e) => setFormData({ ...formData, coursesCount: parseInt(e.target.value) })}
            className="rounded-2xl border-2 border-gray-200 focus:border-indigo-400"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Difficulty</Label>
          <Select value={formData.difficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setFormData({ ...formData, difficulty: value })}>
            <SelectTrigger className="rounded-2xl border-2 border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Popularity</Label>
          <Select value={formData.popularity} onValueChange={(value: 'High' | 'Medium' | 'Low') => setFormData({ ...formData, popularity: value })}>
            <SelectTrigger className="rounded-2xl border-2 border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {initialData ? 'Update Language' : 'Create Language'}
        </Button>
      </div>
    </form>
  );
};

export default LanguageForm;
