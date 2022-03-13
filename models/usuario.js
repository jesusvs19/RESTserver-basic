const { model, Schema} = require('mongoose');

const UsuariosSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        uniq: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})

UsuariosSchema.methods.toJSON = function(){
    const { __v, password, ...resto} = this.toObject();
    return resto
}
module.exports = model('Usuario', UsuariosSchema)