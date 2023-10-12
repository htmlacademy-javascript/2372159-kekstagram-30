
const { checkLength, isPalindrome1, strMk1 } = require('../../js/functions');

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

it('returns true if the string is shorter than 20 characters', () => {
  cy.wrap(checkLength('Wir schaffen das', 20)).should('be.true');
});

it('returns true if the string length is exactly 18 characters', () => {
  cy.wrap(checkLength('Leider nicht heute', 18)).should('be.true');
});

it('returns false if the string is longer than 10 characters', () => {
  cy.wrap(checkLength('Ich verstehe', 10)).should('be.false');
});

it('the string is a palindrome', () => {
  cy.wrap(isPalindrome1('топот')).should('be.true');
});

it('the string is a palindrome regardless of case', () => {
  cy.wrap(isPalindrome1('ДовОд')).should('be.true');
});

it('the string is not a palindrome', () => {
  cy.wrap(isPalindrome1('Кекс')).should('be.false');
});

it('the string is a palindrome', () => {
  cy.wrap(isPalindrome1('Лёша на полке клопа нашёл ')).should('be.true');
});

it('should return 2023', () => {
  cy.wrap(strMk1('2023 год')).should('eq', 2023);
});

it('should return 2022', () => {
  cy.wrap(strMk1('ECMAScript 2022')).should('eq', 2022);
});

it('should return 105', () => {
  cy.wrap(strMk1('1 кефир, 0.5 батона')).should('eq', 105);
});

it('should return 7', () => {
  cy.wrap(strMk1('агент 007')).should('eq', 7);
});

it('should return NaN', () => {
  cy.wrap(strMk1('а я томат')).should('be.NaN');
});

it('should return 2023', () => {
  cy.wrap(strMk1(2023)).should('eq', 2023);
});

it('should return 1', () => {
  cy.wrap(strMk1(-1)).should('eq', 1);
});

it('should return 15', () => {
  cy.wrap(strMk1(1.5)).should('eq', 15);
});
