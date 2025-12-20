'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_AUDIO_SETTINGS, LANGUAGES } from '@/lib/constants';
import type {
  AudioSettings as AudioSettingsType,
  GenerationSettings,
  InputType,
  VoiceProfile,
} from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ccl/ui';
import { Button } from '@ccl/ui';
import { Input } from '@ccl/ui';
import { FileText, Link, Menu, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AudioSettings } from './audio-settings';

interface CreateVideoViewProps {
  voices: VoiceProfile[];
  onGenerate: (settings: GenerationSettings) => void;
  isGenerating: boolean;
  onMenuClick: () => void;
}

export function CreateVideoView({
  voices,
  onGenerate,
  isGenerating,
  onMenuClick,
}: CreateVideoViewProps) {
  const [inputType, setInputType] = useState<InputType>('description');
  const [inputContent, setInputContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('en');
  const [voiceProfileId, setVoiceProfileId] = useState<string>();
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>(DEFAULT_AUDIO_SETTINGS);

  const handleGenerate = () => {
    if (!inputContent.trim() || !title.trim()) return;

    onGenerate({
      inputType,
      inputContent: inputContent.trim(),
      title: title.trim(),
      description: description.trim(),
      language,
      voiceProfileId,
      audioSettings,
    });
  };

  const isFormValid = inputContent.trim() && title.trim();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="space-y-2 flex-1">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Create New Video</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Generate professional videos from URLs or descriptions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Source</CardTitle>
          <CardDescription>Choose how you want to create your video</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={inputType} onValueChange={(v) => setInputType(v as InputType)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="description" className="gap-2">
                <FileText className="h-4 w-4" />
                Description
              </TabsTrigger>
              <TabsTrigger value="url" className="gap-2">
                <Link className="h-4 w-4" />
                URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description-input">Video Description</Label>
                <Textarea
                  id="description-input"
                  placeholder="Describe the video you want to create... (e.g., 'A tutorial about machine learning basics with examples and visualizations')"
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-input">Content URL</Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com/article"
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Paste a link to an article, blog post, or webpage to convert into a video
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>Basic information about your video</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-title">Video Title</Label>
            <Input
              id="video-title"
              placeholder="Enter a compelling title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-description">Description (Optional)</Label>
            <Textarea
              id="video-description"
              placeholder="Add a description for your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Language & Voice</CardTitle>
            <CardDescription>Select language and voice profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice">Voice Profile</Label>
              <Select value={voiceProfileId} onValueChange={setVoiceProfileId}>
                <SelectTrigger id="voice">
                  <SelectValue placeholder="Default Voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Voice</SelectItem>
                  {Array.isArray(voices) &&
                    voices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <AudioSettings settings={audioSettings} onChange={setAudioSettings} compact />
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="pt-6">
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid || isGenerating}
            size="lg"
            className="w-full gap-2 text-base"
          >
            <Sparkles className="h-5 w-5 fill-current" />
            {isGenerating ? 'Generating Video...' : 'Generate Video'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
