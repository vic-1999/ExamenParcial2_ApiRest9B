const mongoose = require('mongoose');

const SabritasSchema = new mongoose.Schema({


    codigo:{
        type: Number,
        required:true,
        unique: true
    },
    nombre:{
        type: String,
      
    },
    gramos:{
        type: String,
    
    },
    precio:{
        type: Number,
    },

   fechaderegistro:{
       type: Date,
       default: Date.now
       
   }
})

const Sabritas = mongoose.model('Sabritas', SabritasSchema);

module.exports = Sabritas;