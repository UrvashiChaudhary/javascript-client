/* eslint-disable */
import axios from 'axios';

export default async function callApi(method, url, data) {
  const mainUrl = 'http://localhost:9000/api' + url;
  console.log('main url is', mainUrl);
  try {
    const response = await axios({
      method,
      url: mainUrl,
      data,
      headers: { Authorization: window.localStorage.getItem('token') },
    });
    return response;
  } catch (err) {
    console.log('error', err);
  }
}
