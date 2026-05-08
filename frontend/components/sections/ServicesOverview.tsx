"use client";

import { useState } from "react";

// ── Brand colors ──────────────────────────────────────────────────────────────
const BRAND = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_PALE = "#EBF8FD";
const BRAND_LIGHT = "#D6F0FB";

// ── Service definitions ───────────────────────────────────────────────────────

const services = [
  {
    id: "web",
    icon: "🌐",
    title: "Website Design & Maintenance",
    tagline: "Your complete digital front door",
    description:
      "We build fast, beautiful websites that represent your brand professionally. From first-time domain registration through to ongoing maintenance, we handle every layer of your online presence.",
    subServices: [
      { name: "Website Design & Development", desc: "Custom websites built to convert visitors into customers" },
      { name: "Domain Registration",           desc: "Secure the perfect domain name for your brand"             },
      { name: "Web Hosting",                   desc: "Reliable, fast hosting with 99.9% uptime guarantee"        },
      { name: "Custom Business Emails",        desc: "Professional email addresses that match your domain"       },
      { name: "SEO Optimization",              desc: "Rank higher on Google and attract organic traffic"         },
      { name: "Website Maintenance & Support", desc: "Security updates, backups, and ongoing improvements"       },
    ],
    cta: { label: "Explore Web Solutions", href: "/services/website-design" },
    stat: { value: "500+", label: "Sites Delivered" },
  },
  {
    id: "photo",
    icon: "📸",
    title: "Photography & Media Production",
    tagline: "Capture every moment, amplify every story",
    description:
      "From boardroom headshots to live-streamed concerts, our media team covers every visual need your brand has. We combine technical excellence with creative storytelling to produce content that resonates.",
    subServices: [
      { name: "Professional Photoshoots",      desc: "Corporate, product, and lifestyle photography"            },
      { name: "Events Photography Coverage",   desc: "Full event documentation from arrival to closing ceremony" },
      { name: "Live Streaming",                desc: "Broadcast your events to global audiences in real time"    },
      { name: "Video Production",              desc: "Promotional videos, documentaries, and brand films"        },
      { name: "Digital Marketing",             desc: "Targeted campaigns that convert attention into revenue"     },
      { name: "Digital Invitation Cards",      desc: "Elegant digital invitations for weddings, corporate events & more" },
    ],
    cta: { label: "Explore Media Services", href: "/services/photoshoots" },
    stat: { value: "1,200+", label: "Events Covered" },
  },
  {
    id: "print",
    icon: "🖨️",
    title: "Printing Services",
    tagline: "If it can be printed, we can print it",
    description:
      "Our full-range printing facility handles everything from branded T-shirts and coffee cups to company books and billboard banners. High-quality output, fast turnaround, competitive pricing.",
    subServices: [
      { name: "Branded Merchandise",           desc: "T-shirts, caps, mugs, tote bags, and more"                },
      { name: "Business Cards & Stationery",   desc: "Premium cards, letterheads, and office materials"         },
      { name: "Large Format Printing",         desc: "Banners, roll-ups, posters, and outdoor signage"           },
      { name: "Books & Publications",          desc: "Magazines, company reports, catalogues, and manuals"       },
      { name: "Promotional Materials",         desc: "Brochures, flyers, leaflets, and event collateral"         },
      { name: "Custom Packaging & Labels",     desc: "Branded packaging solutions for products"                  },
    ],
    cta: { label: "Get a Print Quote", href: "/services/branded-merchandise" },
    stat: { value: "50+", label: "Print Categories" },
  },
  {
    id: "automation",
    icon: "⚙️",
    title: "Business Automation",
    tagline: "Custom systems built around how you work",
    description:
      "We design and develop tailor-made software systems that eliminate manual processes, reduce errors, and scale with your business. From POS terminals to full enterprise platforms — we build it.",
    subServices: [
      { name: "Point of Sale (POS) Systems",   desc: "Smart, fast POS for retail, restaurants, and hospitality"  },
      { name: "E-Commerce Platforms",          desc: "Full-featured online stores with payment integration"       },
      { name: "School Management Systems",     desc: "Admissions, academics, fees, and parent communication"     },
      { name: "Hospital & Clinic Systems",     desc: "Patient records, appointments, billing, and pharmacy"       },
      { name: "Financial & Accounting Systems",desc: "Invoicing, payroll, reporting, and tax management"          },
      { name: "Custom Enterprise Platforms",   desc: "Bespoke solutions for any industry and any scale"           },
    ],
    cta: { label: "Explore Business Systems", href: "/services/pos-systems" },
    stat: { value: "80+", label: "Systems Built" },
  },
  {
    id: "data",
    icon: "📊",
    title: "Data Intelligence",
    tagline: "Turn raw data into competitive advantage",
    description:
      "We help businesses understand what their data is telling them. From real-time dashboards to in-depth analytics and database architecture, we provide the intelligence layer your decisions deserve.",
    subServices: [
      { name: "Business Intelligence Dashboards", desc: "Live, interactive dashboards for every department"      },
      { name: "Data Analytics & Reporting",       desc: "Identify trends, opportunities, and risks in your data" },
      { name: "Database Design & Management",     desc: "Scalable, optimised databases built for growth"         },
      { name: "Data Migration & Integration",     desc: "Connect disparate systems into a single source of truth" },
      { name: "Predictive Analytics",             desc: "Forecast demand, churn, and business outcomes"           },
      { name: "Data Strategy Consulting",         desc: "Roadmaps for becoming a truly data-driven organisation"  },
    ],
    cta: { label: "Explore Data Services", href: "/services/bi-dashboards" },
    stat: { value: "40+", label: "Analytics Projects" },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function ServicesOverview() {
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: BRAND_PALE, color: BRAND_DARK }}
          >
            What We Do
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Five Pillars of Digital Growth
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Every service we offer is designed to move your business forward — whether you&apos;re just starting out or scaling fast.
          </p>
        </div>

        {/* Service tabs — horizontal pill selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {services.map((svc, idx) => (
            <button
              key={svc.id}
              onClick={() => setActiveService(idx)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={
                activeService === idx
                  ? { backgroundColor: BRAND, color: "white", boxShadow: `0 4px 14px ${BRAND}40` }
                  : { backgroundColor: "#F9FAFB", color: "#374151" }
              }
              onMouseEnter={e => {
                if (activeService !== idx) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = BRAND_PALE;
                  (e.currentTarget as HTMLElement).style.color = BRAND_DARK;
                }
              }}
              onMouseLeave={e => {
                if (activeService !== idx) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAFB";
                  (e.currentTarget as HTMLElement).style.color = "#374151";
                }
              }}
            >
              <span>{svc.icon}</span>
              <span className="hidden sm:inline">{svc.title.split(" ").slice(0, 2).join(" ")}</span>
              <span className="sm:hidden">{svc.icon}</span>
            </button>
          ))}
        </div>

        {/* Active service panel */}
        <div
          key={active.id}
          className="grid lg:grid-cols-2 gap-10 items-start p-8 lg:p-12 rounded-3xl border border-gray-100 bg-gray-50/50 transition-all"
        >
          {/* Left: description + sub-services */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: BRAND_PALE }}
              >
                {active.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: BRAND }}>
                  {active.tagline}
                </p>
                <h3 className="text-xl font-bold text-gray-900">{active.title}</h3>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-sm lg:text-base">
              {active.description}
            </p>

            <div className="flex items-center gap-6">
              <a
                href={active.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                {active.cta.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <div>
                <p className="text-2xl font-bold text-gray-900">{active.stat.value}</p>
                <p className="text-xs text-gray-500">{active.stat.label}</p>
              </div>
            </div>
          </div>

          {/* Right: sub-service grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {active.subServices.map((sub) => (
              <div
                key={sub.name}
                className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#44B6E8]/40 transition-all group hover:shadow-sm"
              >
                <div
                  className="w-5 h-5 rounded-full mb-2"
                  style={{ backgroundColor: BRAND_LIGHT }}
                />
                <p className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#44B6E8] transition-colors">
                  {sub.name}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 mb-4 text-sm">
            Not sure which service fits your needs?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all"
            style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})` }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Let&apos;s Talk — Free Consultation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}