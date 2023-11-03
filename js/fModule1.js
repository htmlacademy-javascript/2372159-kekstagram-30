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
const bigPictureSocialCommentCountClass = bigPictureClass.querySelector('.social__comment-count');
//const bigPictureCommentsShownClass = bigPictureClass.querySelector('.social__comment-shown-count');
//const commentShownCount = +bigPictureCommentsShownClass.textContent;
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
const bigPictureSocialCommentClass = bigPictureClass.querySelector('.social__comments');

//6. Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
// для события нажатия на кнопку
const cancelButtonClass = document.querySelector('#picture-cancel');

const makeLiCommentElements = (photo) => {
  const comments = photo.comments;
  //console.log(comments);
  //console.log(bigPictureSocialCommentClass);
  for (let i = 1; i <= 2; i++) {
    const liCommentElement = bigPictureSocialCommentClass.querySelector(`.social__comments li:nth-child(${i})`);
    liCommentElement.src = comments[i - 1].avatar;
    liCommentElement.alt = comments[i - 1].name;
    liCommentElement.querySelector('.social__text').textContent = comments[i - 1].message;
    //console.log(liCommentElement);
    //liCommentElement.
  }
};

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
      bigPictureSocialCommentCountClass.classList.add('hidden');
      // 5.После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
      document.body.classList.add('modal-open');
    }
  });
  // пп5..6
  cancelButtonClass.addEventListener('click', () => {
    bigPictureClass.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureSocialCommentCountClass.classList.remove('hidden');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      // Handle the Esc key press event here
      bigPictureClass.classList.add('hidden');
      document.body.classList.remove('modal-open');
      bigPictureSocialCommentCountClass.classList.remove('hidden');
    }
  });


};


export { renderGallery }; // es module
