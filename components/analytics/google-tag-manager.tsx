// components/analytics/google-tag-manager.tsx
"use client";

import { GTM_ID } from "@/lib/analytics";

interface GoogleTagManagerProps {
  noscript?: boolean;
}

export default function GoogleTagManager({
  noscript = false,
}: GoogleTagManagerProps) {
  if (!GTM_ID) {
    return null;
  }

  if (noscript) {
    return (
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    );
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
          
          // Enhanced data layer for finance app
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'app_name': 'moneo_finance',
            'app_version': '1.0.0',
            'page_type': 'landing_page',
            'content_category': 'personal_finance',
            'user_type': 'visitor'
          });
        `,
      }}
    />
  );
}
