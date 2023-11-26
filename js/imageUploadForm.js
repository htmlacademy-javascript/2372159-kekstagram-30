// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification

import { runSlider, destroySliderAndEvents } from './imageUploadFormEffects.js';
import { runScaler, resetScaler } from './imageUploadFormScale.js';
import { runValidator, removeValidatorEvents } from './imageUploadFormValidation.js';
import { addSubmitEventListener, removeSubmitEventListener } from './imageUploadFormSubmit.js';

/** document.querySelector('.img-upload__input'); */
const imgUploadInput = document.querySelector('.img-upload__input');
/** document.querySelector('.img-upload__overlay'); */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
/** document.querySelector('.img-upload__preview img'); */
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
/** document.querySelector('.img-upload__preview'); */
const previewEffects = document.querySelectorAll('.effects__preview');

/** document.querySelector('.img-upload__text'); */
const fieldset = document.querySelector('.img-upload__text');
const hashtagsField = fieldset.querySelector('.text__hashtags');
const descriptionField = fieldset.querySelector('.text__description');

// const uploadForm = document.querySelector('.img-upload__form');

const uploadFormExitButton = document.querySelector('.img-upload__cancel');
/** document.querySelector('.img-upload__submit'); */


/* ######################################################################
      раздел открытия-закрытия модального окна редактора изображений
###################################################################### */


/** открытие окна редактора изображений */
const handleImageUpload = () => {
  // console.log('добавление handleImageUpload');
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  runValidator();
  runScaler();
  runSlider();
  // console.log('тест');
  // console.log('добавление обработчика на submit');
  addSubmitEventListener();

};


// закрытие окна редактора изображений
const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadPreview.style = '';
  removeValidatorEvents();
  destroySliderAndEvents();
  resetScaler();
  removeSubmitEventListener();
  imgUploadPreviewImg.removeEventListener('load', handleImageUpload);
};

// клик на пиктограмму крестика модального окна редактора изображений (вызов закрытия окна)
uploadFormExitButton.addEventListener('click', closeImgUploadOverlay);

// нажатие на клавишу [Esc] в модальном окне при неактивной форме fieldset (вызов закрытия окна)
document.addEventListener('keydown', (event) => {
  const isHidden = imgUploadOverlay.classList.contains('hidden');
  const isFieldsetFocused = hashtagsField === document.activeElement || descriptionField === document.activeElement;
  if (event.key === 'Escape' && !isHidden && !isFieldsetFocused) {
    closeImgUploadOverlay();
  }
});


const addImageUploadEvent = () => {
  // выбор нового изображения (вызов открытия окна редактора изображений)
  imgUploadInput.addEventListener('change', () => {
    const imageFile = imgUploadInput.files[0];
    const imageSrc = URL.createObjectURL(imageFile);
    imgUploadPreviewImg.src = imageSrc;
    previewEffects.forEach((preview) =>{
      preview.style.backgroundImage = `url(${imageSrc})`;
    });
    imgUploadPreviewImg.addEventListener('load', handleImageUpload);
  });
};


export { addImageUploadEvent, closeImgUploadOverlay };

/**
 для отладки
*/

// imgUploadOverlay.classList.remove('hidden');
// document.querySelector('body').classList.add('modal-open');
// runSlider(); // imageUploadForm.js
