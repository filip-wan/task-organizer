const api = async (method, url, callback, body) => {
  return fetch(process.env.REACT_APP_API_URL + url, {
    headers: { 'Content-Type': 'application/json' },
    method,
    credentials: 'include',
    body,
  })
    .then((response) => (response.status === 200 ? response.json() : response))
    .then((response) => {
      console.log(
        `%c ${method} `,
        'background-color: lightblue; color: black;',
        process.env.REACT_APP_API_URL + url,
        response
      );
      return response;
    })
    .then(callback)
    .catch((err) => console.log('ERROR!', err));
};

export default api;
