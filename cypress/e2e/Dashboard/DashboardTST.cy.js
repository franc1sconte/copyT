/// <reference types="cypress" />
// --> Imports
import DashboardPage from "../../pages/Dashboard/DashboardPage"
import SideboardPage from "../../pages/Sideboard/SideboardPage"



describe('Dashboard', () => {
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


  it.only('EAI-65 - Validacion de elementos vista inicial en dashboard para cuenta gratuita', () => {
    const tipoPlan = "plan-free"
    
    // --> "Inyectamos" la sesion correspondiente al test para prevenir bloqueo de google
    // cy.createSession(datosAuth1)
    cy.createSessionGithub('1')
    
    // Navegamos a /dashboard
    //cy.navegarA(asserts.urls.dashboard)

    // --> Validaciones en el dashboard
    // Verificamos que el nombre de usuario se muestra correctamente en el dashboard
    cy.beVisible(DashboardPage.usuarioDashboardAssert(asserts.dashboard.user_display_1))

    // Validamos que todos los elementos del header esten visibles
    DashboardPage.elementosHeaderVisibles(tipoPlan)

    // Validamos que todos los elementos del body esten visibles
    DashboardPage.elementosBodyVisibles(tipoPlan)

    // --> Validaciones Sideboard
    // Validamos que TODOS los elementos del sideboard sean visibles
    SideboardPage.elementosSideboardVisibles()
   
  })

  it('EAI-66 - Validar redirección de botones "premium" en Dashboard', () => {
    // --> "Inyectamos" la sesion correspondiente al test para prevenir bloqueo de google
    cy.createSession(datosAuth1)
    
    // Navegamos a /dashboard
    cy.navegarA(asserts.urls.dashboard)
    
    // Esperamos que cargue el dashboard
    cy.doWait(DashboardPage.mainDashboardUser(asserts.dashboard.user_display_1))
    
    // Clickeamos y validamos en el boton contenido en el mensaje de alerta "planes premium ilimitados"
    DashboardPage.validaMsgAlertaPremium()

    // Clickeamos y validamos en el boton contenido en el mensaje ¿Queres ser premium? "Activalo acá"
    DashboardPage.validaActivarPremiumBtn()

  })

  it('EAI-68 - Validar que no se muestren las sugerencias premium en cuenta regalo', () => {
    // --> "Inyectamos" la sesion correspondiente al test para prevenir bloqueo de google
    cy.createSession(datosAuth2)
    
    // Navegamos a /dashboard
    cy.navegarA(asserts.urls.dashboard)

    // Esperamos que cargue el dashboard
    cy.doWait(DashboardPage.mainDashboardUser(asserts.dashboard.user_display_2))

    // Validamos que el alert de premium en header no existe ni es visible
    cy.notExist(DashboardPage.alertMsgVidasAssert())

    // Validamos que el mensaje/botón para activar premium NO existe y NO es visible
    cy.notExist(DashboardPage.activarPremiumBtn())
    
  })

  it('EAI-69 Validar correcto funcionamiento chatbot "tito" en dashboard', () => {
    // --> "Inyectamos" la sesion correspondiente al test para prevenir bloqueo de google
    cy.createSession(datosAuth2)

    // Navegamos a /dashboard
    cy.navegarA(asserts.urls.dashboard)

    // Esperamos que cargue el dashboard
    cy.doWait(DashboardPage.mainDashboardUser(asserts.dashboard.user_display_2))

    // Validamos que existe un primer mensaje de introducción/placeholder por parte del chatbot
    DashboardPage.validarIntroMsgChatbot(asserts.chatbot_tito.placeholder_msg)

    // Escribimos un mensaje en el input del chatbox
    DashboardPage.escribirMensajeChatbot('Hola')

    // Valida que hay una respuesta por parte del chatbot
    DashboardPage.validarRespuestaChatbot()
    
  })



})