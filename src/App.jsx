import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import LoginForm from './components/LoginForm';

export default function App() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAF8F5] antialiased"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full lg:w-1/2 h-auto lg:h-screen lg:sticky lg:top-0">
        <HeroSection lang={lang} />
      </div>

      <div className="w-full lg:w-1/2 min-h-screen flex flex-col">
        <LoginForm lang={lang} onLangChange={setLang} />
      </div>
    </div>
  );
}
