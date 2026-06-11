import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { caseStudies, getCaseStudy } from "@/lib/case-studies"
import { MetricsBand } from "@/components/metrics-band"

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All case studies
        </Link>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pb-10 pt-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="text-primary">{study.client}</span>
          <span aria-hidden>•</span>
          <span>{study.industry}</span>
          <span aria-hidden>•</span>
          <span>{study.category}</span>
        </div>
        <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          {study.summary}
        </p>
      </header>

      {/* Cover */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          <img
            src={study.image || "/placeholder.svg"}
            alt={`${study.client} case study cover`}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-10 leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              The challenge
            </h2>
            <p className="text-pretty">
              {study.client} came to us with growing pains familiar to any fast
              scaling company: systems that worked at small scale were beginning
              to crack. Their teams needed a foundation that could grow with the
              business without slowing down delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              What we did
            </h2>
            <p className="text-pretty">
              Working as an embedded team, we mapped the existing architecture,
              identified the highest-leverage bottlenecks, and shipped
              improvements in tight, measurable increments. Every decision was
              validated against real usage data and close collaboration with
              {" "}
              {study.client}&apos;s engineers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              The results
            </h2>
            <p className="text-pretty">
              The outcome was a faster, more reliable product that the team can
              keep building on with confidence. The numbers below tell the story
              better than we can.
            </p>
          </section>
        </div>

        <blockquote className="mt-12 rounded-xl border-l-2 border-primary bg-secondary/40 p-6">
          <p className="text-pretty text-lg font-medium leading-relaxed text-foreground">
            &ldquo;This partnership changed how we ship. We move faster and sleep
            better knowing the foundation is solid.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">
            VP of Engineering, {study.client}
          </footer>
        </blockquote>
      </article>

      <MetricsBand
        metrics={study.metrics}
        heading={`The numbers behind ${study.client}`}
        description="Measurable outcomes delivered over the course of the engagement."
      />
    </main>
  )
}
