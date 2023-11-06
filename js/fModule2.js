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

// const smallPictures = document.querySelector('.picture');

// console.log(smallPictures);

// import { document } from './main.js';

let cancelButtonClass;
let smallPictures;
let photosArray;
let bigPictureSocialCommentsClass;
let bigPictureSocialCommentClassTemplate;
let photo;

const bigPictureClass = document.querySelector('.big-picture');
const bigPictureImageClass = bigPictureClass.querySelector('.big-picture__img img');


// изготовление комментариев для большой картинки
const makeBigPictureComments = () => {
  const comments = photo.comments;

};


// операции открытия и отрисовки большой картинки
const openBigPicture = (picture) => {
  const tileId = +picture.getAttribute('data-tile-id');
  photo = photosArray.find((item) => item.id === tileId);

  bigPictureImageClass.alt = photo.description;
  bigPictureImageClass.src = photo.url;
  bigPictureClass.querySelector('.likes-count').textContent = photo.likes;
  bigPictureClass.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPictureClass.querySelector('.social__caption').textContent = photo.description;

  makeBigPictureComments();

  bigPictureClass.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// операции закрытия большой картинки
const closeBigPicture = () => {
  bigPictureClass.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialCommentsClass.innerHTML = '';
};

const events = (photos) => {
  // передача ряда переменных в настоящий модуль
  smallPictures = document.querySelectorAll('.picture');
  cancelButtonClass = document.querySelector('#picture-cancel');
  photosArray = photos;
  bigPictureSocialCommentsClass = bigPictureClass.querySelector('.social__comments');
  //изготовление шаблона комментария для большой картинки из двух текущих комментариев
  bigPictureSocialCommentClassTemplate = bigPictureSocialCommentsClass.querySelector('.social__comment').cloneNode(true);
  // очистка комментариев по-умолчанию
  bigPictureSocialCommentsClass.innerHTML = '';

  // клик по маленькой картинке для вызова отрисовки большой картинки
  smallPictures.forEach((picture) => {
    picture.addEventListener('click', () => {
      openBigPicture(picture);
    });
  });

  // закрытие окна по Esc, если открыта большая картинка
  document.addEventListener('keydown', (event) => {
    const isHidden = bigPictureClass.classList.contains('hidden');
    if (event.key === 'Escape' && !isHidden) {
      closeBigPicture();
    }
  });

  // закрытие большой картинки по клику на крестик большой картинки
  cancelButtonClass.addEventListener('click', () => {
    closeBigPicture();
  });

};


export { events }; // es module
