
import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UnsupportedFeatureNoticeProps {
  title: string;
  message: string;
  actionText?: string;
  actionHref?: string;
}

const UnsupportedFeatureNotice: React.FC<UnsupportedFeatureNoticeProps> = ({
  title,
  message,
  actionText,
  actionHref
}) => {
  return (
    <div className="flex items-center justify-center h-full bg-editor-background p-4">
      <Alert variant="destructive" className="max-w-xl bg-[#252526] border-[#454545] text-white">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold mb-2">{title}</AlertTitle>
        <AlertDescription className="text-sm text-gray-300">
          <p className="mb-4">{message}</p>
          {actionText && actionHref && (
            <Button 
              variant="outline" 
              className="mt-2 border-[#454545] hover:bg-[#3C3C3C]"
              onClick={() => window.open(actionHref, '_blank')}
            >
              {actionText} <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UnsupportedFeatureNotice;
