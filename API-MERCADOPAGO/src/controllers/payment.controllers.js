import mercadopago from 'mercadopago';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();


export const createOrder = async (req, res) => {
    try {
        const client = new MercadoPagoConfig({
            accessToken: process.env.ACCESS_TOKEN,
            options: { timeout: 5000, idempotencyKey: 'abc', /*integratorId: process.env.INTEGRATOR_ID */}
        });
        
        // Definir los detalles de la preferencia
        const body = {
                         
            items: [
                {
                    id: "1234",
                    //title: req.body.title,
                    title: "manzanaa",
                    currency_id: "ARS",
                    picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                    description: "Descripción del Item",
                    category_id: "art",
                    //quantity: Number(req.body.quantity),
                    quantity: 1,
                    //unit_price: Number(req.body.price),
                    unit_price: 2000
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
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: "visa"
                    }
                ],
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                installments: 6
            },
            notification_url: "https://88c038ec4b185ddeb7337aa130e0acce.serveo.net/webhook",
            statement_descriptor: "MINEGOCIO",
            external_reference: "Reference_1234",
            //expires: true,
            //"expiration_date_from": "2016-02-01T12:00:00.000-04:00",
            //"expiration_date_to": "2016-02-28T12:00:00.000-04:00"
            back_urls: {
                success: "https://www.success.com",
                failure: "https://www.failure.com",
                pending: "https://www.pending.com"
            },
            auto_return: "approved",
        };

        // Crear instancia de Preference
        const preference = new Preference(client);

        // Crear la preferencia
        const response = await preference.create({body});
        console.log('Respuesta de la preferencia:', response);

        // Verificar y enviar la respuesta al cliente
        if (response.api_response.status === 201) {
            res.json({
                message: 'La preferencia fue creada exitosamente.',
                data: response,
                id: response.id
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


