# obsidian-mcp-server

# Obsidian MCP Server (Cloud Version)

## What this does:
- Accepts API calls from your agents (e.g. Telegram, Scraper, etc.)
- Writes Markdown or image files into your Obsidian vault

## How to deploy on Render:
1. Push this folder to GitHub (e.g. as `obsidian-mcp-server`)
2. Go to [https://render.com](https://render.com) and click "New â†’ Web Service"
3. Connect your repo
4. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variable: `OBSIDIAN_VAULT_PATH=/data`
5. Hit Deploy

Your MCP endpoint will be:
```
https://your-render-app-name.onrender.com/mcp
```

## Example request:
POST /mcp
```json
{
  "action": "write",
  "path": "photo-log/2025-07-07-summary.md",
  "content": "---\ndate: 2025-07-07\ntags: [twitter]\n---\n\nSummary of the post here."
}
```


## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Clone the Repository

```bash
git clone https://github.com/darshd9941/obsidian-mcp-server.git
cd obsidian-mcp-server
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit .env and add your API keys:
   ```bash
   # Required for Claude vision features
   ANTHROPIC_API_KEY=your-api-key-here
   ```

## Usage

### Web App (if applicable)

```bash
streamlit run app.py
```

### CLI Usage

```bash
python main.py --help
```

### Python API

```python
from module import MainClass

# Initialize the tool
tool = MainClass()

# Use the tool
result = tool.process("input")
print(result)
```

## Configuration

- .env - Environment variables (API keys, settings)
- config.yaml - Configuration file (if applicable)

## Examples

See the examples/ directory for detailed usage examples.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

See LICENSE file for details.
