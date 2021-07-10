//const ModeloDulces = require('../modelo/ModeloDulces');
const modeloSabritas = require('../modelo/ModeloSabritas')


function index(req,res) {
    modeloSabritas.find({})
    .then(sabritas => {
        if(sabritas.length) return res.status(200).send({sabritas});
        return res.status(204).send({message:'No se encuentra contenido'});
    }).catch(error => res.status(500).send({error}));
}

function agregar(req,res) {
    new modeloSabritas(req.body).save()
    .then(sabritas => {
        res.status(200).send({sabritas})
    }).catch(error => res.status(500).send({error}));
}

function buscar(req,res,next) {
    let consulta ={};
    consulta[req.params.key]=req.params.value;
    modeloSabritas.find(consulta).then(sabritas =>{
        if(!sabritas.length) return next();
        req.body.sabritas= sabritas;
        return next();
        
    }).catch(error => {
        req.body.error=error;
        next();
    })
}

function mostrar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.sabritas) return res.status(404).send({message: 'No hay sabritas para mostrar'});
    let sabritasObje = req.body.sabritas;
    return res.status(200).send({sabritasObje});
    
}

function actualizar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.sabritas) return res.status(404).send({message: 'No hay sabritas para actualizar'});
    let sabritasObjeto = req.body.sabritas[0];
    sabritasObjeto=Object.assign(sabritasObjeto,req.body);
    sabritasObjeto.save().then(sabritasAlta => {
        res.status(200).send({message: 'Las sabritas se actualizaron correctamente',sabritasAlta});
    }).catch(error => res.status(500).send({error}));
}

function eliminar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.sabritas) return res.status(404).send({message: 'No hay sabritas para eliminar'});
    req.body.sabritas[0].remove().then(sabritasEliminar =>{
        res.status(200).send({message: 'Las sabritas se eliminaron correctamente', sabritasEliminar})
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