import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-900">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full bg-red-900 hover:bg-red-800">
              <a href="/">Return to Home</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="/session-selector">Go to Feedback Forms</a>
            </Button>
          </div>
          <div className="mt-6 p-3 bg-muted rounded-lg text-sm">
            <p><strong>Need Help?</strong></p>
            <p>📞 +91 9014847505</p>
            <p>📧 guru.saicharanyarra@nxtwave.co.in</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

      </div>
    </div>
  );
};

export default NotFound;
