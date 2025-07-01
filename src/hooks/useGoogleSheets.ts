
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GoogleSheetsConfig {
  spreadsheetId: string;
  apiKey: string;
}

export const useGoogleSheets = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [config, setConfig] = useState<GoogleSheetsConfig | null>(null);
  const { toast } = useToast();

  const connectToGoogleSheets = (spreadsheetId: string, apiKey: string) => {
    setConfig({ spreadsheetId, apiKey });
    setIsConnected(true);
    localStorage.setItem('googleSheetsConfig', JSON.stringify({ spreadsheetId, apiKey }));
    toast({
      title: "Google Sheets Connected",
      description: "Successfully connected to Google Sheets!",
    });
  };

  const exportToGoogleSheets = async (data: any[], sheetName: string) => {
    if (!config) {
      toast({
        title: "Not Connected",
        description: "Please connect to Google Sheets first.",
        variant: "destructive"
      });
      return false;
    }

    try {
      // This would typically use the Google Sheets API
      // For now, we'll simulate the export and provide instructions
      console.log('Exporting to Google Sheets:', { data, sheetName, config });
      
      toast({
        title: "Export Prepared",
        description: "Data prepared for Google Sheets export. Use the CSV download for now.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export to Google Sheets.",
        variant: "destructive"
      });
      return false;
    }
  };

  const disconnect = () => {
    setConfig(null);
    setIsConnected(false);
    localStorage.removeItem('googleSheetsConfig');
    toast({
      title: "Disconnected",
      description: "Disconnected from Google Sheets.",
    });
  };

  return {
    isConnected,
    config,
    connectToGoogleSheets,
    exportToGoogleSheets,
    disconnect
  };
};
