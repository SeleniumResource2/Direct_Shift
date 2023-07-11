import TeleHealthPage from "../Pages/TeleHealthPage"
import SuccessPage from "../Pages/SuccessPage"
import 'cypress-iframe'

describe("Job application validation", () => {

  const teleHealthPg = new TeleHealthPage()
  const successPg = new SuccessPage()

  const config = require("../../config.json")

  beforeEach(() => {
    cy.visit("https://staging.directshifts.com/jobs/p/physicians-hospital-telehealth-openings-9057", { failOnStatusCode: false })
  
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  //Validation of successful job application by the candidate

  it("Validation of successful application for the job", () => {      
    teleHealthPg.applicationDetails()
    successPg.confirmationMsg()    
  }) 

  //Validation of job application by the candidate on resubmission

  it("Validation for resubmission of job application", () => {      
    teleHealthPg.applicationDetails()
    successPg.alreadyAppliedMsg()    
  })

  //Validaiton of all the required fields and error messages on the job application page

  it("Required field validation", () => {      
    teleHealthPg.requiredFieldValidation()
    successPg.alreadyAppliedMsg()       
  }) 
  

})