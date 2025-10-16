import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { ChatBubble } from './ChatBubble';

export function Layout() {
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
