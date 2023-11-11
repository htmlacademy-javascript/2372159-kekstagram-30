import { BaseUrl, Route, Method, ErrorMessage } from './api_config.js';


const uploadData = (route, errorMessage, method = Method.get, body = null) =>
  fetch(`${BaseUrl}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => uploadData(Route.getData, ErrorMessage.getData);

const sendData = (body) => {
  uploadData(Route.getData, ErrorMessage.getData, Method.post, body);

};

export { getData, sendData};
