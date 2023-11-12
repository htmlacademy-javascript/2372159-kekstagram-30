//https://refreshless.com/nouislider/

/** Шаг масштабирования */
const SCALE_STEP = 25;

/** document.querySelector('.img-upload__preview'); */
const imgPreviewElement = document.querySelector('.img-upload__preview');

//масштабирование изображения
/** document.querySelector('.scale__control--value');  */
const scaleControlValue = document.querySelector('.scale__control--value');
const downScaleButton = document.querySelector('.scale__control--smaller');
const upScaleButton = document.querySelector('.scale__control--bigger');

const convertScale = (value) => +value.replace('%', '');

const scaleImage = (value) => {
  imgPreviewElement.style.transform = `scale(${value / 100})`;
};

//############### Event handlers ################
const upScaleHandler = () => {
  let newScale = convertScale(scaleControlValue.value) + SCALE_STEP;
  newScale = newScale > 100 ? 100 : newScale;
  scaleImage(newScale);
  scaleControlValue.value = `${newScale}%`;
};

const downScaleHandler = () => {
  let newScale = convertScale(scaleControlValue.value) - SCALE_STEP;
  newScale = newScale < SCALE_STEP ? SCALE_STEP : newScale;
  scaleImage(newScale);
  scaleControlValue.value = `${newScale}%`;
};

const addScaleEvents = () => {
  upScaleButton.addEventListener('click', upScaleHandler);
  downScaleButton.addEventListener('click', downScaleHandler);
};

const removeScaleEvents = () => {
  upScaleButton.removeEventListener('click', upScaleHandler);
  downScaleButton.removeEventListener('click', downScaleHandler);
};

const resetScaler = () => {
  scaleControlValue.value = '100%';
  removeScaleEvents();
};

//############### main function ################

const runScaler = () => {
  addScaleEvents();
};


export { runScaler, resetScaler }; // es module
