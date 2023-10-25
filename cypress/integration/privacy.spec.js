it ('validar pagina de privacidade independente', function(){
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')

})