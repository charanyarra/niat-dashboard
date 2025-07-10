
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeedbackSession, FeedbackResponse } from '@/hooks/useFeedbackData';
import GoogleSheetsConnector from './GoogleSheetsConnector';
import GoogleSheetsViewer from './GoogleSheetsViewer';
import EnhancedExportOptions from './EnhancedExportOptions';
import { Database, FileSpreadsheet, Cloud, Eye, BarChart3 } from 'lucide-react';
import PowerBIIntegration from './PowerBIIntegration';

interface DataManagementHubProps {
  sessions: FeedbackSession[];
  responses: FeedbackResponse[];
  onExport: (sessionId: string, format: string) => void;
}

const DataManagementHub = ({ sessions, responses, onExport }: DataManagementHubProps) => {
  const totalResponses = responses.length;
  const activeSessions = sessions.filter(s => s.is_active).length;

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-2xl font-bold text-red-900">{totalResponses}</p>
              </div>
              <Database className="h-8 w-8 text-red-900" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-red-900">{activeSessions}</p>
              </div>
              <FileSpreadsheet className="h-8 w-8 text-red-900" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Export Ready</p>
                <p className="text-2xl font-bold text-green-600">✓</p>
              </div>
              <Cloud className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management Hub</CardTitle>
          <CardDescription>
            Manage your feedback data with advanced export and integration options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="export" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="export">Export & Download</TabsTrigger>
              <TabsTrigger value="integration">Google Sheets</TabsTrigger>
              <TabsTrigger value="viewer">View Sheets</TabsTrigger>
              <TabsTrigger value="powerbi">Power BI</TabsTrigger>
            </TabsList>

            <TabsContent value="export" className="space-y-4">
              <EnhancedExportOptions 
                sessions={sessions}
                responses={responses}
                onExport={onExport}
              />
            </TabsContent>

            <TabsContent value="integration" className="space-y-4">
              <GoogleSheetsConnector />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Integration Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Real-time Sync</h4>
                      <p className="text-muted-foreground">
                        Automatically sync new responses to your Google Sheets
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Collaborative Analysis</h4>
                      <p className="text-muted-foreground">
                        Share data with team members for collaborative insights
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Advanced Formulas</h4>
                      <p className="text-muted-foreground">
                        Use Google Sheets formulas for custom calculations
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Data Visualization</h4>
                      <p className="text-muted-foreground">
                        Create charts and graphs directly in Google Sheets
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="viewer" className="space-y-4">
              <GoogleSheetsViewer />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Viewer Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Direct Access</h4>
                      <p className="text-muted-foreground">
                        View Google Sheets data directly on your website
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Real-time Updates</h4>
                      <p className="text-muted-foreground">
                        Refresh data to see the latest changes from your sheets
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Export Options</h4>
                      <p className="text-muted-foreground">
                        Download the viewed data as CSV for local use
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Custom Ranges</h4>
                      <p className="text-muted-foreground">
                        Specify exactly which data range you want to view
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="powerbi" className="space-y-4">
              <PowerBIIntegration sessions={sessions} responses={responses} />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Power BI Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Live Dashboards</h4>
                      <p className="text-muted-foreground">
                        Create interactive dashboards with real-time data connections
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Custom Reports</h4>
                      <p className="text-muted-foreground">
                        Build custom reports with advanced visualizations
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Data Modeling</h4>
                      <p className="text-muted-foreground">
                        Advanced data modeling and relationship management
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Enterprise Integration</h4>
                      <p className="text-muted-foreground">
                        Seamless integration with Microsoft ecosystem
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManagementHub;
