import BasePage from "../Base/BasePage"

const or = require("../../locators.json")
const config = require("../../config.json")

class TeleHealthPage extends BasePage {

    //Entering details of the applicant
    applicationDetails() {
        cy.fixture("candidate").then(data => {
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
            this.type(or.TeleHealthPage.lastname, lname)
            this.type(or.TeleHealthPage.email, emailId)
            this.type(or.TeleHealthPage.phone, phone)
            this.type(or.TeleHealthPage.password, passwrd)
            const fileName = 'resume.txt'
            cy.get("div#upload_txt").attachFile(fileName)
            this.type(or.TeleHealthPage.zipcode, zip)
            this.selectText(or.TeleHealthPage.state, stateValue)
            this.selectText(or.TeleHealthPage.occupation, work)
            this.selectText(or.TeleHealthPage.specialities, speciality)
            this.isChecked(or.TeleHealthPage.emailOption)
            this.iframeClick(or.TeleHealthPage.captchaFrame, or.TeleHealthPage.captcha)
            this.maxPause(10000)
            this.forceClickCss(or.TeleHealthPage.applyNow)
            this.maxPause(5000)
            this.info("=====Job application filled in successfully=====")

        })
    }

    //Validation for rqeuired fields on the
    requiredFieldValidation() {

        cy.fixture("candidate").then(data => {
            const fname = data.firstname
            const lname = data.lastname
            const emailId = data.email1
            const phone = data.phone
            const zip = data.zipcode           

            cy.url().should('include', config.homePageUrl)

            this.inputValuesWithValidation(or.TeleHealthPage.firstname, " ", fname)
            this.inputValuesWithValidation(or.TeleHealthPage.lastname, " ", lname)
            this.inputValuesWithValidation(or.TeleHealthPage.email, "asdfa", emailId)
            this.inputValuesWithValidation(or.TeleHealthPage.phone, "asdfdg", phone)
            this.inputValuesWithValidation(or.TeleHealthPage.zipcode, "abcd", zip)

            this.click(or.TeleHealthPage.emailOption)
            this.fieldValidator(or.TeleHealthPage.emailOption)
            this.minPause()
            this.click(or.TeleHealthPage.emailOption)

            this.forceClickCss(or.TeleHealthPage.applyNow)
            cy.get(or.TeleHealthPage.captchaMsg).should('have.text', config.captchaErrorMessage)
            cy.get(or.TeleHealthPage.information1).should("include.text", config.information1Msg)
            cy.get(or.TeleHealthPage.information2).should("include.text", config.information2Msg)

            cy.url().should('include', config.homePageUrl)
            cy.url().should('not.include', "success")

            this.iframeClick(or.TeleHealthPage.captchaFrame, or.TeleHealthPage.captcha)
            this.minPause()
            this.forceClickCss(or.TeleHealthPage.applyNow)
            this.maxPause() 
        })

    }
    //Validaiton of url and required fields
    fieldValidator(selector){
        this.propertyAssertion(selector, 'required', true)
        this.forceClickCss(or.TeleHealthPage.applyNow)
        this.minPause()
        cy.url().should('include', config.homePageUrl)
        cy.url().should('not.include', "success")
    }
    //reusuable function for field validaiton
    inputValuesWithValidation(selector, value1, value2){
        this.type(selector, value1)
        this.fieldValidator(selector)
        this.type(selector, value2)
    }

}

export default TeleHealthPage