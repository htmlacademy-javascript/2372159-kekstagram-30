/*
https://up.htmlacademy.ru/javascript/30/tasks/14
https://up.htmlacademy.ru/javascript/29/module/8/item/16
Реализовать сценарий просмотра фотографий в полноразмерном режиме. В таком режиме пользователь получает несколько дополнительных возможностей: детально рассмотреть изображение, поставить «лайк», почитать комментарии, оставленные другими пользователями.

1. Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.

2. Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.

3. Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

 - Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

 - Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

 - Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.

 - Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.

 - Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li>

        Копировать


- Описание фотографии description вставьте строкой в блок .social__caption.

После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

Подключите модуль в проект.

*/


const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
//изготовление шаблона комментария для большой картинки вместо двух текущих комментариев
const bigPictureSocialCommentsElement = bigPictureElement.querySelector('.social__comments');
const bigPictureSocialCommentElementTemplate = bigPictureSocialCommentsElement.querySelector('.social__comment').cloneNode(true);
// очистка комментариев по-умолчанию
bigPictureSocialCommentsElement.innerHTML = '';


let photosArray;
let photo;
let photoComments;
const commentsNumberShownElement = bigPictureElement.querySelector('.social__comment-shown-count');
let commentsNumberShown;

// const moreCommentsNumber = 5;
const moreCommentsNumber = +commentsNumberShownElement.textContent;

const closeBigPictureButton = document.querySelector('#picture-cancel');
const loadMoreCommentsButton = document.querySelector('.social__comments-loader.comments-loader');

let smallPictures;


const checkLoadMoreCommentsButton = () => {
  if (commentsNumberShown === +bigPictureElement.querySelector('.social__comment-total-count').textContent){
    loadMoreCommentsButton.classList.add('hidden');
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }
};


// (первоначальное) изготовление первых комментариев для большой картинки при открытии большой картинки
const makeBigPictureCommentsInitial = () => {
  photoComments = photo.comments;
  commentsNumberShownElement.textContent = photoComments.length < moreCommentsNumber ? photoComments.length : moreCommentsNumber;

  commentsNumberShown = photoComments.length < moreCommentsNumber ? photoComments.length : moreCommentsNumber;

  for (let i = 1; i <= commentsNumberShown; i++) {
    const liCommentElement = bigPictureSocialCommentElementTemplate.cloneNode(true);
    liCommentElement.src = photoComments[i - 1].avatar;
    liCommentElement.alt = photoComments[i - 1].name;
    liCommentElement.querySelector('.social__text').textContent = photoComments[i - 1].message;
    bigPictureSocialCommentsElement.appendChild(liCommentElement);
    //console.log(liCommentElement);
    //liCommentElement.
  }
  commentsNumberShownElement.textContent = commentsNumberShown;
  checkLoadMoreCommentsButton();
  // console.log(commentsNumberShown);
};


// изготовление дополнительных комментариев для большой картинки по нажатию кнопки loadMoreCommentsButton
const addMoreComments = () => {
  commentsNumberShown = commentsNumberShown + moreCommentsNumber;
  commentsNumberShown = commentsNumberShown <= photoComments.length ? commentsNumberShown : photoComments.length;
  for (let i = +commentsNumberShownElement.textContent; i <= commentsNumberShown; i++) {
    const liCommentElement = bigPictureSocialCommentElementTemplate.cloneNode(true);
    liCommentElement.src = photoComments[i - 1].avatar;
    liCommentElement.alt = photoComments[i - 1].name;
    liCommentElement.querySelector('.social__text').textContent = photoComments[i - 1].message;
    bigPictureSocialCommentsElement.appendChild(liCommentElement);
    //console.log(liCommentElement);
    //liCommentElement.
  }
  commentsNumberShownElement.textContent = commentsNumberShown;
  checkLoadMoreCommentsButton();
};

/**
 * операции открытия и отрисовки большой картинки +
 * + makeBigPictureCommentsInitial();
 * + bigPictureElement.classList.remove('hidden');
 * + document.body.classList.add('modal-open');
 */
const openBigPicture = (picture) => {
  const tileId = +picture.getAttribute('data-tile-id');
  photo = photosArray.find((item) => item.id === tileId);

  bigPictureImageElement.alt = photo.description;
  bigPictureImageElement.src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  makeBigPictureCommentsInitial();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// операции закрытия большой картинки
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialCommentsElement.innerHTML = '';
};

// ######################## Обработчики событий ##################################

// const smallPicturesClickHandler = (event) => {
//   event.preventDefault();
//   openBigPicture(event.target);
// };

/*
const addSliderEvents = () => {
  sliderElement.noUiSlider.on('update', updateFilter);
  effectsPhotoElement.addEventListener('change', changeEffectHandler);
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

*/


const smallPictureHandler = (event, picture) => {
  event.preventDefault();
  openBigPicture(picture);
};

const addSmallPictureHandler = (picture) => {
  // console.log('addSmallPictureHandler = (picture)');
  picture.addEventListener('click', (event) => {
    smallPictureHandler(event, picture);
  });
  // picture.addEventListener('click', (event) => {
  //   event.preventDefault();
  //   openBigPicture(picture);
  // });
};

const addSmallPicturesHandlers = (pictures) => {
  // console.log('addSmallPicturesHandlers');
  pictures.forEach((picture) => {
    // console.log('forEach((picture)');
    addSmallPictureHandler(picture);
  });
};

const addBigPictureEvents = (photos) => {
  // передача ряда переменных в настоящий модуль
  smallPictures = document.querySelectorAll('.picture');
  photosArray = photos;

  // клик по маленькой картинке для вызова отрисовки большой картинки
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  addSmallPicturesHandlers(photos);
  // smallPictures.forEach((picture) => {
  //   picture.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     openBigPicture(picture);
  //   });
  // });


  loadMoreCommentsButton.addEventListener('click', () => {
    addMoreComments();
  });

  // закрытие большой картинки по [Esc], если открыта большая картинка
  document.addEventListener('keydown', (event) => {
    const isHidden = bigPictureElement.classList.contains('hidden');
    if (event.key === 'Escape' && !isHidden) {
      closeBigPicture();
    }
  });

  // закрытие большой картинки по клику на пиктограмму крестика большой картинки
  closeBigPictureButton.addEventListener('click', () => {
    closeBigPicture();
  });

};

// ##############клик по маленькой картинке для вызова отрисовки большой картинки##################


export { addBigPictureEvents }; // es module
