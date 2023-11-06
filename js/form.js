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

// требования к hashtags
// 1. хэш-тег начинается с символа # (решётка);
// 2. строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// 3. хеш-тег не может состоять только из одной решётки;
// 4. максимальная длина одного хэш-тега 20 символов, включая решётку;
const maxHashtagLength = 20;
// 5. хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// 6. хэш-теги разделяются пробелами;
// 7. один и тот же хэш-тег не может быть использован дважды;
// 8. нельзя указать больше пяти хэш-тегов;
const hashtagsMaxCount = 5;
// 10. хэш-теги необязательны;
// 11. если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.



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


fieldset.addEventListener('input', () => {
  pristine.validate();
});

const refineHashtags = (str) => str
  .trim()
  .split(' ')
  .filter((array) => Boolean(array.length))
  .toLowerCase();


const hasValidHashtagsNumber = (value) => (refineHashtags(value).length <= hashtagsMaxCount);

pristine.addValidator(
  hashtagsField,
  hasValidHashtagsNumber,
  'превышено количество хэш-тегов',
  10,
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
