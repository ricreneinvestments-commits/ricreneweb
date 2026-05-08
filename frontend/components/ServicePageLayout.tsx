"use client";

import Link from "next/link";
import Image from "next/image";

const BRAND       = "#44B6E8";
const BRAND_DARK  = "#2A9FD4";
const BRAND_PALE  = "#EBF8FD";
const BRAND_LIGHT = "#D6F0FB";

export interface SubService {
  slug: string;
  title: string;
  description: string;
  features: readonly string[];
}

export interface RelatedService {
  title: string;
  href: string;
  icon: string;
}

export interface ServicePageData {
  title: string;
  tagline: string;
  icon: string;
  fullDescription: string;
  subServices: readonly SubService[];
  relatedServices: RelatedService[];

  // NEW
  heroImage?: string;
}

function Check() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BRAND }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ServicePageLayout({ data }: { data: ServicePageData }) {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND_PALE} 0%, white 60%, ${BRAND_LIGHT}30 100%)` }}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${BRAND}12` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-gray-700 transition-colors">Services</Link>
            <span>/</span>
            <span className="font-medium text-gray-700">{data.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: BRAND_PALE }}>
                  {data.icon}
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: BRAND_PALE, color: BRAND_DARK }}>
                  {data.tagline}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">{data.title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{data.fullDescription}</p>

              <div className="flex flex-wrap gap-3">
                <a href="#included"
                  onClick={(e) => { e.preventDefault(); document.getElementById("included")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  style={{ backgroundColor: BRAND }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}>
                  See What&apos;s Included
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <Link href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all text-gray-700 bg-white"
                  style={{ borderColor: BRAND_LIGHT }}
                  onMouseEnter={e => { (e.currentTarget.style.borderColor = BRAND); (e.currentTarget.style.backgroundColor = BRAND_PALE); }}
                  onMouseLeave={e => { (e.currentTarget.style.borderColor = BRAND_LIGHT); (e.currentTarget.style.backgroundColor = "white"); }}>
                  Get a Free Quote
                </Link>
              </div>
            </div>

            <div className="relative">
  <div
    className="absolute -top-10 -right-10 w-72 h-72 rounded-full blur-3xl"
    style={{ backgroundColor: `${BRAND}20` }}
  />

  <div
    className="relative overflow-hidden rounded-3xl border bg-white shadow-2xl"
    style={{ borderColor: BRAND_LIGHT }}
  >
    <Image
      src={data.heroImage || "/images/services/default-hero.png"}
      alt={data.title}
      width={1200}
      height={900}
      priority
      className="w-full h-auto object-cover"
    />
  </div>

  {/* Floating badge */}
  <div
    className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border"
    style={{ borderColor: BRAND_LIGHT }}
  >
    <p className="text-sm font-semibold text-gray-900">
      Custom Solutions
    </p>

    <p
      className="text-xs font-medium"
      style={{ color: BRAND }}
    >
      Built for Tanzanian businesses
    </p>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* ── What's Included ──────────────────────────────────────────────── */}
      <section id="included" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Everything Included</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Each item below is available as a standalone engagement or as part of a bundled package —
              scoped and priced around your exact needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.subServices.map((sub) => (
              <div key={sub.slug}
                className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-all group"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${BRAND}55`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "")}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: BRAND_PALE }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BRAND }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#44B6E8] transition-colors">
                  {sub.title}
                </h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{sub.description}</p>
                <ul className="space-y-2">
                  {sub.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                  style={{ color: BRAND }}
                  onMouseEnter={e => (e.currentTarget.style.color = BRAND_DARK)}
                  onMouseLeave={e => (e.currentTarget.style.color = BRAND)}>
                  Enquire about this
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: "🛡️", title: "Quality Guaranteed",
                body: "Every deliverable goes through rigorous quality checks before it reaches you. We don't ship work we aren't proud of." },
              { icon: "⚡", title: "Fast Turnaround",
                body: "We respect your timelines. Clear milestones, proactive communication, and on-time delivery — every time." },
              { icon: "🤝", title: "Long-term Partner",
                body: "We don't disappear after delivery. Training, documentation, and ongoing support are part of every engagement." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: BRAND_PALE }}>{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="py-16 mx-4 sm:mx-6 lg:mx-8 my-20 rounded-3xl"
        style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})` }}>
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-8 text-lg leading-relaxed">
            Tell us about your project and we&apos;ll put together the right solution and clear pricing —
            free consultation, zero obligation.
          </p>
          <Link href="/#contact"
            className="inline-flex items-center gap-2 bg-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg text-base"
            style={{ color: BRAND_DARK }}>
            Get a Free Quote
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Related services ─────────────────────────────────────────────── */}
      {data.relatedServices.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore Our Other Services</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {data.relatedServices.map((rel) => (
                <Link key={rel.href} href={rel.href}
                  className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:shadow-md transition-all"
                  onMouseEnter={e => { (e.currentTarget.style.borderColor = BRAND); (e.currentTarget.style.color = BRAND); }}
                  onMouseLeave={e => { (e.currentTarget.style.borderColor = ""); (e.currentTarget.style.color = ""); }}>
                  <span>{rel.icon}</span>
                  {rel.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}