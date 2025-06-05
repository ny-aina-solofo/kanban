module.exports = (sequelize, Sequelize) =>{
    const board = sequelize.define('board', {
        id_board : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        board_name : {
            type : Sequelize.STRING,
            allowNull:false
        }
    },{
        freezeTableName: true ,// Désactive la pluralisation automatique
        schema: 'kanban', // Spécifie le schéma
        timestamps : false // Désactive les colonnes createdAt et updatedAt
    });
    return board;
}