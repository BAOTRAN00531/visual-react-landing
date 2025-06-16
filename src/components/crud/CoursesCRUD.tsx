
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import CourseForm from './forms/CourseForm';
import CourseDetails from './details/CourseDetails';
import DeleteConfirmation from '../admin/DeleteConfirmation';

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

const CoursesCRUD = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Spanish Fundamentals',
      description: 'Learn the basics of Spanish language',
      language: 'Spanish',
      level: 'Beginner',
      duration: '8 weeks',
      status: 'active',
      createdAt: '2024-01-15',
      modulesCount: 12
    },
    {
      id: 2,
      title: 'Advanced French Conversation',
      description: 'Master French through advanced conversations',
      language: 'French',
      level: 'Advanced',
      duration: '12 weeks',
      status: 'active',
      createdAt: '2024-02-01',
      modulesCount: 18
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (courseData: Omit<Course, 'id'>) => {
    const newCourse = {
      ...courseData,
      id: Math.max(...courses.map(c => c.id)) + 1,
    };
    setCourses([...courses, newCourse]);
    setIsCreateOpen(false);
  };

  const handleUpdate = (courseData: Omit<Course, 'id'>) => {
    if (selectedCourse) {
      setCourses(courses.map(course => 
        course.id === selectedCourse.id 
          ? { ...courseData, id: selectedCourse.id }
          : course
      ));
      setIsEditOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleDelete = () => {
    if (selectedCourse) {
      setCourses(courses.filter(course => course.id !== selectedCourse.id));
      setIsDeleteOpen(false);
      setSelectedCourse(null);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Courses Management</h2>
            <p className="text-gray-600">Create and manage learning courses</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-gray-800">Create New Course</DialogTitle>
            </DialogHeader>
            <CourseForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search courses by title, language, or level..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Language:</span>
                <span className="text-sm font-bold text-gray-800">{course.language}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Level:</span>
                <Badge className={`text-xs font-bold rounded-full ${getLevelColor(course.level)}`}>
                  {course.level}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Duration:</span>
                <span className="text-sm font-bold text-gray-800">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Modules:</span>
                <span className="text-sm font-bold text-gray-800">{course.modulesCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Badge className={`text-xs font-bold rounded-full ${
                course.status === 'active' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              }`}>
                {course.status}
              </Badge>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsViewOpen(true);
                  }}
                  className="rounded-xl hover:bg-blue-100"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsEditOpen(true);
                  }}
                  className="rounded-xl hover:bg-yellow-100"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsDeleteOpen(true);
                  }}
                  className="rounded-xl hover:bg-red-100 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialogs */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Edit Course</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <CourseForm
              initialData={selectedCourse}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Course Details</DialogTitle>
          </DialogHeader>
          {selectedCourse && <CourseDetails course={selectedCourse} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Delete Course</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <DeleteConfirmation
              userName={selectedCourse.title}
              onConfirm={handleDelete}
              onCancel={() => setIsDeleteOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesCRUD;
