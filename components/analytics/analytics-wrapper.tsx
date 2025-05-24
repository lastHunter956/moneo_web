// components/analytics/analytics-wrapper.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load analytics components for better performance
const GoogleAnalytics = dynamic(() => import("./google-analytics"), {
  ssr: false,
});

const GoogleTagManager = dynamic(() => import("./google-tag-manager"), {
  ssr: false,
});

export default function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
      <GoogleTagManager />
    </Suspense>
  );
}
