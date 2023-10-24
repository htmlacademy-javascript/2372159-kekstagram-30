
//##2.29 Нужно больше функций
//###Функции для тренировки
/*
Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:

// Строка короче 20 символов
имяФункции('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
имяФункции('проверяемая строка', 18); // true
// Строка длиннее 10 символов
имяФункции('проверяемая строка', 10); // false
*/

function isLengthValid(str = '', limit = 0) {
  if (str.length <= limit) {
    return true;
  } else {
    return false;
  }
}

//console.log(isLengthValid('Alles wird gut sein', 18));


/*
Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. Например:

// Строка является палиндромом
имяФункции('топот'); // true
// Несмотря на разный регистр, тоже палиндром
имяФункции('ДовОд'); // true
// Это не палиндром
имяФункции('Кекс');  // false
*/

function isPalindrome1(str = '') {
  //cast to string
  str = str.toString().toLowerCase().replaceAll(' ', '');
  if (str === str.split('').reverse().join('')) {
    return true;
  } else {
    return false;
  }
}

/*
function isPalindrome2(str = '') {
  const normalizedStr = str.toString().replaceAll(' ', '').toLowerCase();
  let reversedStr = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }
  return normalizedStr === reversedStr;
}
*/

//console.log(isPalindrome1('Лёша на полке клопа нашёл'));

/*
Дополнительное задание

Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

имяФункции('2023 год');            // 2023
имяФункции('ECMAScript 2022');     // 2022
имяФункции('1 кефир, 0.5 батона'); // 105
имяФункции('агент 007');           // 7
имяФункции('а я томат');           // NaN
Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число. Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:

имяФункции(2023); // 2023
имяФункции(-1);   // 1
имяФункции(1.5);  // 15
*/

// cast to string modified

function filterNumbers(str = '') {
  const result = str.toString().split('').filter((char) => !isNaN(char) && char !== ' ').join('');
  return result === '' || isNaN(result) ? NaN : Number(result);
}

//console.log(strMk1('а я томат'));
//console.log(!isNaN(' '));

//module.exports = { checkLength };
//module.exports = module.exports = { isPalindrome1 };


//#5.16. Функции возвращаются
/*
Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.
*/

const convertTime = (str1) => {
  const c1 = ':';

  const dDawnArray = str1.split(c1);
  const hour = dDawnArray[0];
  const minute = dDawnArray[1];

  const year = 2023;
  const month = 0; // Январь (отсчет месяцев начинается с 0)
  const date = 15; // число
  const hours = hour;
  const minutes = minute;
  const seconds = 0;
  const milliseconds = 0;

  const myDate = new Date();
  myDate.setFullYear(year);
  myDate.setMonth(month);
  myDate.setDate(date);
  myDate.setHours(hours);
  myDate.setMinutes(minutes);
  myDate.setSeconds(seconds);
  myDate.setMilliseconds(milliseconds);
  //console.log(myDate.getTime());
  return myDate;
};

const isMeetingWithinWorkingHours = (dDawn, dEnd, mStart, mLasting) => {
  let isPossible = true;
  const dDawnDate = convertTime(dDawn);
  const dEndDate = convertTime(dEnd);
  const mStartDate = convertTime(mStart);
  const mEndDate = new Date(mStartDate.setMinutes(mStartDate.getMinutes() + mLasting));
  //console.log(mEndDate.getTime());
  if (dDawnDate.getTime() > mStartDate.getTime()){
    isPossible = false;
  }
  if (mEndDate.getTime() > dEndDate.getTime()) {
    isPossible = false;
  }
  return isPossible;
};

//npx cypress open
//npm run lint
//npm run start


export { isLengthValid as checkLength, isPalindrome1, filterNumbers as strMk1, isMeetingWithinWorkingHours };

