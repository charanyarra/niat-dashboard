
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { ExternalLink, Unlink } from 'lucide-react';

const GoogleSheetsConnector = () => {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { isConnected, connectToGoogleSheets, disconnect } = useGoogleSheets();

  const handleConnect = () => {
    if (spreadsheetId && apiKey) {
      connectToGoogleSheets(spreadsheetId, apiKey);
      setSpreadsheetId('');
      setApiKey('');
    }
  };

  if (isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5 text-green-600" />
            <span>Google Sheets Connected</span>
          </CardTitle>
          <CardDescription>
            Your responses are ready to be exported to Google Sheets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={disconnect} variant="outline" className="w-full">
            <Unlink className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to Google Sheets</CardTitle>
        <CardDescription>
          Connect your Google Sheets to automatically export feedback responses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="spreadsheetId">Spreadsheet ID</Label>
          <Input
            id="spreadsheetId"
            placeholder="Enter your Google Sheets ID"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Enter your Google Sheets API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleConnect} 
          className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700"
          disabled={!spreadsheetId || !apiKey}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Connect to Google Sheets
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>To get your API key and Spreadsheet ID:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Go to Google Cloud Console</li>
            <li>Enable the Google Sheets API</li>
            <li>Create credentials (API key)</li>
            <li>Copy your spreadsheet ID from the URL</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsConnector;
