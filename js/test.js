
// Ограничение на количество фотографий
const photosLimit = 25;

/** пункт 1), генерация id */

let currentId = 0;
const generateId = () => {
  if (currentId >= photosLimit) {
    throw new Error('Maximum id value exceeded. Cannot generate more ids.');
  }
  currentId++;
  return currentId;
};


// далее создание массива фотографий
/** объект - фотография */


/** генерация объекта */
const generatePhoto = () => {
  const photo = {
    id: generateId(),
    //url: generateUrl(),
    //description: generateDescription(),
    //likes: generateLikes(),
    //comments: generateComments(Math.floor(Math.random() * 30))
  };
  return photo;
};

const photosArray = []; // Создание пустого массива

/** функция добавления фотографии в массив */
const addPhoto = (array, photoCurrent) => {
  array.push(photoCurrent);
};

/** генерация массива фотографий */
const generatePhotosArray = () => {
  for (let i = 0; i < photosLimit; i++) {
    const currentPhoto = generatePhoto();
    //eslint-disable-next-line
    console.log(currentPhoto);
    addPhoto(photosArray, currentPhoto);
  }
};

generatePhotosArray();


