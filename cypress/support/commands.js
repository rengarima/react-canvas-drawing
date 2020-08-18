// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// @ts-ignore
Cypress.Commands.add('checkCanvas', (borderWidth, borderHeight, canvasBody) => {
    for(var width=1; width<=borderWidth; width++){
        //canvas Header
        cy.get('thead > tr > :nth-child('+width+')').should("exist")
        cy.get('thead > tr > :nth-child('+width+')').contains("-")

        //canvasBody
        for(var height=1; height<=borderHeight; height++){

            //canvasEdges start
            cy.get('tbody > :nth-child('+height+') > :nth-child(1)').should("exist")
            cy.get('tbody > :nth-child('+height+') > :nth-child(1)').contains("|")

            if(width != 1 && width <= borderWidth-2){
                console.log(height + " " + width  + " " + canvasBody[height-1][width])
                cy.get('tbody > :nth-child('+height+') > :nth-child('+width+')').exist
                if(canvasBody[height-1][width])
                    cy.get('tbody > :nth-child('+height+') > :nth-child('+width+')').contains( canvasBody[height-1][width])
            }

            //canvasEdges end
            cy.get('tbody > :nth-child('+height+') > :nth-child('+borderWidth+')').should("exist")
            cy.get('tbody > :nth-child('+height+') > :nth-child('+borderWidth+')').contains("|")

        }
    }
})
