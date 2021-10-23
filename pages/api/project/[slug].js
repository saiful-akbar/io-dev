import { readFileSync } from 'fs';

export default function handler(req, res) {
  // ambil parameter
  const { slug } = req.query;

  // ambil database
  const fileBuffer = readFileSync('database/iodev.json', 'utf-8');

  // ubah database dari json ke object
  const db = JSON.parse(fileBuffer);

  if (req.method === 'GET') {
    // cari data project berdasarkan slug-nya
    const result = db.projects.find((data) => data.slug === slug);

    // set http status code
    const statusCode = result ? 200 : 404;

    // response berhasil
    res.status(statusCode).json(result);
  }
}
