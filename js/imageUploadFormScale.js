//https://refreshless.com/nouislider/

/** document.querySelector('.img-upload__preview'); */
const imgPreviewElement = document.querySelector('.img-upload__preview');

//масштабирование изображения
/** document.querySelector('.scale__control--value');  */
const scaleControlValue = document.querySelector('.scale__control--value');
const downScaleButton = document.querySelector('.scale__control--smaller');
const upScaleButton = document.querySelector('.scale__control--bigger');

/** Шаг масштабирования */
const SCALE_STEP = 25;


const convertScale = (value) => +value.replace('%', '');

const scaleImage = (value) => {
  imgPreviewElement.style.transform = `scale(${value / 100})`;
};


const addScaleEvents = () => {
  upScaleButton.addEventListener('click', () => {
    let newScale = convertScale(scaleControlValue.value) + SCALE_STEP;
    newScale = newScale > 100 ? 100 : newScale;
    scaleImage(newScale);
    scaleControlValue.value = `${newScale}%`;
  });

  downScaleButton.addEventListener('click', () => {
    // console.log(scaleControlValue.value);
    let newScale = convertScale(scaleControlValue.value) - SCALE_STEP;
    newScale = newScale < SCALE_STEP ? SCALE_STEP : newScale;
    scaleImage(newScale);
    scaleControlValue.value = `${newScale}%`;
    // console.log(scaleControlValue.value);
  });
};


const resetScale = () => {
  scaleControlValue.value = '100%';
};

const runScaler = () => {
  resetScale();
  addScaleEvents();
};


export { runScaler }; // es module
