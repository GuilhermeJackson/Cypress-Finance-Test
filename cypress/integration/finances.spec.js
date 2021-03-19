/// <reference types="cypress"/>
import { format, prepareLocalStorage } from '../support/utils'

context('Dev Dinances Agilizei', () => {
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        });
    });
    it('Cadastrar entradas', () => {
        //mapeando elemento
        cy.get('#transaction .button').click(); // id + classe
        cy.get('#description').type('Skol'); // id
        cy.get('[name=amount').type(20.30); //atributos
        cy.get('[type=date').type('2021-03-22'); //atributos
        cy.get('button').contains('Salvar').click(); // tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 3);
    });
    it('Cadastrar saidas', () => {
        //mapeando elemento
        cy.get('#transaction .button').click(); // id + classe
        cy.get('#description').type('Original'); // id
        cy.get('[name=amount').type(-15); //atributos
        cy.get('[type=date').type('2021-03-22'); //atributos
        cy.get('button').contains('Salvar').click(); // tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 3);
    });

    it('Remover entradas e saidas', () => {
        // voltar para o elemento pai e avançar para um td img attr
        cy.get('td.description')
            .contains("Serrana")
            .parent() // busca no elemento pai
            .find('img[onclick*=remove]')
            .click();

        // buscar todos irmaos e buscar o que tem img + attr
        cy.get('td.description')
            .contains("Guaraná")
            .siblings() // busca no elemento irmãos
            .children('img[onclick*=remove]')
            .click();
    });
    it('Validar saldo com diversas transações', () => {
        let incomes = 0
        let expenses = 0
        
        cy.get('#data-table tbody tr')
        .each(($el, index, $list) => {
            cy.get($el).find('td.income, td.expense') //td.icome = colunas de entrada // td.expense = colunas de saida
            .invoke('text') //capturando valores das colunas
            .then(text => {
                if(text.includes('-')) {
                    expenses = expenses + format(text)
                } else {
                    incomes = incomes + format(text)
                }
                cy.log('Entradas', incomes)
                cy.log('Saidas', expenses)
            })
        })
        cy.get('#totalDisplay')
        .invoke('text')
        .then(text => {
            cy.log('valor tatol', format(text))
            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses
            expect(formattedTotalDisplay).to.eq(expectedTotal);
        });
    });
});