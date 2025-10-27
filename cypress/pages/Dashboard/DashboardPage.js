/// <reference types="cypress"/>


class DashboardPage {
    //--------------------------------------------------Buttons----------------------------------------------

    // << - HEADER - >>

    // Combo de materias a elegir
    comboMaterias() {
        return 'header [role="combobox"]'
    }

    // Boton de perfil, donde se muestra nuestra foto. Al clickear en este botón se abre el menu de gestion de usuario.
    profileImgBtn() {
        return '[aria-haspopup="menu"]'
    }

    // Botones de opciones que ofrece el popup de gestion de usuario. Se pasa por parametro la opción.
    popupGestionUsuarioBtns(opcion) {
        return '[role=menu][data-state=open] div:contains('+opcion+')'
    }

    // Boton/link dentro del alert que nos lleva a visualizar los distintos tipos de planes premium
    alertPremiumBtn() {
        return '[role=alert] span'
    }


    // << - MAIN - >>

    // Boton de sugerencia para activar premium
    activarPremiumBtn() {
        return 'main button:contains(premium)'
    }

    // Boton para acceder al pomodoro
    accesoPomodoroBtn() {
        return 'main a:contains(Sumate a estudiar)'
    }

    // Botones para cargar un documento de la materia
    cargarDocBtn() {
        return 'main >> div:has(h2) div:eq(4)'
    }
    cargarDocFlechaBtn() {
        return 'main >> div:has(h2) button'
    }

    // Botones para ingresar a "Desafios" y "Flashcards" desde el dashboard y no sideboard
    flashcardsBtn() {
        return 'main >>> div:contains(Flashcards)'
    }
    desafiosBtn() {
        return 'main >>> div:contains(Desafíos)'
    }

    // Boton para ir a la page del chatbot "tito"
    chatbotTitoBtn() {
        return 'main>div:has([dir=ltr]) a:first:visible'
    }


    //--------------------------------------------------Inputs-----------------------------------------------

    // Input para escribir un mensaje para el chatbot
    chatbotInput() {
        return 'main>div:has([dir=ltr]) input'
    }
    
    //--------------------------------------------------Asserts----------------------------------------------
    

    // << - HEADER - >>

    // Popup gestion de usuario que se abre cuando clickeamos en nuestra foto de perfil
    popupGestionUsuarioAssert() {
        return '[role=menu][data-state=open]'
    }

    // Nombre mostrado en el popup de gestion usuario
    popupGestionUsuarioNombre() {
        return '[role=menu][data-state=open] div:eq(0) p:eq(0)'
    }

    // Email mostrado en el popup de gestion usuario
    popupGestionUsuarioEmail() {
        return '[role=menu][data-state=open] div:eq(0) p:eq(1)'
    }

    // Mensaje de alerta donde se explica la renovación de vidas del usuario y planes premium
    alertMsgVidasAssert() {
        return '[role=alert]'
    }

    // << - MAIN - >>

    // Nombre de usuario mostrado en el main/body
    mainDashboardUser(user) {
        return 'main:contains("¡Hola, '+user+'!")'
    }

    // Contenedor de métricas como Puntos, Vida y Racha
    boxMetricasAssert() {
        return 'main div:nth-child(3):contains(Tus métricas)'
    }

    // Número de c/u de las métricas. Se pasa por argumento el tipo de métrica a obtener [Puntos, Racha y Vidas]
    numeroMetricasAssert(tipoMetrica) {
        return 'main .grid div:contains('+tipoMetrica+'):eq(0) p span'
    }

    // Bloque de "materia" donde te sugiere cargar un documento
    bloqueCargarDocAssert() {
        return 'main >> div:has(h2)'
    }

    // Nombre de materia mostrada sobre la carga de archivos desde el dashboard
    materiaCargarDocAssert(nombreMateria) {
        return 'main div h2:contains('+nombreMateria+')'
    }

    // Descripcion/explicacion de la carga de documento por dashboard
    textoCargaDocAssert() {
        return 'main >> div:has(h2) div:eq(2)'
    }

    // Texto contenido en c/u de las cards de "Desafios" y "Flashcards"
    textoCardDesafiosAssert() {
        return 'main >>> div:contains(Desafios) span'
    }
    textoCardFlashcardsAssert() {
        return 'main >>> div:contains(Flashcards) span'
    }

    // Nombre de usuario mostrado en el dashboard
    usuarioDashboardAssert(nombreUsuario) {
        return 'main span:contains(¡Hola, '+nombreUsuario+'!)'
    }

    // Bloque del chatbox
    titoChatBoxAssert() {
        return 'main>div:has([dir=ltr])'
    }

    // Mensajes que aparecen dentro del chatbox con su posición
    mensajesChatBotAssert(numeroMensaje) {
        return 'main>div:has([dir=ltr]) .break-words:eq('+numeroMensaje+')'
    }

    // Selector usado para poder contar la cantidad de mensajes en chatbox
    cantidadMsjChatAssert() {
        return 'main>div:has([dir=ltr]) .break-words'
    }

    //--------------------------------------------------Modales----------------------------------------------

    // Modal de información sobre tich premium
    infoPremiumModal() {
        return '[role=dialog] section:first:contains(Obtené Tich Premium)'
    }
    verPlanesModalBtn() {
        return '[role=dialog] section:first:contains(Obtené Tich Premium) button'
    }

    // Modal donde se muestra el plan anual sugerido
    infoPlanSugeridoModal() {
        return '[role=dialog] section:first:contains(Elegí un plan)'
    }
    infoPlanSugeridoModalBtn(nombreBoton) {
        return '[role=dialog] section:first:contains(Elegí un plan) button:contains('+nombreBoton+')'
    }

    //--------------------------------------------------Methods----------------------------------------------

    // Junta todos los elementos visibles del header y los valida
    elementosHeaderVisibles(plan) {
        if(plan === 'plan-free') {
            cy.beVisible(this.alertMsgVidasAssert())
            cy.beVisible(this.comboMaterias())
            cy.beVisible(this.profileImgBtn())
        } else if (plan === 'plan-premium') {
            cy.beVisible(this.comboMaterias())
            cy.beVisible(this.profileImgBtn())
        }
    }

    // Junta todos los elementos visibles del main y los valida
    elementosBodyVisibles(plan) {
        if(plan === 'plan-free') {
            cy.beVisible(this.activarPremiumBtn())
            cy.beVisible(this.boxMetricasAssert())
            cy.beVisible(this.accesoPomodoroBtn())
            cy.beVisible(this.titoChatBoxAssert())
            cy.beVisible(this.desafiosBtn())
            cy.beVisible(this.flashcardsBtn())
        } else if (plan === 'plan-premium') {
            cy.beVisible(this.boxMetricasAssert())
            cy.beVisible(this.accesoPomodoroBtn())
            cy.beVisible(this.titoChatBoxAssert())
            cy.beVisible(this.desafiosBtn())
            cy.beVisible(this.flashcardsBtn())
        }
    }

    // Valida que se muestra el flujo basico que genera el mensaje de alerta sugerencia premium
    validaMsgAlertaPremium() {
        cy.doClickSimple(this.alertPremiumBtn())
        cy.doWait(this.infoPremiumModal())
        cy.beVisible(this.infoPremiumModal())
        cy.doClickSimple(this.verPlanesModalBtn())
        cy.doWait(this.infoPlanSugeridoModal())
        cy.beVisible(this.infoPlanSugeridoModal())
        cy.beVisible(this.infoPlanSugeridoModalBtn('Comenzar'))
        cy.beVisible(this.infoPlanSugeridoModalBtn('Ver todos los planes'))
        cy.get(this.infoPlanSugeridoModal()).type('{esc}')
    }

    // Valida que se muestra el flujo basico que genera el boton de "Actibar premium"
    validaActivarPremiumBtn() {
        cy.doClickSimple(this.activarPremiumBtn())
        cy.doWait(this.infoPremiumModal())
        cy.beVisible(this.infoPremiumModal())
        cy.doClickSimple(this.verPlanesModalBtn())
        cy.doWait(this.infoPlanSugeridoModal())
        cy.beVisible(this.infoPlanSugeridoModal())
        cy.beVisible(this.infoPlanSugeridoModalBtn('Comenzar'))
        cy.beVisible(this.infoPlanSugeridoModalBtn('Ver todos los planes'))
        cy.get(this.infoPlanSugeridoModal()).type('{esc}')
    }

     // Valida el mensaje por defecto que trae el chatbot a modo de introducción a la charla
    validarIntroMsgChatbot(mensaje) {
        cy.get(this.mensajesChatBotAssert(0)).should('be.visible').and('exist').invoke('text').then((msgPlaceholder) => {
            cy.log(msgPlaceholder)
            cy.wrap(msgPlaceholder.replace(/\s+/g, '')).should('be.eq', mensaje.replace(/ /g, ''))
        })
    }

     // Escribe un mensaje a través del input del chatbox
    escribirMensajeChatbot(mensaje) {
        cy.beVisible(this.titoChatBoxAssert())
        cy.doType(this.chatbotInput(), mensaje)
        cy.doType(this.chatbotInput(), '{enter}')
    }

     // Valida que se genera una respuesta luego de hacer una pregunta
    validarRespuestaChatbot() {
        cy.wait(3500)
        cy.get(this.cantidadMsjChatAssert()).then(($messages) => {
            const totalMensajes = $messages.length

            cy.log(`Total de mensajes: ${totalMensajes}`)

            // Si el total es impar → el último mensaje es del chatbot
            if (totalMensajes % 2 !== 0) {
                cy.get(this.mensajesChatBotAssert(totalMensajes - 1)).invoke('text').then((mensaje) => {
                    cy.log('Mensaje obtenido: ' + mensaje)
                })
                cy.log('El último mensaje pertenece al chatbot')
            } else {
                throw new Error('No hay una respuesta del chatbot como último mensaje')
            }
        });
    }


}

export default new DashboardPage