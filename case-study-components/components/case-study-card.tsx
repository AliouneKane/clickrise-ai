import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies"

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={study.image || "/placeholder.svg"}
          alt={`${study.client} case study cover`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          {study.industry}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="text-primary">{study.client}</span>
          <span aria-hidden>•</span>
          <span>{study.category}</span>
        </div>

        <h3 className="text-balance text-lg font-semibold leading-snug text-card-foreground">
          {study.title}
        </h3>

        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {study.summary}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-primary">
          Read case study
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
