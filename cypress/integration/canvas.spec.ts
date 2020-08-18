/// <reference types="cypress" />
import "../support/commands";

context('Actions', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it('should render sketchpad and draw blank canvas', () => {
        cy.get('.input').should("exist")
        cy.get('.input').click()
        cy.get('.input').type('c 20 4')
        cy.get('.input').type('{enter}')

        cy.get('.tile > .container').should("exist")

        var expected = [["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]]

        // @ts-ignore
    })

    it('should render lines', () => {
        cy.get('.input').should("exist")
        cy.get('.input').click()
        cy.get('.input').type('c 20 4')
        cy.get('.input').type('{enter}')
        cy.get('.input').clear()
        cy.get('.input').type('l 1 2 6 2')
        cy.get('.input').type('{enter}')

        cy.get('.tile > .container').should("exist")

        var expected = [["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["x", "x", "x", "x", "x", "x", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]]
        // @ts-ignore
        cy.checkCanvas(22, 4, expected);
    })

    it('should render fill and retain even with error ', () => {
        cy.get('.input').should("exist")
        cy.get('.input').click()
        cy.get('.input').type('c 20 4')
        cy.get('.input').type('{enter}')
        cy.get('.input').clear()
        cy.get('.input').type('b 10 3 .')
        cy.get('.input').type('{enter}')
        cy.get('.input').clear()
        cy.get('.input').type('b 1')
        cy.get('.input').type('{enter}')

        cy.get('.tile > .container').should("exist")

        var expected = [[".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]]
        // @ts-ignore
        cy.checkCanvas(22, 4, expected);
        cy.get(':nth-child(2) > p').should("exist")
        cy.get(':nth-child(2) > p').contains("ERROR")
    })

    it('should render All', () => {
        cy.get('.input').should("exist")
        cy.get('.input').click()
        cy.get('.input').type('c 20 4')
        cy.get('.input').type('{enter}')
        cy.get('.input').clear()
        cy.get('.input').type('l 1 2 6 2')
        cy.get('.input').type('{enter}')
        cy.get('.input').clear()
        cy.get('.input').type('l 6 3 6 4')
        cy.get('.input').type('{enter}')

        cy.get('.input').clear()
        cy.get('.input').type('r 14 1 18 3')
        cy.get('.input').type('{enter}')

        cy.get('.input').clear()
        cy.get('.input').type('b 10 3 .')
        cy.get('.input').type('{enter}')

        cy.get('.tile > .container').should("exist")

        var expected = [
            [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "x", "x", "x", "x", "x", ".", "."],
            ["x", "x", "x", "x", "x", "x", ".", ".", ".", ".", ".", ".", ".", "x", "", "", "", "x", ".", "."],
            ["", "", "", "", "", "x", ".", ".", ".", ".", ".", ".", ".", "x", "x", "x", "x", "x", ".", "."],
            ["", "", "", "", "", "x", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]]
        // @ts-ignore
        cy.checkCanvas(22, 4, expected);
    })
})
