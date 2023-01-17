const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comensalSchema = new Schema({
    nombre: String,
    apellidos: String,
    telefono: String,
    primera_vez: Boolean,
    alergias: [String],
    num_visitas: Number,
    mesa: { type: Schema.Types.ObjectId, ref: 'mesa' }
});

// Propiedades virtuales
comensalSchema.virtual('nombre_completo').get(function () {
    return this.nombre + ' ' + this.apellidos;
});

// comensal1.nombre_completo = 'Rodolfo Pérez';
// comensal1.save()
comensalSchema.virtual('nombre_completo').set(function (value) {
    const arrNombre = value.split(' ');
    this.nombre = arrNombre[0];
    this.apellidos = arrNombre[1];
});

// Métodos de INSTANCIA
// comensal.mismaMesa();
comensalSchema.methods.mismaMesa = async function () {
    const mesa = await mongoose.model('mesa')
        .findById(this.mesa)
        .populate('comensales');
    return mesa.comensales.filter(c => c._id.toString() !== this._id.toString());
}
// Promise<any[]>

// Métodos ESTÁTICOS
comensalSchema.statics.findByAlergia = function (alergia) {
    return mongoose.model('comensal').find({ alergias: alergia });
}

comensalSchema.statics.orderByNumVisitas = function () {
    return mongoose.model('comensal').aggregate([
        { $project: { _id: 0, nombre: 1, apellidos: 1, num_visitas: 1 } },
        { $sort: { num_visitas: -1 } },
        { $limit: 2 }
    ]);
}

module.exports = mongoose.model('comensal', comensalSchema, 'comensales');