
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
          className="flex items-center gap-2 h-9 px-3 rounded-full border border-border hover:bg-accent"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium text-sm">{language.toUpperCase()}</span>
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
