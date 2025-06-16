import React,{ useState ,useLayoutEffect } from 'react'
import AddSubtask from '../Input/Subtask/AddSubtask';
import { useDispatch,useSelector } from 'react-redux';
import { deleteSubtask, updateCheckbox } from '../../redux/boardSlice';
import { SubtaskType } from '@/types';
import { RootState } from '@/redux/store';


interface SubtaskProps {
    subtasks: [];
}


const Subtask = ({subtasks}:SubtaskProps) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state:RootState) => state.boards.selectedTask);
    const activeBoardId = useSelector((state:RootState) => state.boards.activeBoardId);
    const addSubtask = useSelector((state:RootState)=>state.input.addSubtask);

    const updateDone = (id_subtask:number)=>{
        dispatch(updateCheckbox({id_subtask,tasks : selectedTask,activeBoardId})); 
    }
    const handleDelete = (id_subtask:number)=>{
        dispatch(deleteSubtask({id_subtask,tasks : selectedTask,activeBoardId})); 
    }
    return(
        <div>
            <div>Sous-tâches : </div>
            <div 
                className="mt-2" 
                // style={{overflowY:"scroll", height:"70px"}}
            >
                {subtasks.map((sub:SubtaskType) =>
                    <li key={sub.id_subtask} 
                        style={{
                            listStyle: 'none',
                        }}
                    > 
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    checked={sub.done} 
                                    onChange={()=>updateDone(sub.id_subtask)}
                                />
                                <span className='ms-2' style={{textDecoration: sub.done ? 'line-through' : 'none'}}>
                                    {sub.libelle}
                                </span>
                            </div>
                            <div>
                                <i 
                                    data-testid="delete-button"
                                    className="bi bi-x-lg ms-2"  
                                    style={{cursor:"pointer"}}
                                    onClick={()=>handleDelete(sub.id_subtask)}
                                >
                                </i>
                            </div>
                        </div>
                    </li>
                )}
                {addSubtask.open && <AddSubtask/>}
            </div>
        </div>
    )
}
export default Subtask;