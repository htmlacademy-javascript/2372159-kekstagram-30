import { BASE_URL, ROUTE, METHOD, ERROR_MESSAGE } from './api_config.js';

// https://up.htmlacademy.ru/javascript/29/module/11/item/16


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
  uploadData(ROUTE.sendData, ERROR_MESSAGE.sendData, METHOD.post, body);

};

const transferData = (parameter = 'get', body = null) => {
  let route, errorMessage, method;

  switch (parameter) {
    case 'get':
      route = ROUTE.getData;
      errorMessage = ERROR_MESSAGE.errorMessage;
      method = METHOD.get;
      break;
    case 'send':
      route = ROUTE.sendData;
      errorMessage = ERROR_MESSAGE.errorMessage;
      method = METHOD.post;
      break;
  }

  // return fetch(`${BASE_URL}${route}`, { method, body })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error();
  //     }
  //     return response.json();
  //   })
  //   .catch(() => {
  //     throw new Error(errorMessage);
  //   });

  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${route}`, { method, body })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        resolve(data); // Resolve the promise with the received data
      })
      .catch((error) => {
        reject(new Error(errorMessage)); // Reject the promise with the error message
      });
  });


};


export { getData, sendData, transferData };
