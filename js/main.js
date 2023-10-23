/*
+ 5.14 Модуляция

https://up.htmlacademy.ru/javascript/30/tasks/9
4.16. Больше деталей

В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.

Структура каждого объекта должна быть следующей:

1) id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

2) url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

3) description, строка — описание фотографии. Описание придумайте самостоятельно.

4) likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

5) comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

  {
    id: 135,
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Артём',
  }

  Состав комментария:
  5.1) id — любое число. Идентификаторы не должны повторяться.
  5.2) Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
  5.3) Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

    1 Всё отлично!
    2 В целом всё неплохо. Но не всё.
    3 Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
    4 Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
    5 Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
    6 Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

  5.4) Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/

import { generateComments } from './comments.js';
import { getRandomInt } from './common_functions.js';

// Ограничение на количество фотографий
const photosLimit = 25;

/** пункт 1), генерация id */

const idsArray = []; // Создание пустого массива идентификаторов опубликованной(ых) фотографии(ий)
for (let i = 1; i <= photosLimit; i++) {
  idsArray.push(i);
}

let currentId;

const generateId = () => {
  const minId = 1;
  const maxId = idsArray.length;
  const randomNumber = getRandomInt(minId, maxId);
  currentId = idsArray[randomNumber - 1]; //поправка на индекс
  idsArray.splice(randomNumber - 1, 1); //поправка на индекс
  return currentId;
};

/** пункт 2), генерация url */

let currentUrl;
const generateUrl = () => {
  currentUrl = `photos/${currentId}.jpg`;
  return currentUrl;
};


/** пункт 3), генерация description */

const generateDescription = () => `Описание фотографии №${currentId}`;

/** пункт 4), генерация likes */

const generateLikes = () => {
  const minLikes = 1;
  const maxLikes = 200;
  return getRandomInt(minLikes, maxLikes);
};

/** пункт 5), генерация comments */

// далее создание массива фотографий
const generatePhoto = () => {
  const photo = {
    id: generateId(),
    url: generateUrl(),
    description: generateDescription(),
    likes: generateLikes(),
    comments: generateComments()
  };
  return photo;
};

const photosArray = []; // Создание пустого массива

/** генерация массива фотографий */
const generatePhotosArray = () => {
  for (let i = 0; i < photosLimit; i++) {
    const currentPhoto = generatePhoto();
    photosArray.push(currentPhoto);
    //addPhoto(photosArray, currentPhoto);
  }
  return photosArray;
};

/** запуск основной функции */
//generatePhotosArray();
// Вывод массива фотографий
/*
for (let i = 0; i < photosArray.length; i++) {
  //eslint-disable-next-line
  console.log(photosArray[i]);

  //eslint-disable-next-line
  //console.log(photosArray[i]['comments'].length);
}

*/

generatePhotosArray();

for (let i = 0; i < photosArray.length; i++) {
  //eslint-disable-next-line
  console.log(photosArray[i]);

  //eslint-disable-next-line
  //console.log(photosArray[i]['comments'].length);
}

export { generatePhotosArray };

//npx cypress open
//npm run lint
//npm run start
