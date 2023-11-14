import esprima from 'esprima';
import fs from 'fs';

// Чтение JavaScript файла
const code = fs.readFileSync('main.js', 'utf-8');

// Парсинг кода в AST
const ast = esprima.parseScript(code, { loc: true });

// Вывод AST в консоль
console.log(JSON.stringify(ast, null, 2));
