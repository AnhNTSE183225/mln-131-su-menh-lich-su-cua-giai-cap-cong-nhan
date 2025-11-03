import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { ChatBubble } from './ChatBubble';
import { usePageTracking } from '@/hooks/use-page-tracking';

export function Layout() {
  // Automatically track page visits
  usePageTracking();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <ChatBubble />
    </div>
  );
}
