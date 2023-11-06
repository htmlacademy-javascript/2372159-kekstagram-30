// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
//для работы с формой редактирования
const previewImage = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const fieldset = document.querySelector('.img-upload__text');
const hashtagsField = fieldset.querySelector('.text__hashtags');
const descriptionField = fieldset.querySelector('.text__description');

const uploadForm = document.querySelector('.img-upload__form');

const uploadFormExitButton = document.querySelector('.img-upload__cancel');

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

const pristine = new Pristine(uploadForm,{
  //отвечает за элемент, на который будут навешиваться служебные классы: валидно поле, невалидное
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

//Слушает событие input на поле ввода fieldset
fieldset.addEventListener('input', () => {
  pristine.validate();
});

const refineHashtags = (str) => str
  .trim()
  .toLowerCase()
  .split(' ')
  .filter((array) => Boolean(array.length));


const hasValidHashtagsNumber = (value) => (refineHashtags(value).length <= hashtagsMaxCount);

//Нарушен пункт 8: более ${hashtagsMaxCount} хэш-тегов
pristine.addValidator(
  hashtagsField,
  hasValidHashtagsNumber,
  `Нарушен пункт 8: более ${hashtagsMaxCount} хэш-тегов`,
  10,
  true);

//Нарушен один из пунктов: 1, 2, 3, 4, 6
const hashtagsMultiValidate = (value) => {
  const arrayedHashtag = refineHashtags(value);
  const regex = new RegExp(`^#[a-zа-яё0-9]{1,${maxHashtagLength}}$`, 'i');
  return arrayedHashtag.every((tag) =>(regex.test(tag)));
};

pristine.addValidator(
  hashtagsField,
  hashtagsMultiValidate,
  `
    Нарушен один из пунктов: 1, 2, 3, 4, 6
  `,
  7,
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
  Нарушен пункт 5 и 7: дублирование хэш-тега
  `,
  6,
  true);

const handleImageUpload = () => {
  // previewImage.src = URL.createObjectURL(file);
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

imgUploadInput.addEventListener('change', handleImageUpload);


const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  pristine.reset();
  uploadForm.reset();
  // resetScale
  // resetEffects
};

uploadFormExitButton.addEventListener('click', closeImgUploadOverlay);

// evt.stopPropagation();
document.addEventListener('keydown', (event) => {
  const isHidden = imgUploadOverlay.classList.contains('hidden');
  const isFieldsetFocused = hashtagsField === document.activeElement || descriptionField === document.activeElement;
  if (event.key === 'Escape' && !isHidden && !isFieldsetFocused) {
    closeImgUploadOverlay();
  }
});
