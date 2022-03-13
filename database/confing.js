const mongoose = require('mongoose');

const dbConnection = async () => {
    try{

        await mongoose.connect('mongodb+srv://user_node:JTd9ymWZhJ4fpcdH@micluster.kgjo7.mongodb.net/cafedb',(err, resp) => {
            if (err) throw err;
            console.log('Base de datos ONLINE');
        });
        
    }catch(err){
        console.log(err);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}