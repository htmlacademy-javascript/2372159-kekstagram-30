//https://refreshless.com/nouislider/

const imgPreviewElement = document.querySelector('.img-upload__preview');
const effectsPhotoElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderHeadElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

//масштабирование изображения
const scaleControlValue = document.querySelector('.scale__control--value');
const downScaleButton = document.querySelector('.scale__control--smaller');
const upScaleButton = document.querySelector('.scale__control--bigger');


const renderSlider = () => sliderHeadElement.classList.remove('hidden');
const hideSlider = () => sliderHeadElement.classList.add('hidden');


const photoEffects = [
  {
    name : 'none',
    style : 'none',
    min : 0 ,
    max : 100 ,
    step : 1,
    unit : '',
  },
  {
    name : 'chrome',
    style : 'grayscale',
    min : 0 ,
    max : 1,
    step : 0.1,
    unit : ''
  },
  {
    name : 'sepia',
    style : 'sepia',
    min : 0,
    max : 1,
    step : 0.1,
    unit : '',
  },
  {
    name : 'marvin',
    style : 'invert',
    min : 0,
    max : 100,
    step : 1,
    unit : '%',
  },
  {
    name : 'phobos',
    style : 'blur',
    min : 0,
    max : 3,
    step : 0.1,
    unit : 'px',
  },
  {
    name : 'heat',
    style : 'brightness',
    min : 1,
    max : 3,
    step : 0.1,
    unit : '',
  },
];

const initialEffect = photoEffects[0];

let chosenEffect = photoEffects[1];

// console.log(initialEffect);
// console.log(initialEffect.step);


const initSlider = () => {
  // console.log(sliderElement);
  noUiSlider.create(sliderElement, {
    range: {
      min: initialEffect.min,
      max: initialEffect.max,
    },
    start: initialEffect.max,
    step: initialEffect.step,
    connect: 'lower',
  });
  console.log(sliderElement.noUiSlider.get());
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    connect: 'lower',
  });

};


// ########## Масштабирование картинки #########################

const convertScale = (value) => +value.replace('%', '');
const scaleStep = 25;


const scaleImage = (value) => {
  imgPreviewElement.style.transform = `scale(${value / 100})`;
};

downScaleButton.addEventListener('click', () => {
  // console.log(scaleControlValue.value);
  let newScale = convertScale(scaleControlValue.value) - scaleStep;
  newScale = newScale < scaleStep ? scaleStep : newScale;
  scaleImage(newScale);
  scaleControlValue.value = `${newScale}%`;
  // console.log(scaleControlValue.value);
});

upScaleButton.addEventListener('click', () => {
  let newScale = convertScale(scaleControlValue.value) + scaleStep;
  newScale = newScale > 100 ? 100 : newScale;
  scaleImage(newScale);
  scaleControlValue.value = `${newScale}%`;
});

const resetScale = () => {
  scaleControlValue.reset();
};

// #############################################################


const runSlider = () => {
  renderSlider();
  initSlider();
  // renderSlider();
  console.log('отработала run slider');
  // updateSlider();
  // console.log(convertScale(document.querySelector('.scale__control--value').value));
};


export { runSlider }; // es module
