import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Bell, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RealTimeNotificationsProps {
  onNewResponse?: (response: any) => void;
}

const RealTimeNotifications = ({ onNewResponse }: RealTimeNotificationsProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up real-time subscription for new feedback responses
    const channel = supabase
      .channel('feedback-responses-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback_responses'
        },
        (payload) => {
          console.log('New response received:', payload);
          const newResponse = payload.new;
          
          // Add to notifications
          const notification = {
            id: newResponse.id,
            type: 'new_response',
            message: `New feedback from ${newResponse.user_name}`,
            timestamp: new Date(),
            data: newResponse
          };
          
          setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
          
          // Show toast notification
          toast({
            title: "New Feedback Received! 🎉",
            description: `${newResponse.user_name} just submitted feedback`,
          });
          
          // Call callback if provided
          if (onNewResponse) {
            onNewResponse(newResponse);
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast, onNewResponse]);

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">
              {isConnected ? 'Real-time Connected' : 'Connecting...'}
            </span>
            <Badge variant={isConnected ? 'default' : 'destructive'}>
              {isConnected ? 'Live' : 'Offline'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Bell className="h-4 w-4" />
              <span className="font-medium">Recent Activity</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{notification.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealTimeNotifications;