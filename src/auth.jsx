const login = async ({ username, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'cero' && password === '123456') {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });

export { login };
