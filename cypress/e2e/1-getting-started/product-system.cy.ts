describe('Prueba de agregar producto al carrito', () => {

    it('Debería agregar un producto al carrito y mostrar mensaje de éxito', () => {
        // Visitar la página de productos
        cy.visit('/productos');
        cy.wait(2000);
        //Esperar que haya al menos un producto cargado
        cy.get('app-product-card').should('have.length.at.least', 1);
        cy.wait(2000);
        //Hacer clic en el primer enlace "Ver Detalles"
        cy.get('app-product-card a')
            .first()
            .should('contain.text', 'Ver Detalles')
            .click();
        cy.wait(2000);
        //Confirmar que estamos en la página del detalle
        cy.url().should('include', '/producto/');

        //Verificar que existe el botón "Agregar al Carrito"
        cy.contains('button', 'Agregar al Carrito').should('be.visible');

        //Hacer clic en el botón para agregar al carrito
        cy.contains('button', 'Agregar al Carrito').click();

        //Confirmar que aparece el mensaje de éxito
        cy.contains('¡Producto agregado al carrito!').should('be.visible');

        cy.wait(5000);
        //Navega al carrito (enlace o ruta directa)
        cy.contains('Carrito').click();
    });

});
