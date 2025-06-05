const db = require('../models/models');
const Subtask = db.subtask;

const addSubtask = async (req,res,next) =>{
    const libelle = req.body.libelle;
    const id_task = req.body.id_task;
    const newSubtask = await Subtask.create({libelle : libelle, done: false, id_task: id_task});
    res.status(201).json({
        id_subtask : newSubtask.id_subtask
    })
}
const deleteSubtask = async (req,res,next) =>{
    const id_subtask = req.params.id_subtask;
    await Subtask.destroy({where : {id_subtask : id_subtask}});
    res.status(200).send({success:true});
}
const updateSubtask = async (req,res,next) =>{
    const id_subtask = req.body.id_subtask;
    const newLibelle = req.body.libelle;
    await Subtask.update({ libelle: newLibelle, },{ where: { id_subtask: id_subtask } });
    res.status(200).send({success:true});
}
const updateDone = async (req,res,next) =>{
    const id_subtask = req.body.id_subtask;
    const newDone = req.body.done;
    await Subtask.update({ done: newDone, },{ where: { id_subtask: id_subtask } });
    res.status(200).send({success:true});
}

module.exports = {
    addSubtask,
    deleteSubtask,
    updateSubtask,
    updateDone
}; 