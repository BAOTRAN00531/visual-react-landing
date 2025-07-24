import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Search, Volume2, BookOpen } from 'lucide-react';
import { LexiconUnit, LexiconPhrase } from './LexiconCRUD';

interface WordSuggestionProps {
  onSelect: (item: LexiconUnit | LexiconPhrase) => void;
  placeholder?: string;
}

// Mock data - in real app, this would come from props or API
const mockUnits: LexiconUnit[] = [
  {
    id: 1,
    text: 'Hello',
    ipa: '/həˈloʊ/',
    meaning_vi: 'Xin chào',
    meaning_en: 'A greeting',
    type: 'noun',
    language: 'en',
    difficulty: 'beginner',
    audio: '/audio/hello.mp3'
  },
  {
    id: 2,
    text: 'お茶',
    ipa: '/oˈtʃa/',
    meaning_vi: 'Trà',
    meaning_en: 'Tea',
    type: 'noun',
    language: 'ja',
    difficulty: 'beginner'
  },
  {
    id: 3,
    text: 'Beautiful',
    ipa: '/ˈbjuːtɪfəl/',
    meaning_vi: 'Đẹp',
    meaning_en: 'Having beauty',
    type: 'adjective',
    language: 'en',
    difficulty: 'intermediate'
  }
];

const mockPhrases: LexiconPhrase[] = [
  {
    id: 1,
    text: 'How are you?',
    ipa: '/haʊ ɑr ju/',
    meaning_vi: 'Bạn có khỏe không?',
    meaning_en: 'A common greeting question',
    units: [mockUnits[0]],
    type: 'greeting',
    language: 'en',
    difficulty: 'beginner'
  },
  {
    id: 2,
    text: 'お茶をください',
    ipa: '/oˈtʃa o kuˈdasai/',
    meaning_vi: 'Xin cho tôi trà',
    meaning_en: 'Please give me tea',
    units: [mockUnits[1]],
    type: 'conversation',
    language: 'ja',
    difficulty: 'intermediate'
  }
];

const WordSuggestion: React.FC<WordSuggestionProps> = ({ onSelect, placeholder = "Suggest words/phrases" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'words' | 'phrases'>('words');

  const allItems = activeTab === 'words' ? mockUnits : mockPhrases;
  
  const filteredItems = allItems.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ipa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning_vi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item: LexiconUnit | LexiconPhrase) => {
    onSelect(item);
    setIsOpen(false);
    setSearchTerm('');
  };

  const playAudio = (item: LexiconUnit | LexiconPhrase, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.audio) {
      const audio = new Audio(item.audio);
      audio.play();
    } else {
      const utterance = new SpeechSynthesisUtterance(item.text);
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const WordHoverCard = ({ item }: { item: LexiconUnit | LexiconPhrase }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className="bg-white rounded-xl p-3 border border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200 hover:shadow-md"
          onClick={() => handleSelect(item)}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-800">{item.text}</h4>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => playAudio(item, e)}
                className="p-1 h-6 w-6"
              >
                <Volume2 className="w-3 h-3" />
              </Button>
              <Badge className="text-xs bg-blue-100 text-blue-800">
                {item.language.toUpperCase()}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">IPA: {item.ipa}</p>
          <p className="text-sm text-gray-700">{item.meaning_vi}</p>
          <div className="flex gap-1 mt-2">
            <Badge variant="outline" className="text-xs">
              {item.type}
            </Badge>
            <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
              {item.difficulty}
            </Badge>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-lg">{item.text}</h4>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => playAudio(item, {} as React.MouseEvent)}
              className="p-1"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">IPA: {item.ipa}</p>
          <p className="font-semibold text-blue-600">{item.meaning_vi}</p>
          {item.meaning_en && <p className="text-sm text-gray-500">{item.meaning_en}</p>}
          
          {'units' in item && item.units.length > 0 && (
            <div className="mt-3">
              <h5 className="font-semibold text-sm mb-2">Components:</h5>
              <div className="flex flex-wrap gap-1">
                {item.units.map((unit) => (
                  <Badge key={unit.id} variant="secondary" className="text-xs">
                    {unit.text}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-xl border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
        >
          <BookOpen className="w-4 h-4 mr-1" />
          {placeholder}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-gray-800">
            Word & Phrase Suggestions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by text, pronunciation, or meaning..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-2 border-gray-200 focus:border-blue-400"
            />
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'words' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('words')}
              className="rounded-xl"
            >
              Words ({mockUnits.length})
            </Button>
            <Button
              variant={activeTab === 'phrases' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('phrases')}
              className="rounded-xl"
            >
              Phrases ({mockPhrases.length})
            </Button>
          </div>
          
          {/* Results */}
          <ScrollArea className="h-96">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-4">
              {filteredItems.map((item) => (
                <WordHoverCard key={item.id} item={item} />
              ))}
              
              {filteredItems.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  No {activeTab} found matching "{searchTerm}"
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WordSuggestion;