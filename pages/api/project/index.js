import { readFileSync } from 'fs';

export default function handler(req, res) {
  // ambil database
  const fileBuffer = readFileSync('database/iodev.json', 'utf-8');

  // ubah database dari json ke object
  const db = JSON.parse(fileBuffer);

  if (req.method === 'GET') {
    // ambil semua data projects
    const result = db.projects;

    // response berhasil
    res.status(200).json(result);
  }
}
