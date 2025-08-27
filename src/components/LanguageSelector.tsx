import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  // const { language, setLanguage } = useLanguage();
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: 'en' | 'vi') => {
    // setLanguage(lang);

    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };
  const language = i18n.language; // This gets the current language
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-1.5 h-8 px-2 rounded-md border border-input hover:bg-accent'
        >
          <Globe className='h-3.5 w-3.5' />
          <span className='font-medium text-xs'>{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-32'>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-accent' : ''}
        >
          <span className={language === 'en' ? 'font-bold' : ''}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('vi')}
          className={language === 'vi' ? 'bg-accent' : ''}
        >
          <span className={language === 'vi' ? 'font-bold' : ''}>
            Tiếng Việt
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
