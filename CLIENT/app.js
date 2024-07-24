const mp = new MercadoPago('APP_USR-0c416d7f-7422-47c5-ab37-15076be928ba', {
    locale: "es-AR",
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        const orderData = {
            title: document.querySelector(".name").innerText,
            quantity: 1,
            price: 2000
        };

        const response = await fetch("http://localhost:3000/create-orden", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-integrator-id": 'dev_24c65fb163bf11ea96500242ac130004'
            },
            body: JSON.stringify(orderData)
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);

    } catch (error) {
        alert("error en el cliente");
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        try {
            if (window.checkoutButton) window.checkoutButton.unmount(); // Desmontar el botón existente si hay uno

            // Configuración del componente del botón de pago
            await bricksBuilder.create("wallet", "wallet_container", {
                initialization: {
                    preferenceId: preferenceId,
                },
                headers: {
                    "Content-Type": "application/json",
                    "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004" // Asegúrate de reemplazar con el ID de integrador correcto
                }
                /*
                customization: {
                    texts: {
                        valueProp: 'smart_option',
                    },
                },
                */
            });

            // Guardar referencia al botón creado si es necesario
            window.checkoutButton = bricksBuilder.get('wallet');
        } catch (error) {
            console.error('Error al crear el botón de pago:', error);
        }
    };

    renderComponent();
};
