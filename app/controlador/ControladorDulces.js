//const ModeloDulces = require('../modelo/ModeloDulces');
const modeloDulce = require('../modelo/ModeloDulces')

function index(req,res) {
    console.log('ok');
    modeloDulce.find({})
    .then(dulces => {
        if(dulces.length) return res.status(200).send({dulces});
        return res.status(204).send({message:'No hay contenido'});
    }).catch(error => res.status(500).send({error}));
}

function agregar(req,res) {
    console.log(req.body);
    new modeloDulce(req.body).save()
    .then(dulces => {
        res.status(200).send({dulces})
    }).catch(error => res.status(500).send({error}));
}

function buscar(req,res,next) {
    let consulta ={};
    consulta[req.params.key]=req.params.value;
    modeloDulce.find(consulta).then(dulces =>{
        if(!dulces.length) return next();
        req.body.dulces= dulces;
        return next();
        
    }).catch(error => {
        req.body.error=error;
        next();
    })
}

function mostrar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.dulces) return res.status(404).send({message: 'No hay datos que mostrar'});
    let dulcesObj = req.body.dulces;
    return res.status(200).send({dulcesObj});
    
}

function actualizar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.dulces) return res.status(404).send({message: 'No hay datos para actualizar'});
    let dulcesObjeto = req.body.dulces[0];
    dulcesObjeto=Object.assign(dulcesObjeto,req.body);
    dulcesObjeto.save().then(dulceAlta => {
        res.status(200).send({message: 'Los datos se actalizaron correctamente',dulceAlta});
    }).catch(error => res.status(500).send({error}));
}

function eliminar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.dulces) return res.status(404).send({message: 'No hay datos para eliminar'});
    req.body.dulces[0].remove().then(dulceEliminar =>{
        res.status(200).send({message: 'La informacion se elimino correctamente', dulceEliminar})
    }).catch(error => res.status(500).send({error}));
}

module.exports={
    index,
    agregar,
    buscar,
    mostrar,
    actualizar,
    eliminar
}