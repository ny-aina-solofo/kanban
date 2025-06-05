import React,{ useState ,useLayoutEffect } from 'react'
import AddSubtask from '../Input/Subtask/AddSubtask';
import { useDispatch,useSelector } from 'react-redux';
import { deleteSubtask, updateCheckbox } from '../../redux/boardSlice';

interface SubtaskProps {
    subtasks: any;
}


const Subtask = ({subtasks}:SubtaskProps) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state:any) => state.boards.selectedTask);
    const activeBoardId = useSelector((state:any) => state.boards.activeBoardId);
    const addSubtask = useSelector((state:any)=>state.input.addSubtask);

    const updateDone = (id_subtask:any)=>{
        dispatch(updateCheckbox({id_subtask,tasks : selectedTask,activeBoardId})); 
    }
    const handleDelete = (id_subtask:any)=>{
        dispatch(deleteSubtask({id_subtask,tasks : selectedTask,activeBoardId})); 
    }
    return(
        <div>
            <div>Sous-tâches : </div>
            <div 
                className="mt-2" 
                // style={{overflowY:"scroll", height:"70px"}}
            >
                {subtasks.map((sub:any) =>
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