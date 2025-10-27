/// <reference types="cypress" />
// --> Imports
import DashboardPage from "../../pages/Dashboard/DashboardPage"
import TitoPage from "../../pages/Tito/TitoPage"



describe('Chatbot Tito', () => {
  // --> Variables para traer asserts.json y datos.json de fixtures
  let asserts
  let datos
  // --> Varaibles para almacenar los datos de las cuentas
  let datosAuth1
  let datosAuth2

  beforeEach(() => {
    // --> Traemos los asserts y datos antes de cada test
    cy.fixture(Cypress.env("assertsJson")).then(function (assertsv) {
      asserts = assertsv
    })
    cy.fixture(Cypress.env("datosJson")).then(function (datosv) {
      datos = datosv
    })
    cy.fixture('users/auth.json').then((authData) => {
      datosAuth1 = authData
    });
    cy.fixture('users/auth-2.json').then((authData) => {
      datosAuth2 = authData
    });

  })


  it('EAI-70 Validar correcto funcionamiento chatbot "tito" en /tito', () => {
    // --> "Inyectamos" la sesion correspondiente al test para prevenir bloqueo de google
    cy.createSession(datosAuth2)
    
    // Navegamos a /dashboard
    cy.navegarA(asserts.urls.dashboard)

    // Esperamos que cargue el dashboard
    cy.doWait(DashboardPage.mainDashboardUser(asserts.dashboard.user_display_2))
    
    // Clickeamos en el logo del bot para ingresar a la page del chatbot "tito"
    cy.doClickSimple(DashboardPage.chatbotTitoBtn())

    // Validamos la url
    cy.urlValidator(asserts.urls.chatbot_tito)

    // Validamos que el chat contenga el primer mensaje de introducción
    TitoPage.validarIntroMsgChatbot(asserts.chatbot_tito.placeholder_msg)

     // Escribimos un primer mensaje en el input del chatbox
     TitoPage.escribirMensajeChatbot('Hola.')

     // Valida que hay una respuesta por parte del chatbot
    TitoPage.validarRespuestaChatbot()

     // Escribimos un segundo mensaje en el input del chatbox
     TitoPage.escribirMensajeChatbot('Si, por favor.')

     // Valida que hay una respuesta por parte del chatbot
    TitoPage.validarRespuestaChatbot()
    
  })



})