const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// const successTemplate = document.getElementById('success').content.getElementsByClassName('success');
// const errorTemplate = document.getElementById('error').content.getElementsByClassName('error');
// https://up.htmlacademy.ru/javascript/29/module/11/item/16

const closeSuccessMessage = ()=>{
  document.body.querySelector('.success').remove();
  document.body.classList.remove('has-modal');
};

const escapeButtonHandler = (event)=>{
  if (event.key === 'Escape') {
    closeSuccessMessage();
  }
};

const messageMissClick = (evt)=>{
  // evt.preventDefault();
  // почему работает не так?

  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = ()=>{
  const successBlock = successTemplate.cloneNode(true);
  document.body.append(successBlock);
  document.body.classList.add('has-modal');

  const successButton = successBlock.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessMessage, { once: true });
  document.body.addEventListener('click', messageMissClick, { once: true });
  document.body.addEventListener('keydown', escapeButtonHandler, { once: true });
};


function closeErrorMessage (){
  document.body.querySelector('.error').remove();
  document.body.classList.remove('has-modal');
  // document.body.removeEventListener('click',onErrorDocumentClick);
  // document.removeEventListener('keydown', onCloseErrorMessage);
}

const showErrorMessage = ()=>{
  const errorBlock = errorTemplate.cloneNode(true);
  const errorButton = errorBlock.querySelector('.error__button');
  document.body.append(errorBlock);
  document.body.classList.add('has-modal');
  errorButton.addEventListener('click', closeErrorMessage, { once: true });
  // document.body.addEventListener('keydown',onCloseErrorMessage, { once: true });
  // document.body.addEventListener('click',onErrorDocumentClick, { once: true });

};



showSuccessMessage();

// console.log(successTemplate);

// export { showSuccessMessage };
