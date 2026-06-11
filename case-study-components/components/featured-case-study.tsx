import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies"

export function FeaturedCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[16/11] overflow-hidden bg-muted lg:aspect-auto">
          <img
            src={study.image || "/placeholder.svg"}
            alt={`${study.client} featured case study`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary">
              Featured
            </span>
            <span>{study.industry}</span>
          </div>

          <h2 className="text-balance text-2xl font-semibold leading-tight text-card-foreground md:text-3xl">
            {study.title}
          </h2>

          <p className="text-pretty leading-relaxed text-muted-foreground">
            {study.summary}
          </p>

          <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <dt className="order-2 text-xs text-muted-foreground">
                  {metric.label}
                </dt>
                <dd className="order-1 text-2xl font-semibold text-primary md:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href={`/case-studies/${study.slug}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            View the full story
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
