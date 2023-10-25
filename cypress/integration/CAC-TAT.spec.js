///.<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencher os campos obrigatórios e enviar o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
        cy.get('#phone').type ('15991642737', { delay: 0})
        cy.get('#open-text-area').type (longText, { delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible') 
    })    

    it('Exibir mensagem de erro ao enviar o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto', { delay: 0})
        cy.get('#phone').type ('15991642737', { delay: 0})
        cy.get('#open-text-area').type (longText, { delay: 0})
        cy.get('button[type="submit"]').click()
    
        cy.get('.error').should('be.visible') 
    })
    
    it('Preencher o campo telefone com caracteres inválidos', function(){
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
        cy.get('#phone')
          .type ('Teste@#$%', { delay: 0})
          .should('have.value', '') 
        cy.get('#open-text-area').type ('Teste', { delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')   
    })
                    
    it('Exibir mensagem de sucesso quando o campo telefone for obrigatório', function(){
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
        cy.get('#phone').type ('15991642737', { delay: 0})
        cy.get('#open-text-area').type ('Teste', { delay: 0})
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible') 
        
    })

    it('Exibir mensagem de erro quando o campo telefone for obrigatório', function(){
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
        cy.get('#phone').type ('abcdefghij', { delay: 0})
        cy.get('#open-text-area').type ('Teste', { delay: 0})
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible') 
        
    })

    it('Validar comando clear - limpando os campos', function(){
        cy.get('#firstName')
          .type ('Adilson', { delay: 0})
          .should('have.value', 'Adilson')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type ('Masocatto', { delay: 0})
          .should('have.value', 'Masocatto')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type ('adilson.masocatto@gmail.com', { delay: 0})
          .should('have.value', 'adilson.masocatto@gmail.com')
          .clear()
          .should('have.value', '')
    })

    it('Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', function(){
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
        
    })

    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible') 

    })  
    
    
    it('Exibir mensagem de erro quando o campo telefone for obrigatório', function(){
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
        cy.get('#phone').type ('1234567890', { delay: 0})
        cy.get('#open-text-area').type ('Teste', { delay: 0})
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible') 
        
    })

    it('mudar a seleção de produto', function(){
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
        cy.get('#phone').type ('1234567890', { delay: 0})
        cy.get('select').select('Blog')
        cy.get('#open-text-area').type ('Teste', { delay: 0})
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible') 
        
    })

    it('validar seleção', function(){
        cy.get('select').select('Blog')
          .should('have.value', 'blog')
        cy.get('#product').select('Cursos')
          .should('have.value', 'cursos')
        cy.get('select').select('Mentoria')
          .should('have.value', 'mentoria')
        cy.get('#product').select('YouTube')
          .should('have.value', 'youtube')
        cy.get('#product').select(1)
          .should('have.value', 'blog')
    })

    it('validar checagem', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
        cy.get('input[type="radio"][value="elogio"]')
          .check()
          .should('have.value', 'elogio')
        cy.get('input[name="atendimento-tat"][value="ajuda"]')
          .check()
          .should('have.value', 'ajuda')
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('validar checagem', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last() //last, first, uncheck
          .uncheck()
          .should('not.be.checked')
    })

    it('Exibir mensagem de sucesso quando o campo telefone for obrigatório', function(){
        cy.get('#firstName').type ('Adilson', { delay: 0})
        cy.get('#lastName').type ('Masocatto', { delay: 0})
        cy.get('#email').type ('adilson.masocatto@gmail.com', { delay: 0})
        cy.get('#phone').type ('1234567890', { delay: 0})
        cy.get('#open-text-area').type ('Teste', { delay: 0})
        cy.get('#phone-checkbox').check()
          .uncheck()
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible') 
        
    })

    it('validar subir arquivo upload', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.be.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect ($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('validar subir arquivo upload drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.be.value')
          .selectFile('./cypress/fixtures/example.json' , {action: 'drag-drop'})
          .should(function($input){
            expect ($input[0].files[0].name).to.equal('example.json')
          })
    })
    
    it('validar alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect ($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('validar politica de privacidade', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })


    it('validar politica de privacidade em outra aba', function(){
        cy.get('#privacy a').click()
    })

    it('validar politica de privacidade em outra aba', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()  
        cy.contains('Talking About Testing').should('be.visible')
    })

})