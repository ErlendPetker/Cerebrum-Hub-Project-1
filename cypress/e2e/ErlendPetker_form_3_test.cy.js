beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
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
    


it('Verify radio button and its content', () => {
    // Array has totally 4 elements
    cy.get('input[type="radio"]').should('have.length', 4)

    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

    // Selecting one will remove selection from other radio button
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="radio"]').eq(1).check().should('be.checked')
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
})

it('Verify dropdown list', () => {

    // Array has totally 4 elements
    cy.get('#country').find('option').should('have.length', 4)
    cy.get('#country').find('option').eq(0).should('not.have.text')
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
         cy.get('#country').select(1).invoke('val')
            cy.get('#city').find('option').eq(0).should('not.have.text')
            cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
            cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
            cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
            cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
         cy.get('#country').select(2).invoke('val')
            cy.get('#country').find('option').eq(0).should('not.have.text')
            cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
            cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
            cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
        cy.get('#country').select(3).invoke('val')
            cy.get('#country').find('option').eq(0).should('not.have.text')
            cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
            cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
            cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')


})


it('Verify checkbox, content and link in it', () => {

    cy.get(':nth-child(15) > .ng-pristine').check().should('be.checked') // Check the first checkbox
    cy.get(':nth-child(15)').should('contain.text', 'Accept our privacy policy') // Check the first checkbox text
    cy.get(':nth-child(15) > :nth-child(2)').check().should('be.checked') // Check the second checkbox
    cy.get('a').should('contain.text', 'Accept our cookie policy').and('have.attr', 'href', 'cookiePolicy.html') // Check the second checkbox text and link

});

it('Check email format', () => {
    cy.get('.email').type('wrongEmail')
    //check that error message appears
    cy.contains("Invalid email address.").should('be.visible')
    //type correct email
    cy.get('.email').clear().type('info@email.com')
    //check that error message disappears
    cy.contains("Invalid email address.").should('not.be.visible')
});



})

//Workshop #9 add functional tests for registration form 3
/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (use function)
    * If city is already chosen and country is updated, then city choice should be removed
    * Bonus task: add file (google yourself for solution)
* Rename file registration_form_3_test.cy.js to contain your name - JohnSmith_form_3_test.cy.js and upload your individual result to  team confluence
 */



describe('Section 2: visual tests', () => {
    
it('all fields are filled in + validation ', () => {
    
    cy.get('#name').clear().type('Name') //Name
    cy.get('.email').clear().type('info@email.com') //Email
    //country and city validating
    cy.get('#country').select(2).invoke('val') // Select country Estonia
    cy.get('#city').select(2).invoke('val') // Select city Haapsalu
    cy.get(':nth-child(8) > input').type('1991-09-26') // Date of birth
    cy.get('[value="Daily"]').check() // Newsletter radio
    cy.get('#birthday').type('1991-09-26') // Birthday
    cy.get('#myFile').selectFile('upload.txt')// File upload
    cy.get(':nth-child(15) > .ng-pristine').check() // Privacy policy
    cy.get(':nth-child(15) > :nth-child(2)').check() // Cookie policy
    cy.get(':nth-child(2) > input').click()
    cy.get('h1').should('have.text', 'Submission received')

});

it('only mandatory fields are filled in + validations', () => {
    cy.get('#name').clear()
    cy.get('.email').clear().type('info@email.com') //Email
    cy.get('#country').select(2).invoke('val') // Select country Estonia
    cy.get('#city').select(2).invoke('val') // Select city Haapsalu
    // It is written in the form description that the birthday is mandatory, but as for the html, submit button is active without choosing birthday. 
    // As long as functionality goes, birthday is not mandatory. 
    cy.get(':nth-child(15) > .ng-pristine').check() // Privacy policy
    cy.get(':nth-child(2) > input').click()
    cy.get('h1').should('have.text', 'Submission received')
});

it('Mandatory fields are absent + validations', () => {
    inputInvalidData()
});

it('If city is already chosen and country is updated, then city choice should be removed', () => {
     //country and city validating
     cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
     cy.get('#country').select(2).invoke('val')
     cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
     cy.get('#city').select(2).invoke('val')
     cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
     cy.get('#country').select(1).invoke('val')
     cy.get('#city').find('option').eq(2).should('not.have.text', 'Haapsalu')
     //
});

it('Add file', () => {
    cy.get('#myFile').selectFile('upload.txt')// File upload
    cy.get('.w3-container > [type="submit"]').should('be.enabled').click() //Submit button enabled and submit
    cy.get('h1').should('have.text', 'Submission received')
});

function inputInvalidData() {
 //function for testing that mandatory fields are absent + validation
    cy.get('#name').clear().type('Name') //Name    
    cy.get('.email').clear().should('not.have.text') // Email should be empty
    cy.get('#country').should('not.have.text') // Country should be empty
    cy.get('#city').should('not.have.text') // City should be empty
    cy.get(':nth-child(8) > input').type('1991-09-26') // Date of birth
    cy.get('[value="Daily"]').check() // Newsletter radio checked
    cy.get('#birthday').type('1991-09-26') // Birthday
    cy.get(':nth-child(15) > .ng-pristine').should('not.be.checked') // Privacy policy should not be checked
    cy.get(':nth-child(15) > :nth-child(2)').check() // Cookie policy
    cy.get(':nth-child(2) > input').should('be.disabled') // Submit button should be disabled
}




});