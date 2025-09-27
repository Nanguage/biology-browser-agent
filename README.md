![](./bba-title.png)

Explore the human genome conversationally. Ask the agent to jump to regions, load tracks, and assemble data views — and watch the WashU Epigenome Browser respond in real time.

- **Talk to the genome**: “Go to chr7:55,000,000–56,000,000”, “Load DNase‑Seq”, “Add Hi‑C”.
- **Your data, instantly**: Serve local hubs under `public/public_hubs/` and load them with one line.
- **Clean, focused UI**: A full‑screen embedded browser with an AI sidebar that understands genomics.

## What it can do

- Navigate to genes or regions (`chr:start-end`), with smart parsing of human‑friendly inputs.
- Load curated local hubs (DNase‑Seq, ChIP‑Seq, Hi‑C, image tracks, and more).
- Toggle defaults, switch genomes, and restore saved sessions — all by asking.

### Try saying
- “Set genome to hg38”
- “Go to chr8:127,735,434–127,742,951 (MYC)”
- “Add hub /public_hubs/hg38/4dn_hg38.json”
- “Set datahub /public_hubs/hg38/Roadmap_hg38_ChIPseq_June2021.json”
- “Enable no default tracks”

## Your local data
Place hubs under `public/public_hubs/` and load them via `http://localhost:3000/public_hubs/...`.

Included examples:
- `/public_hubs/test.json`
- `/public_hubs/hg38/4dn_hg38.json`
- `/public_hubs/hg38/hg38_cool.json`
- `/public_hubs/hg38/image.json`
- `/public_hubs/hg38/Roadmap_hg38_ChIPseq_June2021.json`
- `/public_hubs/hg38/Roadmap_hg38_others_June2021.json`
- `/public_hubs/hg38/roadmap_hmm.json`

## Learn more / build your own
Developers: see setup, scripts, CORS notes, and extension points in [delopment.md](./delopment.md).

— Built on the WashU Epigenome Browser and CopilotKit — official browser guide: [docs](`https://eg.readthedocs.io/en/latest/index.html`).
