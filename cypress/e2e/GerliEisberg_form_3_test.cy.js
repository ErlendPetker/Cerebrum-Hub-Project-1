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

    it('Check that radio button (news frequency) list is correct', () => {
            // Array has totally 4 elements (i.e. type-radio appears 4 times)
        cy.get('input[type="radio"]').should('have.length', 4)
            // Check that list is correct and not checked
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')
            // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
    
    it('Country and city dropdowns are correct', () => {
            // Dropdown and dependencies between 2 dropdowns (coyntry and city)
            // Get array length of elements in country dropdown
        cy.get('#country').children().should('have.length', 4)
            // Check list of country dropdown
        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
            // Check list of country dropdown - alternative way
        cy.get('#country').find('option').then(options => {
        const actual = [...options].map(option => option.label)
        expect(actual).to.deep.eq(['', 'Spain', 'Estonia', 'Austria'])
        })
            // Dropdown sets of Spain
        cy.get('#country').select('Spain')
            // Confirm the selected value
        cy.get('#country').should('have.value', 'object:3')
            // Confirm cities connected to Spain
        cy.get('#city>option').should('have.length',5)
        cy.get('#city>option').should('not.be.selected')
        cy.get('#city>option').eq(0).should('have.text','')
        cy.get('#city>option').eq(1).should('have.text','Malaga')
        cy.get('#city>option').eq(2).should('have.text','Madrid')
        cy.get('#city>option').eq(3).should('have.text','Valencia')
        cy.get('#city>option').eq(4).should('have.text','Corralejo')
            // Confirm cities connected to Spain - alternative way
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        })
            // Dropdown sets of Valencia
        cy.get('#city').select('Valencia')
    })

    it('Check that privacy and cookie policy checkbox list is correct', () => {
            // Array has totally 4 elements (i.e. type-radio appears 4 times)
        cy.get('input[type="checkbox"]').should('have.length', 2)
            // Check that list is correct and not checked
            // I do not understand why the next test is not working, error message: ... to have text 'Accept our privacy policy', but the text was ''
             cy.get(':nth-child(15)').should('contain','Accept our privacy policy').and('not.be.checked')
        cy.get(':nth-child(15)').contains("Accept our privacy policy ").and('not.be.checked')
        cy.get('input[type="checkbox"]').next().should('have.text','Accept our cookie policy').and('not.be.checked')
              
        // Selecting both is possible
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')      
    
        // Unselecting both is possible
        cy.get('input[type="checkbox"]').eq(0).uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked')
    })

    it('Check that URL "Accept our cookie policy" is correct and clickable', () => {
            // Get navigation element, find siblings that contains h1 and check if it has link in string
        cy.get('button').children().should('be.visible')
            .and('have.attr', 'href', 'cookiePolicy.html') 
            // click on the link in navigation
        cy.get('button>a').click()
            // Check that correct URL is open
        cy.url().should('contain', 'cookiePolicy.html')
            // Go back to previous page
        cy.go('back')
            // Check again that correct URL is open
        cy.url().should('contain', 'registration_form_3.html')
    })
    
    it('Check that email format is correct', () => {
        
        cy.get('input[name="email"]').type('validemail@yeap.com')
        cy.get('input[name="email"]').should('have.value','validemail@yeap.com')
        
            // Verification, that email format should contain @ and.com. 
        cy.get('input[name="email"]').type('validemail@yeap.com')
        cy.get('input[name="email"]').should('contain.value', '@')
        cy.get('input[name="email"]').should('contain.value','.com')
        
            // Assert that error message is visible
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type('valesti')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('have.css', 'display', 'inline')
    })
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
describe('Create second test suite for functional tests', ()=> {

    it.only('all fields are filled in + validation', () => {
            // Submit button by default is disabled and cannot be clicked
        cy.get('input[type="submit"]').eq(1).should('be.disabled');

            // use function in order to fill the form with correct data
        inputValidData();

            // Assert that submit button is enabled
        cy.get('input[type="submit"]').eq(1).should('be.enabled');

            // Assert that submit button is clickable and success message appears
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('have.text', 'Submission received')
    });

    it('only mandatory fields are filled in + validations', () => {
            // only mandatory fields are filled in + validations
        cy.get('input[type="submit"]').eq(1).should('be.disabled');

            // use function in order to fill the form with correct data
        inputMandatoryFields();

            // Assert that submit button is enabled
        cy.get('input[type="submit"]').eq(1).should('be.enabled');

            // Assert that submit button is clickable and success message appears
        cy.get('input[type="submit"]').eq(1).click()
        cy.get('h1').should('have.text', 'Submission received')
    });

    it('mandatory fields are absent + validations (use function)', () => {
            // mandatory fields are absent + validations (use function)
            // only mandatory fields are filled in + validations
        cy.get('input[type="submit"]').eq(1).should('be.disabled');

            // use function in order to fill the form with correct data
        inputMandatoryFields();

            // Add steps for emptying mandatory email input field
        cy.get('input[name="email"]').clear()

            // Assert that error message is visible
        cy.get('span[ng-show="myForm.email.$error.required"]').should('have.css', 'display', 'inline')        

            // Assert that submit button is still disabled
        cy.get('input[type="submit"]').eq(1).should('be.disabled');

            // use function in order to fill the form with correct data
        inputMandatoryFields();

            // Add steps for emptying mandatory country field
        cy.get('#country').select("")
        
            // Assert that city is not chosen and submit button is still disabled
        cy.get('#city>option').eq(0).should('have.text','')
        cy.get('input[type="submit"]').eq(1).should('be.disabled');

            // use function in order to fill the form with correct data
        inputMandatoryFields();

            // Add steps for emptying mandatory country field
        cy.get('input[type="checkbox"]').eq(0).uncheck()
        
        // Assert that submit button is still disabled
        cy.get('input[type="submit"]').eq(1).should('be.disabled');        
    });
    
    it('country and city updating', () => {
            // If city is already chosen and country is updated, then city choice should be removed
        cy.get('#country').select("Estonia")
        cy.get('#city>option').should('have.length',4)
        cy.get('#city>option').should('not.be.selected')
        cy.get('#city>option').eq(1).should('have.text','Tallinn')
        cy.get('#city').select('Tallinn')
        cy.get('#city>option').eq(1).should('be.selected')
        cy.get('#country').select('Spain')
        cy.get('#city>option').should('not.have.text',"Tallinn")               
    });
    
    it.only('adding file', () => {
            // Bonus task: add file (google yourself for solution)
        cy.get('input[type="file"]').selectFile('cerebrum_hub_logo.png').click()

            // Assert that submit button is enabled
        cy.get('input[type="submit"]').eq(0).should('be.enabled');

            // Assert that submit button is clickable and success message appears
        cy.get('input[type="submit"]').eq(0).click()
        cy.get('h1').should('have.text', 'Submission received')        
    });
        
})

function inputValidData() {
    cy.log('Name will be filled')
    cy.get('#name').clear(); 
    cy.get('#name').type('Ilreg')
    cy.get('input[name="email"]').type('Ilreg@jaja.com')
    cy.get('#country').select("Estonia")
    cy.get('#city').select('Tartu')
    cy.get('input[type="date"]').eq(0).type('1999-01-12')
    cy.get('#city').select('Tartu')
    cy.get('input[type="radio"]').check('Never')
    cy.get('input[type="date"]').eq(1).type('1999-01-12')
    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(1).check() 
}
function inputMandatoryFields() {
    cy.log('Name will be filled')
    cy.get('#name').clear(); 
    cy.get('input[name="email"]').type('Ilreg@jaja.com')
    cy.get('#country').select("Estonia")
    cy.get('#city').select('Tartu')
    cy.get('input[type="checkbox"]').eq(0).check()
}