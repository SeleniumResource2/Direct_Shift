import BasePage from "../Base/BasePage"

const or = require ("../../locators.json")


class SuccessPage extends BasePage{ 
    //When application submitted intially
    confirmationMsg(){
        cy.fixture("ApplicationDetails").then(data => {     
        cy.url().should('include', "success")        
        cy.get(or.SuccessPage.confirmation).then((text1) => {
            let value = text1.text()
            expect(value).to.include(data.constants.successMsg)
          })
        })
    }
    
    //When application is re-submitted
    alreadyAppliedMsg(){
        cy.url().should('not.include', "success")        
        cy.get(or.SuccessPage.reapply).then(($text1) => {
            let msg = $text1.attr('value')
            expect(msg).to.include("Already Applied")
          })
    }

}
export default SuccessPage