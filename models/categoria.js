const { Schema, model} = require('mongoose');

const CategoriaSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'La categoría es requerida']
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
    }
})

CategoriaSchema.methods.toJSON = function(){
    const { __v, ...resto} = this.toObject();

    return resto
}

module.exports = model('Categoria', CategoriaSchema);