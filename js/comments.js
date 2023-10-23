/*
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

import { getRandomInt } from './common_functions.js';

// Ограничение на количество фотографий
const commentsLimit = 30;

// Массив имен авторов комментариев
const namesArray = [
  'Имя 1',
  'Имя 2',
  'Имя 3',
  'Имя 4',
  'Имя 5',
  'Имя 6',
];

// массив сообщений
const messagesArrayBasic = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];


/** пункт 5.1), генерация commentId */

const commentsIdsArray = []; // Создание пустого массива Ids
const commentsIdLimit = 1000;
const refreshCommentsIdsArray = () => {
  for (let i = 1; i <= commentsIdLimit; i++) {
    commentsIdsArray.push(i);
  }
};

const generateCommentId = () => {
  const minId = 1;
  const maxId = commentsIdsArray.length;
  const randomNumber = getRandomInt(minId, maxId);
  const currentCommentId = commentsIdsArray[randomNumber - 1]; //поправка на индекс
  commentsIdsArray.splice(randomNumber - 1, 1); //поправка на индекс
  return currentCommentId;
};


/** 5.2) avatar */


const generateAvatar = () => {
  const minId = 1;
  const maxId = 6;
  const randomNumber = getRandomInt(minId, maxId);
  return `photos/${randomNumber}.jpg`;
};

/** 5.3) message */


const generateMessage = () => {
  const messagesArrayCurrent = [...messagesArrayBasic];
  const numberOfMessages = Math.floor(Math.random() * 2) + 1;
  let newMessage = '';
  const spaceBar = ' ';
  for (let i = 0; i < numberOfMessages; i++) {
    const minId = 1;
    const maxId = messagesArrayCurrent.length;
    const randomMessageNumber = getRandomInt(minId, maxId);
    newMessage += spaceBar + messagesArrayCurrent[randomMessageNumber - 1]; //поправка на индекс
    messagesArrayCurrent.splice(randomMessageNumber - 1, 1); //поправка на индекс
  }

  newMessage = newMessage.trim();

  return newMessage;
};

/** 5.4) generateName */

const generateName = () => {
  const minId = 1;
  const maxId = namesArray.length;
  const randomNumber = getRandomInt(minId, maxId);
  return namesArray[randomNumber - 1]; //поправка на индекс
};

/** генерация объекта */
const generateComment = () => {
  const comment = {
    id: generateCommentId(),
    avatar: generateAvatar(),
    message: generateMessage(),
    name: generateName(),
  };
  return comment;
};


/** генерация массива комментариев */
const generateComments = () => {
  const commentsArray = []; // Создание пустого массива комментариев

  const randomCommentsNumber = Math.floor(Math.random() * commentsLimit + 1); // Генерация числа от 0 до 30 (commentsLimit)

  refreshCommentsIdsArray();

  for (let i = 0; i < randomCommentsNumber; i++) {
    const currentComment = generateComment();
    commentsArray.push(currentComment);
    //addComment(commentsArray, currentComment);
  }
  return commentsArray;
};


export { generateComments };
