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

//1.Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:
const bigPictureClass = document.querySelector('.big-picture');
//-Адрес изображения url подставьте как src изображения внутри блока .big-picture__img
const bigPictureImageClass = bigPictureClass.querySelector('.big-picture__img img');
//-Количество лайков likes подставьте как текстовое содержание элемента .likes-count
const bigPictureLikesCountClass = bigPictureClass.querySelector('.likes-count');
//-Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
let commentShownCount = +bigPictureClass.querySelector('.social__comment-shown-count').textContent;
//console.log(commentShownCount);
//-Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count
const bigPictureCommentsTotalClass = bigPictureClass.querySelector('.social__comment-total-count');
// - Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
//const bigPictureSocialCommentsClass = bigPictureClass.querySelector('.social__comments');

/*
- Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li>
*/
const bigPictureSocialCommentsClass = bigPictureClass.querySelector('.social__comments');
const bigPictureSocialCommentClassTemplate = bigPictureSocialCommentsClass.querySelector('.social__comment').cloneNode(true);
bigPictureSocialCommentsClass.innerHTML = '';

// console.log(bigPictureSocialCommentClassTemplate);
// console.log(bigPictureSocialCommentsClass);
// bigPictureSocialCommentsClass.appendChild(bigPictureSocialCommentClassTemplate);
// console.log(bigPictureSocialCommentsClass);


//6. Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
// для события нажатия на кнопку
const cancelButtonClass = document.querySelector('#picture-cancel');

const makeLiCommentElements = (photo) => {
  const comments = photo.comments;
  commentShownCount = comments.length < 5 ? comments.length : 5;
  bigPictureClass.querySelector('.social__comment-shown-count').textContent = commentShownCount;
  console.log(commentShownCount);
  for (let i = 1; i <= commentShownCount; i++) {
    const liCommentElement = bigPictureSocialCommentClassTemplate.cloneNode(true);
    liCommentElement.src = comments[i - 1].avatar;
    liCommentElement.alt = comments[i - 1].name;
    liCommentElement.querySelector('.social__text').textContent = comments[i - 1].message;
    bigPictureSocialCommentsClass.appendChild(liCommentElement);
    //console.log(liCommentElement);
    //liCommentElement.
  }
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const loadMoreCommentsButton = document.querySelector('.social__comments-loader.comments-loader');

console.log(loadMoreCommentsButton);

loadMoreCommentsButton.addEventListener('click', () => {
  for (let i = 1; i <= 1; i++) {
    const liCommentElement = bigPictureSocialCommentClassTemplate.cloneNode(true);
    liCommentElement.src = comments[i - 1].avatar;
    liCommentElement.alt = comments[i - 1].name;
    liCommentElement.querySelector('.social__text').textContent = comments[i - 1].message;
    bigPictureSocialCommentsClass.appendChild(liCommentElement);
    //console.log(liCommentElement);
    //liCommentElement.
  }
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//- Описание фотографии description вставьте строкой в блок .social__caption
const bigPictureCaptionClass = bigPictureClass.querySelector('.social__caption');

const showBigPicture = (photo) => {
  //console.log(photo);
  //alert(photo.url);
  bigPictureImageClass.alt = photo.description;
  bigPictureImageClass.src = photo.url;
  bigPictureLikesCountClass.textContent = photo.likes;
  //bigPictureCommentsShownClass.textContent = ???? //откуда брать количество показанных комментариев?
  bigPictureCommentsTotalClass.textContent = photo.comments.length;
  makeLiCommentElements(photo);
  bigPictureCaptionClass.textContent = photo.description;
  //alert(bigPictureImageClass.src)
  //alert('рисунок отрисован!')
};


//2. Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
const container = document.querySelector('.pictures');

const renderGallery = (photos) => {
  container.addEventListener('click', (evt) => {
    const tile = evt.target.closest('[data-tile-id]');
    if (tile) {
      const tileId = +tile.dataset.tileId;
      const photo = photos.find((item) => item.id === tileId);
      //console.log(photo);
      //console.log(tileId);
      bigPictureClass.classList.remove('hidden');
      showBigPicture(photo);
      // 4.После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
      //bigPictureSocialCommentCountClass.classList.add('hidden');
      // 5.После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
      document.body.classList.add('modal-open');
    }
  });
  // пп5..6
  cancelButtonClass.addEventListener('click', () => {
    bigPictureClass.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureSocialCommentsClass.innerHTML = '';
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      bigPictureClass.classList.add('hidden');
      document.body.classList.remove('modal-open');
      bigPictureSocialCommentsClass.innerHTML = '';
    }
  });

};


export { renderGallery }; // es module
