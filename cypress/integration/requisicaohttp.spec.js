it ('Fazer uma requist http', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response) {
        const { status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
})

it.only ('Encontre o gato', function() {
    cy.visit('./src/index.html')
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    })  

