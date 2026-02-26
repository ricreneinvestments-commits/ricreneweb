// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ricrene.co.tz";
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services/web-development`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/domain-hosting`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/website-maintenance`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Add more service pages as you create them:
    {
       url: `${baseUrl}/services/custom-systems`,
       lastModified: currentDate,
       changeFrequency: "monthly",
       priority: 0.8,
     },
     {
       url: `${baseUrl}/services/data-analysis`,
       lastModified: currentDate,
       changeFrequency: "monthly",
       priority: 0.8,
     },
    {
      url: `${baseUrl}/services/corporate-email`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
     {
       url: `${baseUrl}/services/seo-digital-marketing`,
       lastModified: currentDate,
       changeFrequency: "monthly",
       priority: 0.8,
     },
    {
      url: `${baseUrl}/services/digital-solutions`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
        {
       url: `${baseUrl}/services/video-production`,
       lastModified: currentDate,
       changeFrequency: "monthly",
       priority: 0.8,
     },

  ];
}