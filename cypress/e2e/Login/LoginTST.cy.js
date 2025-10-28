/// <reference types="cypress" />
// --> Imports
import LoginPage from "../../pages/Login/LoginPage"



describe('Login', () => {
  // --> Variables para traer asserts.json y datos.json de fixtures.
  let asserts
  let datos

  // --> Traemos los asserts y datos antes de cada test
  beforeEach(() => {
    // --> Traemos los asserts y datos antes de cada test
    const assertsFixture = Cypress.env("assertsJson") || "asserts"
    const datosFixture = Cypress.env("datosJson") || "datos"

    // Log para diagnosticar en CI (GitHub Actions)
    cy.log(`Cypress.env assertsJson=${assertsFixture} datosJson=${datosFixture}`)

    cy.fixture(assertsFixture).then(function (assertsv) {
      asserts = assertsv
    })
    cy.fixture(datosFixture).then(function (datosv) {
      datos = datosv
    })
    
  })


  it('EAI-60 - Validar flujo de pantallas pre-login', () => {
    
    // Navegamos al /login
    cy.navegarA(asserts.urls.login)
    
    // Validamos las pantallas de presentación, botones criticos para avanzar en el proceso
    // y el botón de login con Google existe y es visible.
    LoginPage.validarPantallasPresentacion()
    
  })


})