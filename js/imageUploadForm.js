// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification

import { runSlider, destroySliderAndEvents } from './imageUploadFormEffects.js';

/** document.querySelector('.img-upload__input'); */
const imgUploadInput = document.querySelector('.img-upload__input');
/** document.querySelector('.img-upload__overlay'); */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
/** document.querySelector('.img-upload__preview img'); */
const imgUploadPreview = document.querySelector('.img-upload__preview img');
/** document.querySelector('.img-upload__preview'); */
const previewEffects = document.querySelectorAll('.effects__preview');
//для работы с формой редактирования
/*
 <@&1158316184110911519> Попробуйте следующий алгоритм:

1. Загружаете фото через инпут, который уже содержится в html. К нему можно получить доступ по id "upload-file" или классу "img-upload__input". Думаю, лучше использовать id.

2. Когда фото загружено в инпут, получите к нему доступ через ключ files. Скорее всего нас интересует первый элемент, значит files[0].

3. Создайте экземпляр FileReader через ключевое слово new.

4. Попробуйте прочитать файл, взятый из инпута, используя созданный экземпляр файл ридера. Посмотрите в документации (https://developer.mozilla.org/ru/docs/Web/API/FileReader) какие есть методы, выберите подходящий.

5. FileReader читает файлы асинхронно, чтобы извлечь результат, подпишитесь на соответствующее событие. Цитата из документации: "FileReader.onload. Обработчик для события load (en-US). Это событие срабатывает при каждом успешном завершении операции чтения."

6. Посмотрите, что было получено в результате чтения, можем ли мы применить эти данные, чтобы появилось нужное нам изображение
https://developer.mozilla.org/ru/docs/Web/API/FileReader
*/

/** document.querySelector('.img-upload__text'); */
const fieldset = document.querySelector('.img-upload__text');
const hashtagsField = fieldset.querySelector('.text__hashtags');
const descriptionField = fieldset.querySelector('.text__description');

const uploadForm = document.querySelector('.img-upload__form');

const uploadFormExitButton = document.querySelector('.img-upload__cancel');
/** document.querySelector('.img-upload__submit'); */
const submitFormButton = document.querySelector('.img-upload__submit');


/* ######################################################################
                            раздел валидации
###################################################################### */


// требования к hashtags
// +1. хэш-тег начинается с символа # (решётка);
// +2. строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// +3. хеш-тег не может состоять только из одной решётки;
// +4. максимальная длина одного хэш-тега 20 символов, включая решётку;
const maxHashtagLength = 20;
// +5. хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// +6. хэш-теги разделяются пробелами;
// +7. один и тот же хэш-тег не может быть использован дважды;
// +8. нельзя указать больше пяти хэш-тегов;
const hashtagsMaxCount = 5;
// +10. хэш-теги необязательны;
// +11. если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.


// console.log(imgUploadInput);

/*
https://pristine.js.org
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // check if the form is valid
  var valid = pristine.validate(); // returns true or false

});
*/

/* ######################################################################
        раздел валидации и блокировки отправки
###################################################################### */

const pristine = new Pristine(uploadForm,{
  //отвечает за элемент, на который будут навешиваться служебные классы: валидно поле, невалидное
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

//Слушает событие input на поле ввода fieldset, дополнительно блокирует кнопку
fieldset.addEventListener('input', () => {
  const isValid = pristine.validate();
  // eslint-disable-next-line
  isValid ? submitFormButton.disabled = false : submitFormButton.disabled = true;
});

const refineHashtags = (str) => str
  .trim()
  .toLowerCase()
  .split(' ')
  .filter((array) => Boolean(array.length));


//Restriction 1: хэш-тег начинается с символа # (решётка);
const hasRestriction1 = (value) => {
  const arrayedHashtag = refineHashtags(value);
  return arrayedHashtag.every((tag) =>(tag.startsWith('#')));
};

pristine.addValidator(
  hashtagsField,
  hasRestriction1,
  `
    Нарушен пункт 1: хэш-тег должен начинаться с символа #
  `,
  11,
  true);


//Restriction 6: хэш-теги разделяются пробелами;
const hasRestriction6 = (value) => {
  const arrayedHashtag = refineHashtags(value);
  return !arrayedHashtag.some((tag) => tag.split('#').length > 2);
};

pristine.addValidator(
  hashtagsField,
  hasRestriction6,
  `
    Нарушен пункт 6: хэш-теги разделяются пробелами
  `,
  10,
  true);


//Нарушен пункт 3: хеш-тег не может состоять только из одной решётки
const hasHashOnly = (value) => {
  const arrayedHashtag = refineHashtags(value);
  return arrayedHashtag.every((tag) =>(tag.length !== 1));
};

pristine.addValidator(
  hashtagsField,
  hasHashOnly,
  `
  Нарушен пункт 3: хеш-тег не может состоять только из одной решётки
  `,
  9,
  true);

//Нарушен пункт 5 и 7: дублирование хэш-тега
const hasDuplicates = (value) => {
  const arrayedHashtag = refineHashtags(value);
  return new Set(arrayedHashtag).size === arrayedHashtag.length;
};

pristine.addValidator(
  hashtagsField,
  hasDuplicates,
  `
  Нарушен пункт 7: дублирование хэш-тега
  `,
  8,
  true);

//Нарушен пункт 7: более ${hashtagsMaxCount} хэш-тегов
const hasValidHashtagsNumber = (value) => (refineHashtags(value).length <= hashtagsMaxCount);

pristine.addValidator(
  hashtagsField,
  hasValidHashtagsNumber,
  `Нарушен пункт 8: более ${hashtagsMaxCount} хэш-тегов`,
  7,
  true);


//Нарушен пункт 2: строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.
const hashtagsMultiValidate = (value) => {
  const arrayedHashtag = refineHashtags(value);
  const regex = new RegExp(`^#[a-zа-яё0-9]{1,${maxHashtagLength}}$`, 'i');
  return arrayedHashtag.every((tag) =>(regex.test(tag)));
};

pristine.addValidator(
  hashtagsField,
  hashtagsMultiValidate,
  `
    Нарушен пункт 2: строка после "#" должна состоять из букв и чисел.
  `,
  6,
  true);

/* ######################################################################
      раздел открытия-закрытия модального окна редактора изображений
###################################################################### */


// закрытие окна редактора изображений
const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  pristine.reset();
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
  // document.querySelector('.img-upload__preview').style = '';
  // imgUploadPreview.src = '';
  // previewEffects.forEach((preview) =>{
  //  console.log(preview);
  //  console.log(preview.style.backgroundImage);
  //   preview.style.backgroundImage = `url(${imageSrc})`;
  // destroySliderAndEvents();
  runSlider(); // imageUploadForm.js
};

const imageUploadEvent = () => {
  // выбор нового изображения (вызов открытия окна редактора изображений)
  imgUploadInput.addEventListener('change', () => {
    handleImageUpload();
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
  });
};

export { imageUploadEvent };

/**
 для отладки
*/

// imgUploadOverlay.classList.remove('hidden');
// document.querySelector('body').classList.add('modal-open');
// runSlider(); // imageUploadForm.js
