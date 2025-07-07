# Obsidian MCP Server (Cloud Version)

## What this does:
- Accepts API calls from your agents (e.g. Telegram, Scraper, etc.)
- Writes Markdown or image files into your Obsidian vault

## How to deploy on Render:
1. Push this folder to GitHub (e.g. as `obsidian-mcp-server`)
2. Go to [https://render.com](https://render.com) and click "New → Web Service"
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
