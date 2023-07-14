// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

Cypress.Commands.add("getXpathForElementWithValue", (value)=>{   
    return cy.get(`//input[@value = '${value}']`);
})

Cypress.Commands.add("toolTipValidation", (Selector, attribute)=>{
   return cy.get(selector).then(($element) => {
        const attributeValue = $element.attr(attribute);
        cy.log("Tooltip value is " + attributeValue)                    
      });         
})

const generateRandomEmail = () => {
  const username = Math.random().toString(36).substring(2);
  const domain = Math.random().toString(36).substring(2);
  return `${username}@${domain}.com`;
};



