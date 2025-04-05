
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import YouTubePlayer from "./YouTubePlayer";

interface VideoModalProps {
  videoId: string;
  title: string;
  children: ReactNode;
}

const VideoModal = ({ videoId, title, children }: VideoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <YouTubePlayer videoId={videoId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
