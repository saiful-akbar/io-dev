import iodev from 'src/data/iodev';

/**
 * Class ProjectFetch
 */
class ProjectFetch {
  constructor() {
    this.projects = iodev.projects;
  }

  /**
   * Method untuk mengambil semua data project
   * 
   * @return {Object}
   */
  all() {
    return this.projects;
  }

  /**
   * Method untuk mengambil data project berdasarkan slug-nya
   * 
   * @param  {String} $slug
   * @return {Object}
   */
  find(slug) {
    const project = this.projects.find((data) => {
      return data.slug === slug;
    });

    return project;
  }

  /**
   * Method untuk mencari data project selanjutnya berdasarkan slug yang dikirim
   * 
   * @param  {String} slug
   * @return {Object}
   */
  next(slug) {
    const projects = this.projects;
    const project = this.find(slug);

    if (typeof project === 'undefined') {
      return undefined;
    }

    for (let i = 0; i < projects.length; i += 1) {
      if (projects[i].slug === slug) {
        return typeof projects[i + 1] === 'undefined' ? projects[0] : projects[i + 1];
      }
    }
  }
}

export default ProjectFetch;