
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type ('Adilson', { delay: 0})
    cy.get('#lastName').type ('Masocatto', { delay: 0})
    cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
    cy.get('#phone').type ('15991642737', { delay: 0})
    cy.get('#open-text-area').type ('Teste', { delay: 0})
    cy.get('button[type="submit"]').click()
})

