/* eslint-disable */
import axios from 'axios';

export default async function callApi(data, method, url) {
  const mainUrl = 'http://localhost:9000/api' + url;
  console.log('main url is', mainUrl);
  try {
    const response = await axios({
      method,
      url: mainUrl,
      data,
      headers: { authorization: window.localStorage.getItem('token') },
    });
    return response;
  } catch (err) {
    return { status: 'error', message: 'This is a error message' };

  }
}
