
import { useEffect, useState } from "react";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 transition-all ${
        scrolled
          ? "bg-background/80 backdrop-blur-sm"
          : "bg-background"
      }`}
    >
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Input
            placeholder="Search..."
            className="w-[200px] lg:w-[300px]"
          />
        </div>
        <ThemeToggle />
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
