const { Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const column = sequelize.define('column', {
        id_column : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        column_name : {
            type : Sequelize.STRING,
            allowNull:false
        },
        id_board : {
            type : Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: {
                    tableName: 'board',
                    schema: 'kanban' 
                },
                key: 'id_board',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        freezeTableName: true ,
        schema: 'kanban', 
        timestamps : false 
    });
    return column;
}