const { response } = require("express");

const validaArchivoSubir = (req, res=response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No se archivos que subir - archivo' });

    }
    next();
}

module.exports = {
    validaArchivoSubir
}