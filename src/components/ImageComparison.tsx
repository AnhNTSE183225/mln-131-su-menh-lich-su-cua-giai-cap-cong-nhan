interface ImageComparisonProps {
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
}

export function ImageComparison({ image1, image2, title }: ImageComparisonProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-xl font-bold text-[#DAA520] text-center">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image 1 */}
        <div className="space-y-2">
          <div className="bg-[#26201D] p-3 rounded-lg border border-[#4A4037]">
            <img
              src={image1.url}
              alt={image1.label}
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.alt = 'Không thể tải hình ảnh';
              }}
            />
          </div>
          <div className="bg-[#2F2622] p-3 rounded-lg border-l-4 border-[#8B1E1E]">
            <p className="text-sm font-semibold text-[#DAA520] mb-1">
              {image1.label}
            </p>
            <p className="text-xs text-[#C2B280] italic">
              Nguồn: {image1.source}
            </p>
          </div>
        </div>

        {/* Image 2 */}
        <div className="space-y-2">
          <div className="bg-[#26201D] p-3 rounded-lg border border-[#4A4037]">
            <img
              src={image2.url}
              alt={image2.label}
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.alt = 'Không thể tải hình ảnh';
              }}
            />
          </div>
          <div className="bg-[#2F2622] p-3 rounded-lg border-l-4 border-[#8B1E1E]">
            <p className="text-sm font-semibold text-[#DAA520] mb-1">
              {image2.label}
            </p>
            <p className="text-xs text-[#C2B280] italic">
              Nguồn: {image2.source}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
