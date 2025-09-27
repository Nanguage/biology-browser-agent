![](./bba-title.png)

Explore the human genome conversationally. Ask the agent to jump to regions, load tracks, and assemble data views — and watch the WashU Epigenome Browser respond in real time.

- **Talk to the genome**: “Go to chr7:55,000,000–56,000,000”, “Load DNase‑Seq”, “Add Hi‑C”.
- **Your data, instantly**: Bring your own hubs and load them with one line.
- **Clean, focused UI**: A full‑screen embedded browser with an AI sidebar that understands genomics.

## What it can do

- Navigate to genes or regions (`chr:start-end`), with smart parsing of human‑friendly inputs.
- Load DNase‑Seq, ChIP‑Seq, Hi‑C, image tracks, and more.
- Toggle defaults, switch genomes, and restore saved sessions — all by asking.

### Try saying
- “Set genome to hg38”
- “Go to chr8:127,735,434–127,742,951 (MYC)”
- “Load a DNase‑Seq hub”
- “Enable no default tracks”

## Deploy (simple)
- Run the agent on a small server (set your OpenAI key).  
- Deploy the Next.js UI anywhere (e.g., Vercel).  
- Point the UI’s API route to your agent URL.  

That’s it — open the app and talk to the genome.

## Learn more / build your own
Developers: see setup, scripts, CORS notes, and extension points in [delopment.md](./delopment.md).

— Built on the WashU Epigenome Browser and CopilotKit — official browser guide: [docs](`https://eg.readthedocs.io/en/latest/index.html`).
