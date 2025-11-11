import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageVisit } from '@/api/analytics';

// Map route paths to Vietnamese page names (matching backend data)
const PAGE_NAME_MAP: Record<string, string> = {
  '/': 'Trang Chủ',
  '/quan-diem-co-ban': 'Quan Điểm Cơ Bản',
  '/giai-cap-cong-nhan-hien-nay': 'Giai Cấp Công Nhân Hiện Nay',
  '/giai-cap-cong-nhan-viet-nam': 'Giai Cấp Công Nhân Việt Nam',
  '/cau-hoi-on-tap': 'Câu Hỏi Ôn Tập',
  '/comments': 'Nhận Xét',
  '/quiz': 'Trắc Nghiệm',
  '/analytics': 'Thống Kê',
  '/login': 'Đăng Nhập',
};

// Minimum time between tracking the same page (in milliseconds)
// Prevents refresh spam - only count once per 30 seconds per page
const TRACKING_COOLDOWN = 30 * 1000; // 30 seconds

/**
 * Hook to automatically track page visits when component mounts
 * Prevents refresh spam by using sessionStorage and time-based deduplication
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Get the Vietnamese page name
    const pageName = PAGE_NAME_MAP[location.pathname] || location.pathname;

    // Check if we've already tracked this page recently
    const trackingKey = `page_tracked_${pageName}`;
    const lastTracked = sessionStorage.getItem(trackingKey);
    const now = Date.now();

    // If we tracked this page recently, skip
    if (lastTracked) {
      const timeSinceLastTrack = now - parseInt(lastTracked, 10);
      if (timeSinceLastTrack < TRACKING_COOLDOWN) {
        // Too soon, skip tracking
        const remainingSeconds = Math.ceil((TRACKING_COOLDOWN - timeSinceLastTrack) / 1000);
        console.log(`⏱️ Skipping tracking for ${pageName} (cooldown: ${remainingSeconds}s remaining)`);
        return;
      }
    }

    // Mark as tracked with current timestamp
    sessionStorage.setItem(trackingKey, now.toString());

    // Track the page visit (fire and forget - don't block on errors)
    trackPageVisit(pageName)
      .then(() => {
        console.log(`✅ Tracked page visit: ${pageName}`);
      })
      .catch((error) => {
        // If tracking fails, remove the sessionStorage entry so we can retry
        sessionStorage.removeItem(trackingKey);
        console.warn('❌ Failed to track page visit:', error);
      });
  }, [location.pathname]);
}

