
// https://up.htmlacademy.ru/javascript/29/module/12/item/14

const PICTURES_PACK = 10;

const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = FILTER.DEFAULT;

let sortedPhotosArray = [];

// const shuffle = (array) => {
//   return
// }

const getFilteredPictures = () => {
  //caniuse.com/?search=toSorted
  switch (currentFilter) {
    case FILTER.DEFAULT:
      return [...sortedPhotosArray];
    case FILTER.RANDOM:
      return sortedPhotosArray.toSorted(() => Math.random() - 0.5).slice(0, PICTURES_PACK);
    case FILTER.DISCUSSED:
      return sortedPhotosArray.toSorted((a, b) => b.comments.length - a.comments.length);
      // return pictures
      //   .slice()
      //   .sort((a, b) => b.comments.length - a.comments.length)
      //   .slice(0, PICTURES_PACK);
    default:
      throw new Error('Unknown filter type');
  }
};

const setOnFilterClick = (callback) => {
// const setOnFilterClick = () => {
  filterElement.addEventListener('click', (evt) => {
    //делегирование
    //требуется уделить внимание этому месту
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    // console.log(clickedButton);
    if (clickedButton.id === currentFilter) {
      return;
    }
    // строка 20 index.html
    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    currentFilter = clickedButton.id;
    // console.log(currentFilter);
    // getFilteredPictures()
    // console.log(getFilteredPictures());
    callback(getFilteredPictures()); //callback = renderTiles
  });

};

export const showFilters = () => filterElement.classList.remove('img-filters--inactive');

export const initFilters = (initialPhotosArray, callback) => {
  showFilters();
  // Копирует все элементы массива loadedPictures
  // Поверхностное копирование const deepCopyArray = deepCopy(originalArray);
  sortedPhotosArray = [...initialPhotosArray];
  setOnFilterClick(callback);//callback = renderTiles
};
