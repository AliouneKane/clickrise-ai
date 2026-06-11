import { caseStudies } from "@/lib/case-studies"
import { CaseStudyCard } from "@/components/case-study-card"

export function CaseStudyGrid() {
  const studies = caseStudies
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Case studies
          </p>
          <h2 className="mt-2 text-balance text-3xl font-semibold text-foreground md:text-4xl">
            Work we&apos;re proud to put our name on
          </h2>
        </div>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          A selection of partnerships where design, engineering, and strategy
          came together to ship something measurable.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </section>
  )
}
