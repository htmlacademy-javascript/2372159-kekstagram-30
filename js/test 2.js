const smallPictureHandler = (event, picture) => {
  event.preventDefault();
  openBigPicture(picture);
};

const addSmallPictureHandler = (picture) => {
  picture.addEventListener('click', (event) => {
    smallPictureHandler(event, picture);
  });
};

const addSmallPicturesHandlers = () => {
  smallPictures.forEach((picture) => {
    addSmallPictureHandler(picture);
  });
};