
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Course {
  id: number;
  title: string;
  description: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  status: 'active' | 'inactive';
  createdAt: string;
  modulesCount: number;
}

interface CourseFormProps {
  initialData?: Course;
  onSubmit: (data: Omit<Course, 'id'>) => void;
}

const CourseForm = ({ initialData, onSubmit }: CourseFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    language: initialData?.language || '',
    level: initialData?.level || 'Beginner' as const,
    duration: initialData?.duration || '',
    status: initialData?.status || 'active' as const,
    createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
    modulesCount: initialData?.modulesCount || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-bold text-gray-700">Course Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-purple-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language" className="text-sm font-bold text-gray-700">Language</Label>
          <Input
            id="language"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-purple-400"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-bold text-gray-700">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 min-h-24"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="level" className="text-sm font-bold text-gray-700">Level</Label>
          <Select value={formData.level} onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced') => setFormData({ ...formData, level: value })}>
            <SelectTrigger className="rounded-2xl border-2 border-gray-200 focus:border-purple-400">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm font-bold text-gray-700">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 8 weeks"
            className="rounded-2xl border-2 border-gray-200 focus:border-purple-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-bold text-gray-700">Status</Label>
          <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="rounded-2xl border-2 border-gray-200 focus:border-purple-400">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {initialData ? 'Update Course' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
