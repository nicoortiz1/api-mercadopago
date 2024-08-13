import mysql from 'mysql2/promise';
import config from '../config/db.config.js';


let connection;

async function initConnection() {
    if (!connection) {
        connection = await mysql.createConnection(config);
    }
}

export class PaymentModel {
    static async create(input) {
        await initConnection();

        const {
            id_operacion,
            id_tipo_ente_recaudacion,
            canal_pago,
            nro_transferencia,
            unidad,
            parcela,
            fecha_vencimiento,
            fecha_pago,
            importe_pagado,
            intereses,
            honorarios_judiciales,
            importe_original,
            estado_operacion,
            fecha_acreditado,
            tipo_pago,
            nro_comprobante_rd_sisa,
            dni_cuit,
            comision,
            medio_pago_ente,
            aux_1,
            aux_2,
            aux_3,
            data_json,
            data_json_aux
        } = input;

        try {
            const [result] = await connection.query(
                'INSERT INTO payments (id_operacion, id_tipo_ente_recaudacion, canal_pago, nro_transferencia, unidad, parcela, fecha_vencimiento, fecha_pago, importe_pagado, intereses, honorarios_judiciales, importe_original, estado_operacion, fecha_acreditado, tipo_pago, nro_comprobante_rd_sisa, dni_cuit, comision, medio_pago_ente, aux_1, aux_2, aux_3, data_json, data_json_aux) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id_operacion, id_tipo_ente_recaudacion, canal_pago, nro_transferencia, unidad, parcela, fecha_vencimiento, fecha_pago, importe_pagado, intereses, honorarios_judiciales, importe_original, estado_operacion, fecha_acreditado, tipo_pago, nro_comprobante_rd_sisa, dni_cuit, comision, medio_pago_ente, aux_1, aux_2, aux_3, data_json, data_json_aux]
            );
            return result.insertId;
        } catch (e) {
            throw new Error('Error inserting payment data');
        }
    }
}
