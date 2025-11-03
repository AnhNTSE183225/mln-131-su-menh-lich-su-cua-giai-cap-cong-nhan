import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Users, Eye, Clock, TrendingUp } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';
import { useEffect, useState } from 'react';
import { getAnalytics, type AnalyticsData } from '@/api/analytics';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const chartConfig = {
  visitors: {
    label: 'Người truy cập',
    color: 'hsl(var(--chart-1))',
  },
  pageViews: {
    label: 'Lượt xem',
    color: 'hsl(var(--chart-2))',
  },
  visits: {
    label: 'Lượt truy cập',
    color: 'hsl(var(--chart-3))',
  },
  users: {
    label: 'Người dùng',
    color: 'hsl(var(--chart-4))',
  },
};

export function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }
        setError(null);
        const analyticsData = await getAnalytics();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics data');
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    };

    // Initial load with loading state
    fetchData(true);
    
    // Auto-refresh every 5 seconds without loading spinner
    const intervalId = setInterval(() => fetchData(false), 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Spinner className="h-12 w-12 mx-auto" />
          <p className="text-muted-foreground">Đang tải dữ liệu thống kê...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>
            Không thể tải dữ liệu thống kê. Vui lòng đảm bảo backend đang chạy tại {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}
            <br />
            Chi tiết: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const totalVisitors = data.dailyVisitors.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageViews = data.dailyVisitors.reduce((sum, day) => sum + day.pageViews, 0);
  const avgTimeOnSite = data.metrics.avgTimeOnSite;
  const bounceRate = data.metrics.bounceRate;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Thống Kê & Phân Tích</h1>
          <p className="text-muted-foreground text-lg">
            Dữ liệu truy cập và hoạt động người dùng
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Người Truy Cập</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">{data.metrics.growthMetrics.visitorsGrowth}</span> so với tuần trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt Xem Trang</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">{data.metrics.growthMetrics.pageViewsGrowth}</span> so với tuần trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thời Gian Trung Bình</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgTimeOnSite}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">{data.metrics.growthMetrics.timeGrowth}</span> so với tuần trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ Lệ Thoát</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bounceRate}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">{data.metrics.growthMetrics.bounceRateChange}</span> so với tuần trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visitors Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Xu Hướng Người Truy Cập</CardTitle>
            <CardDescription>Số lượng người truy cập và lượt xem theo ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={data.dailyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  stackId="2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Page Visits Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Lượt Truy Cập Theo Trang</CardTitle>
              <CardDescription>Số lượt truy cập cho mỗi trang</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={data.pageVisits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="page" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visits" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Hourly Traffic Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Lưu Lượng Theo Giờ</CardTitle>
              <CardDescription>Số người dùng hoạt động theo từng giờ</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={data.hourlyTraffic}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Thống Kê Bổ Sung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Thiết Bị Truy Cập
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Di động</span>
                    <span className="font-medium">{data.additionalStats.devices.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Máy tính</span>
                    <span className="font-medium">{data.additionalStats.devices.desktop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Máy tính bảng</span>
                    <span className="font-medium">{data.additionalStats.devices.tablet}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Người Dùng Mới
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Người dùng mới</span>
                    <span className="font-medium">{data.additionalStats.users.newUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Người dùng quay lại</span>
                    <span className="font-medium">{data.additionalStats.users.returningUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tỷ lệ quay lại</span>
                    <span className="font-medium">{data.additionalStats.users.returnRate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Nguồn Truy Cập
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tìm kiếm</span>
                    <span className="font-medium">{data.additionalStats.sources.search}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trực tiếp</span>
                    <span className="font-medium">{data.additionalStats.sources.direct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mạng xã hội</span>
                    <span className="font-medium">{data.additionalStats.sources.social}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
