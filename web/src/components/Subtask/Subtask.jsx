import React,{ useState ,useLayoutEffect } from 'react'
import AddSubtask from '../Input/Subtask/AddSubtask';
import { useDispatch,useSelector } from 'react-redux';

const Subtask = ({subtasks}) => {
    const dispatch = useDispatch();
    const addSubtask = useSelector((state)=>state.input.addSubtask);
    const updateCheckbox = (id_subtask)=>{
        console.log(id_subtask);
        // dispatch({ type: 'update_checkbox', id : id });
        // const done = !todo.done;
        // todolistService.updateCheckbox(id,done).then((response)=>{});
    }
    const deleteSubtask = (id_subtask)=>{
        console.log(id_subtask);
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
                                    onChange={()=>updateCheckbox(sub.id_subtask)}
                                />
                                <span className='ms-2' style={{textDecoration: sub.done ? 'line-through' : 'none'}}>
                                    {sub.libelle}
                                </span>
                            </div>
                            <div>
                                <i 
                                    className="bi bi-x-lg ms-2"  type="button"
                                    onClick={()=>deleteSubtask(sub.id_subtask)}
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