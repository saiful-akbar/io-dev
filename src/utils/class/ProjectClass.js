import iodev from 'src/data/iodev';

class ProjectClass {
  constructor() {
    this.projects = iodev.projects;
  }

  // method untuk menganbil semua data project
  all() {
    return this.projects;
  }

  // method untuk mengambil data project berdasarkan slug-nya
  find(slug) {
    const project = this.projects.find((data) => data.slug === slug);
    return project;
  }
}

export default ProjectClass;
