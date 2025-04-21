"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [results, setResults] = useState({
    userAgent: "",
    platform: "",
    features: "",
  });

  useEffect(() => {
    const detectByUserAgent = () => {
      const ua = window.navigator.userAgent;
      if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
      if (/Android/i.test(ua)) return "Android";
      return "Other";
    };

    const detectByPlatform = () => {
      const platform = window.navigator.platform;
      const maxTouchPoints = window.navigator.maxTouchPoints || 0;

      if (
        /iPhone|iPad|iPod/i.test(platform) ||
        (platform === "MacIntel" && maxTouchPoints >= 1)
      ) {
        return "iOS";
      }

      if (/Linux|Android/.test(platform)) {
        return "Android";
      }

      return "Other";
    };

    const detectByFeatures = () => {
      if (window.webkit && window.webkit.messageHandlers) {
        return "iOS";
      }

      if (
        typeof window.navigator.share === "function" &&
        window.navigator.canShare
      ) {
        return "Android";
      }

      return "Other";
    };

    setResults({
      userAgent: detectByUserAgent(),
      platform: detectByPlatform(),
      features: detectByFeatures(),
    });
  }, []);

  return (
    <div>
      <div>detect by user agent: {results.userAgent}</div>
      <div>detect by user platform: {results.platform}</div>
      <div>detect by user features: {results.features}</div>
    </div>
  );
}
