import iodev from "src/data/iodev.json";

class ClientFetch {
  constructor() {
    this.clients = iodev.clients;
  }

  /**
   * Method untuk mengambil semua data category
   *
   * @return {Object} data category
   */
  all() {
    return this.clients;
  }

  /**
   * Method untuk mencari date category
   *
   * @param  {String} name Nama katagory
   * @return {Object} Data category
   */
  find(name) {
    const client = this.clients.find((data) => {
      return data === name;
    });

    return client;
  }
}

export default ClientFetch;
