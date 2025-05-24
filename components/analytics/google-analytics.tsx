// components/analytics/google-analytics.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview, GA_MEASUREMENT_ID } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: 'Moneo - Personal Finance App',
              page_location: window.location.href,
              content_group1: 'Finance App',
              content_group2: 'Personal Finance',
              custom_parameter_1: 'moneo_web_app',
              send_page_view: true,
              allow_google_signals: true,
              allow_ad_personalization_signals: true
            });

            // Enhanced ecommerce events for finance app
            gtag('config', '${GA_MEASUREMENT_ID}', {
              custom_map: {
                'dimension1': 'user_type',
                'dimension2': 'feature_used',
                'dimension3': 'page_section'
              }
            });
          `,
        }}
      />
    </>
  );
}
