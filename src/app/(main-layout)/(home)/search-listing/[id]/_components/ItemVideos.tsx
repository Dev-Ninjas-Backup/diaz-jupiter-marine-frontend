import { BoatVideo } from '@/types/product-types';

const getYouTubeEmbedUrl = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const ItemVideos = ({ videos }: { videos: BoatVideo[] }) => {
  if (!videos?.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video, i) => {
          const embedUrl = getYouTubeEmbedUrl(video.url);
          return (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-gray-100 aspect-video"
            >
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title || `Video ${i + 1}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full text-sm text-blue-600 underline p-4"
                >
                  {video.title || 'Watch Video'}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemVideos;
