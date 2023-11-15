
/*
1. использует метод document.querySelector('#picture') для выбора элемента на странице с id "picture".
2. вызывает textContent на выбранном элементе, чтобы получить текстовое содержимое элемента
3. на полученном текстовом содержимом вызывается метод querySelector('.picture'), чтобы выбрать элемент с классом "picture"
4. результат этого выбора сохраняется в переменную tileTemplate
*/

import { addBigPictureEvents, removeBigPictureEvents } from './bigPicture.js';

const tileTemplate = document
  .querySelector('#picture').content.querySelector('.picture');

// console.log(tileTemplate);

// определяет переменную container и присваивает ей значение, полученное с помощью метода querySelector элемента document. Метод querySelector ищет элемент в документе, соответствующий указанному селектору CSS
const container = document.querySelector('.pictures');

// функция принимает объект в качестве аргумента. В объекте ожидаются свойства url, description, likes и comments
const createTile = ({ url, description, likes, comments, id}) => {
  /* создает копию элемента tileTemplate с помощью метода cloneNode(true). Аргумент true указывает на то, что нужно также клонировать все дочерние элементы tileTemplate.
  Результат клонирования сохраняется в переменную tile. Теперь tile содержит точную копию элемента tileTemplate со всем его содержимым.*/
  const tile = tileTemplate.cloneNode(true);
  // console.log(tile.querySelector('.picture__img'));
  //Адрес изображения url подставьте как атрибут src изображения.
  tile.querySelector('.picture__img').src = url;
  //Описание изображения description подставьте в атрибут alt изображения.
  tile.querySelector('.picture__img').alt = description;
  //Количество лайков likes выведите в блок .picture__likes.
  tile.querySelector('.picture__comments').textContent = comments.length; //но не innerhtml
  //Количество комментариев comments выведите в блок .picture__comments.
  tile.querySelector('.picture__likes').textContent = likes;
  // console.log(tile);
  tile.dataset.tileId = id;
  return tile;
};

const renderTilesInitial = (photos) => {
  // container.querySelectorAll('.picture').forEach((tile) => tile.remove()); // требуется отдельно изучить данную строку
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const tile = createTile(photo);
    fragment.append(tile);
  });
  // console.log(fragment);
  // console.log(container);
  container.append(fragment);
  // console.log('далее начинается addBigPictureEvents(photos);');
  addBigPictureEvents(photos);
};

const renderTiles = (photos) => {
  container.querySelectorAll('.picture').forEach((tile) => tile.remove()); // требуется отдельно изучить данную строку
  removeBigPictureEvents();
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const tile = createTile(photo);
    fragment.append(tile);
  });
  // console.log(fragment);
  // console.log(container);
  container.append(fragment);
  // console.log('далее начинается addBigPictureEvents(photos);');
  addBigPictureEvents(photos);
};

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

const debouncedRenderTiles = debounce(renderTiles, 600);

// export { renderTilesInitial, renderTiles}; // es module
export { renderTilesInitial, debouncedRenderTiles }; // es module
