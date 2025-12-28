'use client';

import { useEffect, useRef, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  number: number;
}

interface HtmlContentWithTocProps {
  htmlContent: string;
  title?: string;
  className?: string;
}

const HtmlContentWithToc = ({
  htmlContent,
  title,
  className = '',
}: HtmlContentWithTocProps) => {
  const [processedHtml, setProcessedHtml] = useState<string | null>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!htmlContent) return;

    const { processed, toc } = processHtmlContent(htmlContent, title);
    setProcessedHtml(processed);
    setTocItems(toc);
  }, [htmlContent, title]);

  // Process HTML to add IDs to H2 tags and extract TOC
  const processHtmlContent = (html: string, pageTitle?: string) => {
    const toc: TocItem[] = [];
    let sectionCounter = 0;
    let processedHtml = html;

    // Add title at the beginning if provided
    if (pageTitle) {
      processedHtml = `<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">${pageTitle}</h1>${processedHtml}`;
    }

    // Process H1 tags - keep "Effective Date" and intro content, convert others to H2 sections
    const h1Regex = /<h1[^>]*>(.*?)<\/h1>/gi;
    const h1Matches = Array.from(processedHtml.matchAll(h1Regex));

    h1Matches.forEach((match) => {
      const content = match[1];
      const textContent = content.replace(/<[^>]*>/g, '').trim();
      const fullMatch = match[0];

      // Keep "Effective Date" and "Last Updated" as styled H1 (title format)
      if (
        textContent.toLowerCase().includes('effective date') ||
        textContent.toLowerCase().includes('last updated')
      ) {
        const replacement = `<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${content}</h1>`;
        processedHtml = processedHtml.replace(fullMatch, replacement);
        return;
      }

      // Skip if it's the title we just added
      if (pageTitle && textContent === pageTitle) {
        return;
      }

      // Convert other H1 to numbered H2 sections
      sectionCounter++;
      const id = `section-${sectionCounter}`;

      toc.push({
        id,
        text: textContent,
        number: sectionCounter,
      });

      const replacement = `<h2 id="${id}" class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8 scroll-mt-20">${sectionCounter}. ${content}</h2>`;
      processedHtml = processedHtml.replace(fullMatch, replacement);
    });

    // Process H2 tags - convert to numbered sections if not already processed
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const h2Matches = Array.from(processedHtml.matchAll(h2Regex));

    h2Matches.forEach((match) => {
      const content = match[1];
      const textContent = content.replace(/<[^>]*>/g, '').trim();
      const fullMatch = match[0];

      // Skip if already has an ID (already processed)
      if (fullMatch.includes('id=')) {
        return;
      }

      // Convert to numbered section
      sectionCounter++;
      const id = `section-${sectionCounter}`;

      toc.push({
        id,
        text: textContent,
        number: sectionCounter,
      });

      const replacement = `<h2 id="${id}" class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8 scroll-mt-20">${sectionCounter}. ${content}</h2>`;
      processedHtml = processedHtml.replace(fullMatch, replacement);
    });

    // Style all HTML elements comprehensively
    processedHtml = processedHtml
      // Style paragraphs
      .replace(
        /<p(?![^>]*class)/g,
        '<p class="text-gray-700 text-base md:text-lg leading-relaxed mb-4"',
      )
      // Style headings (H3, H4, H5, H6)
      .replace(
        /<h3(?![^>]*class)/g,
        '<h3 class="text-xl font-semibold text-gray-800 mb-3 mt-6"',
      )
      .replace(
        /<h4(?![^>]*class)/g,
        '<h4 class="text-lg font-semibold text-gray-800 mb-2 mt-4"',
      )
      .replace(
        /<h5(?![^>]*class)/g,
        '<h5 class="text-base font-semibold text-gray-800 mb-2 mt-4"',
      )
      .replace(
        /<h6(?![^>]*class)/g,
        '<h6 class="text-sm font-semibold text-gray-800 mb-2 mt-4"',
      )
      // Style lists
      .replace(
        /<ul(?![^>]*class)/g,
        '<ul class="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4"',
      )
      .replace(
        /<ol(?![^>]*class)/g,
        '<ol class="list-decimal list-inside space-y-2 text-gray-700 mb-4 ml-4"',
      )
      .replace(/<li(?![^>]*class)/g, '<li class="mb-1"')
      // Style links
      .replace(
        /<a(?![^>]*class)/g,
        '<a class="text-primary hover:text-[#0052CC] underline"',
      )
      // Style strong/bold
      .replace(
        /<strong(?![^>]*class)/g,
        '<strong class="font-bold text-gray-900"',
      )
      .replace(/<b(?![^>]*class)/g, '<b class="font-bold text-gray-900"')
      // Style emphasis/italic
      .replace(/<em(?![^>]*class)/g, '<em class="italic"')
      .replace(/<i(?![^>]*class)/g, '<i class="italic"')
      // Style blockquote
      .replace(
        /<blockquote(?![^>]*class)/g,
        '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4"',
      )
      // Style code
      .replace(
        /<code(?![^>]*class)/g,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm"',
      )
      .replace(
        /<pre(?![^>]*class)/g,
        '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"',
      )
      // Style images
      .replace(/<img(?![^>]*class)/g, '<img class="rounded-lg w-full mb-4"')
      // Style tables
      .replace(
        /<table(?![^>]*class)/g,
        '<table class="w-full border-collapse border border-gray-300 mb-4"',
      )
      .replace(
        /<th(?![^>]*class)/g,
        '<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-bold"',
      )
      .replace(
        /<td(?![^>]*class)/g,
        '<td class="border border-gray-300 px-4 py-2"',
      )
      // Style divs (if needed)
      .replace(/<div(?![^>]*class)/g, '<div class="mb-4"');

    return {
      processed: processedHtml,
      toc,
    };
  };

  // Scroll detection for active section
  useEffect(() => {
    if (!processedHtml || tocItems.length === 0) return;

    const handleScroll = () => {
      const sections = tocItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [processedHtml, tocItems]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!processedHtml) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 py-10 md:py-16 ${className}`}
    >
      {/* Left Column - Main Content */}
      <div className="lg:col-span-3 space-y-6">
        <div
          ref={contentRef}
          className="space-y-6 wrap-break-word overflow-wrap-anywhere"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </div>

      {/* Right Column - Table of Contents */}
      {tocItems.length > 0 && (
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Table of Contents
            </h3>
            <nav className="space-y-2">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-2 py-2 transition-colors text-sm ${
                    activeSection === item.id
                      ? 'font-bold text-gray-900'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.number}. {item.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default HtmlContentWithToc;
