/// <reference types="cypress"/>

class SideboardPage {

    //--------------------------------------------------Buttons----------------------------------------------
    
    // Boton con logo de Tich en el menú lateral
    tichLogoBtn() {
        return 'img[alt="Logo"]'
    }
    
    // Botones principales del menú lateral por parametro (Inicio, Diagnostico, Herramientas y Talleres)
    sideBoardPrincipalBtns(nombreSeccion) {
        return 'div[title="'+nombreSeccion+'"]'
    }

    // Botones del del menú lateral, uno de whatsApp y otro para Notion
    whatsappLinkBtn() {
        return 'div a[target="_blank"]:eq(0)'
    }
    notionLinkBtn() {
        return 'div a[target="_blank"]:eq(1)'
    }

    //--------------------------------------------------Inputs-----------------------------------------------
    
    //--------------------------------------------------Asserts----------------------------------------------

    // Selector total que representa todo el sideboard o menu lateral.
    sideBoardAssert() {
        return '.grid .h-full:eq(0)'
    }

    //--------------------------------------------------Methods----------------------------------------------

    // Junta todos los elementos visibles del sideboard y los valida
    elementosSideboardVisibles() {
        cy.beVisible(this.sideBoardAssert())
        cy.beVisible(this.tichLogoBtn())
        cy.beVisible(this.sideBoardPrincipalBtns('Inicio'))
        cy.beVisible(this.sideBoardPrincipalBtns('Diagnóstico'))
        cy.beVisible(this.sideBoardPrincipalBtns('Herramientas'))
        cy.beVisible(this.sideBoardPrincipalBtns('Talleres'))
        cy.beVisible(this.whatsappLinkBtn())
        cy.beVisible(this.notionLinkBtn())
    }


}

export default new SideboardPage