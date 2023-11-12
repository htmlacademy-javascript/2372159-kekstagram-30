// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification

import { runSlider, destroySliderAndEvents } from './imageUploadFormEffects.js';
import { runScaler } from './imageUploadFormScale.js';
import { runValidator } from './imageUploadFormValidation.js';

/** document.querySelector('.img-upload__input'); */
const imgUploadInput = document.querySelector('.img-upload__input');
/** document.querySelector('.img-upload__overlay'); */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
/** document.querySelector('.img-upload__preview img'); */
const imgUploadPreview = document.querySelector('.img-upload__preview img');
/** document.querySelector('.img-upload__preview'); */
const previewEffects = document.querySelectorAll('.effects__preview');

/** document.querySelector('.img-upload__text'); */
const fieldset = document.querySelector('.img-upload__text');
const hashtagsField = fieldset.querySelector('.text__hashtags');
const descriptionField = fieldset.querySelector('.text__description');

const uploadForm = document.querySelector('.img-upload__form');

const uploadFormExitButton = document.querySelector('.img-upload__cancel');
/** document.querySelector('.img-upload__submit'); */


/* ######################################################################
      раздел открытия-закрытия модального окна редактора изображений
###################################################################### */


// закрытие окна редактора изображений
const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadForm.reset();
  destroySliderAndEvents();
  // document.querySelector('.img-upload__preview').style.filter = 'none';
  // resetScale
  // resetEffects
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

/** открытие окна редактора изображений */
const handleImageUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  runValidator();
  runScaler();
  runSlider();
};

const imageUploadEvent = () => {
  // выбор нового изображения (вызов открытия окна редактора изображений)
  imgUploadInput.addEventListener('change', () => {
    // handleImageUpload();
    // console.log(imgUploadInput.files);
    const imageFile = imgUploadInput.files[0];
    const imageSrc = URL.createObjectURL(imageFile);
    // console.log(imgUploadPreview);
    imgUploadPreview.src = imageSrc;
    // console.log(imgUploadPreview);
    // console.log(document.querySelector('.effects__preview'));
    // console.log(imageSrc);
    // console.log(previewEffects);
    previewEffects.forEach((preview) =>{
      // console.log(preview);
      // console.log(preview.style.backgroundImage);
      preview.style.backgroundImage = `url(${imageSrc})`;
    });
    imgUploadPreview.addEventListener('load', () => {
      handleImageUpload();
    }, { once: true });
  });
};


export { imageUploadEvent };

/**
 для отладки
*/

// imgUploadOverlay.classList.remove('hidden');
// document.querySelector('body').classList.add('modal-open');
// runSlider(); // imageUploadForm.js
