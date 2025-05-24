// hooks/use-analytics.tsx
"use client";

import { useCallback } from "react";
import {
  trackUserEngagement,
  trackConversion,
  trackFormSubmission,
  trackFinanceEvent,
} from "@/lib/analytics";

export function useAnalytics() {
  // Track feature interactions
  const trackFeature = useCallback(
    (
      feature:
        | "budget_tracker"
        | "expense_tracker"
        | "account_transfer"
        | "statistics"
        | "preregister"
    ) => {
      trackUserEngagement(feature);
    },
    []
  );

  // Track button clicks
  const trackButtonClick = useCallback(
    (buttonName: string, section: string) => {
      trackFinanceEvent("button_click", {
        feature_used: buttonName,
        page_section: section,
        user_action: "click",
      });
    },
    []
  );

  // Track form interactions
  const trackForm = useCallback(
    (formType: string, action: "start" | "submit" | "error") => {
      if (action === "submit") {
        trackFormSubmission(formType);
        trackConversion("preregister_submit");
      } else {
        trackFinanceEvent("form_interaction", {
          feature_used: formType,
          user_action: action,
        });
      }
    },
    []
  );

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    trackFinanceEvent("scroll_depth", {
      value: depth,
      user_action: "scroll",
    });
  }, []);

  // Track time on page
  const trackTimeOnPage = useCallback((seconds: number) => {
    trackFinanceEvent("time_on_page", {
      value: seconds,
      user_action: "engagement",
    });
  }, []);

  // Track section views
  const trackSectionView = useCallback((sectionName: string) => {
    trackFinanceEvent("section_view", {
      page_section: sectionName,
      user_action: "view",
    });
  }, []);

  // Track download attempts
  const trackDownload = useCallback(() => {
    trackConversion("download_attempt");
    trackFinanceEvent("download_intent", {
      user_action: "download_click",
    });
  }, []);

  return {
    trackFeature,
    trackButtonClick,
    trackForm,
    trackScrollDepth,
    trackTimeOnPage,
    trackSectionView,
    trackDownload,
  };
}
