const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// const successTemplate = document.getElementById('success').content.getElementsByClassName('success');
// const errorTemplate = document.getElementById('error').content.getElementsByClassName('error');
// https://up.htmlacademy.ru/javascript/29/module/11/item/16

const closeMessage = ()=>{
  const successElement = document.body.querySelector('.success');
  if (successElement) {
    successElement.remove();
  }
  const errorElement = document.body.querySelector('.error');
  if (errorElement) {
    errorElement.remove();
  }
  document.body.classList.remove('has-modal');
};

const escapeButtonHandler = (event)=>{
  if (event.key === 'Escape') {
    closeMessage();
  }
};

const messageMissClick = (evt)=>{
  // evt.preventDefault();
  // почему работает не так?

  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  closeMessage();
};

const showSuccessMessage = ()=>{
  const successBlock = successTemplate.cloneNode(true);
  document.body.append(successBlock);
  document.body.classList.add('has-modal');

  const successButton = successBlock.querySelector('.success__button');

  successButton.addEventListener('click', closeMessage, { once: true });
  document.body.addEventListener('click', messageMissClick, { once: true });
  document.body.addEventListener('keydown', escapeButtonHandler, { once: true });
};


const showErrorMessage = ()=>{
  const errorBlock = errorTemplate.cloneNode(true);
  const errorButton = errorBlock.querySelector('.error__button');
  document.body.append(errorBlock);
  document.body.classList.add('has-modal');
  errorButton.addEventListener('click', closeMessage, { once: true });
  document.body.addEventListener('click', messageMissClick, { once: true });
  document.body.addEventListener('keydown', escapeButtonHandler, { once: true });

};
//В таком случае вся введённая пользователем информация сохраняется, чтобы у него была возможность отправить форму повторно.
//как так сделать?

// showErrorMessage();
// showSuccessMessage();

// console.log(successTemplate);

export { showSuccessMessage, showErrorMessage };