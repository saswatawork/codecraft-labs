'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateVoicePreset,
  useDeleteVoicePreset,
  useUpdateVoicePreset,
  useVoicePresets,
} from '@/hooks/use-api';
import {
  duplicatePreset,
  exportPreset,
  exportPresets,
  exportedPresetToCreateRequest,
  formatUsageCount,
  parsePresetFile,
} from '@/lib/preset-utils';
import { RECOMMENDED_PRESETS } from '@/lib/recommended-presets';
import {
  DEFAULT_VOICE_PRESET,
  type VoicePreset,
  type VoicePresetCreateRequest,
} from '@/lib/voice-preset-types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
} from '@ccl/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ccl/ui';
import {
  Copy,
  Download,
  Globe,
  Loader2,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { VoiceParameterSliders } from './voice-parameter-sliders';

interface PresetManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPresetSelect?: (presetId: string) => void;
}

// Preset Card Component
function PresetCard({
  preset,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onExport,
  onClose,
}: {
  preset: VoicePreset;
  onSelect?: (id: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onExport?: () => void;
  onClose: () => void;
}) {
  const handleUse = () => {
    if (onSelect) {
      onSelect(preset.id);
      onClose();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{preset.name}</CardTitle>
              {preset.usageCount !== undefined && preset.usageCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({formatUsageCount(preset.usageCount)})
                </span>
              )}
            </div>
            {preset.description && (
              <CardDescription className="text-xs line-clamp-2 mt-1">
                {preset.description}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-1">
            {onDuplicate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDuplicate}
                className="h-7 px-2"
                title="Duplicate preset"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            )}
            {onExport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExport}
                className="h-7 px-2"
                title="Export preset"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            )}
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={onEdit} className="h-7 px-2">
                Edit
              </Button>
            )}
            {onDelete && !preset.isBuiltIn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-7 px-2 text-destructive hover:text-destructive"
                title="Delete preset"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
          <span>Exaggeration: {preset.exaggeration}</span>
          <span>CFG: {preset.cfgWeight}</span>
          <span>Temp: {preset.temperature}</span>
          <span>Rep.Penalty: {preset.repetitionPenalty}</span>
          <span>Speed: {preset.speed}x</span>
          <span>WPM: {preset.targetWpm}</span>
        </div>
        {onSelect && (
          <Button size="sm" onClick={handleUse} className="w-full">
            Use This Preset
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function PresetManager({ open, onOpenChange, onPresetSelect }: PresetManagerProps) {
  const { data: presetsData, isLoading } = useVoicePresets();
  const createPreset = useCreateVoicePreset();
  const updatePreset = useUpdateVoicePreset();
  const deletePreset = useDeleteVoicePreset();

  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  const [editingPreset, setEditingPreset] = useState<VoicePreset | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for create/edit
  const [formData, setFormData] = useState<VoicePresetCreateRequest>({
    name: '',
    description: '',
    isPublic: false,
    ...DEFAULT_VOICE_PRESET,
  });

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a preset name');
      return;
    }

    try {
      const preset = await createPreset.mutateAsync(formData);
      toast.success(`Preset "${preset.name}" created successfully`);

      // Reset form
      setFormData({
        name: '',
        description: '',
        isPublic: false,
        ...DEFAULT_VOICE_PRESET,
      });

      // Switch to browse tab
      setActiveTab('browse');

      if (onPresetSelect) {
        onPresetSelect(preset.id);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create preset');
    }
  };

  const handleUpdate = async () => {
    if (!editingPreset) return;

    try {
      await updatePreset.mutateAsync({
        id: editingPreset.id,
        data: formData,
      });
      toast.success(`Preset "${formData.name}" updated successfully`);
      setEditingPreset(null);
      setActiveTab('browse');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update preset');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePreset.mutateAsync(id);
      toast.success('Preset deleted successfully');
      setDeleteConfirm(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete preset');
    }
  };

  const handleEdit = (preset: VoicePreset) => {
    setEditingPreset(preset);
    setFormData({
      name: preset.name,
      description: preset.description,
      isPublic: preset.isPublic,
      exaggeration: preset.exaggeration,
      cfgWeight: preset.cfgWeight,
      temperature: preset.temperature,
      repetitionPenalty: preset.repetitionPenalty,
      speed: preset.speed,
      seed: preset.seed,
      language: preset.language,
      targetWpm: preset.targetWpm,
    });
    setActiveTab('create');
  };

  const userPresets = presetsData?.userPresets || [];
  const builtInPresets = presetsData?.builtInPresets || [];
  const publicPresets = presetsData?.publicPresets || [];

  // Filter presets by search query
  const filterPresets = (presets: VoicePreset[]) => {
    if (!searchQuery.trim()) return presets;

    const query = searchQuery.toLowerCase();
    return presets.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
    );
  };

  const filteredBuiltIn = filterPresets(builtInPresets);
  const filteredUser = filterPresets(userPresets);
  const filteredPublic = filterPresets(publicPresets);

  // Recommended pack support
  const allExistingNames = new Set([
    ...userPresets.map((p) => p.name.toLowerCase()),
    ...builtInPresets.map((p) => p.name.toLowerCase()),
    ...publicPresets.map((p) => p.name.toLowerCase()),
  ]);
  const missingRecommended = RECOMMENDED_PRESETS.filter(
    (p) => !allExistingNames.has(p.name.toLowerCase()),
  );
  const installRecommended = async () => {
    let created = 0;
    for (const preset of missingRecommended) {
      try {
        await createPreset.mutateAsync(preset);
        created++;
      } catch (e) {
        console.error('Failed to create preset', preset.name, e);
      }
    }
    if (created > 0) {
      toast.success(`Installed ${created} recommended preset${created > 1 ? 's' : ''}`);
    } else {
      toast.info('All recommended presets are already installed');
    }
  };

  // Import/Export handlers
  const handleExportAll = () => {
    if (userPresets.length === 0) {
      toast.error('No presets to export');
      return;
    }
    exportPresets(userPresets);
    toast.success(`Exported ${userPresets.length} preset${userPresets.length > 1 ? 's' : ''}`);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parsePresetFile(file);
      let imported = 0;

      for (const preset of data.presets) {
        try {
          await createPreset.mutateAsync(exportedPresetToCreateRequest(preset));
          imported++;
        } catch (error) {
          console.error(`Failed to import preset "${preset.name}":`, error);
        }
      }

      if (imported > 0) {
        toast.success(`Imported ${imported} preset${imported > 1 ? 's' : ''}`);
      } else {
        toast.error('No presets were imported');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to import presets');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDuplicate = async (preset: VoicePreset) => {
    try {
      const duplicated = await createPreset.mutateAsync(duplicatePreset(preset));
      toast.success(`Duplicated "${preset.name}"`);
      handleEdit(duplicated);
    } catch (error: any) {
      toast.error(error.message || 'Failed to duplicate preset');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Voice Preset Manager</DialogTitle>
                <DialogDescription>
                  Create, edit, and manage your ChatterBox TTS voice presets
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImport}
                  title="Import presets from file"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportAll}
                  disabled={userPresets.length === 0}
                  title="Export all your presets"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export All
                </Button>
              </div>
            </div>
          </DialogHeader>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Presets</TabsTrigger>
              <TabsTrigger value="create">
                {editingPreset ? 'Edit Preset' : 'Create New'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4 mt-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search presets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              {/* Recommended Preset Pack CTA */}
              {missingRecommended.length > 0 && (
                <Card className="border-primary/20 bg-linear-to-br from-primary/5 via-background to-accent/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <CardTitle className="text-sm">Install Recommended Presets</CardTitle>
                      </div>
                      <Button
                        size="sm"
                        onClick={installRecommended}
                        disabled={createPreset.isPending}
                      >
                        {createPreset.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Add {missingRecommended.length}
                      </Button>
                    </div>
                    <CardDescription className="text-xs mt-1">
                      Curated, natural-sounding presets tuned for ChatterBox TTS (YouTube,
                      narrations, promos).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {RECOMMENDED_PRESETS.slice(0, 6).map((p) => (
                        <span key={p.name} className="px-2 py-0.5 rounded bg-muted/40">
                          {p.name}
                        </span>
                      ))}
                      {RECOMMENDED_PRESETS.length > 6 && (
                        <span className="px-2 py-0.5 rounded bg-muted/40">
                          +{RECOMMENDED_PRESETS.length - 6} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  {/* Built-in Presets */}
                  {filteredBuiltIn.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        Built-in Presets {searchQuery && `(${filteredBuiltIn.length})`}
                      </h3>
                      <div className="grid gap-2">
                        {filteredBuiltIn.map((preset) => (
                          <PresetCard
                            key={preset.id}
                            preset={preset}
                            onSelect={onPresetSelect}
                            onDuplicate={() => handleDuplicate(preset)}
                            onExport={() => {
                              exportPreset(preset);
                              toast.success(`Exported "${preset.name}"`);
                            }}
                            onClose={() => onOpenChange(false)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* User Presets */}
                  {filteredUser.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        My Presets {searchQuery && `(${filteredUser.length})`}
                      </h3>
                      <div className="grid gap-2">
                        {filteredUser.map((preset) => (
                          <PresetCard
                            key={preset.id}
                            preset={preset}
                            onSelect={onPresetSelect}
                            onEdit={() => handleEdit(preset)}
                            onDelete={() => setDeleteConfirm(preset.id)}
                            onDuplicate={() => handleDuplicate(preset)}
                            onExport={() => {
                              exportPreset(preset);
                              toast.success(`Exported "${preset.name}"`);
                            }}
                            onClose={() => onOpenChange(false)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Public Presets */}
                  {filteredPublic.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium flex items-center gap-1.5">
                        <Globe className="h-4 w-4" />
                        Community Presets {searchQuery && `(${filteredPublic.length})`}
                      </h3>
                      <div className="grid gap-2">
                        {filteredPublic.map((preset) => (
                          <PresetCard
                            key={preset.id}
                            preset={preset}
                            onSelect={onPresetSelect}
                            onDuplicate={() => handleDuplicate(preset)}
                            onExport={() => {
                              exportPreset(preset);
                              toast.success(`Exported "${preset.name}"`);
                            }}
                            onClose={() => onOpenChange(false)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty States */}
                  {!searchQuery && userPresets.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No custom presets yet.</p>
                      <Button
                        variant="link"
                        onClick={() => setActiveTab('create')}
                        className="mt-2"
                      >
                        Create your first preset
                      </Button>
                    </div>
                  )}

                  {searchQuery &&
                    filteredBuiltIn.length === 0 &&
                    filteredUser.length === 0 &&
                    filteredPublic.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No presets found matching &quot;{searchQuery}&quot;</p>
                        <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2">
                          Clear search
                        </Button>
                      </div>
                    )}
                </>
              )}
            </TabsContent>

            <TabsContent value="create" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preset-name">Preset Name *</Label>
                  <Input
                    id="preset-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., My Custom Voice"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preset-description">Description</Label>
                  <Textarea
                    id="preset-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe when to use this preset..."
                    rows={2}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="is-public">Make Public</Label>
                    <p className="text-xs text-muted-foreground">
                      Share this preset with other users
                    </p>
                  </div>
                  <Switch
                    id="is-public"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
                  />
                </div>

                <VoiceParameterSliders
                  values={formData}
                  onChange={(updates) => setFormData({ ...formData, ...updates })}
                  showAdvanced={true}
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editingPreset ? handleUpdate : handleCreate}
                    disabled={createPreset.isPending || updatePreset.isPending}
                    className="flex-1"
                  >
                    {(createPreset.isPending || updatePreset.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editingPreset ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Preset
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Preset
                      </>
                    )}
                  </Button>
                  {editingPreset && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingPreset(null);
                        setFormData({
                          name: '',
                          description: '',
                          isPublic: false,
                          ...DEFAULT_VOICE_PRESET,
                        });
                        setActiveTab('browse');
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Preset?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your voice preset.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
