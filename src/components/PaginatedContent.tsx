import {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowRight, CheckCircle, ChevronLeft, ChevronRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {SteppedProgressIndicator} from './SteppedProgressIndicator';
import {ImageComparison} from './ImageComparison';

export interface PageContent {
    title: string;
    content: React.ReactNode;
    imagePosition?: 'top' | 'middle' | 'bottom' | 'none';
    imageUrl?: string;
    imageSource?: string;
    // For image comparison (2 images side-by-side)
    imageComparison?: {
        image1: {
            url: string;
            label: string;
            source: string;
        };
        image2: {
            url: string;
            label: string;
            source: string;
        };
        title?: string;
    };
}

interface PaginatedContentProps {
    pages: PageContent[];
    mainTitle: string;
    nextContentUrl?: string;
    nextContentTitle?: string;
}

export function PaginatedContent({pages, mainTitle, nextContentUrl, nextContentTitle}: PaginatedContentProps) {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = pages.length;
    const isLastPage = currentPage === totalPages - 1;

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    };

    const currentPageData = pages[currentPage];
    const showImagePlaceholder = currentPageData.imagePosition && currentPageData.imagePosition !== 'none';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Main Title Card */}
                <Card className="bg-card border-primary/40">
                    <CardContent className="pt-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">
                            {mainTitle}
                        </h1>

                        {/* Stepped Progress Indicator */}
                        <SteppedProgressIndicator
                            totalSteps={totalPages}
                            currentStep={currentPage}
                            onStepClick={(step) => {
                                setCurrentPage(step);
                                window.scrollTo({top: 0, behavior: 'smooth'});
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Current Page Content */}
                <Card className="bg-card border-border">
                    <CardContent className="pt-6 space-y-6">
                        {/* Title with Circle Number */}
                        <div className="flex items-start gap-4">
                            {currentPageData.title.match(/^(\d+)\.\s*(.+)/) ? (
                                <>
                                    <div
                                        className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                                        {currentPageData.title.match(/^(\d+)\.\s*(.+)/)?.[1]}
                                    </div>
                                    <h2 className="text-2xl font-semibold text-primary flex-1 mt-2">
                                        {currentPageData.title.match(/^(\d+)\.\s*(.+)/)?.[2]}
                                    </h2>
                                </>
                            ) : (
                                <h2 className="text-2xl font-semibold text-primary">
                                    {currentPageData.title}
                                </h2>
                            )}
                        </div>

                        {/* Image - Top Position */}
                        {showImagePlaceholder && currentPageData.imagePosition === 'top' && (
                            <div className="space-y-2">
                                {currentPageData.imageComparison ? (
                                    <ImageComparison
                                        image1={currentPageData.imageComparison.image1}
                                        image2={currentPageData.imageComparison.image2}
                                        title={currentPageData.imageComparison.title}
                                    />
                                ) : currentPageData.imageUrl ? (
                                    <>
                                        <img
                                            src={currentPageData.imageUrl}
                                            alt={currentPageData.title}
                                            className="w-full h-auto rounded-lg border border-border shadow-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                        <div
                                            className="hidden w-full h-64 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                            <div className="text-center text-muted-foreground">
                                                <div className="text-4xl mb-2">🖼️</div>
                                                <p className="text-sm">Không thể tải hình ảnh</p>
                                                <p className="text-xs mt-1">Vị trí: Phía trên nội dung</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="w-full h-64 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                        <div className="text-center text-muted-foreground">
                                            <div className="text-4xl mb-2">🖼️</div>
                                            <p className="text-sm">Khu vực chèn hình ảnh</p>
                                            <p className="text-xs mt-1">Vị trí: Phía trên nội dung</p>
                                        </div>
                                    </div>
                                )}
                                {currentPageData.imageSource && currentPageData.imageUrl && !currentPageData.imageComparison && (
                                    <p className="text-xs text-muted-foreground italic text-right">
                                        Nguồn: {currentPageData.imageSource}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-slate max-w-none">
                            {currentPageData.content}
                        </div>

                        {/* Image - Middle Position */}
                        {showImagePlaceholder && currentPageData.imagePosition === 'middle' && (
                            <div className="space-y-2">
                                {currentPageData.imageComparison ? (
                                    <ImageComparison
                                        image1={currentPageData.imageComparison.image1}
                                        image2={currentPageData.imageComparison.image2}
                                        title={currentPageData.imageComparison.title}
                                    />
                                ) : currentPageData.imageUrl ? (
                                    <>
                                        <img
                                            src={currentPageData.imageUrl}
                                            alt={currentPageData.title}
                                            className="w-full h-auto rounded-lg border border-border shadow-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                        <div
                                            className="hidden w-full h-64 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                            <div className="text-center text-muted-foreground">
                                                <div className="text-4xl mb-2">🖼️</div>
                                                <p className="text-sm">Không thể tải hình ảnh</p>
                                                <p className="text-xs mt-1">Vị trí: Giữa nội dung</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="w-full h-64 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                        <div className="text-center text-muted-foreground">
                                            <div className="text-4xl mb-2">🖼️</div>
                                            <p className="text-sm">Khu vực chèn hình ảnh</p>
                                            <p className="text-xs mt-1">Vị trí: Giữa nội dung</p>
                                        </div>
                                    </div>
                                )}
                                {currentPageData.imageSource && currentPageData.imageUrl && !currentPageData.imageComparison && (
                                    <p className="text-xs text-muted-foreground italic text-right">
                                        Nguồn: {currentPageData.imageSource}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Image - Bottom Position */}
                        {showImagePlaceholder && currentPageData.imagePosition === 'bottom' && (
                            <div className="space-y-2">
                                {currentPageData.imageComparison ? (
                                    <ImageComparison
                                        image1={currentPageData.imageComparison.image1}
                                        image2={currentPageData.imageComparison.image2}
                                        title={currentPageData.imageComparison.title}
                                    />
                                ) : currentPageData.imageUrl ? (
                                    <>
                                        <img
                                            src={currentPageData.imageUrl}
                                            alt={currentPageData.title}
                                            className="w-full h-auto rounded-lg border border-border shadow-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                        <div
                                            className="hidden w-full h-64 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                            <div className="text-center text-muted-foreground">
                                                <div className="text-4xl mb-2">🖼️</div>
                                                <p className="text-sm">Không thể tải hình ảnh</p>
                                                <p className="text-xs mt-1">Vị trí: Phía dưới nội dung</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="w-full h-64 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                        <div className="text-center text-muted-foreground">
                                            <div className="text-4xl mb-2">🖼️</div>
                                            <p className="text-sm">Khu vực chèn hình ảnh</p>
                                            <p className="text-xs mt-1">Vị trí: Phía dưới nội dung</p>
                                        </div>
                                    </div>
                                )}
                                {currentPageData.imageSource && currentPageData.imageUrl && !currentPageData.imageComparison && (
                                    <p className="text-xs text-muted-foreground italic text-right">
                                        Nguồn: {currentPageData.imageSource}
                                    </p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Completion Card - Show when on last page */}
                {isLastPage && nextContentUrl && (
                    <Card className="bg-gradient-to-br from-card to-muted border-primary border-2">
                        <CardContent className="pt-6 pb-6">
                            <div className="text-center space-y-4">
                                <div className="flex justify-center">
                                    <CheckCircle className="w-16 h-16 text-primary animate-pulse"/>
                                </div>
                                <h3 className="text-2xl font-bold text-primary">
                                    Chúc mừng! Bạn đã hoàn thành phần này
                                </h3>
                                <p className="text-muted-foreground text-base">
                                    Bạn đã học xong tất cả {totalPages} phần của "{mainTitle}"
                                </p>
                                <div className="pt-4">
                                    <Link to={nextContentUrl}>
                                        <Button
                                            size="lg"
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                        >
                                            <span>Tiếp tục học: {nextContentTitle}</span>
                                            <ArrowRight className="ml-2 h-6 w-6"/>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Navigation Arrows */}
                <Card className="bg-card border-primary/40">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={goToPreviousPage}
                                disabled={currentPage === 0}
                                className="flex items-center gap-2 bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-5 w-5"/>
                                <span className="hidden sm:inline">Phần trước</span>
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                    Phần {currentPage + 1} / {totalPages}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {currentPageData.title}
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages - 1}
                                className="flex items-center gap-2 bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="hidden sm:inline">Phần tiếp theo</span>
                                <ChevronRight className="h-5 w-5"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
