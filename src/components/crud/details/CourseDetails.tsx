
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Layers, Globe } from 'lucide-react';

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

interface CourseDetailsProps {
  course: Course;
}

const CourseDetails = ({ course }: CourseDetailsProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
        <h3 className="text-2xl font-black text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
            <Globe className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Language</p>
              <p className="font-bold text-gray-800">{course.language}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl">
            <Layers className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Modules</p>
              <p className="font-bold text-gray-800">{course.modulesCount} modules</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-2xl">
            <Clock className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Duration</p>
              <p className="font-bold text-gray-800">{course.duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Created</p>
              <p className="font-bold text-gray-800">{course.createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
        <div>
          <p className="text-sm font-medium text-gray-600">Level</p>
          <Badge className={`text-sm font-bold rounded-full mt-1 ${getLevelColor(course.level)}`}>
            {course.level}
          </Badge>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Status</p>
          <Badge className={`text-sm font-bold rounded-full mt-1 ${
            course.status === 'active' 
              ? 'bg-green-100 text-green-800 border-green-200' 
              : 'bg-gray-100 text-gray-800 border-gray-200'
          }`}>
            {course.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
