
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, ExternalLink } from 'lucide-react';

interface GoogleSheetsViewerProps {
  spreadsheetId?: string;
  apiKey?: string;
}

const GoogleSheetsViewer = ({ spreadsheetId, apiKey }: GoogleSheetsViewerProps) => {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sheetId, setSheetId] = useState(spreadsheetId || '');
  const [key, setKey] = useState(apiKey || '');
  const [range, setRange] = useState('Sheet1!A1:Z1000');
  const { toast } = useToast();

  const fetchSheetData = async () => {
    if (!sheetId || !key) {
      setError('Please provide both Spreadsheet ID and API Key');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${key}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.values && data.values.length > 0) {
        setSheetData(data.values);
        toast({
          title: "Data Loaded",
          description: `Successfully loaded ${data.values.length} rows from Google Sheets`,
        });
      } else {
        setSheetData([]);
        toast({
          title: "No Data",
          description: "No data found in the specified range",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error Loading Data",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportCurrentData = () => {
    if (sheetData.length === 0) {
      toast({
        title: "No Data",
        description: "No data available to export",
        variant: "destructive"
      });
      return;
    }

    const csvContent = sheetData.map(row => 
      row.map((cell: any) => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `google_sheets_data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Google Sheets data exported as CSV successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5" />
            <span>Google Sheets Viewer</span>
          </CardTitle>
          <CardDescription>
            View Google Sheets data directly on your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sheetId">Spreadsheet ID</Label>
              <Input
                id="sheetId"
                placeholder="Enter Google Sheets ID"
                value={sheetId}
                onChange={(e) => setSheetId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter API Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="range">Range (e.g., Sheet1!A1:Z1000)</Label>
            <Input
              id="range"
              placeholder="Sheet1!A1:Z1000"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={fetchSheetData} 
              disabled={loading || !sheetId || !key}
              className="bg-red-900 hover:bg-red-800"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Load Data
                </>
              )}
            </Button>
            
            <Button 
              onClick={exportCurrentData}
              variant="outline"
              disabled={sheetData.length === 0}
            >
              Export as CSV
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {sheetData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sheet Data ({sheetData.length} rows)</CardTitle>
            <CardDescription>
              Data from your Google Sheets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {sheetData[0]?.map((header: string, index: number) => (
                      <TableHead key={index} className="font-semibold">
                        {header || `Column ${index + 1}`}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sheetData.slice(1).map((row: any[], rowIndex: number) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell: any, cellIndex: number) => (
                        <TableCell key={cellIndex}>
                          {String(cell || '')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleSheetsViewer;
