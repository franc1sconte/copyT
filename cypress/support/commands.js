
// <<< -- IMPORTS -- >>>

// fixtures
const asserts = require('../fixtures/asserts.json')
const datos = require('../fixtures/datos.json')


// <<< -- METODOS DE AUTH -- >>>

// Login inyectando directamente el objeto auth en localStorage
Cypress.Commands.add('injectSession', (datosAuth) => {
    const authState = {
        state: {
            user: {
                id: datosAuth.user1.id,
                name: datosAuth.user1.name,
                email: datosAuth.user1.email,
                avatar: datosAuth.user1.avatar,
                wasOnboarded: datosAuth.user1.wasOnboarded
            },
            token: datosAuth.user1.token,
            isAuthenticated: datosAuth.user1.isAuthenticated
        },
        version: 0
    };
    window.localStorage.setItem('auth', JSON.stringify(authState));
    cy.log('Auth hardcodeado inyectado:', authState);
});


// Validamos que el auth se inyectó correctamente en el navegador
Cypress.Commands.add('sessionValidator', (datosAuth) => {
    cy.window().then((win) => {
        const auth = JSON.parse(win.localStorage.getItem('auth'))
        expect(auth).to.exist
        expect(auth.state.isAuthenticated).to.be.true
        expect(auth.state.user.email).to.equal(datosAuth.user1.email)
    })
});

Cypress.Commands.add('createSession', (datosAuth) => {
    cy.injectSession(datosAuth)
    cy.sessionValidator(datosAuth)
    cy.wait(2000)
});


// <<< -- GITHUB ACTIONS -- >>>

Cypress.Commands.add('injectSessionGithub', (numCuenta) => {
    const authState = {
        state: {
            user: {
                id: Cypress.env(`USER_ID_${numCuenta}`),
                name: Cypress.env(`USER_NAME_${numCuenta}`),
                email: Cypress.env(`USER_EMAIL_${numCuenta}`),
                avatar: Cypress.env(`USER_AVATAR_${numCuenta}`),
                wasOnboarded: Cypress.env('WAS_ON_BOARDED')
            },
            token: Cypress.env(`USER_TOKEN_${numCuenta}`),
            isAuthenticated: Cypress.env('IS_AUTHENTICATED')
        },
        version: 0
    };
    cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('auth', JSON.stringify(authState));
        }
      })
    cy.log('Auth hardcodeado inyectado:', authState);
});

 
Cypress.Commands.add('createSessionGithub', (numCuenta) => {
    cy.injectSessionGithub(numCuenta)
    cy.wait(2000)
    cy.screenshot()
});




// << -- GENERAL -- >>

Cypress.Commands.add('urlValidator', (url) => {
    cy.url().should('be.eq', url)
});

Cypress.Commands.add('urlValidatorInclude', (url) => {
    cy.url().should('include', url)
});

Cypress.Commands.add('beVisible', (selector) => {
    cy.get(selector).should('exist').and('be.visible')
});

Cypress.Commands.add('notExist', (selector) => {
    cy.get(selector).should('not.exist')
});

Cypress.Commands.add('doClickSimple', (locator) => {
    cy.get(locator).should('be.visible').click()
})

Cypress.Commands.add('doWait', (selector) => {
    cy.get(selector).should('be.visible')
})

Cypress.Commands.add('navegarA', (url) => {
    cy.visit(asserts.urls.dashboard)
    cy.urlValidator(url)
})

Cypress.Commands.add('doType', (selector, mensaje) => {
    cy.get(selector).should('be.visible')
    cy.get(selector).type(mensaje)
})