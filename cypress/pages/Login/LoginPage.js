/// <reference types="cypress"/>

class LoginPage {

    //--------------------------------------------------Buttons----------------------------------------------
    avanzarPresentacionBtn(textoBoton) {
        return 'button:contains('+textoBoton+'):visible'
    }
    
    //--------------------------------------------------Inputs-----------------------------------------------
    
    //--------------------------------------------------Asserts----------------------------------------------
    titlePresentacionAssert() {
        return 'section h2:visible'
    }
    subTitlePresentacionAssert() {
        return 'section h1:visible'
    }
    caracteristicasTichAssert(nombreCaracteristica) {
        return 'article section>div:contains('+nombreCaracteristica+'):visible()'
    }

    //--------------------------------------------------Methods----------------------------------------------

    pantallasDePresentacion(nivelPresentacion) {
        if(nivelPresentacion == '1') {
            cy.beVisible(this.titlePresentacionAssert())
            cy.get(this.titlePresentacionAssert()).invoke('text').then((textoObtenido) => {
                cy.wrap(textoObtenido).should('be.eq', 'Un examen es como una carrera de velocidad')
            })
            cy.doClickSimple(this.avanzarPresentacionBtn('Siguiente'))
        } else if (nivelPresentacion == '2') {
            cy.beVisible(this.titlePresentacionAssert())
            cy.get(this.titlePresentacionAssert()).invoke('text').then((textoObtenido) => {
                cy.wrap(textoObtenido).should('be.eq', 'Leer y releer es como salir a caminarAyuda, pero no te prepara de verdad.Al no exigirte, es fácil distraerte.')
            })
            cy.doClickSimple(this.avanzarPresentacionBtn('Siguiente'))
        } else if (nivelPresentacion == '3') {
            cy.beVisible(this.subTitlePresentacionAssert())
            cy.get(this.subTitlePresentacionAssert()).invoke('text').then((textoObtenido) => {
                cy.wrap(textoObtenido).should('be.eq', 'Todo lo que necesitás para aprobar en un solo lugar')
            })
            cy.beVisible(this.caracteristicasTichAssert('Desafíos'))
            cy.beVisible(this.caracteristicasTichAssert('Flashcards'))
            cy.beVisible(this.caracteristicasTichAssert('Asistente personal'))
            cy.doClickSimple(this.avanzarPresentacionBtn('Empezar'))
        } else if (nivelPresentacion == '4') {
            cy.beVisible(this.subTitlePresentacionAssert())
            cy.get(this.subTitlePresentacionAssert()).invoke('text').then((textoObtenido) => {
                cy.wrap(textoObtenido).should('be.eq', 'Sumate a miles de estudiantes que aprueban sus exámenes junto a Tich AI')
            })
            cy.beVisible(this.avanzarPresentacionBtn('Continuar con Google'))
        }
    }

    validarPantallasPresentacion() {
        for(let i = 0; i <= 4; i++) {
            this.pantallasDePresentacion(i)
            cy.urlValidatorInclude('/login')
            cy.wait(2000)
        }
    }



}

export default new LoginPage