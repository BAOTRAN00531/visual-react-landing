
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Module {
  id: number;
  title: string;
  description: string;
  courseId: number;
  courseName: string;
  order: number;
  duration: string;
  status: 'active' | 'inactive';
  partsCount: number;
}

interface ModuleFormProps {
  initialData?: Module;
  onSubmit: (data: Omit<Module, 'id'>) => void;
}

const ModuleForm = ({ initialData, onSubmit }: ModuleFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    courseId: initialData?.courseId || 1,
    courseName: initialData?.courseName || 'Spanish Fundamentals',
    order: initialData?.order || 1,
    duration: initialData?.duration || '',
    status: initialData?.status || 'active' as const,
    partsCount: initialData?.partsCount || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Module Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Course</Label>
          <Select value={formData.courseName} onValueChange={(value) => setFormData({ ...formData, courseName: value })}>
            <SelectTrigger className="rounded-2xl border-2 border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="Spanish Fundamentals">Spanish Fundamentals</SelectItem>
              <SelectItem value="Advanced French Conversation">Advanced French Conversation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-bold text-gray-700">Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Order</Label>
          <Input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Duration</Label>
          <Input
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 2 hours"
            className="rounded-2xl border-2 border-gray-200 focus:border-blue-400"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-bold text-gray-700">Status</Label>
          <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="rounded-2xl border-2 border-gray-200">
              <SelectValue />
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
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {initialData ? 'Update Module' : 'Create Module'}
        </Button>
      </div>
    </form>
  );
};

export default ModuleForm;
