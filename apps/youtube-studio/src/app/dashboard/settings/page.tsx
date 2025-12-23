'use client';

import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ccl/ui';
import { Button } from '@ccl/ui';
import { Input } from '@ccl/ui';
import { Bell, Database, Settings, Shield, User } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Settings className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information and display preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Display Name
              </label>
              <Input id="name" placeholder="Your name" defaultValue="User" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="your.email@example.com" defaultValue="" />
            </div>
            <div className="space-y-2">
              <label htmlFor="channel" className="text-sm font-medium">
                Channel Name
              </label>
              <Input id="channel" placeholder="Your YouTube channel name" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between py-4 border-b">
              <div className="space-y-0.5 flex-1 pr-4">
                <div className="text-sm font-medium">Video Processing Complete</div>
                <p className="text-sm text-muted-foreground">
                  Get notified when your video finishes processing
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-4 border-b">
              <div className="space-y-0.5 flex-1 pr-4">
                <div className="text-sm font-medium">Publishing Updates</div>
                <p className="text-sm text-muted-foreground">
                  Receive updates about video publishing status
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5 flex-1 pr-4">
                <div className="text-sm font-medium">Error Alerts</div>
                <p className="text-sm text-muted-foreground">
                  Get alerted when errors occur during processing
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* API & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              API & Security
            </CardTitle>
            <CardDescription>Manage API access and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="api-key" className="text-sm font-medium">
                API Key
              </label>
              <div className="flex gap-2">
                <Input id="api-key" type="password" placeholder="••••••••••••••••" readOnly />
                <Button variant="outline">Regenerate</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Keep your API key secure. Never share it publicly.
              </p>
            </div>
            <div className="flex items-center justify-between py-4 border-t">
              <div className="space-y-0.5 flex-1 pr-4">
                <div className="text-sm font-medium">Two-Factor Authentication</div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Storage Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Storage & Data
            </CardTitle>
            <CardDescription>Manage your storage usage and data preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Used</span>
                <span className="font-medium">0 MB / 10 GB</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-t">
              <div className="space-y-0.5 flex-1 pr-4">
                <div className="text-sm font-medium">Auto-delete Failed Videos</div>
                <p className="text-sm text-muted-foreground">
                  Automatically remove videos that fail processing after 7 days
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="outline" className="sm:w-auto w-full">
            Cancel
          </Button>
          <Button onClick={handleSave} className="sm:w-auto w-full">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
