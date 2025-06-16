
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import LanguageForm from './forms/LanguageForm';
import LanguageDetails from './details/LanguageDetails';
import DeleteConfirmation from '../admin/DeleteConfirmation';

interface Language {
  id: number;
  name: string;
  code: string;
  flag: string;
  coursesCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  popularity: 'High' | 'Medium' | 'Low';
}

const LanguagesCRUD = () => {
  const [languages, setLanguages] = useState<Language[]>([
    { id: 1, name: 'Spanish', code: 'es', flag: '🇪🇸', coursesCount: 15, difficulty: 'Medium', popularity: 'High' },
    { id: 2, name: 'French', code: 'fr', flag: '🇫🇷', coursesCount: 12, difficulty: 'Medium', popularity: 'High' },
    { id: 3, name: 'German', code: 'de', flag: '🇩🇪', coursesCount: 8, difficulty: 'Hard', popularity: 'Medium' },
    { id: 4, name: 'Italian', code: 'it', flag: '🇮🇹', coursesCount: 6, difficulty: 'Easy', popularity: 'Medium' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (languageData: Omit<Language, 'id'>) => {
    const newLanguage = {
      ...languageData,
      id: Math.max(...languages.map(l => l.id)) + 1,
    };
    setLanguages([...languages, newLanguage]);
    setIsCreateOpen(false);
  };

  const handleUpdate = (languageData: Omit<Language, 'id'>) => {
    if (selectedLanguage) {
      setLanguages(languages.map(language => 
        language.id === selectedLanguage.id 
          ? { ...languageData, id: selectedLanguage.id }
          : language
      ));
      setIsEditOpen(false);
      setSelectedLanguage(null);
    }
  };

  const handleDelete = () => {
    if (selectedLanguage) {
      setLanguages(languages.filter(language => language.id !== selectedLanguage.id));
      setIsDeleteOpen(false);
      setSelectedLanguage(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-purple-100 text-purple-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">Languages Management</h2>
            <p className="text-gray-600">Manage supported languages</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Add Language
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-gray-800">Create New Language</DialogTitle>
            </DialogHeader>
            <LanguageForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredLanguages.map((language) => (
          <div
            key={language.id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">{language.flag}</div>
              <h3 className="text-xl font-black text-gray-800 mb-1">{language.name}</h3>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{language.code}</p>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Courses:</span>
                <span className="font-bold text-gray-800">{language.coursesCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Difficulty:</span>
                <Badge className={`text-xs ${getDifficultyColor(language.difficulty)}`}>
                  {language.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Popularity:</span>
                <Badge className={`text-xs ${getPopularityColor(language.popularity)}`}>
                  {language.popularity}
                </Badge>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 pt-4 border-t border-gray-200">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-xl hover:bg-blue-100"
                onClick={() => {
                  setSelectedLanguage(language);
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
                  setSelectedLanguage(language);
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
                  setSelectedLanguage(language);
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
            <DialogTitle className="text-2xl font-black text-gray-800">Edit Language</DialogTitle>
          </DialogHeader>
          {selectedLanguage && (
            <LanguageForm
              initialData={selectedLanguage}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Language Details</DialogTitle>
          </DialogHeader>
          {selectedLanguage && <LanguageDetails language={selectedLanguage} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-800">Delete Language</DialogTitle>
          </DialogHeader>
          {selectedLanguage && (
            <DeleteConfirmation
              userName={selectedLanguage.name}
              onConfirm={handleDelete}
              onCancel={() => setIsDeleteOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguagesCRUD;
