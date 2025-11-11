import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { ChatBubble } from './ChatBubble';
import { Footer } from './Footer';
import { usePageTracking } from '@/hooks/use-page-tracking';
import { useEffect, useState } from 'react';

import home_background from '/images/backgrounds/home_background.jpg';
import content_1 from '/images/backgrounds/content_1.png';
import content_2 from '/images/backgrounds/content_2.png';
import content_3 from '/images/backgrounds/content_3.png';
import quiz from '/images/backgrounds/quiz.png';

// Background image mapping for each route
const BACKGROUND_MAP: Record<string, string> = {
  '/': home_background,
  '/quan-diem-co-ban': content_1,
  '/giai-cap-cong-nhan-hien-nay': content_2,
  '/giai-cap-cong-nhan-viet-nam': content_3,
  '/quiz': quiz,
  '/cau-hoi-on-tap': content_1,
};

export function Layout() {
  const location = useLocation();
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  // Automatically track page visits
  usePageTracking();

  useEffect(() => {
    // Get background for current route
    const bgImage = BACKGROUND_MAP[location.pathname] || '';
    setBackgroundImage(bgImage);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ChatBubble />
      </div>
    </div>
  );
}