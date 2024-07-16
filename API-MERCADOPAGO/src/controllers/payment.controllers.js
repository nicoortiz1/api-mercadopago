import mercadopago from 'mercadopago';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const createOrder = async (req, res) => {
    try {
        const client = new MercadoPagoConfig({
            accessToken: 'TEST-6702637773184768-070510-7e66b2bcf0948334db02a21411a23fa4-229906939',
            integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
            options: { timeout: 5000, idempotencyKey: 'abc' }
        });

        // Crear instancia de Preference
        const preference = new Preference(client);

        // Definir los detalles de la preferencia
        const body = {
            items: [
                {
                    id: "item-ID-1234",
                    title: "Mi producto",
                    currency_id: "ARS",
                    picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                    description: "Descripción del Item",
                    category_id: "art",
                    quantity: 1,
                    unit_price: 75.76
                }
            ],
            payer: {
                name: "Juan",
                surname: "Lopez",
                email: "user@email.com",
                phone: {
                    area_code: "11",
                    number: "4444-4444"
                },
                identification: {
                    type: "DNI",
                    number: "12345678"
                },
                address: {
                    street_name: "Street",
                    street_number: 123,
                    zip_code: "5700"
                }
            },
            back_urls: {
                success: "https://www.success.com",
                failure: "https://www.failure.com",
                pending: "https://www.pending.com"
            },
            auto_return: "approved",
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: "master"
                    }
                ],
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                installments: 12
            },
            notification_url: "https://eight-eggs-tap.loca.lt/webhook",
            statement_descriptor: "MINEGOCIO",
            external_reference: "Reference_1234",
            expires: true
            //"expiration_date_from": "2016-02-01T12:00:00.000-04:00",
            //"expiration_date_to": "2016-02-28T12:00:00.000-04:00"
        };

        // Crear la preferencia
        const response = await preference.create({ body });
        console.log('Respuesta de la preferencia:', response);

        // Verificar y enviar la respuesta al cliente
        if (response.api_response.status === 201) {
            res.json({
                message: 'La preferencia fue creada exitosamente.',
                data: response
            });
        } else {
            res.json({
                message: 'Hubo un problema al crear la preferencia.',
                data: response
            });
        }

    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({
            error: "Error al crear la preferencia",
            details: error.message // Detalles del error para depuración
        });
    }
};

export const receiveWebhook = (req, res) => {
    console.log(req.query);
    res.send("webhook");
};
