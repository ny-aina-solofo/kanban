const { Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const task = sequelize.define('task', {
        id_task : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        title : {
            type : Sequelize.STRING,
            allowNull:false
        }, 
        description: {
            type : Sequelize.TEXT
        },
        id_column: {
            type : Sequelize.INTEGER,
            allowNull : false,
            references: {
                model: {
                    tableName: 'column',
                    schema: 'kanban' 
                },
                key: 'id_column',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        freezeTableName: true ,
        schema: 'kanban', 
        timestamps : false 
    })
    return task;
}