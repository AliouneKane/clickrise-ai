import { m as motion } from 'motion/react';
import { Zap, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  image: string;
  sector: string;
  status: 'live' | 'in-progress';
  statusDisplay: string;
  title: string;
  problem: string;
  result: string;
  stack: string[];
  ctaLabel: string;
  stackLabel: string;
  onCtaClick?: () => void;
  className?: string;
}

export const ProjectCard = ({
  image,
  sector,
  status,
  statusDisplay,
  title,
  problem,
  result,
  stack,
  ctaLabel,
  stackLabel,
  onCtaClick,
  className,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white hover:border-black/20 hover:shadow-lg transition-[border-color,box-shadow]',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Avatar row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-medium text-black/60">Clickrise</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-black/40">
            <span className={cn('w-1.5 h-1.5 rounded-full', status === 'live' ? 'bg-emerald-500' : 'bg-black/25')} />
            {statusDisplay}
          </span>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">{sector}</p>

        <h3 className="text-base font-display font-bold leading-snug text-black">{title}</h3>
        <p className="text-sm leading-relaxed text-black/45">{problem}</p>
        <p className="flex items-start gap-1.5 text-sm font-semibold leading-relaxed text-black">
          <ArrowUpRight className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
          {result}
        </p>

        <button
          onClick={onCtaClick}
          className="mt-1 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-black/[0.04] cursor-pointer"
        >
          {ctaLabel}
        </button>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-3">
          <span className="text-xs font-medium text-black/35 shrink-0">{stackLabel}</span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {stack.map((tech) => (
              <span key={tech} className="text-[11px] bg-black/[0.04] border border-black/[0.06] px-2.5 py-1 rounded-full text-black/55">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
