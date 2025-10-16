import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, Brain, BarChart3 } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Trang Chủ', icon: Home },
    { path: '/comments', label: 'Nhận Xét & Phản Hồi', icon: MessageSquare },
    { path: '/quiz', label: 'Trắc Nghiệm', icon: Brain },
    { path: '/analytics', label: 'Thống Kê', icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">Lịch Sử Cách Mạng</span>
        </div>

        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                variant={isActive ? 'default' : 'ghost'}
                asChild
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
