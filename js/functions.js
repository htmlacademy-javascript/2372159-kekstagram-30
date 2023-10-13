
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

function checkLength(str = '', limit = 0) {
  if (str.length <= limit) {
    return true;
  } else {
    return false;
  }
}

//console.log(checkLength('Alles wird gut sein', 18));


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

function strMk1(str = '') {
  const result = str.toString().split('').filter((char) => !isNaN(char) && char !== ' ').join('');
  return result === '' || isNaN(result) ? NaN : Number(result);
}

//console.log(strMk1('а я томат'));
//console.log(!isNaN(' '));

//module.exports = { checkLength };
//module.exports = module.exports = { isPalindrome1 };

//npx cypress open

export { checkLength, isPalindrome1, strMk1 };

