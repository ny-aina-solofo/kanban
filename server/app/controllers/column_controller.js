const db = require('../models/models');
const Column = db.column;
const Task = db.task;

const addColumn = async (req,res,next) =>{
    const column_name = req.body.column_name;
    const id_board = req.body.id_board;
    // console.log(column_name,id_board);
    const newColumn =  await Column.create({column_name : column_name, id_board : id_board});
    res.status(201).json({
        id_column : newColumn.id_column
    });
}
const deleteColumn = async (req,res,next) =>{
    const id_column = req.params.id_column;
    // console.log(id_column);
    await Task.destroy({where : {id_column : id_column}});
    await Column.destroy({where : {id_column : id_column}});
    res.status(200).send({success:true});
}
const updateColumn = async (req,res,next) =>{
    const id_column = req.body.id_column;
    const newColumnName = req.body.column_name;
    // console.log(id_column,newColumnName);
    await Column.update(
        { column_name : newColumnName },
        {
        where : {id_column : id_column}
    }); 
    res.status(200).send({success:true});
}

module.exports = {
    addColumn,
    deleteColumn,
    updateColumn
}; 