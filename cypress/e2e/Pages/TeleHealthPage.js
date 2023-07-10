import BasePage from "../Base/BasePage"

const or = require ("../../locators.json")
const config = require ("../../config.json")

class TeleHealthPage extends BasePage{  
    
    //Entering details of the applicant
    applicationDetails(){
        cy.fixture("candidate").then(data =>
        {
            const fname = data.firstname
            const lname = data.lastname
            const emailId = data.email
            const phone = data.phone
            const passwrd = data.password
            const zip = data.zipcode  
            const stateValue = data.state
            const work = data.occupation
            const speciality = data.specialities

        cy.url().should('include', config.homePageUrl)  
        cy.get(or.TeleHealthPage.jobTitle).then((text1) => {
            let value = text1.text()
            expect(value).to.equals(config.jobTitle)
          })       
        cy.get(or.TeleHealthPage.signIn).should("be.visible")
        cy.get(or.TeleHealthPage.share).should("be.visible")
        cy.get(or.TeleHealthPage.applyHere).should('be.visible')

        this.type(or.TeleHealthPage.firstname, fname)        
        this.propertyAssertion(or.TeleHealthPage.firstname, 'required', true)
        this.type(or.TeleHealthPage.lastname, lname)
        this.propertyAssertion(or.TeleHealthPage.lastname, 'required', true)
        this.type(or.TeleHealthPage.email, emailId)
        this.propertyAssertion(or.TeleHealthPage.email, 'required', true)
        this.type(or.TeleHealthPage.phone, phone)
        this.propertyAssertion(or.TeleHealthPage.phone, 'required', true)
        this.type(or.TeleHealthPage.password, passwrd)
        const fileName = 'resume.txt'
        cy.get("div#upload_txt").attachFile(fileName)        
        this.type(or.TeleHealthPage.zipcode, zip)
        this.propertyAssertion(or.TeleHealthPage.zipcode, 'required', true)
        this.selectText(or.TeleHealthPage.state, stateValue)
        this.selectText(or.TeleHealthPage.occupation, work)
        this.selectText(or.TeleHealthPage.specialities, speciality)  
        this.propertyAssertion(or.TeleHealthPage.emailOption, 'required', true)  
        this.isChecked(or.TeleHealthPage.emailOption)  
        this.iframeClick(or.TeleHealthPage.captchaFrame, or.TeleHealthPage.captcha)
        this.maxPause(10000)
        this.forceClickCss(or.TeleHealthPage.applyNow)
        this.maxPause(5000)
        this.info("=====Job application filled in successfully=====")
        
    })
    }
   
    
    errorValidation() {  
           
            cy.url().should('include', config.homePageUrl) 
            cy.get('input:invalid').should('have.length', 5)       
         
                cy.get('input:invalid').should('have.length', 0)
                cy.get(or.TeleHealthPage.email).type('not_an_email')

                cy.get(or.TeleHealthPage.applyNow).click()
                cy.get('input:invalid').should('have.length', 1)
                cy.get(or.TeleHealthPage.email).then(($input) => {
                  expect($input[0].validationMessage).to.eq('I expect an email!')
                })           
              
            cy.log("Validation completed successfully")
           
    }

}

export default TeleHealthPage