// lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics Configuration
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      custom_map: {
        custom_parameter: "moneo_finance_app",
      },
    });
  }
};

// Track events
export const event = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      custom_parameter: "moneo_finance_tracking",
    });
  }
};

// Track custom events for finance app
export const trackFinanceEvent = (
  eventName: string,
  parameters: {
    feature_used?: string;
    user_action?: string;
    page_section?: string;
    value?: number;
  }
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...parameters,
      app_name: "moneo_finance",
      app_version: "1.0.0",
    });
  }
};

// Track user engagement for finance features
export const trackUserEngagement = (
  feature:
    | "budget_tracker"
    | "expense_tracker"
    | "account_transfer"
    | "statistics"
    | "preregister"
) => {
  trackFinanceEvent("user_engagement", {
    feature_used: feature,
    user_action: "interaction",
  });
};

// Track conversion events
export const trackConversion = (
  action: "preregister_submit" | "download_attempt" | "feature_view"
) => {
  trackFinanceEvent("conversion", {
    user_action: action,
    value: 1,
  });
};

// Track form submissions
export const trackFormSubmission = (formType: string) => {
  trackFinanceEvent("form_submit", {
    user_action: "submit",
    feature_used: formType,
  });
};
