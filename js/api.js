import { BASE_URL, ROUTE, METHOD, ERROR_MESSAGE } from './api_config.js';


const uploadData = (route, errorMessage, method = METHOD.get, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => uploadData(ROUTE.getData, ERROR_MESSAGE.getData);

const sendData = (body) => {
  uploadData(ROUTE.getData, ERROR_MESSAGE.getData, METHOD.post, body);

};

export { getData, sendData};
