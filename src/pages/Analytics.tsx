import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Users, Eye, Clock, TrendingUp } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';

// Fake data for analytics
const dailyVisitors = [
  { date: '01/03', visitors: 245, pageViews: 892 },
  { date: '02/03', visitors: 312, pageViews: 1043 },
  { date: '03/03', visitors: 289, pageViews: 967 },
  { date: '04/03', visitors: 401, pageViews: 1234 },
  { date: '05/03', visitors: 378, pageViews: 1156 },
  { date: '06/03', visitors: 423, pageViews: 1389 },
  { date: '07/03', visitors: 467, pageViews: 1523 },
  { date: '08/03', visitors: 501, pageViews: 1678 },
  { date: '09/03', visitors: 478, pageViews: 1567 },
  { date: '10/03', visitors: 523, pageViews: 1789 },
  { date: '11/03', visitors: 589, pageViews: 1923 },
  { date: '12/03', visitors: 612, pageViews: 2045 },
  { date: '13/03', visitors: 634, pageViews: 2178 },
  { date: '14/03', visitors: 701, pageViews: 2334 },
];

const pageVisits = [
  { page: 'Trang Chủ', visits: 3245 },
  { page: 'Trắc Nghiệm', visits: 2156 },
  { page: 'Nhận Xét', visits: 1789 },
  { page: 'Thống Kê', visits: 967 },
];

const hourlyTraffic = [
  { hour: '00:00', users: 23 },
  { hour: '02:00', users: 12 },
  { hour: '04:00', users: 8 },
  { hour: '06:00', users: 34 },
  { hour: '08:00', users: 156 },
  { hour: '10:00', users: 234 },
  { hour: '12:00', users: 289 },
  { hour: '14:00', users: 312 },
  { hour: '16:00', users: 267 },
  { hour: '18:00', users: 201 },
  { hour: '20:00', users: 178 },
  { hour: '22:00', users: 89 },
];

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
  const totalVisitors = dailyVisitors.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageViews = dailyVisitors.reduce((sum, day) => sum + day.pageViews, 0);
  const avgTimeOnSite = '4:32';
  const bounceRate = '32%';

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
                <span className="text-green-600 font-medium">+12.5%</span> so với tuần trước
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
                <span className="text-green-600 font-medium">+8.3%</span> so với tuần trước
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
                <span className="text-green-600 font-medium">+0:23</span> so với tuần trước
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
                <span className="text-green-600 font-medium">-3.2%</span> so với tuần trước
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
              <AreaChart data={dailyVisitors}>
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
                <BarChart data={pageVisits}>
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
                <LineChart data={hourlyTraffic}>
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
                    <span className="font-medium">62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Máy tính</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Máy tính bảng</span>
                    <span className="font-medium">6%</span>
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
                    <span className="font-medium">4,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Người dùng quay lại</span>
                    <span className="font-medium">2,123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tỷ lệ quay lại</span>
                    <span className="font-medium">33.4%</span>
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
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trực tiếp</span>
                    <span className="font-medium">38%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mạng xã hội</span>
                    <span className="font-medium">17%</span>
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
