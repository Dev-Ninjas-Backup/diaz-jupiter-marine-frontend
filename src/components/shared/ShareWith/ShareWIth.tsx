'use client';
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { MdContentCopy, MdEmail } from 'react-icons/md';
import { toast } from 'sonner';

interface ShareWIthProps {
  title?: string;
  description?: string;
}

const ShareWIth: React.FC<ShareWIthProps> = ({ title, description }) => {
  const [copied, setCopied] = useState(false);
  console.log(copied);

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : 'https://floridayachttrader.com/boat-details/2011-viking-44';

  const fallbackTitle =
    typeof document !== 'undefined' && document.title
      ? document.title
      : 'Jupiter Marine Sales';

  const shareTitle = title ?? fallbackTitle;
  const shareText =
    description ??
    (title
      ? `Check out this article: ${title}`
      : 'Check out this boat listing!');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Share handlers
  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      shareText + ' ' + shareUrl,
    )}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl,
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-5 pb-6">
      <h2 className="text-lg md:text-xl font-semibold text-black pb-4 text-left">
        Share with
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="flex-1 min-w-0 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3">
          <span className="md:flex-1 text-sm text-gray-500 md:truncate">
            {shareUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-2 py-2 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            title="Copy link"
          >
            <MdContentCopy size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleWhatsAppShare}
            className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center transition-colors"
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className="text-white" size={24} />
          </button>

          <button
            onClick={handleFacebookShare}
            className="w-12 h-12 rounded-full bg-[#1877F2] hover:bg-[#0d65d9] flex items-center justify-center transition-colors"
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <FaFacebookF className="text-white" size={24} />
          </button>

          <button
            onClick={handleTwitterShare}
            className="w-12 h-12 rounded-full bg-[#1DA1F2] hover:bg-[#0d8bd9] flex items-center justify-center transition-colors"
            title="Share on Twitter"
            aria-label="Share on Twitter"
          >
            <FaTwitter className="text-white" size={24} />
          </button>

          <button
            onClick={handleEmailShare}
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition-colors"
            title="Share via Email"
            aria-label="Share via Email"
          >
            <MdEmail className="text-white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareWIth;
