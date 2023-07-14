import TeleHealthPage from "../Pages/TeleHealthPage"
import SuccessPage from "../Pages/SuccessPage"
import 'cypress-iframe'
import { faker } from '@faker-js/faker';

describe("Job application validation", () => {
  const or = require("../../locators.json")
  const teleHealthPg = new TeleHealthPage()
  const successPg = new SuccessPage()
  let email = faker.internet.email()
  let msg;

  beforeEach(() => {
    cy.visit("https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057", { failOnStatusCode: false })

  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  //Validation of successful job application by the candidate

  it("Validation of successful application for the job", () => {
    cy.intercept('POST', 'https://staging.directshifts.com/quick_applications').as('quick_applications')
    teleHealthPg.applicationDetails(email)
    successPg.confirmationMsg()

    //validation of application status with quick application api call
    cy.wait('@quick_applications').then(xhr => {
      console.log(xhr)
      //validation of status code
      expect(xhr.response.statusCode).to.equal(200)

    })
  })

  //Validation of job application by the candidate on resubmission

  it("Validation for resubmission of job application", () => {
    cy.intercept('POST', 'https://staging.directshifts.com/quick_applications').as('quick_applications')
    teleHealthPg.applicationDetails(email)
    successPg.alreadyAppliedMsg()
    cy.get(or.SuccessPage.reapply).then(($text1) => {
      msg = $text1.attr('value')
      expect(msg).to.exist
    })

    //validation of application status with quick application api call
    cy.wait('@quick_applications').then(xhr => {
      console.log(xhr)
      //validation of status code
      expect(xhr.response.statusCode).to.equal(400)
      //validation of reference id
      expect(xhr.response.body.application_duplicate_error).equal(msg)
    })
  })

  //Validaiton of all the required fields and error messages on the job application page

  it("Required field validation", () => {
    teleHealthPg.requiredFieldValidation()
    successPg.confirmationMsg()
  })

  //Validation to find all the broken links on the job application page

  it("Find all broken links on job application page", () => {
    cy.get('a').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'), failOnStatusCode: false
        })
      cy.log(link.prop('href'))
    })
  })

})


