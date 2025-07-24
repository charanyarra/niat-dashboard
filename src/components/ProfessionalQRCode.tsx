import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfessionalQRCodeProps {
  url: string;
  title: string;
  sessionId: string;
}

const ProfessionalQRCode = ({ url, title, sessionId }: ProfessionalQRCodeProps) => {
  const [qrCodeSvg, setQrCodeSvg] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    generateProfessionalQR();
  }, [url]);

  const generateProfessionalQR = () => {
    // Create a professional QR code with branding
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&format=svg&bgcolor=ffffff&color=dc2626&qzone=2`;
    setQrCodeSvg(qrUrl);
  };

  const downloadQR = (format: 'png' | 'svg' | 'pdf') => {
    let downloadUrl = '';
    let filename = `${title.replace(/\s+/g, '_')}_QR.${format}`;
    
    switch (format) {
      case 'png':
        downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(url)}&format=png&bgcolor=ffffff&color=dc2626&qzone=2`;
        break;
      case 'svg':
        downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(url)}&format=svg&bgcolor=ffffff&color=dc2626&qzone=2`;
        break;
      case 'pdf':
        // For PDF, we'll use PNG and let the browser convert
        downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(url)}&format=png&bgcolor=ffffff&color=dc2626&qzone=2`;
        filename = `${title.replace(/\s+/g, '_')}_QR.png`;
        break;
    }

    // Create a temporary link to download the QR code
    fetch(downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading QR code:', error);
        toast({
          title: "Download Failed",
          description: "Failed to download QR code. Please try again.",
          variant: "destructive"
        });
      });

    toast({
      title: "QR Code Downloaded",
      description: `Professional QR code downloaded as ${format.toUpperCase()}`,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-center">
          <QrCode className="h-5 w-5" />
          <span>Professional QR Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-6 rounded-lg border-2 border-red-100 flex items-center justify-center">
          {qrCodeSvg ? (
            <div className="text-center">
              <img 
                src={qrCodeSvg} 
                alt={`QR Code for ${title}`}
                className="w-64 h-64 mx-auto"
                onError={() => {
                  console.error('QR Code failed to load');
                  toast({
                    title: "QR Code Error",
                    description: "Failed to generate QR code. Please check the URL.",
                    variant: "destructive"
                  });
                }}
              />
              <p className="text-xs text-gray-500 mt-2 break-all">{url}</p>
            </div>
          ) : (
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Loading QR Code...</span>
            </div>
          )}
        </div>
        
        <div className="text-center space-y-2">
          <p className="font-semibold text-primary">{title}</p>
          <p className="text-sm text-muted-foreground">Scan to access feedback form</p>
        </div>

        <div className="flex space-x-2">
          <Button 
            onClick={() => downloadQR('png')}
            size="sm"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-1" />
            PNG
          </Button>
          <Button 
            onClick={() => downloadQR('svg')}
            size="sm" 
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-1" />
            SVG
          </Button>
          <Button 
            onClick={() => downloadQR('pdf')}
            size="sm"
            variant="outline" 
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalQRCode;