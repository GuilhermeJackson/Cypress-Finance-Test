/// <reference types="cypress"/>

context('Dev Dinances Agilizei', () => {
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
        cy.get('#data-table tbody tr').should('have.length', 0);
    });
    it('Cadastrar entradas', () => {
        //mapeando elemento
        cy.get('#transaction .button').click(); // id + classe
        cy.get('#description').type('Skol'); // id
        cy.get('[name=amount').type(20.30); //atributos
        cy.get('[type=date').type('2021-03-22'); //atributos
        cy.get('button').contains('Salvar').click(); // tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 1);
    });
    it('Cadastrar saidas', () => {
        //mapeando elemento
        cy.get('#transaction .button').click(); // id + classe
        cy.get('#description').type('Original'); // id
        cy.get('[name=amount').type(-15); //atributos
        cy.get('[type=date').type('2021-03-22'); //atributos
        cy.get('button').contains('Salvar').click(); // tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 1);
    });

    it('Remover entradas e saidas', () => {
        const entrada = 'Skol'
        const saida = 'Patagonia'

        cy.get('#transaction .button').click(); // id + classe
        cy.get('#description').type(entrada); // id
        cy.get('[name=amount').type(100); //atributos
        cy.get('[type=date').type('2021-03-22'); //atributos
        cy.get('button').contains('Salvar').click(); // tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 1);

        cy.get('#transaction .button').click(); // id + classe
        cy.get('#description').type(saida); // id
        cy.get('[name=amount').type(-50); //atributos
        cy.get('[type=date').type('2021-03-22'); //atributos
        cy.get('button').contains('Salvar').click(); // tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 2);

        // voltar para o elemento pai e avançar para um td img attr
        cy.get('td.description')
            .contains(entrada)
            .parent() // busca no elemento pai
            .find('img[onclick*=remove]')
            .click();

        // buscar todos irmaos e buscar o que tem img + attr
        cy.get('td.description')
            .contains(saida)
            .siblings() // busca no elemento irmãos
            .children('img[onclick*=remove]')
            .click();
    });
});