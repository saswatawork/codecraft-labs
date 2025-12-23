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
import { PresetManager } from './preset-manager';
import { VoicePresetSelector } from './voice-preset-selector';

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
  const [voicePresetId, setVoicePresetId] = useState<string>();
  const [showPresetManager, setShowPresetManager] = useState(false);
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
      voicePresetId,
      audioSettings,
    });
  };

  const isFormValid = inputContent.trim() && title.trim();

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden -ml-2">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Create Video</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Turn ideas into professional videos powered by AI
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Source Card */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Content Source</CardTitle>
                  <CardDescription className="text-xs">
                    Start with a description or URL
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={inputType} onValueChange={(v) => setInputType(v as InputType)}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="description" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Description</span>
                    <span className="sm:hidden">Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="url" className="gap-2">
                    <Link className="h-4 w-4" />
                    URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-3 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="description-input" className="text-sm font-medium">
                      What do you want to create?
                    </Label>
                    <Textarea
                      id="description-input"
                      placeholder="Example: A 5-minute tutorial about machine learning basics covering supervised learning, neural networks, and practical applications with visual examples..."
                      value={inputContent}
                      onChange={(e) => setInputContent(e.target.value)}
                      rows={6}
                      className="resize-none text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      💡 Tip: Be specific about topics, style, and key points you want to cover
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="url" className="space-y-3 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="url-input" className="text-sm font-medium">
                      Content URL
                    </Label>
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com/article-or-blog-post"
                      value={inputContent}
                      onChange={(e) => setInputContent(e.target.value)}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      📄 Paste a link to an article, blog post, or documentation to convert
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Video Details Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Video Details</CardTitle>
              <CardDescription className="text-xs">
                Give your video a title and optional description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="video-title"
                  placeholder="e.g., Machine Learning Basics Explained"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-description" className="text-sm font-medium">
                  Description (Optional)
                </Label>
                <Textarea
                  id="video-description"
                  placeholder="Add context or notes about this video..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="resize-none text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Button - Mobile */}
          <Card className="lg:hidden border-2 border-primary/30 bg-linear-to-br from-primary/5 via-primary/3 to-accent/5">
            <CardContent className="pt-6 pb-6">
              <Button
                onClick={handleGenerate}
                disabled={!isFormValid || isGenerating}
                size="lg"
                className="w-full gap-2 text-base shadow-lg"
              >
                <Sparkles className="h-5 w-5 fill-current" />
                {isGenerating ? 'Generating Video...' : 'Generate Video'}
              </Button>
              {!isFormValid && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Fill in content source and title to continue
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Language & Voice Settings */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Language & Voice</CardTitle>
              <CardDescription className="text-xs">Configure audio settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2 text-sm">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice" className="text-sm font-medium">
                  Voice Profile
                </Label>
                <Select value={voiceProfileId} onValueChange={setVoiceProfileId}>
                  <SelectTrigger id="voice" className="text-sm">
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

              <VoicePresetSelector
                value={voicePresetId}
                onChange={setVoicePresetId}
                onManagePresets={() => setShowPresetManager(true)}
              />
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <AudioSettings settings={audioSettings} onChange={setAudioSettings} compact />

          {/* Generate Button - Desktop */}
          <Card className="hidden lg:block border-2 border-primary/30 bg-linear-to-br from-primary/5 via-primary/3 to-accent/5 sticky top-6">
            <CardContent className="pt-6 pb-6">
              <Button
                onClick={handleGenerate}
                disabled={!isFormValid || isGenerating}
                size="lg"
                className="w-full gap-2 text-base shadow-lg"
              >
                <Sparkles className="h-5 w-5 fill-current" />
                {isGenerating ? 'Generating...' : 'Generate Video'}
              </Button>
              {!isFormValid && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Fill in required fields to continue
                </p>
              )}
              {isFormValid && !isGenerating && (
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Estimated time:</span>
                    <span className="font-medium">2-5 minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Output format:</span>
                    <span className="font-medium">MP4 (1080p)</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <PresetManager
        open={showPresetManager}
        onOpenChange={setShowPresetManager}
        onPresetSelect={(id) => setVoicePresetId(id)}
      />
    </div>
  );
}
