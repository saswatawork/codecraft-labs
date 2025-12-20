'use client';

import { Label } from '@/components/ui/label';
import type { VoiceProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ccl/ui';
import { Button } from '@ccl/ui';
import { Input } from '@ccl/ui';
import { Badge } from '@ccl/ui';
import { Menu, Mic, Play, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface VoiceLibraryViewProps {
  voices: VoiceProfile[];
  onUpload: (name: string, file: File) => void;
  onDelete: (voiceId: string) => void;
  onMenuClick: () => void;
}

export function VoiceLibraryView({
  voices,
  onUpload,
  onDelete,
  onMenuClick,
}: VoiceLibraryViewProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [voiceName, setVoiceName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!voiceName.trim() || !selectedFile) return;

    onUpload(voiceName.trim(), selectedFile);
    setVoiceName('');
    setSelectedFile(null);
    setShowUpload(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Voice Library</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Upload custom voices for personalized narration
            </p>
          </div>
        </div>

        {!showUpload && (
          <Button onClick={() => setShowUpload(true)} className="gap-2 w-full md:w-auto">
            <Plus className="h-4 w-4" />
            Upload Voice
          </Button>
        )}
      </div>

      {showUpload && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Upload New Voice</CardTitle>
            <CardDescription>
              Upload a clear audio sample (30-60 seconds recommended)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voice-name">Voice Name</Label>
              <Input
                id="voice-name"
                placeholder="e.g., Professional Narrator"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice-file">Audio File</Label>
              <Input id="voice-file" type="file" accept="audio/*" onChange={handleFileChange} />
              <p className="text-xs text-muted-foreground">
                Supported formats: MP3, WAV, M4A (max 10MB)
              </p>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row">
              <Button
                onClick={handleUpload}
                disabled={!voiceName.trim() || !selectedFile}
                className="gap-2 flex-1"
              >
                <Mic className="h-4 w-4" />
                Upload Voice
              </Button>
              <Button variant="outline" onClick={() => setShowUpload(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {voices.length === 0 && !showUpload && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Mic className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No custom voices yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Upload voice samples to create personalized narration for your videos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {Array.isArray(voices) && voices.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {voices.map((voice) => (
            <Card key={voice.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Custom
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold">{voice.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(voice.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {voice.preview && (
                    <Button size="sm" variant="outline" className="flex-1 gap-2">
                      <Play className="h-3.5 w-3.5" />
                      Preview
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => onDelete(voice.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
