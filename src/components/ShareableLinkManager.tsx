
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
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
    window.open(qrUrl, '_blank');
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
