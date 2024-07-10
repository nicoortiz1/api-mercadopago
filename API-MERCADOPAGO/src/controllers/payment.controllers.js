import mercadopago from 'mercadopago';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const createOrder = async (req, res) => {
    try {

        const  client  =  new  MercadoPagoConfig ( {  accessToken : 'TEST-7068168195646950-100721-dc40ac3495008e6a85f15b2b20a24374-229906939' ,  options : {  timeout : 5000 ,  idempotencyKey : 'abc'  }  } ) ;

        // Crear instancia de Preference
        const preference = new Preference (client);

        // Definir los detalles de la preferencia
        const body = {
            items: [{
                title: "Libro",
                quantity: 1,
                unit_price: 100,
                currency_id: "ARS",
            }],
            back_urls: {
                success: "https://www.mercadopago.com.ar/developers/",
                failure: "https://www.mercadopago.com.ar/developers/",
                pending: "https://www.mercadopago.com.ar/developers/"
            },
            auto_return: "approved",
        };
        // Paso 5: Crear objeto de opciones de solicitud - Opcional 
        const  requestOptions  =  { 
            idempotencyKey : '<IDEMPOTENCY_KEY>' , 
        } ;

    
        preference.create({ body, requestOptions }).then(console.log).catch(console.log);

    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({
            error: "Error al crear la preferencia"
        });
    }
};

export const receiveWebhook = (req, res) => {
    console.log(req.query);
    res.send("webhook");
};
