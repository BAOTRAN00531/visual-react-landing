
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Layers, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModuleForm from './forms/ModuleForm';
import ModuleDetails from './details/ModuleDetails';
import DeleteConfirmation from '../admin/DeleteConfirmation';

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

const ModulesCRUD = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: 'Basic Greetings',
      description: 'Learn how to greet people in Spanish',
      courseId: 1,
      courseName: 'Spanish Fundamentals',
      order: 1,
      duration: '2 hours',
      status: 'active',
      partsCount: 5
    },
    {
      id: 2,
      title: 'Numbers and Counting',
      description: 'Master numbers from 1 to 100',
      courseId: 1,
      courseName: 'Spanish Fundamentals',
      order: 2,
      duration: '3 hours',
      status: 'active',
      partsCount: 7
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title-asc');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filteredAndSortedModules = modules
    .filter(module =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'status-asc':
          return a.status.localeCompare(b.status);
        case 'status-desc':
          return b.status.localeCompare(a.status);
        case 'parts-asc':
          return a.partsCount - b.partsCount;
        case 'parts-desc':
          return b.partsCount - a.partsCount;
        case 'duration-asc':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'duration-desc':
          return parseInt(b.duration) - parseInt(a.duration);
        default:
          return 0;
      }
    });

  const handleCreate = (moduleData: Omit<Module, 'id'>) => {
    const newModule = {
      ...moduleData,
      id: Math.max(...modules.map(m => m.id)) + 1,
    };
    setModules([...modules, newModule]);
    setIsCreateOpen(false);
  };

  const handleUpdate = (moduleData: Omit<Module, 'id'>) => {
    if (selectedModule) {
      setModules(modules.map(module => 
        module.id === selectedModule.id 
          ? { ...moduleData, id: selectedModule.id }
          : module
      ));
      setIsEditOpen(false);
      setSelectedModule(null);
    }
  };

  const handleDelete = () => {
    if (selectedModule) {
      setModules(modules.filter(module => module.id !== selectedModule.id));
      setIsDeleteOpen(false);
      setSelectedModule(null);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Modules Management</h2>
            <p className="text-gray-600">Organize course content into modules</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Add Module
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-gray-800">Create New Module</DialogTitle>
            </DialogHeader>
            <ModuleForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Sort */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search modules by title or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[280px] rounded-2xl border-2 border-gray-200 focus:border-blue-400">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectItem value="title-asc">Title: A-Z</SelectItem>
            <SelectItem value="title-desc">Title: Z-A</SelectItem>
            <SelectItem value="status-asc">Status: Active First</SelectItem>
            <SelectItem value="status-desc">Status: Inactive First</SelectItem>
            <SelectItem value="parts-asc">Parts: Low to High</SelectItem>
            <SelectItem value="parts-desc">Parts: High to Low</SelectItem>
            <SelectItem value="duration-asc">Duration: Short to Long</SelectItem>
            <SelectItem value="duration-desc">Duration: Long to Short</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedModules.map((module) => (
          <div
            key={module.id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    #{module.order}
                  </span>
                  <span className="text-xs text-gray-500">{module.courseName}</span>
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{module.description}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Duration:</span>
                <span className="text-sm font-bold text-gray-800">{module.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Parts:</span>
                <span className="text-sm font-bold text-gray-800">{module.partsCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Badge className={`text-xs font-bold rounded-full ${
                module.status === 'active' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              }`}>
                {module.status}
              </Badge>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedModule(module);
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
                    setSelectedModule(module);
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
                    setSelectedModule(module);
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
            <DialogTitle className="text-2xl font-black text-gray-800">Edit Module</DialogTitle>
          </DialogHeader>
          {selectedModule && (
            <ModuleForm
              initialData={selectedModule}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Module Details</DialogTitle>
          </DialogHeader>
          {selectedModule && <ModuleDetails module={selectedModule} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Delete Module</DialogTitle>
          </DialogHeader>
          {selectedModule && (
            <DeleteConfirmation
              userName={selectedModule.title}
              onConfirm={handleDelete}
              onCancel={() => setIsDeleteOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModulesCRUD;
