
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1.5 h-8 px-2 rounded-md border border-input hover:bg-accent"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="font-medium text-xs">{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={language === 'en' ? 'bg-accent' : ''}
        >
          <span className={language === 'en' ? 'font-bold' : ''}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('vi')} 
          className={language === 'vi' ? 'bg-accent' : ''}
        >
          <span className={language === 'vi' ? 'font-bold' : ''}>Tiếng Việt</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
