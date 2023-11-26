// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification


const MAX_HASHTAG_LENGTH = 20;
const HASHTAGS_MAX_COUNT = 5;


/** document.querySelector('.img-upload__text'); */
const fieldset = document.querySelector('.img-upload__text');
const hashtagsField = fieldset.querySelector('.text__hashtags');

const uploadForm = document.querySelector('.img-upload__form');

/** document.querySelector('.img-upload__submit'); */
const submitFormButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadForm,{
  //отвечает за элемент, на который будут навешиваться служебные классы: валидно поле, невалидное
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

//Слушает событие input на поле ввода fieldset, дополнительно блокирует кнопку
const validatorEventHandler = () => {
  const isValid = pristine.validate();
  if (isValid) {
    submitFormButton.disabled = false;
  } else {
    submitFormButton.disabled = true;
  }
};

const addValidatorEvents = () => {
  fieldset.addEventListener('input', validatorEventHandler);
};

const removeValidatorEvents = () => {
  fieldset.removeEventListener('input', validatorEventHandler);
};

/**
 * Функция для уточнения хэштегов.
 *
 * @param {*} str - Входная строка.
 * @returns {Array} - Отфильтрованный массив хэштегов filter((array) => Boolean(array.length).
 */

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
    Хэш-тег должен начинаться с символа "#"
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
  Хэш-теги должны разделяться пробелами
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
  Хеш-тег не может состоять только из одной решётки.
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
  Хэш-теги не должны повторяться
  `,
  8,
  true);

//Нарушен пункт 7: более ${hashtagsMaxCount} хэш-тегов
const hasValidHashtagsNumber = (value) => (refineHashtags(value).length <= HASHTAGS_MAX_COUNT);

pristine.addValidator(
  hashtagsField,
  hasValidHashtagsNumber,
  `Более ${HASHTAGS_MAX_COUNT} хэш-тегов`,
  7,
  true);


//Нарушен пункт 2: строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.
const hashtagsMultiValidate = (value) => {
  const arrayedHashtag = refineHashtags(value);
  const regex = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH}}$`, 'i');
  return arrayedHashtag.every((tag) =>(regex.test(tag)));
};

pristine.addValidator(
  hashtagsField,
  hashtagsMultiValidate,
  `
    Строка после "#" должна состоять из букв и чисел.
  `,
  6,
  true);

const runValidator = () => {
  pristine.reset();
  addValidatorEvents();
};


export { runValidator, removeValidatorEvents };

/**
 для отладки
*/

// imgUploadOverlay.classList.remove('hidden');
// document.querySelector('body').classList.add('modal-open');
// runSlider(); // imageUploadForm.js
