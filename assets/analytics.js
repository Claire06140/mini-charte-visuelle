(function () {
  "use strict";

  const schemas = Object.freeze({
    landing_viewed: { entry: ["direct"] },
    tool_opened: { entry: ["landing", "guide", "direct", "shared"], mode: ["diagnostic", "free", "shared"] },
    diagnostic_started: {}, diagnostic_completed: {}, diagnostic_skipped: {},
    preset_selected: { preset: ["rassurant", "expert", "creatif", "premium", "accessible", "energique", "minimal", "artisanal"], origin: ["manual", "diagnostic", "comparison"] },
    category_changed: { category: ["colors", "fonts", "visuals", "texts"] },
    preview_viewed: { preview: ["site", "post", "offer"] },
    variant_saved: { variant: ["a", "b"], action: ["created", "replaced"] },
    comparison_opened: {}, direction_chosen: { variant: ["a", "b"] },
    result_copied: {}, print_started: {}, share_link_copied: {},
    shared_direction_opened: {}, shared_direction_cloned: {},
    feedback_context_answered: { answer: ["identity", "site", "social", "offer", "undecided"] },
    feedback_next_step_answered: { answer: ["save", "formats", "canva", "compare", "validate", "done"] }
  });

  const sensitiveProperties = new Set(["$current_url", "$initial_current_url", "$referrer", "$initial_referrer", "$pathname", "url", "href", "search"]);
  const technicalPropertyAllowlist = new Set([
    "token", "distinct_id", "$lib", "$lib_version", "$device_id", "$session_id", "$window_id",
    "$process_person_profile", "$cookieless_mode", "$geoip_disable"
  ]);
  const queue = [];
  let ready = false;
  let disabled = false;

  function clean(event, properties) {
    const schema = schemas[event];
    if (!schema) return null;
    const result = {};
    Object.entries(properties || {}).forEach(([key, value]) => {
      if (sensitiveProperties.has(key) || !Object.prototype.hasOwnProperty.call(schema, key)) return;
      if (schema[key].includes(value)) result[key] = value;
    });
    return result;
  }

  function capture(event, properties) {
    const safe = clean(event, properties);
    if (safe === null) return false;
    if (disabled) return false;
    if (!ready || !window.posthog || typeof window.posthog.capture !== "function") {
      queue.push([event, safe]);
      return false;
    }
    try { window.posthog.capture(event, safe); return true; } catch (_) { return false; }
  }

  function createPostHogStub() {
    const root = window.posthog = window.posthog || [];
    if (root.__SV) return root;
    root._i = [];
    root.init = function (token, config, name) {
      const instanceName = name || "posthog";
      const instance = name ? (root[name] = []) : root;
      instance.people = instance.people || [];
      instance.toString = () => instanceName + " (stub)";
      [
        "capture", "identify", "register", "register_once", "unregister", "set_config",
        "get_distinct_id", "get_session_id", "is_capturing", "flush", "opt_out_capturing"
      ].forEach((method) => {
        instance[method] = function () {
          instance.push([method, ...Array.from(arguments)]);
        };
      });
      root._i.push([token, config, name]);
    };
    root.__SV = 1;
    return root;
  }

  function initialize() {
    const token = document.querySelector('meta[name="posthog-token"]')?.content || window.BOUSSOLE_POSTHOG_TOKEN || "";
    if (!/^phc_[A-Za-z0-9_-]+$/.test(token)) { disabled = true; queue.splice(0); return; }

    try {
      createPostHogStub().init(token, {
          api_host: "https://eu.i.posthog.com",
          ui_host: "https://eu.posthog.com",
          autocapture: false,
          capture_pageview: false,
          capture_pageleave: false,
          capture_dead_clicks: false,
          capture_exceptions: false,
          capture_heatmaps: false,
          capture_performance: false,
          cookieless_mode: "always",
          disable_persistence: true,
          disable_session_recording: true,
          disable_surveys: true,
          advanced_disable_flags: true,
          person_profiles: "identified_only",
          mask_all_text: true,
          mask_all_element_attributes: true,
          property_denylist: [...sensitiveProperties],
          before_send: (payload) => {
            if (!payload || !schemas[payload.event]) return null;
            const safeProperties = clean(payload.event, payload.properties || {}) || {};
            const technicalProperties = {};
            Object.entries(payload.properties || {}).forEach(([key, value]) => {
              if (sensitiveProperties.has(key)) return;
              if (technicalPropertyAllowlist.has(key)) technicalProperties[key] = value;
            });
            technicalProperties.$geoip_disable = true;
            payload.properties = { ...technicalProperties, ...safeProperties };
            return payload;
          },
          loaded: () => {
            ready = true;
            queue.splice(0).forEach(([event, props]) => capture(event, props));
          }
      });
    } catch (_) { disabled = true; queue.splice(0); return; }

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = "https://eu-assets.i.posthog.com/static/array.js";
    script.addEventListener("error", () => { disabled = true; queue.splice(0); });
    document.head.appendChild(script);
  }

  window.BoussoleAnalytics = Object.freeze({ capture, schemas, clean });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
