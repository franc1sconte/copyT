/// <reference types="cypress"/>

class TitoPage {

    //--------------------------------------------------Buttons----------------------------------------------
    
    //--------------------------------------------------Inputs-----------------------------------------------
    
    // Input para escribir un mensaje para el chatbot
    chatbotInput() {
        return '.mx-auto div:has(div[dir=ltr]) input'
    }

    //--------------------------------------------------Asserts----------------------------------------------

     // Mensajes que aparecen dentro del chatbox con su posición
    mensajesChatBotAssert(numeroMensaje) {
        return '.break-words:eq('+numeroMensaje+')'
    }

    // Bloque del chatbox
    titoChatBoxAssert() {
        return '.mx-auto div:has(div[dir=ltr])'
    }

    // Selector usado para poder contar la cantidad de mensajes en chatbox
    cantidadMsjChatAssert() {
        return '.mx-auto div:has(div[dir=ltr]) .break-words'
    }

    //--------------------------------------------------Methods----------------------------------------------

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

export default new TitoPage