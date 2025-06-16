import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { changeTaskColumn } from '../../redux/boardSlice';
import { RootState } from '@/redux/store';
import { BoardType, ColumnType } from '@/types';

const ChangeTaskStatus = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state:RootState) => state.boards.selectedTask);    
    const boards = useSelector((state:RootState) => state.boards.boards);
    const activeBoardId = useSelector((state:RootState) => state.boards.activeBoardId);
    const activeBoard = boards.find((board:BoardType) => board.id_board === activeBoardId);
    const columns = activeBoard?.column || [] ;
    const navigate = useNavigate();
    
    const [status, setStatus] = useState(selectedTask.id_column);
    
    const handleChange = ()=>{
        dispatch(changeTaskColumn({ 
            id_board : activeBoardId, 
            oldColumnId : selectedTask.id_column, 
            newColumnId : parseInt(status), 
            id_task : selectedTask.id_task 
        }));
        navigate(-1);
    }
    return (
        <div>
            <div className="mb-2">
                <label className="form-label">Statut</label>
                <select 
                    className="form-select" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {columns.map((col:ColumnType)=> (
                        <option key={col.id_column} value={col.id_column}>
                            {col.column_name}
                        </option>
                    ))}
                </select>
            </div>
            <button 
                className="btn btn-primary mt-3" 
                onClick={handleChange}
                disabled={columns.length === 1}
            >
                basculer
            </button>
        </div>
    )
}
export default ChangeTaskStatus;