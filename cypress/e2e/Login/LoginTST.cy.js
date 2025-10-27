/// <reference types="cypress" />
// --> Imports
import LoginPage from "../../pages/Login/LoginPage"



describe('Login', () => {
  // --> Variables para traer asserts.json y datos.json de fixtures.
  let asserts
  let datos

  // --> Traemos los asserts y datos antes de cada test
  beforeEach(() => {
    cy.fixture(Cypress.env("assertsJson")).then(function (assertsv) {
      asserts = assertsv
    })
    cy.fixture(Cypress.env("datosJson")).then(function (datosv) {
      datos = datosv
    })
    
  })


  it.skip('EAI-60 - Validar flujo de pantallas pre-login', () => {
    
    // Navegamos al /login
    cy.navegarA(asserts.urls.login)
    
    // Validamos las pantallas de presentación, botones criticos para avanzar en el proceso
    // y el botón de login con Google existe y es visible.
    LoginPage.validarPantallasPresentacion()
    
  })


})