"use client";

import { useMemo } from "react";

type WashUBrowserProps = {
  baseUrl?: string;
  genome?: string;
  position?: string;
  hub?: string | string[];
  datahub?: string;
  session?: string;
  bundle?: string;
  hicUrl?: string;
  noDefaultTracks?: boolean;
  height?: number | string;
  className?: string;
};

export function WashUBrowser({
  baseUrl = "https://epigenomegateway.wustl.edu/browser/",
  genome,
  position,
  hub,
  datahub,
  session,
  bundle,
  hicUrl,
  noDefaultTracks,
  height = 700,
  className,
}: WashUBrowserProps) {
  const src = useMemo(() => {
    const url = new URL(baseUrl);
    const params = new URLSearchParams();

    // Use embed mode recommended by docs to improve embedding behavior
    params.set("embed", "true");

    if (genome) params.set("genome", genome);
    if (position) {
      // Normalize thousand separators/spaces to avoid chr7:55-56 mis-parse
      const normalizedPosition = position.replace(/\s+/g, "").replace(/,/g, "");
      params.set("position", normalizedPosition);
    }
    if (typeof noDefaultTracks === "boolean" && noDefaultTracks) {
      params.set("noDefaultTracks", "true");
    }
    if (bundle) params.set("bundle", bundle);
    if (hicUrl) params.set("hicUrl", hicUrl);
    if (session) params.set("session", session);
    if (datahub) params.set("datahub", datahub);

    if (hub) {
      const hubs = Array.isArray(hub) ? hub : [hub];
      hubs.forEach((h) => params.append("hub", h));
    }

    url.search = params.toString();
    return url.toString();
  }, [baseUrl, genome, position, hub, datahub, session, bundle, hicUrl, noDefaultTracks]);

  const resolvedHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <iframe
      src={src}
      title="WashU Epigenome Browser"
      className={className}
      style={{ width: "100%", height: resolvedHeight, border: "0" }}
    />
  );
}

export default WashUBrowser;


