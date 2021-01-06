/* eslint-disable */
import axios from 'axios';
import localStorage from 'local-storage';

export default async function callApi(method, url, data, value) {
  const mainUrl = 'http://localhost:9000/api/user/login' + url;
  console.log('main url is', mainUrl);
  await axios({
    method: method,
    url: mainUrl,
    data: {
      ...data,
    },
  })
    .then((response) => {
      localStorage.set('token', response.data.data);
      console.log(localStorage.get('token'));
    })
    .catch((error) => {
      value(error.message, 'error');
    });
}
