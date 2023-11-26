// https://up.htmlacademy.ru/javascript/30/project/kekstagram#specification
// https://up.htmlacademy.ru/javascript/30/criteries
// https://up.htmlacademy.ru/javascript/30/tasks/23

import { renderTilesInitial, debouncedRenderTiles } from './tiles.js';
import { addImageUploadEvent } from './imageUploadForm.js';
import { transferData } from './api.js';
import { initSorters } from './sorters.js';
import { showMessage } from './api_messages.js';


try {
  const photosArray = await transferData('get');
  renderTilesInitial(photosArray);
  initSorters(photosArray, debouncedRenderTiles);
  addImageUploadEvent();

} catch (error) {
  showMessage(error.message);
}


//npx cypress open
//npm run lint
//npm run start

// https://github.com/htmlacademy-javascript/2372159-kekstagram-30/pull/11
