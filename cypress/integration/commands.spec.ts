/// <reference types="cypress" />
import '@testing-library/jest-dom';

context('Actions', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it('should have the console tool open and have basic structure', () => {
        cy.get('.input').should("exist")
        cy.get('.input').click()
        cy.get('.input').type('c 20 4')

        cy.get('.tile > .container').should("not.exist")
        cy.get('.is-ancestor > :nth-child(1) > .tile').should("exist")
        cy.get('.is-3 > .tile').should("exist")

    })


    it('should throw an error for invalid command', () => {
        cy.get('.input').should("exist")
        cy.get('.input').click()
        cy.get('.input').type('d 20 4')
        cy.get('.input').type('{enter}')

        cy.get('.tile > .container').should("exist")
        cy.get(':nth-child(2) > p').should("exist")
        cy.get(':nth-child(2) > p').contains("ERROR: Command Doesnt Exist")
    })
})
