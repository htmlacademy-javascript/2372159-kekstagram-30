//https://refreshless.com/nouislider/

/** document.querySelector('.img-upload__preview'); */
const imgPreviewElement = document.querySelector('.img-upload__preview');
/** радиокнопки  document.querySelector('.effects__preview'); */
const effectsPhotoElement = document.querySelector('.effects');
/** document.querySelector('.effect-level'); */
const sliderElement = document.querySelector('.effect-level__slider');
const sliderHeadElement = document.querySelector('.img-upload__effect-level');
// const effectLevelElement = document.querySelector('.effect-level__value');

//масштабирование изображения
/** document.querySelector('.scale__control--value');  */
const scaleControlValue = document.querySelector('.scale__control--value');
const downScaleButton = document.querySelector('.scale__control--smaller');
const upScaleButton = document.querySelector('.scale__control--bigger');


// ########## Фильтр картинки #########################

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

let chosenEffect = initialEffect;

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
  // console.log(sliderElement.noUiSlider.get());
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

const updateFilter = () => {
  const effect = chosenEffect.style;
  const value = sliderElement.noUiSlider.get();
  const unit = chosenEffect.unit;
  imgPreviewElement.style.filter = `${effect}(${value}${unit})`;
};

const hideSlider = () => {
  sliderHeadElement.classList.add('hidden');
  imgPreviewElement.style.filter = 'none';
  // sliderHeadElement.reset();
  // imgPreviewElement.reset();
};

const renderSlider = () => {
  sliderHeadElement.classList.remove('hidden');
  updateSlider();
  updateFilter();
};


const AddSliderEvents = () => {
  // перехват изменения слайдера
  sliderElement.noUiSlider.on('update', () => {
    // console.log(sliderElement.noUiSlider.get());
    updateFilter();
  });
  // перехват радиокнопки изменения эффекта
  effectsPhotoElement.addEventListener('change', (event) => {
    const effectName = event.target.value;
    // console.log(event.target.value);
    const index = photoEffects.findIndex((effect) => effect.name === effectName);
    chosenEffect = photoEffects[index];
    // eslint-disable-next-line
    index === 0 ? hideSlider() : renderSlider();
    // console.log(chosenEffect);
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

const addZoomEvents = () => {
  upScaleButton.addEventListener('click', () => {
    let newScale = convertScale(scaleControlValue.value) + scaleStep;
    newScale = newScale > 100 ? 100 : newScale;
    scaleImage(newScale);
    scaleControlValue.value = `${newScale}%`;
  });
};


const resetScale = () => {
  scaleControlValue.value = '100%';
};

// #############################################################


const runSlider = () => {
  // renderSlider();
  resetScale();
  hideSlider();
  // alert('hideSlider()');
  initSlider();
  // renderSlider();
  // console.log('отработала run slider');
  // updateSlider();
  // console.log(convertScale(document.querySelector('.scale__control--value').value));

  addZoomEvents();
  AddSliderEvents();

};

const destroySliderAndEvents = ()=>{
  sliderElement.noUiSlider.destroy();
};

export { runSlider, destroySliderAndEvents }; // es module
