import type { Metric } from "@/lib/case-studies"

const defaultMetrics: Metric[] = [
  { value: "200+", label: "Projects shipped" },
  { value: "4.2x", label: "Avg. ROI delivered" },
  { value: "98%", label: "Client retention" },
  { value: "30+", label: "Industries served" },
]

export function MetricsBand({
  metrics = defaultMetrics,
  heading = "Outcomes that move the needle",
  description = "We measure success by the results our partners ship to production.",
}: {
  metrics?: Metric[]
  heading?: string
  description?: string
}) {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <dd className="text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                {metric.value}
              </dd>
              <dt className="text-sm text-muted-foreground">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
