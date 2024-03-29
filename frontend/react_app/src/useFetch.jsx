import { useState } from 'react';
import Cookies from 'js-cookie';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = (endpoint = '/', method = 'GET', body = null) => {
    const baseEndpoint = 'http://localhost:8000/api'
    let options = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      }
    }
    if (body){
      const formData = new FormData();

      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          formData.append(key, body[key]);
        }
      }
      options['body'] = formData
    }
    if (localStorage.getItem('access') !== null){
      let token = localStorage.getItem('access')
      if (token){
        options.headers['Authorization'] = `Token ${token}`
      }
    }
    fetch(baseEndpoint + endpoint, options)
      .then(res => {
        setResponse(res)
        return res.json();
      })
      .then(data => {
        if (data.csrfToken !== undefined){
          Cookies.set('csrftoken', data.csrfToken);
        }
        setData(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return [data, response,  error, fetchData];
};

export default useFetch;