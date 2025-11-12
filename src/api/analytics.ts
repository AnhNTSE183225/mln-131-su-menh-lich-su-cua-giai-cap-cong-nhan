const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface DailyVisitor {
    date: string;
    visitors: number;
    pageViews: number;
}

export interface PageVisit {
    page: string;
    visits: number;
}

export interface AnalyticsData {
    dailyVisitors: DailyVisitor[];
    pageVisits: PageVisit[];
}

/**
 * Fetch all analytics data with timeout
 */
export async function getAnalytics(): Promise<AnalyticsData> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics`, {
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch analytics data: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout: Backend is not responding. Please check if the backend is running.');
            }
            throw error;
        }
        throw new Error('Failed to fetch analytics data');
    }
}

/**
 * Fetch daily visitors data
 */
export async function getDailyVisitors(): Promise<DailyVisitor[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/daily-visitors`);
    if (!response.ok) {
        throw new Error('Failed to fetch daily visitors data');
    }
    return response.json();
}

/**
 * Fetch page visits data
 */
export async function getPageVisits(): Promise<PageVisit[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/page-visits`);
    if (!response.ok) {
        throw new Error('Failed to fetch page visits data');
    }
    return response.json();
}

/**
 * Track a page visit
 * This increments page visits and daily visitors
 */
export async function trackPageVisit(page: string): Promise<void> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for tracking

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/analytics/track-visit?page=${encodeURIComponent(page)}`,
            {
                method: 'POST',
                signal: controller.signal,
            }
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to track page visit: ${response.status}`);
        }
    } catch (error) {
        clearTimeout(timeoutId);
        // Don't throw - tracking failures shouldn't break the app
        console.warn('Page visit tracking failed:', error);
    }
}

