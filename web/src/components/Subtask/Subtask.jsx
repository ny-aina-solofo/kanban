import React,{ useState ,useLayoutEffect } from 'react'
import AddSubtask from '../Input/Subtask/AddSubtask';
import { useDispatch,useSelector } from 'react-redux';
import { deleteSubtask, updateCheckbox } from '../../redux/boardSlice';

const Subtask = ({subtasks}) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state) => state.boards.selectedTask);
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    const addSubtask = useSelector((state)=>state.input.addSubtask);

    const updateDone = (id_subtask)=>{
        dispatch(updateCheckbox({id_subtask,tasks : selectedTask,activeBoardId})); 
    }
    const handleDelete = (id_subtask)=>{
        dispatch(deleteSubtask({id_subtask,tasks : selectedTask,activeBoardId})); 
    }
    return(
        <div>
            <div>Sous-tâches : </div>
            <div 
                className="mt-2" 
                // style={{overflowY:"scroll", height:"70px"}}
            >
                {subtasks.map((sub) =>
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
                                    className="bi bi-x-lg ms-2"  type="button"
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