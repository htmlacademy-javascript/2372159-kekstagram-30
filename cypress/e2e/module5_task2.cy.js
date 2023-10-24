
//const { checkLength, isPalindrome1, strMk1 } = require('../../js/functions');
import { isMeetingWithinWorkingHours } from '../../js/functions.js';


describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

/*
имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:0', '10:0', '8:0', 120);     // true
имяФункции('08:00', '14:30', '14:00', 90); // false
имяФункции('14:00', '17:30', '08:0', 90);  // false
имяФункции('8:00', '17:30', '08:00', 900); // false
*/

it('08:00, 17:30, 14:00, 90, should be true', () => {
  cy.wrap(isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90)).should('be.true');
});

it('8:0, 10:0, 8:0, 120, should be true', () => {
  cy.wrap(isMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120)).should('be.true');
});

it('08:00, 14:30, 14:00, 90, should be false', () => {
  cy.wrap(isMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90)).should('be.false');
});

it('14:00, 17:30, 08:0, 90, should be false', () => {
  cy.wrap(isMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90)).should('be.false');
});

it('8:00, 17:30, 08:00, 900, should be false', () => {
  cy.wrap(isMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900)).should('be.false');
});
