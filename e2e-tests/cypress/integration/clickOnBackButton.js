import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import cy from 'cypress'
import {getCyElementById} from "../utils/utils";


When(/^User clicks on back button$/, function () {
    cy.url().should('contain', '/main')
    getCyElementById('toDocumentationPage').click();
});

Then(/^User sees new url$/, function () {
    cy.url().should.not('contain', '/main');
});

Then(/^User sees documentation page page$/, function () {
    getCyElementById('DocumentationPage').should('be.visible');

});
