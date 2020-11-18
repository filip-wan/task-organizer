const api = async (method, url, callback, body) =>
  fetch(process.env.REACT_APP_API_URL + url, {
    headers: { 'Content-Type': 'application/json' },
    method,
    credentials: 'include',
    body,
  })
    .then((response) => response.json())
    .then(callback)
    .finally((response) =>
      console.log(method, process.env.REACT_APP_API_URL + 'notes', response)
    )
    .catch((err) => console.error('ERROR!', err));

export default api;
