import BasePage from "../Base/BasePage"
import { faker } from '@faker-js/faker';
const or = require("../../locators.json")

class TeleHealthPage extends BasePage {
    
    //Entering details of the applicant
    applicationDetails(mail) {
    
        cy.fixture("ApplicationDetails").then(data => { 

            cy.url().should('include', data.constants.homePageUrl)
            cy.get(or.TeleHealthPage.jobTitle).then((text1) => {
                let value = text1.text()
                expect(value).to.equals(data.constants.jobTitle)
            })
            cy.get(or.TeleHealthPage.signIn).should("be.visible")
            cy.get(or.TeleHealthPage.share).should("be.visible")
            cy.get(or.TeleHealthPage.applyHere).should('be.visible')

            this.type(or.TeleHealthPage.firstname, faker.internet.userName().substring(0,4))
            this.type(or.TeleHealthPage.lastname, faker.internet.userName().substring(0,4))
            this.type(or.TeleHealthPage.email, mail)
            this.type(or.TeleHealthPage.phone, faker.phone.number('501#######'))
            this.type(or.TeleHealthPage.password, data.physiciansJob.password)
            
            const fileName = 'resume.txt'
            cy.get("div#upload_txt").attachFile(fileName)
            this.type(or.TeleHealthPage.zipcode, faker.address.zipCode('#####'))
            this.selectText(or.TeleHealthPage.state, faker.address.state({abbreviated:true}))
            
            this.selectText(or.TeleHealthPage.occupation, data.physiciansJob.occupation)
            this.selectText(or.TeleHealthPage.specialities, data.physiciansJob.specialities)
            this.isChecked(or.TeleHealthPage.emailOption)
            this.iframeClick(or.TeleHealthPage.captchaFrame, or.TeleHealthPage.captcha)            
            this.forceClickCss(or.TeleHealthPage.applyNow)
            this.maxPause()
            this.info("=====Job application filled in successfully=====")
        })
    }

    //Validation for rqeuired fields on the
    requiredFieldValidation() {

        cy.fixture("ApplicationDetails").then(data => {      

            cy.url().should('include', data.constants.homePageUrl)

            this.inputValuesWithValidation(or.TeleHealthPage.firstname, " ", faker.internet.displayName().substring(0,4))
            this.inputValuesWithValidation(or.TeleHealthPage.lastname, " ", faker.internet.displayName().substring(0,4))
            this.inputValuesWithValidation(or.TeleHealthPage.email, faker.internet.displayName().substring(0,4), faker.internet.email())
            this.inputValuesWithValidation(or.TeleHealthPage.phone, faker.internet.displayName().substring(0,4), faker.phone.number('501#######'))
            this.inputValuesWithValidation(or.TeleHealthPage.zipcode, faker.internet.displayName().substring(0,4), faker.address.zipCode('#####'))

            this.click(or.TeleHealthPage.emailOption)
            this.fieldValidator(or.TeleHealthPage.emailOption)
            this.minPause()
            this.click(or.TeleHealthPage.emailOption)

            this.forceClickCss(or.TeleHealthPage.applyNow)
            cy.get(or.TeleHealthPage.captchaMsg).should('have.text', data.constants.captchaErrorMessage)
            cy.get(or.TeleHealthPage.information1).should("include.text", data.constants.information1Msg)
            cy.get(or.TeleHealthPage.information2).should("include.text", data.constants.information2Msg)

            cy.url().should('include', data.constants.homePageUrl)
            cy.url().should('not.include', "success")

            this.iframeClick(or.TeleHealthPage.captchaFrame, or.TeleHealthPage.captcha)
            this.forceClickCss(or.TeleHealthPage.applyNow)
            this.minPause() 
        })

    }
    //Validaiton of url and required fields
    fieldValidator(selector){
        cy.fixture("ApplicationDetails").then(data => {  
        this.propertyAssertion(selector, 'required', true)
        this.forceClickCss(or.TeleHealthPage.applyNow)        
        cy.url().should('include', data.constants.homePageUrl)
        cy.url().should('not.include', "success")
        })
    }
    //reusuable function for field validaiton
    inputValuesWithValidation(selector, value1, value2){
        this.type(selector, value1)
        this.fieldValidator(selector)
        this.type(selector, value2)
    }

}

export default TeleHealthPage