const { Schema, model} = require('mongoose');

const ProductoSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'el nombre es requerido']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required:true
    },
    descripcion:{ type: String },
    disponible: { type: Boolean, default: true }
})

ProductoSchema.methods.toJSON = function(){
    const { __v, ...resto} = this.toObject();

    return resto
}

module.exports = model('Producto', ProductoSchema);