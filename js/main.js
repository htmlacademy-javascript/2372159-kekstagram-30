// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification
// https://up.htmlacademy.ru/javascript/30/criteries

// import { generatePhotosArray } from './mock_photosArray.js';
import { renderTilesInitial, renderTiles } from './tiles.js';
// import { addBigPictureEvents } from './bigPicture.js';
import { addImageUploadEvent } from './imageUploadForm.js';
import { getData } from './api.js';
// import { showFilters, initFilters } from './filters.js';
import { initFilters } from './filters.js';

const debounce = (callback, timeoutDelay = 1000) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};



// const photosArray = generatePhotosArray();
// const photosArray = getData();
try {
  const photosArray = await getData();
  // renderTiles(photosArray);
  // showFilters();
  //устранение дребезга, чтобы это ни значило
  // const photosArrayDebounced = debounce(photosArray);
  // const debouncedRenderTiles = debounce(renderTiles(photosArray));
  // debouncedRenderTiles();
  renderTilesInitial(photosArray);
  initFilters(photosArray, renderTiles);
  // renderTiles(photosArrayDebounced);
  // initFilters(photosArray, debouncedRenderTiles);
  // addBigPictureEvents(photosArray); // перенесено в tiles
  // addBigPictureEvents(photosArrayDebounced);
  addImageUploadEvent();
  // initFilters(photosArray, renderTiles);
} catch (err) {
  //eslint-disable-next-line
  alert('что-то пошло не так c getData() ');

}

// console.log(photosArray);

// renderTiles(photosArray);
// addBigPictureEvents(photosArray);
// imageUploadEvent();


// export const document = window.document;


//npx cypress open
//npm run lint
//npm run start

// https://github.com/htmlacademy-javascript/2372159-kekstagram-30/pull/11
