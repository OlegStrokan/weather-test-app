
export const getCyElementById = (dataTestId, options) => cy.get(`[data-test="${dataTestId}"]`, options);
