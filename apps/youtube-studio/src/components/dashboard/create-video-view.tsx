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
import {
  FileText,
  Link,
  Menu,
  Sparkles,
  Volume2,
  Settings,
  ArrowRight,
  Mic2,
  Play,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AudioSettings } from './audio-settings';
import { PresetManager } from './preset-manager';
import { VoicePresetSelector } from './voice-preset-selector';
import { VoiceLibraryModal } from './voice-library-modal';
import { PresetAudioPlayer } from './preset-audio-player';
import { useVoicePresets, useBuiltInPresets } from '@/hooks/use-api';
import { useBuiltInVoices } from '@/hooks/use-api';

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
  const [showVoiceLibraryModal, setShowVoiceLibraryModal] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>(DEFAULT_AUDIO_SETTINGS);
  const [showVoicePreview, setShowVoicePreview] = useState(false);

  // Fallback to built-in voices if none provided
  const { data: builtInVoicesData } = useBuiltInVoices();
  const voicesForModal: VoiceProfile[] = Array.isArray(voices) && voices.length
    ? voices
    : Array.isArray(builtInVoicesData?.voices)
      ? (builtInVoicesData!.voices as VoiceProfile[])
      : [];

  // Load presets to resolve selected preset details
  const { data: presetsData } = useVoicePresets();
  const { data: builtInPresets = [] } = useBuiltInPresets();
  const allPresets = [...(builtInPresets || []), ...(presetsData?.userPresets || []), ...(presetsData?.publicPresets || [])];
  const selectedPreset = allPresets.find((p) => p.id === voicePresetId);

  // Set default voice if none selected
  useEffect(() => {
    if (!voiceProfileId && voicesForModal.length > 0) {
      setVoiceProfileId(voicesForModal[0].id);
    }
  }, [voiceProfileId, voicesForModal]);

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

  const selectedVoiceName = voiceProfileId
    ? (voicesForModal.find((v) => v.id === voiceProfileId)?.name ?? voiceProfileId)
    : 'Default Voice';

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/5 pb-12">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden -ml-2">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary via-primary to-secondary">
                Create Video
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Transform your ideas into professional videos with AI-powered storytelling
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Content & Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Input Source Card */}
              <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4 border-b border-border/30">
                  <div className="flex items-center gap-3">
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
                <CardContent className="pt-6">
                  <Tabs value={inputType} onValueChange={(v) => setInputType(v as InputType)}>
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/40">
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

                    <TabsContent value="description" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="description-input" className="text-sm font-medium">
                          What do you want to create?
                        </Label>
                        <Textarea
                          id="description-input"
                          placeholder="Example: A 5-minute tutorial about machine learning basics covering supervised learning, neural networks, and practical applications..."
                          value={inputContent}
                          onChange={(e) => setInputContent(e.target.value)}
                          rows={5}
                          className="resize-none text-sm border-border/50"
                        />
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          💡 Be specific about topics, style, and key points you want to cover
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="url" className="space-y-4 mt-4">
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
                          className="text-sm border-border/50"
                        />
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          📄 Paste a link to an article, blog post, or documentation
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Video Details Card */}
              <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4 border-b border-border/30">
                  <CardTitle className="text-lg">Video Details</CardTitle>
                  <CardDescription className="text-xs">
                    Give your video a title and optional description
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="video-title" className="text-sm font-medium">
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="video-title"
                      placeholder="e.g., Machine Learning Basics Explained"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-sm border-border/50"
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
                      className="resize-none text-sm border-border/50"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Audio Settings */}
              <AudioSettings settings={audioSettings} onChange={setAudioSettings} compact />

              {/* Mobile Generate Button (visible only on small screens) */}
              <Card className="md:hidden border-2 border-primary/20 shadow-lg bg-linear-to-br from-primary/5 via-primary/3 to-secondary/5">
                <CardContent className="pt-6 pb-6">
                  <Button
                    onClick={handleGenerate}
                    disabled={!isFormValid || isGenerating}
                    size="lg"
                    className="w-full gap-2 text-base shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Sparkles className="h-5 w-5 fill-current" />
                    {isGenerating ? 'Generating...' : 'Generate Video'}
                  </Button>
                  {!isFormValid && (
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Fill in required fields to continue
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Voice & Summary */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-6">
                {/* Language Selection */}
                <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4 border-b border-border/30">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <span className="text-sm">🌍</span>
                      </div>
                      Language
                    </CardTitle>
                    <CardDescription className="text-xs">Choose your audio language</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="text-sm border-border/50">
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
                  </CardContent>
                </Card>

                {/* Premium Voice Selection Card */}
                <Card className="border-2 border-primary/20 shadow-md hover:shadow-lg transition-all bg-linear-to-br from-primary/3 via-transparent to-secondary/3">
                  <CardHeader className="pb-4 border-b border-primary/10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Volume2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg">Voice</CardTitle>
                          <CardDescription className="text-xs">
                            {voiceProfileId && voiceProfileId !== 'default'
                              ? selectedVoiceName
                              : '12 professional voices'}
                          </CardDescription>
                        </div>
                      </div>
                      {voiceProfileId && voiceProfileId !== 'default' && (
                        <div className="shrink-0">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-4">
                    {/* Voice Dropdown Selector */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase">Selected Voice</Label>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                        <div className="flex items-center gap-2 min-w-0">
                          <Mic2 className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm font-medium truncate">{selectedVoiceName}</span>
                        </div>
                        {voiceProfileId && voiceProfileId !== 'default' && (
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium shrink-0">✓</span>
                        )}
                      </div>
                    </div>

                    {/* Explore Voices Button */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full h-10 text-sm font-medium"
                      onClick={() => setShowVoiceLibraryModal(true)}
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      Explore All Voices
                    </Button>

                    {/* Voice Characteristics Preview */}
                    {voiceProfileId && voiceProfileId !== 'default' && (
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">CHARACTERISTICS</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedVoiceName?.toLowerCase().includes('male') && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium">
                              <Mic2 className="h-3 w-3" />
                              Male
                            </span>
                          )}
                          {selectedVoiceName?.toLowerCase().includes('female') && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 font-medium">
                              <Mic2 className="h-3 w-3" />
                              Female
                            </span>
                          )}
                          {selectedVoiceName?.toLowerCase().includes('professional') && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-medium">
                              <Sparkles className="h-3 w-3" />
                              Professional
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Voice Presets */}
                <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-primary/3 via-background to-accent/5 overflow-hidden">
                  <CardHeader className="pb-5 border-b border-primary/10 bg-linear-to-r from-primary/5 to-transparent">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-sm">
                          <Settings className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold">Voice Settings</CardTitle>
                          <CardDescription className="text-xs mt-0.5">Customize TTS presets</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-5 pb-5 space-y-4">
                    <div className="space-y-3">
                      <VoicePresetSelector
                        value={voicePresetId}
                        onChange={setVoicePresetId}
                        onManagePresets={() => setShowPresetManager(true)}
                      />
                    </div>
                    
                    {voicePresetId && (
                      <PresetAudioPlayer
                        key={`${voiceProfileId || 'voice'}-${voicePresetId || 'preset'}`}
                        voice={voicesForModal.find((v) => v.id === voiceProfileId)}
                        speed={(typeof selectedPreset?.speed === 'number' ? selectedPreset?.speed : Number(selectedPreset?.speed)) || 1}
                      />
                    )}
                  </CardContent>
                </Card>

                {/* Desktop & Tablet Generate Button */}
                <Card className="hidden md:block border-2 border-primary/20 shadow-lg bg-linear-to-br from-primary/5 via-primary/3 to-secondary/5 sticky top-24">
                  <CardContent className="pt-6 pb-6 space-y-4">
                    <Button
                      onClick={handleGenerate}
                      disabled={!isFormValid || isGenerating}
                      size="lg"
                      className="w-full gap-2 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      <Sparkles className="h-5 w-5 fill-current" />
                      {isGenerating ? (
                        <>
                          <span className="inline-block animate-spin">⚡</span>
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Video
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {!isFormValid && (
                      <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                        <p className="text-xs text-destructive font-medium">
                          Fill in required fields to continue
                        </p>
                      </div>
                    )}

                    {isFormValid && !isGenerating && (
                      <div className="space-y-3 p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Summary
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Duration</span>
                            <span className="text-sm font-semibold">2-5 min</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Format</span>
                            <span className="text-sm font-semibold">1080p MP4</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Voice</span>
                            <span className="text-sm font-semibold truncate">{selectedVoiceName}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Library Modal */}
      <VoiceLibraryModal
        open={showVoiceLibraryModal}
        onOpenChange={setShowVoiceLibraryModal}
        voices={voicesForModal}
        selectedId={voiceProfileId}
        onSelect={setVoiceProfileId}
      />

      {/* Preset Manager Modal */}
      <PresetManager
        open={showPresetManager}
        onOpenChange={setShowPresetManager}
        onPresetSelect={(id) => setVoicePresetId(id)}
      />
    </div>
  );
}
