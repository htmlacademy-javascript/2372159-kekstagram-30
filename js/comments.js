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


/** пункт 5.1), генерация commentId */

const idsArray = []; // Создание пустого массива Ids

const generateCommentId = () => {
  const minId = 1;
  const maxId = 200;
  let counter = 0;
  let isUnique = false;
  let randomNumber;
  if (idsArray.length >= maxId) {
    throw new Error('Maximum comments ids number is exceeded. Cannot generate more ids.');
  }
  while (!isUnique) {
    randomNumber = getRandomInt(minId, maxId);
    isUnique = !idsArray.includes(randomNumber);
    counter++;
    if (counter > maxId * 100) {
      throw new Error('Something is wrong with comment id generation.');
    }
  }
  idsArray.push(randomNumber);
  return randomNumber;
};

/** 5.2) avatar */

const avatarsArray = []; // Создание пустого массива avatars
const refreshAvatars = () => {
  for (let i = 1; i <= commentsLimit; i++) {
    avatarsArray.push(i);
  }
};

const generateAvatar = () => {
  const minId = 1;
  const maxId = avatarsArray.length;
  const randomNumber = getRandomInt(minId, maxId);
  avatarsArray.slice(randomNumber - 1, 1); //поправка на индекс
  return `photos/${randomNumber}.jpg`;
};

/** 5.3) message */

const messagesArrayBasic = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

const generateMessage = () => {
  const messagesArrayCurrent = messagesArrayBasic;
  const numberOfMessages = Math.floor(Math.random() * 2) + 1;
  let newMessage = '';
  const spaceBar = ' ';
  for (let i = 0; i < numberOfMessages; i++) {
    const minId = 1;
    const maxId = messagesArrayCurrent.length;
    const randomMessageNumber = getRandomInt(minId, maxId);
    newMessage += spaceBar + messagesArrayCurrent[randomMessageNumber - 1]; //поправка на индекс
    messagesArrayCurrent.slice(randomMessageNumber - 1, 1); //поправка на индекс
  }

  newMessage = newMessage.trim();

  return newMessage;
};

/** 5.4) generateName */

const namesArray = [
  'Имя 1',
  'Имя 2',
  'Имя 3',
  'Имя 4',
  'Имя 5',
  'Имя 6',
];

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

/** функция добавления комментария в массив */
const addComment = (array, commentCurrent) => {
  array.push(commentCurrent);
};


/** генерация массива комментариев */
const generateComments = () => {
  const commentsArray = []; // Создание пустого массива комментариев

  const randomCommentsNumber = Math.floor(Math.random() * commentsLimit + 1); // Генерация числа от 0 до 30 (commentsLimit)

  for (let i = 0; i < randomCommentsNumber; i++) {
    refreshAvatars();
    const currentComment = generateComment();
    addComment(commentsArray, currentComment);
  }
  idsArray.length = 0;
  return commentsArray;
};


export { generateComments };
