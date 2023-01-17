const { Schema, model } = require('mongoose');

const MesaSchema = new Schema({
    numero: {
        type: Number,
        min: [1, 'La menor mesa disponible es la 1'],
        max: [15, 'La mesa más grande es la 15']
    },
    numero_comensales: {
        type: Number,
        required: [true, 'Debes introducir el número de comensales']
    },
    tipo: {
        type: String,
        enum: {
            values: ['cuadrada', 'redonda'],
            message: 'La mesa solo puede ser cuadrada o redonda'
        }
    },
    ventana: Boolean,
    sala: {
        type: String,
        validate: {
            validator: (value) => {
                // Retorno true si pasa la validación, false si no la pasa
                const arrSalas = ['principal', 'vip', 'bar'];
                return arrSalas.includes(value.toLowerCase());
            },
            message: 'Las únicas salas disponibles son principal, vip y bar'
        }
    },
    comensales: [{ type: Schema.Types.ObjectId, ref: 'comensal' }]
});

module.exports = model('mesa', MesaSchema);