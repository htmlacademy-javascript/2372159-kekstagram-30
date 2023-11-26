//https://refreshless.com/nouislider/


const PHOTO_EFFECTS = [
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

const initialEffect = PHOTO_EFFECTS[0];

let chosenEffect = initialEffect;

/** document.querySelector('.img-upload__preview'); */
const imgPreviewElement = document.querySelector('.img-upload__preview');
/** радиокнопки  document.querySelector('.effects__preview'); */
const effectsPhotoElement = document.querySelector('.effects');
/** document.querySelector('.effect-level'); */
const sliderElement = document.querySelector('.effect-level__slider');
const sliderHeadElement = document.querySelector('.img-upload__effect-level');


/** вызывается в единственной функции - в runSlider() */
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
};

/** вызывается в:
 * 1) renderSlider() - при событии изменения радиокнопки
 * 2) updateSlider() - при событии изменения ползунка слайдера */
const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
    connect: 'lower',
  });
};

const updateFilter = () => {
  const effect = chosenEffect.style;
  const value = sliderElement.noUiSlider.get();
  const unit = chosenEffect.unit;
  imgPreviewElement.style.filter = `${effect}(${value}${unit})`;
};

/** sliderHeadElement.classList.add('hidden'); */
const hideSlider = () => {
  sliderHeadElement.classList.add('hidden');
  imgPreviewElement.style.filter = 'none';
};

// const showSlider = () => sliderHeadElement.classList.remove('hidden');

/** вызывается при событии изменения радиокнопки изменения эффекта  */
const renderSlider = () => {
  sliderHeadElement.classList.remove('hidden');
  updateSlider();
  updateFilter();
};


const changeEffectHandler = (event) => {
  const effectName = event.target.value;
  const index = PHOTO_EFFECTS.findIndex((effect) => effect.name === effectName);
  chosenEffect = PHOTO_EFFECTS[index];
  if (index === 0) {
    hideSlider();
  } else {
    renderSlider();
  }
};

const addSliderEvents = () => {
  sliderElement.noUiSlider.on('update', updateFilter);
  effectsPhotoElement.addEventListener('change', changeEffectHandler);
};

const removeSliderEvents = () => {
  // sliderElement.noUiSlider.off('update', updateFilter);
  effectsPhotoElement.removeEventListener('change', changeEffectHandler);
};


const destroySliderAndEvents = ()=>{
  chosenEffect = initialEffect;
  sliderElement.noUiSlider.destroy();
  removeSliderEvents();
};

const runSlider = () => {
  hideSlider();
  initSlider();
  addSliderEvents();
};


export { runSlider, destroySliderAndEvents }; // es module

/*

Порядок работы unSlider():

1) runSlider():
  - hideSlider()
  - initSlider()
  - addSliderEvents()

2) addSliderEvents:
  - updateFilter() перехват изменения ползунка слайдера
  - chosenEffect ? hideSlider() : renderSlider(); перехват изменения радиокнопки изменения эффекта

3) renderSlider():
  - sliderHeadElement.classList.remove('hidden')
  - updateSlider()
  - updateFilter()

*/
