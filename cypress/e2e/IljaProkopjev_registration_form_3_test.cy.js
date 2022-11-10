beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
    describe('Create first test suite for visual tests, radio buttom, dropdown, checkbox, email', () => {
        it('name', () => {
            //сохраниить для второго теста
            cy.get('input[name="name"]').type('Ilja')
            cy.get('[type="radio"]').check('Daily')
            cy.get('[type="checkbox"]').should('have.text','Accept our privacy policy').check()
            cy.get('#country').select('Spain').invoke('val').should('eq','object:3')
            cy.get('#city').select('Malaga').invoke('val').should('eq','string:Malaga')

           

})
})
//Workshop #8 add visual tests for registration form 3
/*
Task list:
* Create first test suite for visual tests
* Create tests to verify visual parts of the page:
    * radio button and its content
    * dropdown and dependencies between 2 dropdowns
    * checkbox, its content and link in it
    * email format
 */


describe('Section 1: visual tests', ()=> {
    it('This is my first test', () => {
    cy.get('');
        // This is empty template
    });
})

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})


//Workshop #9 add functional tests for registration form 3
    describe('Create second test suite for functional tests', () => {
 it('all fields are filled in + validation', () => {
  cy.get('input[name="name"]').type('Ilja')
  cy.get('.email').type('test@test.com')
 cy.get('#country').select('Spain')
 cy.get('#city>option').should('have.length',5)
 cy.get('#city>option').should('not.be.selected')
 cy.get('#city>option').eq(1).should('have.text','Malaga')
 cy.get('#city').select('Malaga')
 cy.get('input[type="date"]').eq(0).type('2022-01-01')
 cy.get('[type="radio"]').check('Daily')
 cy.get('input[type="date"]').eq(1).type('2022-01-01')
 cy.get('[type="checkbox"]').eq(0).check()
 cy.get('[type="checkbox"]').eq(1).check()
 cy.get('input[type=file]').selectFile('package-lock.json').click()
 cy.get('[type="submit"]').eq(1).should('be.visible').click()
 cy.contains("Submission received").should('be.visible')
  })
  //* mandatory fields are absent + validations (use function) done above
  it('mandatory fields are absent + validations (use function)', () => {
  cy.get('[name="email"]').type('wrongEmail')
  cy.contains("Invalid email address.").should('be.visible')
  cy.get('[name="email"]').type('correct@email.com')
  cy.contains("Invalid email address.").should('not.be.visible')
})


it.only('If city is already chosen and country is updated, then city choice should be removed', () => {
cy.get('#country').select('Spain')
cy.get('#city>option').should('have.length',5)
 cy.get('#city>option').should('not.be.selected')
 cy.get('#city>option').eq(1).should('have.text','Malaga')
 cy.get('#city').select('Malaga')
 cy.get('#country').select('Estonia')
 cy.get('#city').should('not.be.selected')
 })
})

