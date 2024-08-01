import dotenv from 'dotenv';
dotenv.config();

export const receiveWebhook = async (req, res) => {
  const paymentID = req.query.id;

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Esta es la data:", data);

      // Lógica basada en el estado del pago
      switch (data.status) {
        case 'approved':
          if (data.status_detail === 'accredited') {
            console.log('El pago ha sido aprobado y acreditado.');
            // Lógica adicional para manejar el pago aprobado y acreditado
            // Por ejemplo, actualizar la base de datos, notificar al usuario, etc.
          } else {
            console.log(`El pago ha sido aprobado, pero con un detalle diferente: ${data.status_detail}`);
            // Lógica para otros detalles de pagos aprobados
          }
          break;

        case 'pending':
          console.log('El pago está pendiente.');
          // Lógica adicional para manejar el pago pendiente
          break;

        case 'authorized':
          console.log('El pago ha sido autorizado pero no capturado.');
          // Lógica adicional para manejar el pago autorizado
          break;

        case 'in_process':
          console.log('El pago está en análisis.');
          // Lógica adicional para manejar el pago en análisis
          break;

        case 'in_mediation':
          console.log('El usuario inició una disputa.');
          // Lógica adicional para manejar disputas
          break;

        case 'rejected':
          console.log(`El pago ha sido rechazado. Detalle: ${data.status_detail}`);
          // Lógica adicional para manejar el pago rechazado
          break;

        case 'cancelled':
          console.log('El pago fue cancelado.');
          // Lógica adicional para manejar el pago cancelado
          break;

        case 'refunded':
          console.log('El pago fue devuelto al usuario.');
          // Lógica adicional para manejar devoluciones
          break;

        case 'charged_back':
          console.log('Se realizó un contracargo en la tarjeta del comprador.');
          // Lógica adicional para manejar contracargos
          break;

        default:
          console.log('Estado de pago desconocido:', data.status);
          // Lógica adicional para manejar otros estados o errores
          break;
      }
    } else {
      console.log('No se pudo obtener la información del pago. Estado:', response.status);
    }

    res.sendStatus(200);
    
  } catch (error) {
    console.log('Error:', error);
    res.sendStatus(500);
  }
};
