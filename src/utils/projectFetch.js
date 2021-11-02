import fs from 'fs';

const fileBuffer = fs.readFileSync('src/data/iodev.json');
const iodev = JSON.parse(fileBuffer);
const { projects } = iodev;

/**
 * Fungsi untuk mengambil semua data contect
 */
export function All() {
  return projects;
}

/**
 * Fungsi untuk mengambil data project berdasarkan slug-nya
 * 
 * @param  {String} slug
 * @return {Object}
 */
export function find(slug) {
  const project = projects.find((data) => data.slug === slug);
  return project;
}