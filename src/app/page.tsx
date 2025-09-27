"use client";

import { useState } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import WashUBrowser from "@/components/WashUBrowser";

import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";

export default function CopilotKitPage() {
  const [themeColor, setThemeColor] = useState("#6366f1");

  // 🪁 Frontend Actions: https://docs.copilotkit.ai/guides/frontend-actions
  useCopilotAction({
    name: "change_theme_color",
    parameters: [{
      name: "theme_color",
      description: "The theme color to set. Make sure to pick nice colors.",
      required: true, 
    }],
    handler({ theme_color }) {
      setThemeColor(theme_color);
    },
  });

  return (
    <main style={{ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties}>
      <YourMainContent themeColor={themeColor} />
      <CopilotSidebar
        clickOutsideToClose={false}
        defaultOpen={true}
        labels={{
          title: "Genome Browser Agent",
          initial: "👋 Control the WashU Epigenome Browser. Try:\n- **Genome**: \"Set genome to hg38\"\n- **Region**: \"Go to chr7:55,000,000-56,000,000\"\n- **Hub**: \"Add hub https://.../hub.txt\"\n- **Defaults**: \"Enable no default tracks\"\nYou can also change the theme color or show a weather card."
        }}
      />
    </main>
  );
}

// State of the agent, make sure this aligns with your agent's state.
type AgentState = {
  genome?: string;
  position?: string;
  hub?: string[];
  datahub?: string;
  session?: string;
  noDefaultTracks?: boolean;
  localHubs?: Record<string, string>;
}

function YourMainContent({ themeColor }: { themeColor: string }) {
  // 🪁 Shared State: https://docs.copilotkit.ai/coagents/shared-state
  const {state, setState} = useCoAgent<AgentState>({
    name: "sample_agent",
    initialState: {
      genome: "hg38",
      position: "chr1:1-1,000,000",
      hub: [],
      noDefaultTracks: true,
      localHubs: {
        "4dn_hg38": "/public_hubs/hg38/4dn_hg38.json",
        "Roadmap_hg38_ChIPseq_June2021": "/public_hubs/hg38/Roadmap_hg38_ChIPseq_June2021.json",
        "Roadmap_hg38_others_June2021": "/public_hubs/hg38/Roadmap_hg38_others_June2021.json",
        "roadmap_hmm": "/public_hubs/hg38/roadmap_hmm.json",
      },
    },
  })

  // Removing demo proverb-related actions and state

  //🪁 Generative UI: https://docs.copilotkit.ai/coagents/generative-ui
  useCopilotAction({
    name: "get_weather",
    description: "Get the weather for a given location.",
    available: "disabled",
    parameters: [
      { name: "location", type: "string", required: true },
    ],
    render: ({ args }) => {
      return <WeatherCard location={args.location} themeColor={themeColor} />
    },
    followUp: false,
  });

  // WashU Browser controls (frontend actions matching agent tools)
  useCopilotAction({
    name: "set_genome",
    parameters: [{ name: "genome", type: "string", required: true }],
    handler: ({ genome }) => {
      setState({ ...state, genome });
    },
  });

  useCopilotAction({
    name: "set_region",
    parameters: [{ name: "position", type: "string", required: true }],
    handler: ({ position }) => {
      setState({ ...state, position });
    },
  });

  useCopilotAction({
    name: "set_hub",
    parameters: [{ name: "hub", type: "string", required: true }],
    handler: ({ hub }) => {
      setState({ ...state, hub: [hub] });
    },
  });

  useCopilotAction({
    name: "add_hub",
    parameters: [{ name: "hub", type: "string", required: true }],
    handler: ({ hub }) => {
      const current = state.hub || [];
      if (!current.includes(hub)) {
        setState({ ...state, hub: [...current, hub] });
      }
    },
  });

  useCopilotAction({
    name: "clear_hubs",
    parameters: [],
    handler: () => {
      setState({ ...state, hub: [] });
    },
  });

  useCopilotAction({
    name: "set_datahub",
    parameters: [{ name: "datahub", type: "string", required: true }],
    handler: ({ datahub }) => {
      setState({ ...state, datahub });
    },
  });

  useCopilotAction({
    name: "set_session",
    parameters: [{ name: "session", type: "string", required: true }],
    handler: ({ session }) => {
      setState({ ...state, session });
    },
  });

  useCopilotAction({
    name: "toggle_no_default_tracks",
    parameters: [{ name: "enabled", type: "boolean", required: true }],
    handler: ({ enabled }) => {
      setState({ ...state, noDefaultTracks: enabled });
    },
  });

  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="h-screen w-screen flex flex-col transition-colors duration-300"
    >
      <div className="bg-white/20 backdrop-blur-md p-0 rounded-2xl shadow-xl w-full h-full flex flex-col">
        <div className="p-4 md:p-6 pb-2">
          <h1 className="text-3xl font-bold text-white mb-2">WashU Epigenome Browser</h1>
          <p className="text-gray-200 text-sm">Use the assistant to control genome, region, and track hubs. Examples: "Set genome to hg38", "Go to chr7:55,000,000-56,000,000", "Load this hub URL ...", "Enable no default tracks".</p>
        </div>

        <div className="flex-1 min-h-0">
          <WashUBrowser
            genome={state.genome}
            position={state.position}
            hub={state.hub}
            datahub={state.datahub}
            session={state.session}
            noDefaultTracks={state.noDefaultTracks}
            height="100%"
          />
        </div>

        {/* Removed demo Proverbs section */}
      </div>
    </div>
  );
}
