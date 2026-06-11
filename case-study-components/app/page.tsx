import { caseStudies } from "@/lib/case-studies"
import { FeaturedCaseStudy } from "@/components/featured-case-study"
import { CaseStudyGrid } from "@/components/case-study-grid"
import { MetricsBand } from "@/components/metrics-band"

export default function Page() {
  const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-20 md:pt-28">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Our impact
        </p>
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
          Case studies from teams shipping at the edge
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          We partner with ambitious companies to design, build, and scale the
          products their customers rely on every day. Here&apos;s the proof.
        </p>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <FeaturedCaseStudy study={featured} />
      </section>

      {/* Grid */}
      <CaseStudyGrid />

      {/* Metrics */}
      <MetricsBand />
    </main>
  )
}
