const smallPictureHandler = (event, picture) => {
  event.preventDefault();
  openBigPicture(picture);
};

const addSmallPictureHandler = (picture) => {
  const clickHandler = (event) => {
    smallPictureHandler(event, picture);
  };

  picture.addEventListener('click', clickHandler);

  // Store the reference to the event listener function
  picture.clickHandler = clickHandler;
};

const removeSmallPictureHandler = (picture) => {
  picture.removeEventListener('click', picture.clickHandler);
};

const removeSmallPicturesHandlers = () => {
  smallPictures.forEach((picture) => {
    removeSmallPictureHandler(picture);
  });
};