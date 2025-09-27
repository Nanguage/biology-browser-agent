# Development Guide

This document covers setup, development workflow, and technical details.

## Prerequisites
- Node.js 18+
- Python 3.8+
- OpenAI API Key
- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- A package manager (pnpm recommended)

## Install & Run

### UI
```bash
pnpm install
pnpm dev
```
The UI runs on http://localhost:3000.

### Agent (Python)
```bash
cd agent
uv sync
export OPENAI_API_KEY=YOUR_KEY
uv run dev
```
The agent runs on http://127.0.0.1:9000.

The Next.js API route is configured to call `http://127.0.0.1:9000/run`.

## Local Hubs & CORS
- Place files under `public/public_hubs/` to serve them at `http://localhost:3000/public_hubs/...`.
- CORS headers are added in `next.config.ts` for `/public_hubs/:path*` (Origin `*`, allow Range requests, etc.). Restart the dev server after changes.

## Key Files
- `src/components/WashUBrowser.tsx`: embeds WashU Browser; supports URL params `genome`, `position`, `hub` (multi), `datahub`, `session`, `noDefaultTracks`, and sets `embed=true`.
- `src/app/page.tsx`: shared state (genome, position, hubs, etc.) and Copilot actions to mutate that state.
- `src/app/api/copilotkit/route.ts`: bridges the UI to the Python agent.
- `agent/agent/agent.py`: LlamaIndex agent and tools; includes a prompt with guidance for local hubs.

## Copilot Actions
- `set_genome(genome)`
- `set_region(position)` — commas/spaces normalized (e.g., `chr7:55,000,000-56,000,000`).
- `set_hub(hub)` / `add_hub(hub)` / `clear_hubs()`
- `set_datahub(datahub)`
- `set_session(session)`
- `toggle_no_default_tracks(enabled)`

## Troubleshooting
- If tools fail to connect, ensure the agent is running on port 9000 and the API route target matches.
- For CORS blocks from remote hubs, host data under `/public_hubs` or ensure your server returns:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: GET, HEAD, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type, Range`
  - `Access-Control-Expose-Headers: Accept-Ranges, Content-Length, Content-Range`
- Python import warnings: `cd agent && uv sync && uv run dev`.

## References
- WashU Epigenome Browser: `https://eg.readthedocs.io/en/latest/index.html`
- CopilotKit: `https://docs.copilotkit.ai`
- LlamaIndex: `https://docs.llamaindex.com/introduction`
