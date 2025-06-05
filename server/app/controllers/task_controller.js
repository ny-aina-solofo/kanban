const db = require('../models/models');
const Task = db.task;
const Subtask = db.subtask;

const addTask = async (req,res,next) =>{
    const title = req.body.title;
    const description = req.body?.description || '';
    const id_column = req.body.id_column;
    const newTask = await Task.create({title : title, description: description, id_column : id_column});
    res.status(201).json({
        id_task : newTask.id_task
    })
}
const deleteTask = async (req,res,next) =>{
    const id_task = req.params.id_task;
    await Subtask.destroy({where : {id_task : id_task}});
    await Task.destroy({where : {id_task : id_task}});
    res.status(200).send({success:true});
}
const updateTask = async (req,res,next) =>{
    const id_task = req.body.id_task;
    const newTaskName = req.body.title;
    const newDescription = req.body.description;
    const newStatus = req.body.status;
    // console.log(id_task,newTaskName,newDescription,newStatus);
    await Task.update(
        { 
            title: newTaskName, 
            description: newDescription, 
            id_column: newStatus 
        },
        { 
            where: { id_task: id_task } 
        }
    );
    res.status(200).send({success:true});
}
const updateStatus = async (req,res,next) =>{
    const id_task = req.body.id_task;
    const newStatus = req.body.status;
    // console.log(id_task,newStatus);
    await Task.update({ id_column: newStatus },{ where: { id_task: id_task } });
    res.status(200).send({success:true});
}

module.exports = {
    addTask,
    deleteTask,
    updateTask,
    updateStatus
}; 