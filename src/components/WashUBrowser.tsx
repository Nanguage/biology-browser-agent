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

    if (genome) params.set("genome", genome);
    if (position) params.set("position", position);
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
      referrerPolicy="no-referrer"
    />
  );
}

export default WashUBrowser;


