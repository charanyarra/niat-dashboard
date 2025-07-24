
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, QrCode, Share2, ExternalLink } from 'lucide-react';
import { FeedbackSession } from '@/hooks/useFeedbackData';

interface ShareableLinkManagerProps {
  session: FeedbackSession;
}

const ShareableLinkManager = ({ session }: ShareableLinkManagerProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/feedback/${session.share_link}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "The shareable link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };

  const generateQRCode = () => {
    // Create a better QR code with error correction
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(shareUrl)}&format=png&bgcolor=ffffff&color=dc2626&qzone=2&ecc=M`;
    
    // Open in new window with proper formatting
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${session.title}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 20px;
                background: #f5f5f5;
              }
              .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                display: inline-block;
              }
              .qr-code {
                border: 2px solid #dc2626;
                border-radius: 10px;
                padding: 10px;
                background: white;
              }
              .url {
                font-size: 12px;
                color: #666;
                margin-top: 15px;
                word-break: break-all;
                max-width: 400px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2 style="color: #dc2626; margin-bottom: 20px;">${session.title}</h2>
              <p style="margin-bottom: 20px;">Scan this QR code to access the feedback form</p>
              <div class="qr-code">
                <img src="${qrUrl}" alt="QR Code" style="display: block;" />
              </div>
              <div class="url">${shareUrl}</div>
              <button onclick="window.print()" style="
                background: #dc2626; 
                color: white; 
                border: none; 
                padding: 10px 20px; 
                border-radius: 5px; 
                margin-top: 20px;
                cursor: pointer;
              ">Print QR Code</button>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const openPreview = () => {
    window.open(shareUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Share2 className="h-5 w-5" />
          <span>Shareable Link</span>
        </CardTitle>
        <CardDescription>
          Share this link with students to collect feedback
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Direct Access URL</label>
          <div className="flex space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              size="sm"
              onClick={copyToClipboard}
              variant={copied ? "default" : "outline"}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={generateQRCode}>
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR Code
          </Button>
          <Button size="sm" variant="outline" onClick={openPreview}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview Form
          </Button>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Usage:</strong> Students can access this form directly without going through the session selector. 
            The link will remain active as long as the session is enabled.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareableLinkManager;
