const api = async (method, url, callback, body) =>
  fetch(process.env.REACT_APP_API_URL + url, {
    headers: { 'Content-Type': 'application/json' },
    method,
    body,
  })
    .then((response) => response.json())
    .then(callback)
    .finally((response) =>
      console.log(method, process.env.REACT_APP_API_URL + 'notes', response)
    )
    .catch((err) => console.error(err));

export default api;
