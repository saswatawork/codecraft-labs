'use client';

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
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
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
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Video Processing Complete</div>
                <p className="text-sm text-muted-foreground">
                  Get notified when your video finishes processing
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-10 h-5" />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Publishing Updates</div>
                <p className="text-sm text-muted-foreground">
                  Receive updates about video publishing status
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-10 h-5" />
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Error Alerts</div>
                <p className="text-sm text-muted-foreground">
                  Get alerted when errors occur during processing
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-10 h-5" />
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
            <div className="flex items-center justify-between py-3 border-t">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Two-Factor Authentication</div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <input type="checkbox" className="w-10 h-5" />
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
            <div className="flex items-center justify-between py-3 border-t">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Auto-delete Failed Videos</div>
                <p className="text-sm text-muted-foreground">
                  Automatically remove videos that fail processing after 7 days
                </p>
              </div>
              <input type="checkbox" className="w-10 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
