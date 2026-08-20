import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerCardItem {
  id: string | number;
  render: (isCenter: boolean) => React.ReactNode;
}

interface StaggerCardProps {
  position: number;
  item: StaggerCardItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const StaggerCard: React.FC<StaggerCardProps> = ({ position, item, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer border p-7 sm:p-8 transition-all duration-500 ease-in-out',
        isCenter
          ? 'z-10 bg-black text-white border-black'
          : 'z-0 bg-white text-black border-black/10 hover:border-black/25'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          'polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? '0px 8px 0px 4px rgba(0,0,0,0.08)' : '0px 0px 0px 0px transparent',
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-black/10"
        style={{ right: -1, top: 39, width: SQRT_5000, height: 1 }}
      />
      <div className="h-full">{item.render(isCenter)}</div>
    </div>
  );
};

interface StaggerTestimonialsProps {
  items: StaggerCardItem[];
  className?: string;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ items, className = '' }) => {
  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState(items);

  useEffect(() => {
    setList(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleMove = (steps: number) => {
    setList((prev) => {
      const next = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const first = next.shift();
          if (!first) return prev;
          next.push(first);
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const last = next.pop();
          if (!last) return prev;
          next.unshift(last);
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 340 : 280);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className={cn('relative w-full', className)} style={{ height: cardSize + 130 }}>
      {list.map((item, index) => {
        const position = list.length % 2
          ? index - (list.length + 1) / 2
          : index - list.length / 2;
        return (
          <StaggerCard key={item.id} item={item} handleMove={handleMove} position={position} cardSize={cardSize} />
        );
      })}

      {list.length > 1 && (
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            onClick={() => handleMove(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center border border-black/10 bg-white hover:bg-black hover:text-white hover:border-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleMove(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center border border-black/10 bg-white hover:bg-black hover:text-white hover:border-black transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
