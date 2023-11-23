const MESSAGE_SHOW_TIME = 5000;

const dataErrorElementTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

// export const showMessage = (message) => {
//   const rectangle = document.createElement('div');
//   rectangle.style.zIndex = '100';
//   rectangle.style.position = 'fixed';
//   rectangle.style.left = '50%';
//   rectangle.style.top = '40%';
//   rectangle.style.transform = 'translate(-50%, -50%)';
//   rectangle.style.width = '300px';
//   rectangle.style.height = '200px';
//   rectangle.style.backgroundColor = 'red';
//   rectangle.style.display = 'flex';
//   rectangle.style.justifyContent = 'center';
//   rectangle.style.alignItems = 'center';

//   const textContainer = document.createElement('div');
//   textContainer.style.padding = '0 20px';
//   textContainer.style.textAlign = 'center'; // Align the text to the center
//   textContainer.textContent = message;

//   rectangle.appendChild(textContainer);

//   document.body.append(rectangle);

//   setTimeout(() => {
//     rectangle.remove();
//   }, MESSAGE_SHOW_TIME);
// };

export const showMessage = ()=>{
  // console.log(dataErrorElementTemplate);
  const dataErrorElement = dataErrorElementTemplate.cloneNode(true);
  console.log(dataErrorElement);
  document.body.append(dataErrorElement);
  document.body.classList.add('has-modal');

  // setTimeout(() => {
  //   dataErrorElement.remove();
  // }, MESSAGE_SHOW_TIME);

};
