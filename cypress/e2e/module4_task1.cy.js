
//const { checkLength, isPalindrome1, strMk1 } = require('../../js/functions');
import { generatePhotosArray } from '../../js/main.js';


describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})


const areIdsUnique = (array) => {
  let isUnique = true;

  array.forEach((element1) => {
    const testedId = element1.id;
    let counterId = 0;

    array.forEach((element2) => {
      if (element2.id === testedId) {
        counterId++;
      }

      if (counterId === 2) {
        isUnique = false;
      }
    });
  });
  return isUnique;
};

it('it check ids uniqueness', () => {
  cy.wrap(areIdsUnique(generatePhotosArray())).should('be.true');
});
