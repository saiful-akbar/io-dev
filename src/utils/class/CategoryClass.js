import iodev from 'src/database/iodev';

class CategoryClass {
  constructor() {
    this.categories = iodev.categories;
  }

  /**
   * Method untuk mrngambil semua data categories
   *
   * @returns string
   */
  all() {
    return this.categories;
  }

  /**
   * Method untuk mencari data category
   *
   * @param {String} category
   * @returns String
   */
  find(category) {
    return this.categories.find((data) => data === category);
  }
}

export default CategoryClass;
