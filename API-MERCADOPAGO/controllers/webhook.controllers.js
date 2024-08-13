import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { PaymentModel } from '../models/payment.model.js';



dotenv.config();

const savePaymentData = async (data) => {
  try {
    const paymentData = {
      id_operacion: data.id,
      id_tipo_ente_recaudacion: data.transaction_details.payment_method_reference_id,
      canal_pago: data, // web, boleta, point  
      nro_transferencia: data.metadata.nro_transferencia,
      unidad: data.metadata.unidad,
      parcela: data.metadata.parcela,
      fecha_vencimiento: null,
      fecha_pago: data.date_approved,
      importe_pagado: data.transaction_details.total_paid_amount,
      intereses: 0,
      honorarios_judiciales: 0,
      importe_original: data.transaction_amount,
      estado_operacion: data.status,
      fecha_acreditado: data.date_accredited,
      tipo_pago: data.payment_type_id,
      nro_comprobante_rd_sisa: data.metadata.nro_comprobante_rd_sisa,
      dni_cuit: data.payer.identification.number,
      comision: data.fee_details[0]?.amount || 0,
      medio_pago_ente: data.payment_method_id,
      aux_1: '',
      aux_2: '',
      aux_3: '',
      data_json: JSON.stringify(data),
      data_json_aux: JSON.stringify(data.additional_info || {})
    };

    await PaymentModel.create(paymentData);
    console.log('Datos del pago guardados en la base de datos.');
  } catch (error) {
    console.error('Error al guardar los datos del pago:', error);
  }
};

export const receiveWebhook = async (req, res) => {
  const paymentID = req.query.id;

  if (!paymentID) {
    console.error('No se proporcionó paymentID.');
    return res.sendStatus(400);
  }

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Datos recibidos del pago:", data);

      // Lógica basada en el estado del pago
      switch (data.status) {
        case 'approved':
          if (data.status_detail === 'accredited') {
            console.log('El pago ha sido aprobado y acreditado.');
            await savePaymentData(data);
          } else {
            console.log(`El pago ha sido aprobado, pero con un detalle diferente: ${data.status_detail}`);
          }
          break;

        case 'pending':
          console.log('El pago está pendiente.');
          break;

        case 'authorized':
          console.log('El pago ha sido autorizado pero no capturado.');
          break;

        case 'in_process':
          console.log('El pago está en análisis.');
          break;

        case 'in_mediation':
          console.log('El usuario inició una disputa.');
          break;

        case 'rejected':
          console.log(`El pago ha sido rechazado. Detalle: ${data.status_detail}`);
          break;

        case 'cancelled':
          console.log('El pago fue cancelado.');
          break;

        case 'refunded':
          console.log('El pago fue devuelto al usuario.');
          break;

        case 'charged_back':
          console.log('Se realizó un contracargo en la tarjeta del comprador.');
          break;

        default:
          console.log('Estado de pago desconocido:', data.status);
          break;
      }
      
      res.sendStatus(200);
    } else {
      console.log('No se pudo obtener la información del pago. Estado:', response.status);
      res.sendStatus(response.status);
    }
    
  } catch (error) {
    console.error('Error en el manejo del webhook:', error);
    res.sendStatus(500);
  }
};
