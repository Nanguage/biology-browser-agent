from typing import Annotated

from llama_index.core.workflow import Context
from llama_index.llms.openai import OpenAI
from llama_index.protocols.ag_ui.router import get_ag_ui_workflow_router


# This tool has a client-side version that is actually called to change the background
# These tools just need a response string to make it look like they are executing
def change_theme_color(
    theme_color: Annotated[str, "The hex color value. i.e. '#123456''"],
) -> str:
    """Change the background color of the chat. Can be any hex color value."""
    return f"Changing background to {theme_color}"

# This is another client-side tool that is actually called to add a proverb to the list
# These tools just need a response string to make it look like they are executing
async def add_proverb(
    proverb: Annotated[str, "The proverb to add. Make it witty, short and concise."],
) -> str:
    """Add a proverb to the list of proverbs."""
    return f"Added proverb: {proverb}"

# This is a backend tool that executes code on the backend server
# For now this is a dummy implementation, but it could very well call a weather API
async def get_weather(
    location: Annotated[str, "The location to get the weather for."],
) -> str:
    """Get the weather for a given location."""
    return f"The weather in {location} is sunny and 70 degrees."

# ============ WashU Browser Frontend Tools ============
# These mirror the frontend actions and update shared state in the client.

def set_genome(
    genome: Annotated[str, "Reference genome identifier, e.g. 'hg38', 'mm10'."],
) -> str:
    """Set the reference genome in the embedded WashU browser."""
    return f"Genome set to {genome}"

def set_region(
    position: Annotated[
        str,
        "Genomic region string like 'chr7:55,000,000-56,000,000' or 'chr1:1-1,000,000'.",
    ],
) -> str:
    """Navigate the embedded WashU browser to a specific region."""
    return f"Region set to {position}"

def set_hub(
    hub: Annotated[str, "URL to a data hub JSON that defines tracks."],
) -> str:
    """Replace current hubs with a single hub URL."""
    return f"Hub set to {hub}"

def add_hub(
    hub: Annotated[str, "URL to a data hub JSON to add to existing hubs."],
) -> str:
    """Add a data hub to the embedded WashU browser."""
    return f"Hub added: {hub}"

def clear_hubs() -> str:
    """Clear all loaded hubs in the embedded WashU browser."""
    return "All hubs cleared"

def set_datahub(
    datahub: Annotated[str, "URL to a datahub that groups tracks."],
) -> str:
    """Set the datahub URL used by the embedded browser."""
    return f"Datahub set to {datahub}"

def set_session(
    session: Annotated[str, "Session URL to restore a WashU Browser session."],
) -> str:
    """Restore a WashU browser session by URL."""
    return f"Session set to {session}"

def toggle_no_default_tracks(
    enabled: Annotated[bool, "Whether to disable default tracks (true/false)."],
) -> str:
    """Toggle whether the browser loads with no default tracks."""
    return f"noDefaultTracks set to {enabled}"


agentic_chat_router = get_ag_ui_workflow_router(
    llm=OpenAI(model="gpt-4.1"),
    # Tools that are executed in the frontend client
    frontend_tools=[
        change_theme_color,
        add_proverb,
        set_genome,
        set_region,
        set_hub,
        add_hub,
        clear_hubs,
        set_datahub,
        set_session,
        toggle_no_default_tracks,
    ],
    # Tools that are executed in the backend server
    backend_tools=[get_weather],
    system_prompt=(
        "You are a helpful assistant that controls an embedded WashU Epigenome Browser. "
        "You can set genome (e.g., hg38), navigate to regions (e.g., chr7:55,000,000-56,000,000), "
        "load or clear hubs/datahubs, toggle default tracks, and optionally restore a session. "
        "If user asks for load some Hi-C data please load http://localhost:3000/public_hubs/hg38/4dn_hg38.json "
        "If user asks for load some DNase-Seq data please load http://localhost:3000/public_hubs/hg38/Roadmap_hg38_ChIPseq_June2021.json "
        "If user asks for load some ChIP-Seq data please load http://localhost:3000/public_hubs/test.json "
        "If user asks for load some Image data please load http://localhost:3000/public_hubs/hg38/image.json "
    ),
    initial_state={
        "localHubs": {
            "4dn_hg38": "/public_hubs/hg38/4dn_hg38.json",
            "Roadmap_hg38_ChIPseq_June2021": "/public_hubs/hg38/Roadmap_hg38_ChIPseq_June2021.json",
            "Roadmap_hg38_others_June2021": "/public_hubs/hg38/Roadmap_hg38_others_June2021.json",
            "roadmap_hmm": "/public_hubs/hg38/roadmap_hmm.json",
        },
    },
)
