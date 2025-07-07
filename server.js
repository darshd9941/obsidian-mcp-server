import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure compatibility in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express setup
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Set vault path to ./vault directory (safe for Render)
const vaultPath = path.join(__dirname, 'vault');

// Create vault directory if not exists
if (!fs.existsSync(vaultPath)) {
  fs.mkdirSync(vaultPath, { recursive: true });
}

// Simple GET route for health check
app.get('/', (req, res) => {
  res.send('🧠 MCP Server is running!');
});

// MCP endpoint
app.post('/', async (req, res) => {
  const { action, path: filePath, content } = req.body;

  if (!action || !filePath || !content) {
    return res.status(400).json({ error: 'Missing action, path, or content' });
  }

  const fullPath = path.join(vaultPath, filePath);

  try {
    if (action === 'write') {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(f
