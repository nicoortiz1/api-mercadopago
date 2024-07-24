import dotenv from 'dotenv';
dotenv.config();


export const receiveWebhook = async (req, res) => {
    const paymentID = req.query.id

    try{
        const response = await fetch ( `https://api.mercadopago.com/v1/payments/${paymentID}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}` 
        }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }

        res.sendStatus(200);

    } catch(error){
        
        console.log('Error:',error);
        res.sendStatus(500);

    }
    

};