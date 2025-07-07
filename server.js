import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const vaultPath = process.env.OBSIDIAN_VAULT_PATH || './vault';

if (!fs.existsSync(vaultPath)) fs.mkdirSync(vaultPath, { recursive: true });

app.get('/mcp', (req, res) => {
  res.json({ message: 'MCP server is running' });
});

app.post('/mcp', async (req, res) => {
  const { action, path: filePath, content } = req.body;

  if (!action || !filePath || !content) {
    return res.status(400).json({ error: 'Missing action, path, or content' });
  }

  const fullPath = path.join(vaultPath, filePath);

  try {
    if (action === 'write') {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content);
      return res.json({ status: 'ok', path: fullPath });
    }

    if (action === 'write-binary') {
      const buffer = Buffer.from(content);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, buffer);
      return res.json({ status: 'ok', path: fullPath });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ MCP server running at http://localhost:${port}`);
});
