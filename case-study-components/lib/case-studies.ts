export type Metric = {
  value: string
  label: string
}

export type CaseStudy = {
  slug: string
  client: string
  title: string
  summary: string
  category: string
  industry: string
  image: string
  accentLogo: string
  metrics: Metric[]
  featured?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-fintech",
    client: "Northwind",
    title: "Rebuilding a payments platform that scales to millions",
    summary:
      "We helped Northwind re-architect their core ledger and ship a redesigned dashboard, cutting settlement times from days to seconds.",
    category: "Platform Engineering",
    industry: "Fintech",
    image: "/case-fintech.png",
    accentLogo: "NW",
    featured: true,
    metrics: [
      { value: "98%", label: "Faster settlement" },
      { value: "3.4x", label: "Revenue growth" },
      { value: "12M+", label: "Transactions / day" },
    ],
  },
  {
    slug: "lumen-commerce",
    client: "Lumen",
    title: "A headless storefront that converts on every device",
    summary:
      "A complete commerce replatform with a mobile-first checkout that lifted conversion and slashed page load times.",
    category: "E-Commerce",
    industry: "Retail",
    image: "/case-commerce.png",
    accentLogo: "LM",
    metrics: [
      { value: "+42%", label: "Conversion rate" },
      { value: "0.8s", label: "Avg. load time" },
      { value: "+27%", label: "Mobile revenue" },
    ],
  },
  {
    slug: "vitala-health",
    client: "Vitala",
    title: "Bringing clinical data into one trusted interface",
    summary:
      "We unified fragmented patient records into a single, compliant platform that clinicians actually enjoy using.",
    category: "Product Design",
    industry: "Healthcare",
    image: "/case-health.png",
    accentLogo: "VT",
    metrics: [
      { value: "60%", label: "Less admin time" },
      { value: "99.99%", label: "Uptime" },
      { value: "4.9/5", label: "Clinician rating" },
    ],
  },
  {
    slug: "atlas-logistics",
    client: "Atlas",
    title: "Real-time fleet visibility across three continents",
    summary:
      "An operations platform that tracks every shipment live, helping Atlas cut delivery delays and fuel waste.",
    category: "Data & Infrastructure",
    industry: "Logistics",
    image: "/case-logistics.png",
    accentLogo: "AT",
    metrics: [
      { value: "-31%", label: "Delivery delays" },
      { value: "18%", label: "Lower fuel cost" },
      { value: "150K", label: "Routes optimized" },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
