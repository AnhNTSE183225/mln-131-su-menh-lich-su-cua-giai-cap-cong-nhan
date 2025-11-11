import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { SteppedProgressIndicator } from './SteppedProgressIndicator';
import { ImageComparison } from './ImageComparison';

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

export function PaginatedContent({ pages, mainTitle, nextContentUrl, nextContentTitle }: PaginatedContentProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = pages.length;
  const isLastPage = currentPage === totalPages - 1;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPageData = pages[currentPage];
  const showImagePlaceholder = currentPageData.imagePosition && currentPageData.imagePosition !== 'none';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Title Card */}
        <Card className="bg-[#2F2622] border-[#DAA520]/40">
          <CardContent className="pt-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#DAA520]">
              {mainTitle}
            </h1>

            {/* Stepped Progress Indicator */}
            <SteppedProgressIndicator
              totalSteps={totalPages}
              currentStep={currentPage}
              onStepClick={(step) => {
                setCurrentPage(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </CardContent>
        </Card>

        {/* Current Page Content */}
        <Card className="bg-[#2F2622] border-[#4A4037]">
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-2xl font-semibold text-[#DAA520]">
              {currentPageData.title}
            </h2>

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
                      className="w-full h-auto rounded-lg border border-[#4A4037] shadow-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-64 bg-[#26201D] rounded-lg flex items-center justify-center border-2 border-dashed border-[#4A4037]">
                      <div className="text-center text-[#C2B280]">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-sm">Không thể tải hình ảnh</p>
                        <p className="text-xs mt-1">Vị trí: Phía trên nội dung</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-64 bg-[#26201D] rounded-lg flex items-center justify-center border-2 border-dashed border-[#4A4037]">
                    <div className="text-center text-[#C2B280]">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm">Khu vực chèn hình ảnh</p>
                      <p className="text-xs mt-1">Vị trí: Phía trên nội dung</p>
                    </div>
                  </div>
                )}
                {currentPageData.imageSource && currentPageData.imageUrl && !currentPageData.imageComparison && (
                  <p className="text-xs text-[#C2B280] italic text-right">
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
                      className="w-full h-auto rounded-lg border border-[#4A4037] shadow-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-64 bg-[#26201D] rounded-lg flex items-center justify-center border-2 border-dashed border-[#4A4037]">
                      <div className="text-center text-[#C2B280]">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-sm">Không thể tải hình ảnh</p>
                        <p className="text-xs mt-1">Vị trí: Giữa nội dung</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-64 bg-[#26201D] rounded-lg flex items-center justify-center border-2 border-dashed border-[#4A4037]">
                    <div className="text-center text-[#C2B280]">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm">Khu vực chèn hình ảnh</p>
                      <p className="text-xs mt-1">Vị trí: Giữa nội dung</p>
                    </div>
                  </div>
                )}
                {currentPageData.imageSource && currentPageData.imageUrl && !currentPageData.imageComparison && (
                  <p className="text-xs text-[#C2B280] italic text-right">
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
                      className="w-full h-auto rounded-lg border border-[#4A4037] shadow-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-64 bg-[#26201D] rounded-lg flex items-center justify-center border-2 border-dashed border-[#4A4037]">
                      <div className="text-center text-[#C2B280]">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-sm">Không thể tải hình ảnh</p>
                        <p className="text-xs mt-1">Vị trí: Phía dưới nội dung</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-64 bg-[#26201D] rounded-lg flex items-center justify-center border-2 border-dashed border-[#4A4037]">
                    <div className="text-center text-[#C2B280]">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm">Khu vực chèn hình ảnh</p>
                      <p className="text-xs mt-1">Vị trí: Phía dưới nội dung</p>
                    </div>
                  </div>
                )}
                {currentPageData.imageSource && currentPageData.imageUrl && !currentPageData.imageComparison && (
                  <p className="text-xs text-[#C2B280] italic text-right">
                    Nguồn: {currentPageData.imageSource}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completion Card - Show when on last page */}
        {isLastPage && nextContentUrl && (
          <Card className="bg-gradient-to-br from-[#2F2622] to-[#3A3229] border-[#DAA520] border-2">
            <CardContent className="pt-6 pb-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="w-16 h-16 text-[#DAA520] animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-[#DAA520]">
                  Chúc mừng! Bạn đã hoàn thành phần này
                </h3>
                <p className="text-[#C2B280] text-base">
                  Bạn đã học xong tất cả {totalPages} phần của "{mainTitle}"
                </p>
                <div className="pt-4">
                  <a href={nextContentUrl}>
                    <Button
                      size="lg"
                      className="bg-[#DAA520] hover:bg-[#B8860B] text-[#2F2622] font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      <span>Tiếp tục học: {nextContentTitle}</span>
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Arrows */}
        <Card className="bg-[#2F2622] border-[#DAA520]/40">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="flex items-center gap-2 bg-[#8B1E1E] border-[#8B1E1E] text-[#E6DCCF] hover:bg-[#A52A2A] hover:text-[#E6DCCF] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Phần trước</span>
              </Button>

              <div className="text-center">
                <p className="text-sm text-[#C2B280]">
                  Phần {currentPage + 1} / {totalPages}
                </p>
                <p className="text-xs text-[#C2B280] mt-1">
                  {currentPageData.title}
                </p>
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-2 bg-[#8B1E1E] border-[#8B1E1E] text-[#E6DCCF] hover:bg-[#A52A2A] hover:text-[#E6DCCF] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Phần tiếp theo</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
