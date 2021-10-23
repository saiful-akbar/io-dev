import fetcher from './fetcher';

/**
 * menambil semua data project
 * @returns
 */
export function projectAllFetch() {
  return new Promise((resolve, reject) => {
    fetcher({
      method: 'GET',
      url: '/project',
    })
      .then((res) => resolve(res))
      .catch((err) => {
        if (err.response) {
          reject(err.response);
        }
      });
  });
}

/**
 * ambil data project berdasarkan slug
 * @param {string} slug
 * @returns
 */
export function projectShowFetch(slug) {
  return new Promise((resolve, reject) => {
    fetcher({
      method: 'GET',
      url: `/project/${slug}`,
    })
      .then((res) => resolve(res))
      .catch((err) => {
        if (err.response) {
          reject(err.response);
        }
      });
  });
}
