import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const isBoatsGroup = (src?: string | StaticImageData) => {
  if (typeof src === 'string') {
    return src.includes('boatsgroup.com');
  }
  return false;
};

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
          {/* Main Gallery Image Container with smooth Framer Motion Zoom-Fade Transition */}
          <div className="relative w-full h-[300px] md:h-[470px] overflow-hidden rounded-2xl bg-zinc-950 shadow-md border border-white/5">
            {/* Ambient Blurred Backdrop using the active image */}
            <div className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden rounded-2xl">
              <Image
                src={images[currentImageIndex]}
                alt="ambient background"
                fill
                priority
                unoptimized={isBoatsGroup(images[currentImageIndex])}
                referrerPolicy="no-referrer"
                className="object-cover blur-3xl scale-110 opacity-50 transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`${name} - Image ${currentImageIndex + 1} of ${images.length}`}
                  fill
                  priority
                  unoptimized={isBoatsGroup(images[currentImageIndex])}
                  referrerPolicy="no-referrer"
                  className="object-cover rounded-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-6 md:left-10 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md text-black p-2.5 md:p-3.5 rounded-full hover:bg-white transition-all active:scale-90 cursor-pointer shadow-lg z-10"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-6 md:right-10 top-1/2 transform -translate-y-1/2 bg-[#0064AE]/90 backdrop-blur-md text-white p-2.5 md:p-3.5 rounded-full hover:bg-[#0064AE] transition-all active:scale-90 cursor-pointer shadow-lg z-10"
              >
                <FaArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 bg-black/60 backdrop-blur-md text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold z-10 shadow-md">
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
              <div key={actualIndex} className="relative shrink-0">
                <button
                  onClick={() => setCurrentImageIndex(actualIndex)}
                  aria-label={`View image ${actualIndex + 1}`}
                  className={`w-16 h-16 md:w-48 md:h-36  rounded-2xl border overflow-hidden cursor-pointer ${
                    actualIndex === currentImageIndex
                      ? 'border-[#0064AE]'
                      : 'border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${actualIndex + 1}`}
                    width={192}
                    height={144}
                    unoptimized={isBoatsGroup(image)}
                    referrerPolicy="no-referrer"
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
