import iodev from "src/data/iodev.json";

class CategoryFetch {
  constructor() {
    this.categories = iodev.categories;
  }

  /**
   * Method untuk mengambil semua data category
   *
   * @return {Object} data category
   */
  all() {
    return this.categories;
  }

  /**
   * Method untuk mencari date category
   *
   * @param  {String} name Nama katagory
   * @return {Object} Data category
   */
  find(name) {
    const category = this.categories.find((data) => {
      return data === name;
    });

    return category;
  }
}

export default CategoryFetch;
