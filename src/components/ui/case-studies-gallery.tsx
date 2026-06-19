import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface GalleryItem {
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  onCtaClick?: () => void;
}

interface CaseStudiesGalleryProps {
  items: GalleryItem[];
}

export const CaseStudiesGallery = ({ items }: CaseStudiesGalleryProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    const amount = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - el.scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < items.length - 1;

  return (
    <div className="w-full">
      <div className="hidden md:flex justify-end gap-2 mb-5">
        <button
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollPrev}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-black hover:bg-black/[0.04] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Précédent"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          disabled={!canScrollNext}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-black hover:bg-black/[0.04] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Suivant"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={item.onCtaClick}
            className="group relative shrink-0 snap-start text-left w-[280px] md:w-[320px] lg:w-[360px] min-h-[27rem] md:aspect-[5/4] lg:aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
              <h3 className="text-lg md:text-xl font-display font-bold leading-snug mb-2">{item.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed line-clamp-2 mb-6">{item.description}</p>
              <span className="inline-flex items-center text-sm font-semibold">
                {item.ctaLabel}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={cn('h-2 w-2 rounded-full transition-colors cursor-pointer', activeIndex === i ? 'bg-black' : 'bg-black/15')}
            aria-label={`Aller à la diapositive ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
