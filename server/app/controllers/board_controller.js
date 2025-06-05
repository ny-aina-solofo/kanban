const pool = require('../config/db.config');
const db = require('../models/models');
const Board = db.board;
const Column = db.column;
const Task = db.task;

const getBoard = async function (req,res,next) {
    const sql_select = `
        SELECT 
            b.id_board,b.board_name,
            CASE
                WHEN COUNT(c.id_column) = 0 THEN null
                ELSE jsonb_agg(
                jsonb_build_object(
                    'id_column',c.id_column, 
                    'column_name',c.column_name,
                    'id_board',c.id_board,
                    'tasks', ( 
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'id_task',t.id_task, 
                                'title',t.title,
                                'description',t.description,
						        'id_column',t.id_column,
						        'subtasks', (
									SELECT jsonb_agg(
			                            jsonb_build_object(
			                                'id_subtask',s.id_subtask, 
			                                'libelle',s.libelle,
			                                'done',s.done,
									        'id_task',s.id_task
			                            )
			                            ORDER BY s.id_subtask
			                        ) AS subtasks
			                        FROM kanban.subtask s 
			                        WHERE s.id_task = t.id_task
						        )
                            )
                            ORDER BY t.id_task
                        ) AS tasks
                        FROM kanban.task t 
                        WHERE t.id_column = c.id_column
                    )	
                )
                 ORDER BY c.id_column
            )
            END AS column
        FROM kanban.board b
        LEFT JOIN kanban.column c  on b.id_board = c.id_board
        GROUP BY b.id_board, b.board_name
       	ORDER BY b.id_board;
    `;
    const result = await pool.query(sql_select,[]);
    if (Object.keys(result).length > 0) res.status(200).send(result.rows);
    else res.status(200).send();
}

const addBoard = async (req,res,next) =>{
    const board_name = req.body.board_name;
    await Board.create({board_name : board_name});
    res.status(200).send({success:true});
}
const deleteBoard = async (req,res,next) =>{
    const id_board = req.params.id_board;
    // console.log(id_board);
    const selectColumn = await Column.findAll({where : {id_board : id_board}});
    if (selectColumn.length > 0) {
        for (const column of selectColumn) {
            const id_column = column.id_column;
            // console.log("id_column:", id_column);
            await Task.destroy({ where: { id_column: id_column } });
        }
        await Column.destroy({ where: { id_board: id_board } });
        await Board.destroy({ where: { id_board: id_board } });
    }
    res.status(200).send({success:true});
}
const updateBoard = async (req,res,next) =>{
    const id_board = req.body.id_board;
    const newBoardName = req.body.board_name;
    // console.log(id_board,newBoardName);
    await Board.update(
        { board_name : newBoardName },
        {
        where : {id_board : id_board}
    }); 
    res.status(200).send({success:true});
}

module.exports = {
    getBoard,
    addBoard,
    deleteBoard,
    updateBoard
}; 