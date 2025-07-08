import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Settings as SettingsIcon, 
  Brain, 
  Mail, 
  Bell, 
  Palette, 
  Globe, 
  Database,
  Users,
  Key,
  Smartphone,
  Clock,
  Server,
  Activity
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdvancedSettings = () => {
  const { toast } = useToast();
  
  // AI Settings
  const [aiSettings, setAiSettings] = useState({
    autoAnalysis: true,
    analysisFrequency: 'daily',
    insightDepth: 'comprehensive',
    predictiveAnalytics: true,
    realTimeInsights: true,
    customPrompts: '',
    confidenceThreshold: 80,
    aiModel: 'gpt-4.1-2025-04-14'
  });

  // Notification Settings  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    realTimeAlerts: true,
    dailyDigest: true,
    weeklyReport: true,
    responseThreshold: 10,
    lowRatingAlert: true,
    newSessionAlert: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: '',
    passwordPolicy: 'strong',
    loginAttempts: 5,
    encryptData: true,
    auditLogs: true,
    apiRateLimit: 1000
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    dataRetention: 365,
    backupFrequency: 'daily',
    cacheTimeout: 3600,
    maxFileSize: 10,
    allowedFileTypes: 'pdf,doc,docx,jpg,png',
    maintenanceMode: false,
    debugMode: false,
    performanceMonitoring: true
  });

  // Integration Settings
  const [integrationSettings, setIntegrationSettings] = useState({
    googleSheetsSync: false,
    powerBIEnabled: true,
    slackIntegration: false,
    teamsIntegration: false,
    webhookUrl: '',
    apiAccess: true,
    thirdPartyAnalytics: false,
    exportFormats: ['csv', 'excel', 'pdf']
  });

  // UI/UX Settings
  const [uiSettings, setUiSettings] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    itemsPerPage: 25,
    autoSave: true,
    compactMode: false
  });

  const handleSaveSettings = (category: string) => {
    // In a real app, save to backend
    toast({
      title: "Settings Saved",
      description: `${category} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Advanced Settings</h2>
          <p className="text-muted-foreground">Configure your feedback system</p>
        </div>
      </div>

      <Tabs defaultValue="ai" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Server className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="ui" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">UI/UX</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Settings */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI & Analytics Configuration</span>
              </CardTitle>
              <CardDescription>Configure AI-powered features and analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoAnalysis">Auto Analysis</Label>
                    <Switch
                      id="autoAnalysis"
                      checked={aiSettings.autoAnalysis}
                      onCheckedChange={(checked) => 
                        setAiSettings({...aiSettings, autoAnalysis: checked})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Analysis Frequency</Label>
                    <Select
                      value={aiSettings.analysisFrequency}
                      onValueChange={(value) => 
                        setAiSettings({...aiSettings, analysisFrequency: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select
                      value={aiSettings.aiModel}
                      onValueChange={(value) => 
                        setAiSettings({...aiSettings, aiModel: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4.1-2025-04-14">GPT-4.1 (Latest)</SelectItem>
                        <SelectItem value="o3-2025-04-16">O3 (Reasoning)</SelectItem>
                        <SelectItem value="o4-mini-2025-04-16">O4 Mini (Fast)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="predictiveAnalytics">Predictive Analytics</Label>
                    <Switch
                      id="predictiveAnalytics"
                      checked={aiSettings.predictiveAnalytics}
                      onCheckedChange={(checked) => 
                        setAiSettings({...aiSettings, predictiveAnalytics: checked})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Confidence Threshold (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={aiSettings.confidenceThreshold}
                      onChange={(e) => 
                        setAiSettings({...aiSettings, confidenceThreshold: parseInt(e.target.value)})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Insight Depth</Label>
                    <Select
                      value={aiSettings.insightDepth}
                      onValueChange={(value) => 
                        setAiSettings({...aiSettings, insightDepth: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Custom AI Prompts</Label>
                <Textarea
                  placeholder="Enter custom prompts for AI analysis..."
                  value={aiSettings.customPrompts}
                  onChange={(e) => 
                    setAiSettings({...aiSettings, customPrompts: e.target.value})
                  }
                />
              </div>

              <Button onClick={() => handleSaveSettings('AI')} className="bg-purple-600 hover:bg-purple-700">
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Security & Authentication</span>
              </CardTitle>
              <CardDescription>Configure security policies and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <Switch
                      id="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => 
                        setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password Policy</Label>
                    <Select
                      value={securitySettings.passwordPolicy}
                      onValueChange={(value) => 
                        setSecuritySettings({...securitySettings, passwordPolicy: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (6+ chars)</SelectItem>
                        <SelectItem value="strong">Strong (8+ chars, mixed)</SelectItem>
                        <SelectItem value="complex">Complex (12+ chars, symbols)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Max Login Attempts</Label>
                    <Input
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => 
                        setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>IP Whitelist (comma-separated)</Label>
                    <Textarea
                      placeholder="192.168.1.1, 10.0.0.1"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) => 
                        setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auditLogs">Audit Logs</Label>
                    <Switch
                      id="auditLogs"
                      checked={securitySettings.auditLogs}
                      onCheckedChange={(checked) => 
                        setSecuritySettings({...securitySettings, auditLogs: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('Security')} className="bg-red-600 hover:bg-red-700">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span>Notifications & Alerts</span>
              </CardTitle>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, emailNotifications: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="realTimeAlerts">Real-time Alerts</Label>
                    <Switch
                      id="realTimeAlerts"
                      checked={notificationSettings.realTimeAlerts}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, realTimeAlerts: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="dailyDigest">Daily Digest</Label>
                    <Switch
                      id="dailyDigest"
                      checked={notificationSettings.dailyDigest}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, dailyDigest: checked})
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Response Threshold for Alerts</Label>
                    <Input
                      type="number"
                      value={notificationSettings.responseThreshold}
                      onChange={(e) => 
                        setNotificationSettings({...notificationSettings, responseThreshold: parseInt(e.target.value)})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="lowRatingAlert">Low Rating Alerts</Label>
                    <Switch
                      id="lowRatingAlert"
                      checked={notificationSettings.lowRatingAlert}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, lowRatingAlert: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="newSessionAlert">New Session Alerts</Label>
                    <Switch
                      id="newSessionAlert"
                      checked={notificationSettings.newSessionAlert}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, newSessionAlert: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('Notifications')} className="bg-blue-600 hover:bg-blue-700">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-green-600" />
                <span>System Configuration</span>
              </CardTitle>
              <CardDescription>Configure system performance and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Retention (days)</Label>
                    <Input
                      type="number"
                      value={systemSettings.dataRetention}
                      onChange={(e) => 
                        setSystemSettings({...systemSettings, dataRetention: parseInt(e.target.value)})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <Select
                      value={systemSettings.backupFrequency}
                      onValueChange={(value) => 
                        setSystemSettings({...systemSettings, backupFrequency: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Cache Timeout (seconds)</Label>
                    <Input
                      type="number"
                      value={systemSettings.cacheTimeout}
                      onChange={(e) => 
                        setSystemSettings({...systemSettings, cacheTimeout: parseInt(e.target.value)})
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Max File Size (MB)</Label>
                    <Input
                      type="number"
                      value={systemSettings.maxFileSize}
                      onChange={(e) => 
                        setSystemSettings({...systemSettings, maxFileSize: parseInt(e.target.value)})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <Switch
                      id="maintenanceMode"
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, maintenanceMode: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="performanceMonitoring">Performance Monitoring</Label>
                    <Switch
                      id="performanceMonitoring"
                      checked={systemSettings.performanceMonitoring}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, performanceMonitoring: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('System')} className="bg-green-600 hover:bg-green-700">
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-indigo-600" />
                <span>Integrations & APIs</span>
              </CardTitle>
              <CardDescription>Configure third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="googleSheetsSync">Google Sheets Sync</Label>
                    <Switch
                      id="googleSheetsSync"
                      checked={integrationSettings.googleSheetsSync}
                      onCheckedChange={(checked) => 
                        setIntegrationSettings({...integrationSettings, googleSheetsSync: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="powerBIEnabled">Power BI Integration</Label>
                    <Switch
                      id="powerBIEnabled"
                      checked={integrationSettings.powerBIEnabled}
                      onCheckedChange={(checked) => 
                        setIntegrationSettings({...integrationSettings, powerBIEnabled: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="apiAccess">API Access</Label>
                    <Switch
                      id="apiAccess"
                      checked={integrationSettings.apiAccess}
                      onCheckedChange={(checked) => 
                        setIntegrationSettings({...integrationSettings, apiAccess: checked})
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input
                      placeholder="https://your-webhook-url.com"
                      value={integrationSettings.webhookUrl}
                      onChange={(e) => 
                        setIntegrationSettings({...integrationSettings, webhookUrl: e.target.value})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="slackIntegration">Slack Integration</Label>
                    <Switch
                      id="slackIntegration"
                      checked={integrationSettings.slackIntegration}
                      onCheckedChange={(checked) => 
                        setIntegrationSettings({...integrationSettings, slackIntegration: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="teamsIntegration">Teams Integration</Label>
                    <Switch
                      id="teamsIntegration"
                      checked={integrationSettings.teamsIntegration}
                      onCheckedChange={(checked) => 
                        setIntegrationSettings({...integrationSettings, teamsIntegration: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('Integrations')} className="bg-indigo-600 hover:bg-indigo-700">
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UI/UX Settings */}
        <TabsContent value="ui">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-pink-600" />
                <span>UI/UX Preferences</span>
              </CardTitle>
              <CardDescription>Customize the user interface and experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={uiSettings.theme}
                      onValueChange={(value) => 
                        setUiSettings({...uiSettings, theme: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={uiSettings.language}
                      onValueChange={(value) => 
                        setUiSettings({...uiSettings, language: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="mr">Marathi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={uiSettings.timezone}
                      onValueChange={(value) => 
                        setUiSettings({...uiSettings, timezone: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                        <SelectItem value="Asia/Mumbai">Asia/Mumbai</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select
                      value={uiSettings.dateFormat}
                      onValueChange={(value) => 
                        setUiSettings({...uiSettings, dateFormat: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Items Per Page</Label>
                    <Select
                      value={uiSettings.itemsPerPage.toString()}
                      onValueChange={(value) => 
                        setUiSettings({...uiSettings, itemsPerPage: parseInt(value)})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoSave">Auto Save</Label>
                    <Switch
                      id="autoSave"
                      checked={uiSettings.autoSave}
                      onCheckedChange={(checked) => 
                        setUiSettings({...uiSettings, autoSave: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveSettings('UI/UX')} className="bg-pink-600 hover:bg-pink-700">
                Save UI/UX Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSettings;