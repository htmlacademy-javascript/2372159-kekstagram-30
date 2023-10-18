const avatarsArray = []; // Создание пустого массива avatars

const commentsLimit = 20;

const refreshAvatars = () => {
  for (let i = 1; i <= commentsLimit; i++) {
    avatarsArray.push(i);
  }
};

refreshAvatars();

avatarsArray.splice(10, 1);

console.log(avatarsArray);
