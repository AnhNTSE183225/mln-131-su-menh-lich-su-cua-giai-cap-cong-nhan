import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartContainer, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart';
import {Eye, Users} from 'lucide-react';
import {Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis} from 'recharts';
import {useEffect, useState} from 'react';
import {type AnalyticsData, getAnalytics} from '@/api/analytics';
import {Spinner} from '@/components/ui/spinner';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

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
};

const COMMON_PAGE_NAMES = ['Trang Chủ', 'Nhận Xét', 'Trắc Nghiệm', 'Thống Kê', 'Home', 'Comments', 'Quiz', 'Analytics', 'Login', 'Đăng Nhập'];
const commonPageSet = new Set(COMMON_PAGE_NAMES.map((name) => name.toLowerCase()));

type AxisTickProps = {
    x?: number;
    y?: number;
    payload?: {
        value: string;
    };
};

function PageAxisTick({x = 0, y = 0, payload}: AxisTickProps) {
    if (!payload?.value) {
        return null;
    }
    return (
        <text
            x={x}
            y={y + 10}
            textAnchor="end"
            transform={`rotate(-25 ${x},${y + 10})`}
            className="fill-muted-foreground text-xs"
        >
            {payload.value}
        </text>
    );
}

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
                // Sort dailyVisitors by date in ascending order
                analyticsData.dailyVisitors.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
                    <Spinner className="h-12 w-12 mx-auto"/>
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
                        Không thể tải dữ liệu thống kê. Vui lòng đảm bảo backend đang chạy
                        tại {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}
                        <br/>
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
    const filteredPageVisits = data.pageVisits.filter(({page}) => !commonPageSet.has(page.toLowerCase()));
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tổng Người Truy Cập</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Tổng trong 30 ngày gần nhất</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Lượt Xem Trang</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Tổng lượt xem trong 30 ngày gần nhất</p>
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
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <ChartTooltip content={<ChartTooltipContent/>}/>
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


                {/* Page Visits Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lượt Truy Cập Theo Trang</CardTitle>
                        <CardDescription>
                            Số lượt truy cập cho các trang nội dung chuyên sâu (đã loại trừ trang phổ biến)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredPageVisits.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-10">
                                Chưa có dữ liệu cho các trang nội dung chuyên sâu.
                            </p>
                        ) : (
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <BarChart data={filteredPageVisits} margin={{bottom: 40}}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="page" interval={0} tick={<PageAxisTick/>} height={50}/>
                                    <YAxis/>
                                    <ChartTooltip content={<ChartTooltipContent/>}/>
                                    <Bar dataKey="visits" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]}/>
                                </BarChart>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
