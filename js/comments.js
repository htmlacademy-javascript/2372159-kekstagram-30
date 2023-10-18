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

// Ограничение на количество фотографий
const commentsLimit = 30;


/** пункт 5.1), генерация commentId */

const idsArray = []; // Создание пустого массива Ids

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
const generateAvatar = () => {
  return 100;
};

/** 5.3) message */
const generateMessage = () => {
  return 100;
};

/** 5.4) generateName */
const generateName = () => {
  return 100;
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
    const currentComment = generateComment();
    addComment(commentsArray, currentComment);
  }
  idsArray.length = 0;
  return commentsArray;
};


export { generateComments };
