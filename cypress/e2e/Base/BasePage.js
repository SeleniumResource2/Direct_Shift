class BasePage {
   
   maxPause() {
      cy.wait(10000)
   }

   minPause() {
      cy.wait(200)
   }

   isVisisible(selector) {
      cy.get(selector).should('be.visible')
   }

   isChecked(selector) {
      cy.get(selector).should('be.checked')
   }

   propertyAssertion(selector, prop, value){
      cy.get(selector).should('have.prop', prop, value)
   }

   type(selector, text) {
      cy.get(selector).type(text)
   }

   forceClickCss(selector) {
      cy.get(selector).click({force: true})
   }

   forceClickContains(selector) {
      cy.contains(selector).click({ force: true })
   }

   forceClickXpath(selector) {
      cy.xpath(selector).click({ force: true })
   }

   forceClickTriggerXpath(selector) {
      cy.xpath(selector).trigger("click").click({ force: true })
   }

   click(selector) {
      cy.get(selector).click()
   }

   clickXpath(selector) {
      cy.xpath(selector).click()
   }

   iframeInput(frame, selector, text) {
      cy.get(frame).its('0.contentDocument.body').find(selector).type(text)
   }

   iframeClick(frame, selector) {
      cy.get(frame).its('0.contentDocument.body').find(selector).click({force: true})
   }

   forceCheck(selector) {
      cy.get(selector).check({ force: true })
   }

   clickXpathTrigger(selector) {
      cy.xpath(selector).trigger("click")
   }

   selectText(selector, value) {
      cy.get(selector).select(value)
   }

   info(message) {
      cy.log(message)
   }

   getXpathForElementWithValue(value) {
      return `//input[@value = '${value}']`;
    }

}

export default BasePage