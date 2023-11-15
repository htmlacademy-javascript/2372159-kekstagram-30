// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification
// https://up.htmlacademy.ru/javascript/30/criteries

// import { generatePhotosArray } from './mock_photosArray.js';
// import { renderTilesInitial, renderTiles } from './tiles.js';
import { renderTilesInitial, debouncedRenderTiles } from './tiles.js';
// import { addBigPictureEvents } from './bigPicture.js';
import { addImageUploadEvent } from './imageUploadForm.js';
import { getData } from './api.js';
// import { showFilters, initFilters } from './filters.js';
import { initSorters } from './sorters.js';
// import { showSuccessMessage } from './messages.js';
import { showMessage } from './api_messages.js';

// const photosArray = generatePhotosArray();
// const photosArray = getData();
// showMessage('Идёт загрузка данных Идёт загрузка данных Идёт загрузка данных Идёт загрузка данных');
try {
  const photosArray = await getData();
  // renderTiles(photosArray);
  // showFilters();
  //устранение дребезга, чтобы это ни значило
  // const photosArrayDebounced = debounce(photosArray);
  // const debouncedRenderTiles = debounce(renderTiles(photosArray));
  // debouncedRenderTiles();
  renderTilesInitial(photosArray);
  initSorters(photosArray, debouncedRenderTiles);
  // renderTiles(photosArrayDebounced);
  // initFilters(photosArray, debouncedRenderTiles);
  // addBigPictureEvents(photosArray); // перенесено в tiles
  // addBigPictureEvents(photosArrayDebounced);
  addImageUploadEvent();
  // initFilters(photosArray, renderTiles);
  // showSuccessMessage();

} catch (error) {
  //eslint-disable-next-line
  // alert('что-то пошло не так c getData() ');
  showMessage(error.message);

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
