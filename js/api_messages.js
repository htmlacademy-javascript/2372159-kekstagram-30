const MESSAGE_SHOW_TIME = 5000;

const dataErrorElementTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

export const showMessage = ()=>{
  // console.log(dataErrorElementTemplate);
  const dataErrorElement = dataErrorElementTemplate.cloneNode(true);
  // console.log(dataErrorElement);
  document.body.append(dataErrorElement);
  document.body.classList.add('has-modal');

  setTimeout(() => {
    dataErrorElement.remove();
  }, MESSAGE_SHOW_TIME);

};
