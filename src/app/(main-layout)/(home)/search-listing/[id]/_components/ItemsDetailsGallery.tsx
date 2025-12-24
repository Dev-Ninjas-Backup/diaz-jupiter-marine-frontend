import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface ItemDetailsGalleryProps {
  images: string[] | StaticImageData[];
  name: string;
}

const ItemDetailsGallery = ({ images, name }: ItemDetailsGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const thumbnailsPerPage = 3;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showMoreThumbnails = () => {
    const nextStartIndex = thumbnailStartIndex + thumbnailsPerPage;
    if (nextStartIndex < images.length) {
      setThumbnailStartIndex(nextStartIndex);
    } else {
      setThumbnailStartIndex(0);
    }
  };

  const showPreviousThumbnails = () => {
    const prevStartIndex = thumbnailStartIndex - thumbnailsPerPage;
    if (prevStartIndex >= 0) {
      setThumbnailStartIndex(prevStartIndex);
    } else {
      const totalPages = Math.ceil(images.length / thumbnailsPerPage);
      const lastPageStartIndex = (totalPages - 1) * thumbnailsPerPage;
      setThumbnailStartIndex(lastPageStartIndex);
    }
  };

  const getVisibleThumbnails = () => {
    return images.slice(
      thumbnailStartIndex,
      thumbnailStartIndex + thumbnailsPerPage,
    );
  };

  const hasMoreThumbnails = () => images.length > thumbnailsPerPage;
  const hasPreviousThumbnails = () => thumbnailStartIndex > 0;

  return (
    <div>
      <div className="overflow-hidden flex flex-col md:flex-row items-start">
        <div className="relative w-full md:p-4">
          <Image
            src={images[currentImageIndex]}
            alt={name}
            width={1200}
            height={600}
            className="w-full h-[300px] md:h-[470px] object-cover rounded-2xl"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-[4%] top-1/2 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 text-black p-2 md:p-3 rounded-xl hover:bg-opacity-70 cursor-pointer"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-[4%] top-1/2 transform -translate-y-1/2 bg-[#0064AE] bg-opacity-50 text-white p-2 md:p-3 rounded-xl hover:bg-opacity-70 cursor-pointer"
              >
                <FaArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        <div className="p-4 flex md:flex-col gap-2 overflow-x-auto min-w-max">
          {hasPreviousThumbnails() && (
            <button
              onClick={showPreviousThumbnails}
              className="w-16 h-16 md:w-48 md:h-36  rounded-2xl border-gray-300 bg-gray-100 backdrop-blur-xs hover:bg-gray-200 flex items-center justify-center cursor-pointer"
            >
              <span className="text-gray-600 text-sm md:text-lg">Previous</span>
            </button>
          )}

          {getVisibleThumbnails().map((image, index) => {
            const actualIndex = thumbnailStartIndex + index;
            const isLast = index === thumbnailsPerPage - 1;
            const isShowMorePosition =
              isLast &&
              hasMoreThumbnails() &&
              thumbnailStartIndex + thumbnailsPerPage < images.length;

            return (
              <div key={actualIndex} className="relative flex-shrink-0">
                <button
                  onClick={() => setCurrentImageIndex(actualIndex)}
                  className={`w-16 h-16 md:w-48 md:h-36  rounded-2xl border overflow-hidden cursor-pointer ${
                    actualIndex === currentImageIndex
                      ? 'border-[#0064AE]'
                      : 'border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${actualIndex + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </button>
                {isShowMorePosition && (
                  <div
                    className="absolute inset-0 backdrop-blur-xs rounded-2xl flex items-center justify-center cursor-pointer"
                    onClick={showMoreThumbnails}
                  >
                    <span className="text-white text-xs md:text-lg font-medium">
                      Show More
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsGallery;
