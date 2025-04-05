
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
}

const YouTubePlayer = ({ videoId, title }: YouTubePlayerProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [videoId]);

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full pt-[56.25%]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
      {title && (
        <div className="p-4">
          <h3 className="font-medium">{title}</h3>
        </div>
      )}
    </Card>
  );
};

export default YouTubePlayer;
