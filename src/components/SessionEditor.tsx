
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { FeedbackSession } from '@/hooks/useFeedbackData';

interface Question {
  id: string;
  type: 'text' | 'textarea' | 'rating' | 'select' | 'location';
  question: string;
  required: boolean;
  options?: string[];
}

interface SessionEditorProps {
  session?: FeedbackSession;
  onSave: (sessionData: Partial<FeedbackSession>) => void;
  onCancel: () => void;
}

const SessionEditor = ({ session, onSave, onCancel }: SessionEditorProps) => {
  const [title, setTitle] = useState(session?.title || '');
  const [description, setDescription] = useState(session?.description || '');
  const [questions, setQuestions] = useState<Question[]>(session?.questions || []);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'text',
      question: '',
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], ...updates };
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= questions.length) return;

    const updated = [...questions];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setQuestions(updated);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      description: description.trim(),
      questions: questions.filter(q => q.question.trim())
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{session ? 'Edit Session' : 'Create New Session'}</CardTitle>
          <CardDescription>
            Configure your feedback session and customize questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Session Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter session title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter session description"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Questions</Label>
              <Button onClick={addQuestion} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Question {index + 1}</span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveQuestion(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveQuestion(index, 'down')}
                        disabled={index === questions.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeQuestion(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Question Text</Label>
                      <Input
                        value={question.question}
                        onChange={(e) => updateQuestion(index, { question: e.target.value })}
                        placeholder="Enter your question"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Question Type</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value: Question['type']) => updateQuestion(index, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Short Text</SelectItem>
                          <SelectItem value="textarea">Long Text</SelectItem>
                          <SelectItem value="rating">Rating (1-5)</SelectItem>
                          <SelectItem value="select">Multiple Choice</SelectItem>
                          <SelectItem value="location">Location (Pune/Hyderabad/Noida)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {question.type === 'location' && (
                    <div className="space-y-2">
                      <Label>Available Locations</Label>
                      <div className="p-2 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Pune, Hyderabad, Noida (automatically configured)
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`required-${question.id}`}
                      checked={question.required}
                      onChange={(e) => updateQuestion(index, { required: e.target.checked })}
                    />
                    <Label htmlFor={`required-${question.id}`}>Required</Label>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              {session ? 'Update Session' : 'Create Session'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionEditor;
