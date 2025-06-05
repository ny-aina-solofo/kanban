const { Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const subtask = sequelize.define('subtask', {
        id_subtask : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        libelle : {
            type : Sequelize.STRING,
            allowNull:false
        }, 
        done: {
            type : Sequelize.BOOLEAN,
            allowNull:false
        },
        id_task: {
            type : Sequelize.INTEGER,
            allowNull : false,
            references: {
                model: {
                    tableName: 'task',
                    schema: 'kanban' 
                },
                key: 'id_task',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        freezeTableName: true ,
        schema: 'kanban', 
        timestamps : false 
    })
    return subtask;
}