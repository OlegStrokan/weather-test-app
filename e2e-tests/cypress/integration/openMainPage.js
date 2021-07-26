import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import cy from 'cypress'
import {getCyElementById} from "../utils/utils";


When(/^User clicks on enter button$/, function () {
    cy.url().should('contain', '/')
    getCyElementById('toMainPage').click();
});

Then(/^User sees new url$/, function () {
    cy.url().should('contain', '/main');
});

Then(/^User sees main page$/, function () {
    getCyElementById('mainPage').should('be.visible');

});
