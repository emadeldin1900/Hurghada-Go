import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BottomNav from '../components/common/BottomNav';
import FloatingAiChat from '../components/chat/FloatingAiChat';

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isDedicatedChatPage = pathname === '/chat' || pathname === '/ai-chat' || pathname === '/ai-planner';

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAF8F5] text-slate-800 antialiased selection:bg-[#f0644b] selection:text-white">
      <Navbar transparent={pathname === '/'} />
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-24 lg:pb-0">
        <Outlet />
      </main>
      {!isDedicatedChatPage && <FloatingAiChat />}
      <Footer />
      <BottomNav />
    </div>
  );
}
